import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Task } from './Task'

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  labelId: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => Task, task => task.labels, { nullable: true })
  tasks: Promise<Task[]>;
}