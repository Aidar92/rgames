import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { GenresService } from './genres.service';

@Controller('genres')
export class GenresController {
  constructor(private genreService: GenresService) {}
  @Post()
  create(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }

  @Get()
  getAll() {
    return this.genreService.getAll();
  }
}
