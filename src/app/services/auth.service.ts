import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { AuthRespense, LoginRequest, SingUpRequest, User } from '../auth/interfaces';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

export interface AuthUser {
  id: string;
  email: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly BASE_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private storage: StorageService, private router: Router) {
    const token = this.storage.getString(this.ACCESS_TOKEN_KEY);
    if (token) {
      this.fetchMe().subscribe(
        (user) => (this.currentUser = user),
        (error) => this.clearAuth()
      );
    }
  }

  private _currentUserSubject = new BehaviorSubject<User | null>(null);

  get currentUser$(): Observable<User | null> {
    return this._currentUserSubject.asObservable();
  }

  set currentUser(user: User | null) {
    this._currentUserSubject.next(user);
  }

  get accessToken(): string | undefined {
    return this.storage.getString(this.ACCESS_TOKEN_KEY);
  }

  public login(request: LoginRequest): Observable<AuthRespense> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<AuthRespense>(`${this.BASE_URL}/auth/login`, request, { headers, withCredentials: true })
      .pipe(
        tap(({ accessToken, user }) => {
          this.storage.setString(this.ACCESS_TOKEN_KEY, accessToken);
          this.currentUser = user;
        }),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  public register(request: SingUpRequest): Observable<AuthRespense> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<AuthRespense>(
        `${this.BASE_URL}/auth/register`,
        { ...request.user, password: request.password },
        { headers, withCredentials: true }
      )
      .pipe(
        tap(({ accessToken, user }) => {
          this.storage.setString(this.ACCESS_TOKEN_KEY, accessToken);
          this.currentUser = user;
        }),
        catchError((error) => {
          console.log(error);
          return EMPTY;
        })
      );
  }

  public refresh(): Observable<{ accessToken: string }> {
    return this.http
      .post<{ accessToken: string }>(
        `${this.BASE_URL}/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(tap((res) => this.storage.setString(this.ACCESS_TOKEN_KEY, res.accessToken)));
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${this.BASE_URL}/auth/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.clearAuth();
        this.router.navigate(['/login']);
      })
    );
  }

  public fetchMe(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/auth/me`);
  }

  private clearAuth() {
    this.storage.removeItem(this.ACCESS_TOKEN_KEY);
    this.currentUser = null;
  }

  isLoggedIn(): boolean {
    return !!this.storage.getString(this.ACCESS_TOKEN_KEY);
  }
}
