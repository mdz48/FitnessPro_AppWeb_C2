import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'preferences', component: PreferencesComponent, canActivate: [authGuard] },
];
