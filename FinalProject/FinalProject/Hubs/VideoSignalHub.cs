using System.Collections.Concurrent;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using FinalProject.Interfaces;

namespace SafeMind.Hubs
{
    [Authorize]
    public class VideoSignalHub : Hub
    {
        private readonly IVideoSessionService _videoSessionService;

        // roomToken -> connectionIds
        private static readonly ConcurrentDictionary<string, HashSet<string>> Rooms
            = new();

        public VideoSignalHub(IVideoSessionService videoSessionService)
        {
            _videoSessionService = videoSessionService;
        }

     
        // Join Room
        
        public async Task JoinRoom(string roomToken)
        {
            var userId = int.Parse(Context.UserIdentifier!);

            var validate = await _videoSessionService.ValidateJoinAsync(roomToken, userId);
            if (!validate.Success)
                throw new HubException(validate.Error);

            var connections = Rooms.GetOrAdd(roomToken, _ => new HashSet<string>());

            lock (connections)
            {
                connections.Add(Context.ConnectionId);
            }

            await Groups.AddToGroupAsync(Context.ConnectionId, roomToken);

            // notify others
            await Clients.Group(roomToken)
                .SendAsync("UserJoined", Context.ConnectionId);
        }

        
        // SDP Offer
        
        public async Task SendOffer(string roomToken, object offer)
        {
            await Clients.OthersInGroup(roomToken)
                .SendAsync("ReceiveOffer", offer);
        }

        
        // SDP Answer
        
        public async Task SendAnswer(string roomToken, object answer)
        {
            await Clients.OthersInGroup(roomToken)
                .SendAsync("ReceiveAnswer", answer);
        }

        
        // ICE Candidate
        
        public async Task SendIceCandidate(string roomToken, object candidate)
        {
            await Clients.OthersInGroup(roomToken)
                .SendAsync("ReceiveIceCandidate", candidate);
        }

        
        // 5️⃣ Leave / Disconnect
        
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            foreach (var room in Rooms)
            {
                lock (room.Value)
                {
                    if (room.Value.Remove(Context.ConnectionId))
                    {
                        Groups.RemoveFromGroupAsync(Context.ConnectionId, room.Key);
                        Clients.Group(room.Key)
                            .SendAsync("UserLeft", Context.ConnectionId);
                        break;
                    }
                }
            }

            await base.OnDisconnectedAsync(exception);
        }
    }
}
