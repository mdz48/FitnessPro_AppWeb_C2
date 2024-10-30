import { WorkoutsService } from './../../services/workouts.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferences',
  standalone: true,
  imports: [InputNumberModule, CommonModule, CheckboxModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent {
  preferencesForm: FormGroup;
  constructor(private router: Router, private workoutsService: WorkoutsService) {
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
      id: 'cardio'
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
      localStorage.setItem('preferences', JSON.stringify(this.preferencesForm.value.exercises));
      this.router.navigate(['/home']);
    }
  }
}
