using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace FinalProject.Data.Converters
{
    public class TimeOnlyConverter : ValueConverter<TimeOnly, TimeSpan>
    {
        public TimeOnlyConverter()
            : base(
                t => t.ToTimeSpan(),
                t => TimeOnly.FromTimeSpan(t))
        {
        }
    }
}
