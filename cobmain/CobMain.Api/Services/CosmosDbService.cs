using Microsoft.Azure.Cosmos;
using CobMain.Api.Models;

namespace CobMain.Api.Services
{
    public interface ICosmosDbService
    {
        Task<IEnumerable<JourneyLayout>> GetAllLayoutsAsync();
        Task<JourneyLayout?> GetLayoutAsync(string id);
        Task<JourneyLayout> CreateLayoutAsync(JourneyLayout layout);
        Task<JourneyLayout> UpdateLayoutAsync(string id, JourneyLayout layout);
        Task DeleteLayoutAsync(string id);
    }

    public class CosmosDbService : ICosmosDbService
    {
        private readonly Container _container;

        public CosmosDbService(CosmosClient client, IConfiguration config)
        {
            var dbName        = config["CosmosDb:DatabaseName"]  ?? throw new ArgumentNullException("CosmosDb:DatabaseName");
            var containerName = config["CosmosDb:ContainerName"] ?? throw new ArgumentNullException("CosmosDb:ContainerName");
            _container = client.GetContainer(dbName, containerName);
        }

        public async Task<IEnumerable<JourneyLayout>> GetAllLayoutsAsync()
        {
            var query   = _container.GetItemQueryIterator<JourneyLayout>("SELECT * FROM c WHERE c.partitionKey = 'layout'");
            var results = new List<JourneyLayout>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response);
            }
            return results;
        }

        public async Task<JourneyLayout?> GetLayoutAsync(string id)
        {
            try
            {
                var response = await _container.ReadItemAsync<JourneyLayout>(id, new PartitionKey("layout"));
                return response.Resource;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
        }

        public async Task<JourneyLayout> CreateLayoutAsync(JourneyLayout layout)
        {
            layout.Id         = Guid.NewGuid().ToString();
            layout.CreatedAt  = DateTime.UtcNow;
            layout.UpdatedAt  = DateTime.UtcNow;
            layout.PartitionKey = "layout";
            var response = await _container.CreateItemAsync(layout, new PartitionKey(layout.PartitionKey));
            return response.Resource;
        }

        public async Task<JourneyLayout> UpdateLayoutAsync(string id, JourneyLayout layout)
        {
            layout.Id           = id;
            layout.UpdatedAt    = DateTime.UtcNow;
            layout.PartitionKey = "layout";
            var response = await _container.UpsertItemAsync(layout, new PartitionKey(layout.PartitionKey));
            return response.Resource;
        }

        public async Task DeleteLayoutAsync(string id)
        {
            await _container.DeleteItemAsync<JourneyLayout>(id, new PartitionKey("layout"));
        }
    }
}
