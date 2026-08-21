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
  event_type: string;

  @Column({ type: 'jsonb', nullable: true })
  payload?: any;

  @Column({ nullable: true })
  visitor_id?: string;

  @Column({ nullable: true })
  ip_address?: string;

  @CreateDateColumn()
  created_at: Date;
}
