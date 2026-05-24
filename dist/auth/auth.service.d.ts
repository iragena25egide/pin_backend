import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    login(email: string, pass: string): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: UserRole.ADMIN | UserRole.EDITOR;
            avatar: string | undefined;
        };
    }>;
}
