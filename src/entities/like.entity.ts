import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  post_id?: number;

  @Column({ nullable: true })
  video_id?: number;

  @Column({ nullable: true })
  comment_id?: number;

  @Column({ nullable: true })
  user_id?: number;

  @CreateDateColumn()
  created_at: Date;
}
