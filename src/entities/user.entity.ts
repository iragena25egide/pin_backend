import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.ADMIN,
  })
  role: UserRole;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  has_changed_credentials: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_login?: Date;

  @Column({ nullable: true })
  password_reset_token?: string;

  @Column({ type: 'timestamp', nullable: true })
  password_reset_expires?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
