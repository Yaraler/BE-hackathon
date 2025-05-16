import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '@libs/constants';

@Injectable()
export class RoleStrategy {
  constructor() { };

  async validate(payload: any) { return true }
}
