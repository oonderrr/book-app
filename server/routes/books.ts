import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// --------------------------------------------------------------

const bookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(2).max(100),
  amount: z.number().int().positive(),
});

type Book = z.infer<typeof bookSchema>;

const createBookSchema = bookSchema.omit({ id: true });

// --------------------------------------------------------------

const fakeBooks: Book[] = [
  {
    id: 1,
    title: 'The Book 1',
    amount: 10,
  },
  {
    id: 2,
    title: 'The Book 2',
    amount: 20,
  },
  {
    id: 3,
    title: 'The Book 3',
    amount: 30,
  },
];

const booksRoute = new Hono()
  .get('/', async (c) => {
    return c.json({ books: fakeBooks });
  })
  .post('/', zValidator('json', createBookSchema), async (c) => {
    const book = await c.req.valid('json');

    fakeBooks.push({
      id: fakeBooks.length + 1,
      title: book.title,
      amount: book.amount,
    });

    return c.json(book);
  })
  .get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const book = fakeBooks.find((book) => book.id === id);

    if (!book) {
      return c.notFound();
    }

    return c.json({ book: book });
  })
  .delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'));
    const index = fakeBooks.findIndex((book) => book.id === id);

    if (index === -1) {
      return c.notFound();
    }

    const deletedBook = fakeBooks.splice(index, 1)[0];
    return c.json({ book: deletedBook });
  });
/*
  ;
  .put('/:id', (c) => {
    return c.json({ book: {} });
  });
   */

export default booksRoute;
