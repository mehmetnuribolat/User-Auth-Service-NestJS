export interface IJwtAuthPayload {
  userId: string;
  email: string;
  role: string;
}

export interface IJwtAuthResponse {
  userId: string;
  email: string;
  role: string;
  access_token: string;
  refresh_token: string;
}

export interface IJwtTokenValidation {
  userId: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
  access_token: string;
}

export abstract class IJwtAuthService {
  abstract createToken(jwtPayload: IJwtAuthPayload): Promise<IJwtAuthResponse>;
  abstract checkToken(token: string): Promise<any>;
}
