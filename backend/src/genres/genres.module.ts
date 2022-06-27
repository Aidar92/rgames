import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { Genre, GenreSchema } from './genres.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [GenresService],
  controllers: [GenresController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Genre.name,
        schema: GenreSchema,
      },
    ]),
  ],
})
export class GenresModule {}
