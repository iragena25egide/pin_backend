import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('subscribers')
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  subscribed_at: Date;
}
