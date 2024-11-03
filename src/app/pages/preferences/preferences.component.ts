import { WorkoutsService } from './../../services/workouts.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [InputNumberModule, CommonModule, CheckboxModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {
  preferencesForm: FormGroup;
  constructor(
    readonly router: Router,
    private workoutsService: WorkoutsService,
    readonly authService: AuthService,
    readonly userService: UserService
  ) {
    this.preferencesForm = new FormGroup({
      weight: new FormControl(0, [Validators.required]),
      height: new FormControl(0, [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      exercises: new FormControl([], [Validators.required, Validators.minLength(1)])
    });
  }
  exercises = [
    {
      name: 'Abductors',
      id: 'abductors'
    },
    {
      name: 'Abs',
      id: 'abs'
    },
    {
      name: 'Adductors',
      id: 'adductors'
    },
    {
      name: 'Biceps',
      id: 'biceps'
    },
    {
      name: 'Calves',
      id: 'calves'
    },
    {
      name: 'CardioVascular System',
      id: 'cardiovascular system'
    },
    {
      name: 'Delts',
      id: 'delts'
    },
    {
      name: 'Forearms',
      id: 'forearms'
    },
    {
      name: 'Glutes',
      id: 'glutes'
    },
    {
      name: 'Hamstrings',
      id: 'hamstrings'
    },
    {
      name: 'Lats',
      id: 'lats'
    },
    {
      name: 'Levator Scapulae',
      id: 'levator scapulae'
    },
    {
      name: 'Pectorals',
      id: 'pectorals'
    },
    {
      name: 'Quads',
      id: 'quads'
    },
    {
      name: 'Serratus Anterior',
      id: 'serratus anterior'
    },
    {
      name: 'Spine',
      id: 'spine'
    },
    {
      name: 'Traps',
      id: 'traps'
    },
    {
      name: 'Triceps',
      id: 'triceps'
    },
    {
      name: 'Upper Back',
      id: 'upper back'
    }
  ];

  savePreferences() {
    if (this.preferencesForm.valid) {
      const registrationData = this.authService.getRegistrationData();
      if (!registrationData) {
        console.error('No hay datos de registro');
        return;
      }      
      this.authService.register(
        registrationData.email,
        registrationData.password,
        this.preferencesForm.value.height,
        this.preferencesForm.value.weight,
        this.preferencesForm.value.sex,
        this.preferencesForm.value.exercises
      ).subscribe({
        next: (data) => {
          this.userService.setIduser(data.iduser);
          this.authService.setIsLogged(true);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error en el registro:', error);
        }
      });
    }
  }
}
