const request = require('supertest');
const app = require('./app'); // Import the app without starting the server

describe('GET /', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
