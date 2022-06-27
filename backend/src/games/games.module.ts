import { forwardRef, Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './games.model';
import { FilesModule } from '../files/files.module';
import { AuthModule } from '../auth/auth.module';
import { User, UserSchema } from '../users/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    FilesModule,
    forwardRef(() => AuthModule),
  ],
  providers: [GamesService],
  controllers: [GamesController],
})
export class GamesModule {}
