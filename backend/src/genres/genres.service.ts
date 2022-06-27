import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from './genres.model';
import { CreateGenreDto } from './dto/create-genre.dto';
import { Model } from 'mongoose';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<GenreDocument>,
  ) {}

  async create(dto: CreateGenreDto) {
    return await this.genreModel.create(dto);
  }

  async getAll() {
    return await this.genreModel.find().populate('games').exec();
  }
}
