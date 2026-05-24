import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  post_id?: number;

  @Column({ nullable: true })
  video_id?: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ nullable: true })
  user_id?: number;

  @Column({ default: 'Anonymous' })
  author_name: string;

  @Column({ nullable: true })
  author_email?: string;

  @CreateDateColumn()
  created_at: Date;
}
