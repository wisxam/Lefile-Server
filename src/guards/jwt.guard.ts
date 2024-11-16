import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActive(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['access_token'];

    if (!token) {
      console.error('No token found in cookies');
      return false;
    }

    try {
      const decodeToken = await this.jwtService.verifyAsync(token);
      request.user = decodeToken;
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }

    return super.canActivate(context) as Promise<boolean>;
  }
}
