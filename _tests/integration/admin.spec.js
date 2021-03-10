const request = require('supertest');

const app = require('../../src/app');

const truncate = require('../utils/truncate');
const factory = require('../utils/factories');

describe('Admin pages', () => {
  beforeEach(() => {
    truncate();
  });

  it('should render library page without errors', async () => {
    const response = await request(app).get('/admin');

    expect(response.status).toBe(200);
  });

  it('should render book page without errors', async () => {
    const product = await factory.create('Product').then((r) => r.get());

    const response = await request(app).get(`/admin/books/${product.id}`);

    expect(response.status).toBe(200);
  });
});
