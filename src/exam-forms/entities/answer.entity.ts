import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  student: User;

  @ManyToOne(() => Question, { onDelete: 'CASCADE' })
  question: Question;

  @Column()
  answer: string;

  @Column({ type: 'float', nullable: true }) 
  grade: number;

  get questionId(): number {
    return this.question.id;
  }
}
