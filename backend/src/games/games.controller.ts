import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('api/games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() dto: CreateGameDto, @UploadedFile() image, @Request() req) {
    return this.gamesService.create(dto, image, req.user.id);
  }

  @Get()
  getAll() {
    return this.gamesService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.gamesService.getById(id);
  }
}
