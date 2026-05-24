import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true, nullable: true })
  slug?: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'text', nullable: true })
  excerpt?: string;

  @Column({ nullable: true })
  author?: string;

  @Column({ nullable: true })
  image?: string;

  @Column("simple-array", { nullable: true })
  category?: string[];

  @Column({ default: 0 })
  views: number;

  @Column({ default: false })
  is_sponsored: boolean;

  @Column({ default: false })
  is_featured: boolean;

  @CreateDateColumn()
  created_at: Date;
}
