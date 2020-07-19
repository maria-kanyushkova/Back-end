import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    description: string;
}