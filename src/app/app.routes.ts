import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardcomponentComponent } from './dashboardcomponent/dashboardcomponent.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
  path: 'login',
  component: LoginComponent
},
{
  path: 'dashboard',
  component: DashboardcomponentComponent,canActivate: [AuthGuard]
},
  { path: 'login/oidc/callback', component: CallbackComponent },

];
