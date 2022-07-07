import { NextApiRequest, NextApiResponse } from 'next';

import pool from 'server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { deck, face, back } = req.body;
      await pool.query(
        'INSERT INTO cards (deck, face, back) VALUES ($1, $2, $3)',
        [deck, face, back]
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({});
    }
  } else {
    try {
      const data = await pool.query('SELECT * FROM cards');
      console.log(data.rows);
      res.status(200).json(data.rows);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'failed to load data' });
    }
  }
}
