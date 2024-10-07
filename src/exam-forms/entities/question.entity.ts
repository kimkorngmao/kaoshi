import { Exam } from 'src/exams/entities/exam.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Answer } from './answer.entity';

@Entity('questions')
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ default: 'text' }) // 'text' (for short answers) or 'multiple-choice'
    type: string;

    @Column('simple-array', { nullable: true }) // For multiple-choice questions (comma-separated values)
    options?: string[];

    @ManyToOne(() => Exam, exam => exam.questions, { onDelete: 'CASCADE' })
    exam: Exam;

    @OneToMany(()=> Answer, answer => answer.question)
    answers: Answer[]
}
