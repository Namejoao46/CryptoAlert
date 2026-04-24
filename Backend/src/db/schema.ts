import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const news = sqliteTable('news', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  coin: text('coin').notNull(),          // Ex: BTC, ETH
  headline: text('headline').notNull(),  // Manchete
  content: text('content').notNull(),    // Conteúdo da notícia
  sentiment: text('sentiment').notNull(), // 'up' (alta), 'down' (baixa), 'neutral'
  source: text('source').notNull(),      // Fonte da notícia
  createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => new Date()),
});