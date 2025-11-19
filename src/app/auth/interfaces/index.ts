export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SingUpRequest {
  user: User;
  password: string;
}

export interface AuthRespense {
  accessToken: string;
  user: User;
}

export interface ApiRespense<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}
