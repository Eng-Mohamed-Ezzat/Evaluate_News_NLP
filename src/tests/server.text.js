const request = require('supertest');
const express = require('express');

const app = express();
app.use(express.json());

// Mock API endpoint
app.post('/analyze', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send({ error: 'URL is required' });
    }
    // Simulate successful API response
    res.send({ success: true, data: { entities: [], topics: [] } });
});

describe('POST /analyze', () => {
    test('should return 400 if url is missing', async () => {
        const response = await request(app)
            .post('/analyze')
            .send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('URL is required');
    });

    test('should return success response for valid url', async () => {
        const response = await request(app)
            .post('/analyze')
            .send({ url: 'https://example.com' });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('entities');
        expect(response.body.data).toHaveProperty('topics');
    });
});
