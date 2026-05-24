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

// Load .env variables
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const useUrl = !!process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: 'postgres',

  // DATABASE CONNECTION (Neon OR Local)
  ...(useUrl
    ? {
        url: process.env.DB_URL,
      }
    : {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      }),

  // SSL CONFIG (FIXED)
  ssl: useUrl
    ? { rejectUnauthorized: false } // Neon / cloud DB
    : false, // local postgres

  synchronize: false, // NEVER use true in production
  logging: !isProduction,

  entities: [User, Post, Video, Comment, Ad, Like, Subscriber, ContactMessage],

  migrations: ['dist/migrations/*{.js}'],

  subscribers: [],
});
