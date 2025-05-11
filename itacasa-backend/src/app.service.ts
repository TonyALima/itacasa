import { Injectable } from '@nestjs/common';
import { version } from '../package.json'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Itacasa API is running!';
  }

  healthCheck(): { status: string } {
    return { status: 'ok' };
  }

  getVersion(): { version: string } {
    return { version };
  }
}
