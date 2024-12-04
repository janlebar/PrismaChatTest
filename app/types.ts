export interface BaseUser {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified?: Date | null;  // Make this optional if it's sometimes missing
    image: string | null;
}

export interface ExtendedUser extends BaseUser {
    // role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
}
