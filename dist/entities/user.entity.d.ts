export declare enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    USER = "user"
}
export declare class User {
    id: number;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    bio?: string;
    role: UserRole;
    is_active: boolean;
    has_changed_credentials: boolean;
    last_login?: Date;
    password_reset_token?: string;
    password_reset_expires?: Date;
    created_at: Date;
    updated_at: Date;
}
