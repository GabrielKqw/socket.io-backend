import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthGuard } from './auth/auth.guard';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ChatModule,
  ],
  
  controllers: [UserController],
  providers: [UserService, PrismaService, AuthService, JwtStrategy, AuthGuard,],
})
export class AppModule {}
