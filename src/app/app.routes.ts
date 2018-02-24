import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';

export const router: Routes = [
    { path: '', component: SignUpComponent },
    { path: 'signup', component: SignUpComponent }
    //{ path: 'members', component: MembersComponent, canActivate: [AuthGuard] }

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);