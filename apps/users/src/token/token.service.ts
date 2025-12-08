import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '@libs/constants';
import { JsonWebTokenError, JwtService } from '@nestjs/jwt';
import { TokenDto } from '@libs/contracts/token/token.dto';
import { JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  private refreshSecret = jwtConstants.refresh_secret
  private accessSecret = jwtConstants.access_secret
  constructor(
    private jwtService: JwtService,
  ) { }
  async verifyRefreshToken(token: string): Promise<TokenDto> {
    return await this.jwtVerify(token, this.accessSecret);
  }
  async verfiftyRefreshToken(token: string): Promise<TokenDto> {
    return await this.jwtVerify(token, this.refreshSecret)
  }
  async createRefreshToken(dataToken: TokenDto): Promise<string> {
    return await this.createToken(dataToken, "24d", this.refreshSecret)
  }
  async createAccessToken(dataToken: TokenDto): Promise<string> {
    return await this.createToken(dataToken, "24h", this.accessSecret)
  }
  //  
  private async createToken(dataToken: TokenDto, time: string, secret: string): Promise<string> {
    const payload = {
      name: dataToken.name,
      id: dataToken.id,
      role: dataToken.role,
    };
    const token = this.jwtService.sign(
      payload as object,
      {
        secret: secret,
        expiresIn: time,
      } as JwtSignOptions,
    );
    return token
  }
  private async jwtVerify(token: string, secret: string): Promise<TokenDto> {
    try {
      const payload = await this.jwtService.verifyAsync<TokenDto>(token, {
        secret: secret
      })
      return payload
    } catch (e) {
      throw new JsonWebTokenError('Invalid refresh token');
    }
  }
}
