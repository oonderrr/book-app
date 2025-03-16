import { Hono } from 'hono';
import { logger } from 'hono/logger';
import booksRoute from './routes/books';

const app = new Hono();
app.use(logger());

const apiRoutes = app.basePath('/api').route('/books', booksRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
