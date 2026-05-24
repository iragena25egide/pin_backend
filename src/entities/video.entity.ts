import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true, nullable: true })
  slug?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ nullable: true })
  video_url?: string;

  @Column({ nullable: true })
  youtube_video_id?: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column({ default: 'upload' })
  type: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: false })
  is_live: boolean;

  @CreateDateColumn()
  created_at: Date;
}
