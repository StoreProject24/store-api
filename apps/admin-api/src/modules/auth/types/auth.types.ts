export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  urlImage: string;
  role: string;
  phone: string;
  otpCode?: string;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  name: string;
  phone: string;
  email: string;
  password: string;
  urlImage: string;
}

export interface UserRefreshToken {
  id: number;
  email: string;
  name: string;
  rol: string;
  statusId: number;
}
