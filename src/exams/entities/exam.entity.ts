import { Question } from 'src/exam-forms/entities/question.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('exams')
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ type: 'datetime' })
  endTime: Date;

  @ManyToOne(() => User, user => user.examsCreated, { eager: true })
  teacher: User;

  @ManyToMany(() => User, { eager: true })
  @JoinTable()
  enrolledStudents: User[];

  @OneToMany(() => Question, question => question.exam, { eager: true }) // Exam has many questions
  questions: Question[];
}
