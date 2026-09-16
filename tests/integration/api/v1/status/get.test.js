test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();
  expect(responseBody.database.postgres_version).toBeDefined();
  expect(responseBody.database.max_connections).toBeDefined();
  expect(responseBody.database.current_connections).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toEqual(parsedUpdateAt);

  const maxConnections = Number(responseBody.database.max_connections);
  const currentConnections = Number(responseBody.database.current_connections);

  expect(maxConnections).toEqual(expect.any(Number));
  expect(currentConnections).toEqual(expect.any(Number));
  expect(maxConnections).toBeGreaterThan(0);
  expect(currentConnections).toBeGreaterThanOrEqual(0);
  expect(currentConnections).toBeLessThanOrEqual(maxConnections);
});
