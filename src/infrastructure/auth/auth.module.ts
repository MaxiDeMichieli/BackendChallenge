import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/configuration';
import { IAuthService } from 'src/core/abstracts/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  providers: [
    {
      provide: IAuthService,
      useClass: AuthService,
    },
  ],
  exports: [IAuthService],
})
export class AuthModule {}
