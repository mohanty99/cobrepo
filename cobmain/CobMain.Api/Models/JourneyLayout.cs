using Newtonsoft.Json;

namespace CobMain.Api.Models
{
    public class JourneyLayout
    {
        [JsonProperty("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [JsonProperty("version")]
        public int Version { get; set; } = 1;

        [JsonProperty("name")]
        public string Name { get; set; } = string.Empty;

        [JsonProperty("journey")]
        public JourneyData Journey { get; set; } = new();

        [JsonProperty("partitionKey")]
        public string PartitionKey { get; set; } = "layout";

        [JsonProperty("createdAt")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [JsonProperty("updatedAt")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }

    public class JourneyData
    {
        [JsonProperty("pan")]
        public PanPosition Pan { get; set; } = new();

        [JsonProperty("stages")]
        public List<JourneyStage> Stages { get; set; } = new();
    }

    public class PanPosition
    {
        [JsonProperty("x")]
        public double X { get; set; }

        [JsonProperty("y")]
        public double Y { get; set; }
    }
}
