import { AuthService } from './../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(readonly authservice: AuthService, readonly router: Router, readonly userService: UserService, readonly messageService: MessageService) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email or password' });
  }

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email ?? '';
      const password = this.loginForm.value.password ?? '';
      this.authservice.login(email, password).subscribe({
        next: (data) => {
          if(data) {
            console.log(data, "login");
            this.userService.setIduser(data.token.iduser);
            console.log("login iduser", data.token.iduser);
            this.authservice.setIsLogged(true);
            this.router.navigate(['/home']);
          }
        },
        error: (error) => {
          console.error('Error en el login:', error);
        }
      });
    } else {
      this.showError();
    }
  }
}
