import { Routes } from '@angular/router';
import { UserAuthComponent } from './componets/userauth/userauth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: "",
    redirectTo: 'login',
    pathMatch: "full"
  }, 
  {
    path: 'login',
    component: UserAuthComponent,
    data: { type: 'login' },
  },
  {
    path: 'sing up',
    component: UserAuthComponent,
    data: { type: 'sing up' },
  },
];
