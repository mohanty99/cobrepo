using Newtonsoft.Json;

namespace CobMain.Api.Models
{
    public class JourneyStage
    {
        [JsonProperty("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [JsonProperty("title")]
        public string Title { get; set; } = "Stage";

        [JsonProperty("description")]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("datakey")]
        public string Datakey { get; set; } = string.Empty;

        [JsonProperty("processCompletionOrder")]
        public string ProcessCompletionOrder { get; set; } = "Sequential";

        [JsonProperty("tasks")]
        public List<JourneyTask> Tasks { get; set; } = new();

        [JsonProperty("partitionKey")]
        public string PartitionKey { get; set; } = "stage";
    }

    public class JourneyTask
    {
        [JsonProperty("id")]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [JsonProperty("title")]
        public string Title { get; set; } = "Task";

        [JsonProperty("description")]
        public string Description { get; set; } = string.Empty;

        [JsonProperty("datakey")]
        public string Datakey { get; set; } = string.Empty;

        [JsonProperty("taskType")]
        public string TaskType { get; set; } = string.Empty;
    }
}
