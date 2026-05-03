import { CosmosClient } from '@azure/cosmos'

const endpoint  = import.meta.env.VITE_COSMOS_ENDPOINT
const key       = import.meta.env.VITE_COSMOS_KEY
const dbName    = import.meta.env.VITE_COSMOS_DB
const ctrName   = import.meta.env.VITE_COSMOS_CONTAINER

if (!endpoint || !key) {
  console.warn('Cosmos DB: VITE_COSMOS_ENDPOINT and VITE_COSMOS_KEY must be set in .env.local')
}

export const client = new CosmosClient({ endpoint, key })

export const getContainer = () =>
  client.database(dbName).container(ctrName)

/* ── convenience helpers ───────────────────────────────────────── */

export async function fetchAll(query = 'SELECT * FROM c') {
  const { resources } = await getContainer().items.query(query).fetchAll()
  return resources
}

export async function upsertItem(item) {
  const { resource } = await getContainer().items.upsert(item)
  return resource
}

export async function deleteItem(id, partitionKey) {
  await getContainer().item(id, partitionKey).delete()
}
