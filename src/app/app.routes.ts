import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { StarterComponent } from './starter/starter.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboard2Component } from './admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './admin/admin-dashboard1/admin-dashboard1.component';

export const router: Routes = [
    { path: '', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'reset', component: ResetPasswordComponent },
    { path: 'dashboard', canActivate: [AuthGuard], redirectTo: 'starter', pathMatch: 'full' },
    { path: 'starter', component: StarterComponent },
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);

