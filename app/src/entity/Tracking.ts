import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './Task';

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn()
  trackingId: number;

  @Column()
  description: string;

  @Column({ type: "time", default: 0 })
  timeStart: string;

  @Column({ type: "time", default: 0 })
  timeEnd: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Task, task => task.trackings, {onDelete: "CASCADE"})
  task: Task;
}