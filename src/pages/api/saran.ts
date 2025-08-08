import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from 'redis';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const REDIS_PASSWORD = fs.readFileSync('/run/secrets/redis_password', 'utf8').trim();

  const client = createClient({
    url: `redis://default:${REDIS_PASSWORD}@redis:6379`,
  });

  await client.connect();

  if (req.method === 'POST') {
    const { saran } = req.body;
    await client.rPush('saran', saran);
    await client.disconnect();
    res.status(200).send('Saran berhasil disimpan!');
  } else {
    res.status(405).end();
  }
}
