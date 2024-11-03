import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService, readonly router: Router, private messageService: MessageService) {}
  registerForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  register() {
    console.log(this.registerForm.value);
    if(this.registerForm.valid){
      this.authService.getUserByMail(this.registerForm.value.mail ?? '').subscribe((data) => {
        console.log(data);
        if(data == null){
          const email = this.registerForm.value.mail ?? '';
          const password = this.registerForm.value.password ?? '';
          this.authService.setRegistrationData(email, password);
          this.router.navigate(['/preferences']);
        } else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'User already exists'});
        }
      });
    }
  }
}
