import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('analytics_events')
export class AnalyticsEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_type: string; // e.g., 'page_view', 'story_click'

  @Column({ type: 'jsonb', nullable: true })
  payload?: any; // e.g., { storyId: 123, path: '/story/my-story' }

  @Column({ nullable: true })
  visitor_id?: string; // UUID to identify unique visitors anonymously

  @Column({ nullable: true })
  ip_address?: string; // Optional: store IP address if needed

  @CreateDateColumn()
  created_at: Date;
}
