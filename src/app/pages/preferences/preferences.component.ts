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
  constructor(private router: Router, private workoutsService: WorkoutsService) {}
  exercises = [
    {
      name: 'Back',
      id: 0
    },
    {
      name: 'Cardio',
      id: 1
    },
    {
      name: 'Chest',
      id: 2
    },
    {
      name: 'Lower Arms',
      id: 3
    },
    {
      name: 'Lower Legs',
      id: 4
    },
    {
      name: 'Neck',
      id: 5
    },
    {
      name: 'Shoulders',
      id: 6
    },
    {
      name: 'Upper Arms',
      id: 7
    },
    {
      name: 'Upper Legs',
      id: 8
    },
    {
      name: 'Waist',
      id: 9
    }
  ];
  selectedExercises: number[] = [];
  preferencesForm = new FormGroup({
    weight: new FormControl(0, [Validators.required]),
    height: new FormControl(0, [Validators.required]),
  });
  
  exerciseForm = new FormGroup({
    exercises: new FormControl(this.selectedExercises, [Validators.required, Validators.minLength(1)])
  });
  savePreferences() {
    console.log(this.preferencesForm.value);
    console.log(this.exerciseForm.value);
    if (this.preferencesForm.valid && this.exerciseForm.valid) {
      console.log('Preferences saved');
      this.workoutsService.getExercises().subscribe((data) => {
        console.log(data);
      });
      this.router.navigate(['/home']);
    }
  }
}
