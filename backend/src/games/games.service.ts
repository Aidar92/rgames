import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game, GameDocument } from './games.model';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { FilesService } from '../files/files.service';
import { User, UserDocument } from '../users/users.model';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    private fileService: FilesService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(dto: CreateGameDto, image, authorId) {
    const filename = await this.fileService.createFile(image);
    const { title, genres, description } = dto;
    const game = new this.gameModel({
      title: JSON.parse(title),
      description: JSON.parse(description),
      genres: JSON.parse(genres),
      image: filename,
      author: authorId,
    });

    await game.populate('genres');
    const user = await this.userModel.findById(authorId);
    const savedGame = await game.save();
    await user.updateOne({
      $push: { games: savedGame._id },
    });
    return game.id;
  }

  async getAll() {
    return await this.gameModel
      .find()
      .populate('genres')
      .populate('author')
      .exec();
  }

  async getById(id: string) {
    return await this.gameModel.findById(id).exec();
  }
}
