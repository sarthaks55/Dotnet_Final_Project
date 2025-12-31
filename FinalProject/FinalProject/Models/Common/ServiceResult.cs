namespace FinalProject.Models.Common
{
    public class ServiceResult
    {
        public bool Success { get; set; }
        public string? Error { get; set; }
        public object? Data { get; set; }

        public static ServiceResult Ok(object? data = null)
            => new() { Success = true, Data = data };

        public static ServiceResult Fail(string message)
            => new() { Success = false, Error = message };
    }
}
