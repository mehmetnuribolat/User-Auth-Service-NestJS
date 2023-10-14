import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IBcryptService } from '../../../core/abstracts/bcrypt-service.abstract';

@Injectable()
export class BcryptService implements IBcryptService {
  async compare(password: string, hashPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashPassword);
  }

  async hash(hashString: string): Promise<string> {
    return await bcrypt.hash(hashString, 10);
  }
}
