import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Label } from './Label';
import { Tracking } from './Tracking';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  taskId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => Label, label => label.tasks, { nullable: true })
  @JoinTable()
  labels: Promise<Label[]>;

  @OneToMany(() => Tracking, tracking => tracking.task)
  trackings: Promise<Tracking[]>;
}