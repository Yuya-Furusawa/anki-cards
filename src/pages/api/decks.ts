import type { NextApiRequest, NextApiResponse } from 'next';
import pool from 'server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name } = req.body;
      await pool.query('INSERT INTO decks (name) VALUES ($1)', [name]);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'failed to post query' });
    }
  } else {
    try {
      const data = await pool.query('SELECT * FROM decks');
      res.status(200).json(data.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'failed to load data' });
    }
  }
}
