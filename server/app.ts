import { Hono } from 'hono';
import { logger } from 'hono/logger';
import booksRoute from './routes/books';

const app = new Hono();
app.use(logger());

app.get('/', (c) => {
  return c.json({ message: 'Hello from Hono!' });
});

app.route('/api/books', booksRoute);

export default app;
