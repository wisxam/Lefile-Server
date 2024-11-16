export interface JwtPayload {
  sub: number;
  email: string;
}

export interface UserWithoutPassword {
  userId: number;
  email: string;
  username: string;
}
