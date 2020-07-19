import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from "./common/middleware";
import { BicyclesModule } from './bicycles/bicycles.module';
import { BicyclesController } from "./bicycles/bicycles.controller";
import { NotesModule } from "./notes/notes.module";
import { NotesController } from "./notes/notes.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from "./notes/note.entity";

@Module({
    imports: [TypeOrmModule.forRoot(
        {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "notes",
            entities: [Note],
            synchronize: true
        }
    ), BicyclesModule, NotesModule],
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes(BicyclesController, NotesController);
    }
}