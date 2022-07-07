import type { NextApiRequest, NextApiResponse } from 'next';

import pool from 'server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  try {
    const data = await pool.query('SELECT * FROM cards WHERE deck = $1', [id]);
    res.status(200).json(data.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'failed to load data' });
  }
}
