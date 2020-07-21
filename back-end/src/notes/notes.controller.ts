import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from "./dto";
import { INote } from './interfaces';
import { NotesService } from "./notes.service";
import { ForbiddenException } from 'src/common/exception';
import { HttpExceptionFilter } from "../common/filter";
import { JoiValidationPipe, ParseIntPipe } from 'src/common/pipe';
import { Note } from "./note.entity";

@Controller('notes')
@UseFilters(HttpExceptionFilter)
export class NotesController {
    constructor(private notesService: NotesService) {
    }

    // @Get()
    // async findAll() {
    //     throw new HttpException({
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'This is a custom message',
    //     }, HttpStatus.FORBIDDEN);
    // }

    @Get()
    @UsePipes(new ValidationPipe())
    async findAll(): Promise<Note[]> {
        return this.notesService.findAll();
    }

    // @Get()
    // async findAll(
    //     @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
    //     @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    // ) {
    //     return this.catsService.findAll({ activeOnly, page });
    // }


    @Get(':id')
    @UsePipes(new ValidationPipe())
    findOne(@Param('id', new ParseIntPipe()) id) {
        return this.notesService.findOne(id);
    }

    // @Get(':id')
    // async findOne(@Param('id', new ParseUUIDPipe()) id) {
    //     return this.notesService.findOne(id);
    // }

    // @Get(':id')
    // findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
    //     return userEntity;
    // }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createNoteDto: CreateNoteDto) {
        await this.notesService.create(createNoteDto)
        // throw new ForbiddenException();
    }

    // @Post()
    // async create(@Body() createBicycleDto: CreateBicycleDto) {
    //     await this.notesService.create(createBicycleDto)
    // }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
        await this.notesService.update({id, description: updateNoteDto.description, date: updateNoteDto.date});
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        await this.notesService.remove(id);
    }
}
