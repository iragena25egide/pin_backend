import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Video } from './entities/video.entity';
import { Comment } from './entities/comment.entity';
import { Ad } from './entities/ad.entity';
import { Like } from './entities/like.entity';
import { Subscriber } from './entities/subscriber.entity';
import { ContactMessage } from './entities/contact-message.entity';
import { AnalyticsEvent } from './entities/analytics-event.entity';

// Load .env variables
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const useUrl = !!process.env.DATABASE_URL;
// Strip sslmode from the URL so it doesn't override our manual ssl config
const safeDbUrl = useUrl ? (process.env.DATABASE_URL || '').replace(/\?sslmode=.*$/, '') : '';

export const AppDataSource = new DataSource({
  type: 'postgres',

  // DATABASE CONNECTION (Neon OR Local)
  ...(useUrl
    ? {
        url: safeDbUrl,
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),

  // SSL CONFIG — rejectUnauthorized:false is sufficient for Supabase pooler
  // uselibpqcompat=true in the DATABASE_URL handles the sslmode behaviour
  ssl: useUrl ? { rejectUnauthorized: false } : false,

  // Limit connection pool to prevent max connection errors on free tier databases (e.g. Railway)
  // Also pass ssl config deeply to the underlying pg driver
  extra: {
    max: 5,
    ssl: useUrl ? { rejectUnauthorized: false } : false,
  },

  synchronize: false, // NEVER use true in production
  logging: !isProduction,

  entities: [User, Post, Video, Comment, Ad, Like, Subscriber, ContactMessage, AnalyticsEvent],

  migrations: [__dirname + '/migrations/*{.ts,.js}'],

  subscribers: [],
});
