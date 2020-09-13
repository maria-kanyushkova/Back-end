import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DateUtils } from "typeorm/util/DateUtils";

@Entity()
export class Note {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('text')
    description: string;

    @Column({
        type: 'date',
        transformer: {
            from(value: string): Date {
                return DateUtils.mixedDateToDate(value)
            },
            to(value: Date): string {
                return value.toDateString()
            }
        }
    })
    date: Date;
}