import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

let isRefreshing = false;
const refreshDone$ = new BehaviorSubject<boolean>(false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.accessToken;
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        return handle401(auth, router, authReq, next);
      }
      return throwError(() => err);
    })
  );
};

function handle401(
  auth: AuthService,
  router: Router,
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = false;
    refreshDone$.next(false);
    return auth.refresh().pipe(
      switchMap(() => {
        isRefreshing = false;
        refreshDone$.next(true);

        const newToken = auth.accessToken;
        const newReq = newToken ? req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }) : req;

        return next(newReq);
      }),
      catchError((err) => {
        isRefreshing = false;
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  } else {
    return refreshDone$.pipe(
      filter((done) => done === true),
      take(1),
      switchMap(() => {
        const newToken = auth.accessToken;
        const newReq = newToken ? req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } }) : req;
        return next(newReq);
      })
    );
  }
}
