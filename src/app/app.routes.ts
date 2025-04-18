import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
];
