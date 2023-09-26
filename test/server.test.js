const request = require('supertest');
const app = require('../server'); // Import your Express application

describe('Test the server routes', () => {
  // Test creating a new issue
  test('POST /api/issues', async () => {
    const response = await request(app)
      .post('/api/issues')
      .send({ title: 'Test Issue', description: 'This is a test issue' });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Issue created successfully');
  });

  // Test fetching all issues
  test('GET /api/issues', async () => {
    const response = await request(app).get('/api/issues');
    expect(response.statusCode).toBe(200);
  });

  // Test fetching an issue by ID
  test('GET /api/issues/:id', async () => {
    const issueId = 1;
    const response = await request(app).get(`/api/issues/${issueId}`);
    expect(response.statusCode).toBe(200);
  });

  // Test updating an issue
  test('PUT /api/issues/:id', async () => {
    const issueId = 1;
    const updatedData = { title: 'Updated Issue', description: 'This is an updated issue' };
    const response = await request(app)
      .put(`/api/issues/${issueId}`)
      .send(updatedData);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Issue updated successfully');
  });

  // Test deleting an issue
  test('DELETE /api/issues/:id', async () => {
    const issueId = 1;
    const response = await request(app).delete(`/api/issues/${issueId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Issue deleted successfully');
  });
});
