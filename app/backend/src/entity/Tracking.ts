import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './Task';

@Entity()
export class Tracking {
  @PrimaryGeneratedColumn()
  trackingId: number;

  @Column()
  description: string;

  @Column({default: new Date().toString() })
  timeStart: string;

  @Column({default: new Date().toString()})
  timeEnd: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => Task, task => task.trackings, {onDelete: "CASCADE"})
  task: Task;
}