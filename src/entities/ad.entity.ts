import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

export enum AdPosition {
  HEADER = 'header',
  SIDEBAR = 'sidebar',
  BETWEEN_POSTS = 'between_posts',
  FOOTER = 'footer',
  TOP = 'top',
}

export enum AdType {
  BANNER = 'banner',
  VIDEO = 'video',
  SPONSORED = 'sponsored',
}

@Entity('ads')
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  image_url?: string;

  @Column({ nullable: true })
  video_url?: string;

  @Column({ nullable: true })
  link?: string;

  @Column({
    type: 'enum',
    enum: AdPosition,
    default: AdPosition.SIDEBAR,
  })
  position: AdPosition;

  @Column({
    type: 'enum',
    enum: AdType,
    default: AdType.BANNER,
  })
  type: AdType;

  @Column({ type: 'timestamp', nullable: true })
  start_date?: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date?: Date;

  @Column({ default: 0 })
  clicks: number;

  @Column({ default: 0 })
  impressions: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
