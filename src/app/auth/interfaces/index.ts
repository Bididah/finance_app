export interface User {
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthRequest {
  user: User;
  password: string;
}

export interface ApiRespense<T> {
  data: T;
  error: string;
  success: boolean;
}
