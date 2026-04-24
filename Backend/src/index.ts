import express from 'express';
import cors from 'cors';
import { db } from './db/connection.js';
import { news } from './db/schema.js';
import { eq } from 'drizzle-orm';

const app = express();
app.use(cors());
app.use(express.json());

// 1. LISTAR TODAS AS NOTÍCIAS
app.get('/noticias', async (req, res) => {
  try {
    const allNews = await db.select().from(news);
    res.json(allNews);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notícias" });
  }
});

// 2. CRIAR UMA NOTÍCIA
app.post('/noticias', async (req, res) => {
  try {
    const body = req.body;
    const result = await db.insert(news).values({
      coin: body.coin,
      headline: body.headline,
      content: body.content,
      sentiment: body.sentiment,
      source: body.source,
    }).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar notícia" });
  }
});

// 3. ATUALIZAR UMA NOTÍCIA
app.put('/noticias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updated = await db.update(news)
      .set(body)
      .where(eq(news.id, Number(id)))
      .returning();
    res.json(updated[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar" });
  }
});

// 4. DELETAR UMA NOTÍCIA
app.delete('/noticias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(news).where(eq(news.id, Number(id)));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar" });
  }
});

const PORT = 4000; // Mude de 3000 para 4000
app.listen(PORT, '0.0.0.0', () => { // Adicione o '0.0.0.0' para garantir
  console.log(`🚀 Server rodando em http://localhost:${PORT}`);
});