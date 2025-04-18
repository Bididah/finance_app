import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import {
  ApiRespense,
  AuthRespense,
  LoginRequest,
  SingUpRequest,
  User,
} from '../auth/interfaces';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private storage: StorageService) {}

  login(request: LoginRequest): Observable<User> {
    return this.http
      .post<ApiRespense<AuthRespense>>(`${this.BASE_URL}/auth/login`, request)
      .pipe(
        map(({ data, error, success }) => {
          if (success && data) {
            this.storage.setString('token', data.token);
            return data.user;
          } else {
            throw new Error(error!);
          }
        })
      );
  }

  register(request: SingUpRequest): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<ApiRespense<AuthRespense>>(
        `${this.BASE_URL}/auth/register` ,
        { ...request.user, password: request.password },
        { headers }
      )
      .pipe(
        map(({ data, error, success }) => {
          if (success && data) {
            this.storage.setString('token', data.token);
            return data.user;
          } else {
            throw new Error(error!);
          }
        })
      );
  }
}
