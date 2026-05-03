using Microsoft.Azure.Cosmos;
using CobMain.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// ── Cosmos DB ──────────────────────────────────────────────────────
var cosmosEndpoint = builder.Configuration["CosmosDb:Endpoint"]!;
var cosmosKey      = builder.Configuration["CosmosDb:Key"]!;

builder.Services.AddSingleton(_ => new CosmosClient(cosmosEndpoint, cosmosKey,
    new CosmosClientOptions { SerializerOptions = new() { PropertyNamingPolicy = CosmosPropertyNamingPolicy.CamelCase } }));

builder.Services.AddSingleton<ICosmosDbService, CosmosDbService>();

// ── API ────────────────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
    app.MapOpenApi();

app.UseCors();
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
