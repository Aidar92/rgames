import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

@Injectable()
export class FilesService {
  async createFile(file): Promise<string> {
    try {
      const filename = uuid.v4() + '.jpg';
      const filepath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath, { recursive: true });
      }
      fs.writeFileSync(path.join(filepath, filename), file.buffer);
      return filename;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Upload file Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
