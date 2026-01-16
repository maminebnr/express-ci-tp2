const request = require('supertest');
const app = require('./app');

describe('Auth API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/register')
            .send({ username: 'testuser', password: 'password123' });
        expect(res.statusCode).toEqual(201);
        expect(res.text).toEqual('User registered successfully');
    });

    it('should not register an existing user', async () => {
        await request(app)
            .post('/register')
            .send({ username: 'existinguser', password: 'password123' });

        const res = await request(app)
            .post('/register')
            .send({ username: 'existinguser', password: 'password123' });
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual('User already exists');
    });

    it('should login with valid credentials', async () => {
        await request(app)
            .post('/register')
            .send({ username: 'loginuser', password: 'password123' });

        const res = await request(app)
            .post('/login')
            .send({ username: 'loginuser', password: 'password123' });
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Login successful');
    });

    it('should not login with invalid credentials', async () => {
        const res = await request(app)
            .post('/login')
            .send({ username: 'nonexistent', password: 'wrongpassword' });
        expect(res.statusCode).toEqual(401);
        expect(res.text).toEqual('Invalid credentials');
    });
});
