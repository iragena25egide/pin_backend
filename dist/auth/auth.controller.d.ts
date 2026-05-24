import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import("../entities/user.entity").UserRole.ADMIN | import("../entities/user.entity").UserRole.EDITOR;
            avatar: string | undefined;
        };
    }>;
}
