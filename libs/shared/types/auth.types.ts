/**
 * Tipos para autenticación y JWT
 */

export type UserRole = 'ADMIN' | 'USER' | 'ADMINSTORE';

/**
 * Payload de JWT
 */
export interface TokenPayload {
  user: AuthenticatedUser;
  iat: number;
  exp: number;
}

/**
 * Datos del usuario extraídos del token
 */
export interface AuthenticatedUser {
  id: number;
  email: string;
  name: string;
  rol: UserRole;
  statusId: number;
  storeId?: number;
}

/**
 * Request con usuario autenticado
 */
export interface AuthenticatedRequest {
  user: AuthenticatedUser;
}

/**
 * Response de login/register
 */
export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  user?: AuthenticatedUser;
}

/**
 * Credenciales de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Credenciales de registro
 */
export interface RegisterCredentials extends LoginCredentials {
  name: string;
  email: string;
}
