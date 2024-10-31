import { AuthService } from './../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(readonly authservice: AuthService, readonly router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email ?? '';
      const password = this.loginForm.value.password ?? '';
      this.authservice.login(email, password).subscribe({
        next: (res) => {
          if(res.user) {
            this.authservice.isLoggedIn = true;
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.error('Error en el login:', error);
        }
      });
    }
  }
}
