import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  async function getPostgresVersion() {
    const postgresVersion = await database.query("SHOW server_version;");
    return postgresVersion.rows[0].server_version;
  }

  async function getMaxConnections() {
    const postgresVersion = await database.query(
      "SELECT setting FROM pg_settings WHERE name = 'max_connections';",
    );
    return parseInt(postgresVersion.rows[0].setting);
  }

  async function getCurrentConnections() {
    const postgresVersion = await database.query(
      "SELECT count(*) FROM pg_stat_activity WHERE backend_type = 'client backend';",
    );
    return parseInt(postgresVersion.rows[0].count);
  }

  response.status(200).json({
    update_at: updateAt,
    database: {
      postgres_version: await getPostgresVersion(),
      max_connections: await getMaxConnections(),
      current_connections: await getCurrentConnections(),
    },
  });
}

export default status;
