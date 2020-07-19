import { Body, Controller, Delete, Get, Param, Post, Put, HttpException, HttpStatus, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBicycleDto, UpdateBicycleDto } from "./dto";
import { IBicycle } from './interfaces';
import { BicyclesService } from "./bicycles.service";
import { ForbiddenException } from 'src/common/exception';
import { HttpExceptionFilter } from "../common/filter";
import { JoiValidationPipe, ParseIntPipe } from 'src/common/pipe';

@Controller('bicycles')
@UseFilters(HttpExceptionFilter)
export class BicyclesController {
    constructor(private bicyclesService: BicyclesService) {
    }

    // @Get()
    // async findAll() {
    //     throw new HttpException({
    //         status: HttpStatus.FORBIDDEN,
    //         error: 'This is a custom message',
    //     }, HttpStatus.FORBIDDEN);
    // }

    @Get()
    async findAll(): Promise<IBicycle[]> {
        return this.bicyclesService.findAll();
    }

    // @Get()
    // async findAll(
    //     @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
    //     @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    // ) {
    //     return this.catsService.findAll({ activeOnly, page });
    // }


    @Get(':id')
    findOne(@Param('id', new ParseIntPipe()) id) {
        return this.bicyclesService.findOne(id);
    }

    // @Get(':id')
    // async findOne(@Param('id', new ParseUUIDPipe()) id) {
    //     return this.bicyclesService.findOne(id);
    // }

    // @Get(':id')
    // findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
    //     return userEntity;
    // }

    @Post()
    @UsePipes(new ValidationPipe())
    async create(@Body() createBicycleDto: CreateBicycleDto) {
        await this.bicyclesService.create(createBicycleDto)
        // throw new ForbiddenException();
    }

    // @Post()
    // async create(@Body() createBicycleDto: CreateBicycleDto) {
    //     await this.bicyclesService.create(createBicycleDto)
    // }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateBicycleDto: UpdateBicycleDto) {
        return updateBicycleDto;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}
