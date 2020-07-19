import { Injectable } from '@nestjs/common';
import { IBicycle } from "./interfaces";

@Injectable()
export class BicyclesService {
    private readonly bicycles: IBicycle[] = [];

    create(bicycle: IBicycle) {
        this.bicycles.push(bicycle);
    }

    findAll(): IBicycle[] {
        return this.bicycles;
    }

    findOne(id: Number): IBicycle {
        return this.bicycles.find((bicycle: IBicycle) => bicycle.id == id)
    }
}