import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.is_active) {
      throw new UnauthorizedException('Account disabled');
    }

    // Since passwords might be from the old system, in a real migration
    // you might need a custom hash check, but we assume bcrypt here.
    const isMatch = await bcrypt.compare(pass, user.password || '');
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Only allow admins and editors to login here
    if (user.role !== UserRole.ADMIN && user.role !== UserRole.EDITOR) {
      throw new UnauthorizedException('Access denied. Admin or Editor only.');
    }

    const payload = { email: user.email, sub: user.id, role: user.role };
    
    // Update last login
    user.last_login = new Date();
    await this.usersRepository.save(user);

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }
    };
  }
}
