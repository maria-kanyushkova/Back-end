import { Injectable } from '@nestjs/common';
import { INote } from "./interfaces";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from "./note.entity";

@Injectable()
export class NotesService {
    private readonly notes: INote[] = [];

    constructor(
        @InjectRepository(Note)
        private notesRepository: Repository<Note>
    ) {
    }

    async findAll(): Promise<Note[]> {
        return await this.notesRepository.find();
    }

    findOne(id: string): Promise<Note> {
        return this.notesRepository.findOne({where: {id}})
    }

    async create(note: INote): Promise<void> {
        const entity = new Note()
        entity.description = note.description
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