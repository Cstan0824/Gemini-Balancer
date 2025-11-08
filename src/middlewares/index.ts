import express, { Express } from 'express';
import cors from 'cors';
class Middleware {
    public init(app: Express) {
        app.use(express.json());
        app.use(cors());
    }
}

export const middleware = new Middleware();