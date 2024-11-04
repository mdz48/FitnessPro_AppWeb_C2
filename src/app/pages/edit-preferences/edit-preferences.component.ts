import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../auth/auth.service';
import { WorkoutsService } from '../../services/workouts.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-preferences',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CheckboxModule, CommonModule, NavbarComponent],
  templateUrl: './edit-preferences.component.html',
  styleUrl: './edit-preferences.component.css'
})
export class EditPreferencesComponent implements OnInit {
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
  editPreferencesForm: FormGroup;
  constructor(readonly workoutsService: WorkoutsService, readonly authService: AuthService, readonly userService: UserService, readonly router: Router, readonly messageService: MessageService) {
    this.editPreferencesForm = new FormGroup({
      exercises: new FormControl([], [Validators.required, Validators.minLength(1)]),
    });
  } 

  ngOnInit(): void {
    this.getAllChecked();
  }

  getAllChecked(){
    this.userService.getPreferences().subscribe((data) => {
        if (data) {
            this.editPreferencesForm.patchValue({
                exercises: data.map((item: any) => item.exercise)
            });
        } else {
            console.error('No se encontraron preferencias de ejercicios.');
        }
    }, error => {
        console.error('Error al obtener las preferencias:', error);
    });
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Preferences saved successfully' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Choose at least one target muscle' });
  }

  savePreferences() {
    if(this.editPreferencesForm.valid){
      const relation = this.editPreferencesForm.value.exercises;
      this.userService.savePreferences(relation).subscribe((res) => {
        console.log(res);
      if(res){
        this.showSuccess();
        this.router.navigate(['/home']);
        } else {
          this.showError();
        }
      });
    } else {
      this.showError();
    }
  }
}
