import { Injectable } from '@nestjs/common';
import { INote } from "./interfaces";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from "./note.entity";
import { DateUtils } from "typeorm/util/DateUtils";

type TSortParams = { [n in keyof Pick<Note, 'date' | 'id'>]: 'ASC' | 'DESC' }

@Injectable()
export class NotesService {
    private readonly notes: INote[] = [];

    constructor(
        @InjectRepository(Note)
        private notesRepository: Repository<Note>
    ) {
    }

    async findAll(order: TSortParams): Promise<Note[]> {
        return await this.notesRepository.find({order})
    }

    async findOne(id: string): Promise<Note> {
        console.log(typeof (await this.notesRepository.findOne({where: {id}})).date)
        return await this.notesRepository.findOne({where: {id}})
    }

    async create(note: INote): Promise<void> {
        const entity = new Note()
        entity.description = note.description
        entity.date = DateUtils.mixedDateToDate(note.date)
        await this.notesRepository.save(entity)
    }

    update(note: INote) {
        const index = this.notes.findIndex((notes: INote) => notes.id == note.id);
        this.notes[index] = note;
    }

    async remove(id: string): Promise<void> {
        await this.notesRepository.delete(id);
    }
}