import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IDataAPI } from '../../models/idata-api';
import { UserService } from '../../services/user.service';
import { WorkoutsService } from '../../services/workouts.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { catchError } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-mylist',
  standalone: true,
  imports: [CommonModule, CardComponent, NavbarComponent, RouterLink, ToastModule, ButtonModule],
  templateUrl: './mylist.component.html',
  styleUrl: './mylist.component.css'
})
export class MylistComponent {
  list: IDataAPI[] = [];
  listOfExercises: string[] = [];

  addToFavoritesHandler(name: string) {
    this.userService.addToFavorites(name).pipe(
      catchError((error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Exercise already in favorites'});
        return of(null);
      })
    ).subscribe((data) => {
      console.log(data, "data");
    });
  }

  removeFromFavoritesHandler(name: string) {
    this.userService.removeFromFavorites(name).pipe(
      catchError((error) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Exercise not in favorites'});
        return of(null);
      })
    ).subscribe((data) => {
      console.log(data, "deleted");
    });
  }

  constructor(readonly userService: UserService, readonly workoutsService: WorkoutsService, readonly router: Router, readonly messageService: MessageService) {
    this.userService.getFavorites().subscribe((data) => {
      data.forEach((exercise: any) => {
        if (exercise.exercise) {
          this.listOfExercises.push(exercise.exercise);
        }
      });

      // YA FUNCIONA
      this.workoutsService.getFavorites(this.listOfExercises).subscribe((data) => {
        this.list = data.flat();
      });
    });
  }

  visible: boolean = false;

  showConfirm() {
      if (!this.visible) {
          this.messageService.add({ key: 'confirm', sticky: true, severity: 'warn', summary: 'All data will be deleted, are you sure?' });
          this.visible = true;
      }
  }

  onConfirm() {
      this.messageService.clear('confirm');
      this.router.navigate(['/edit-preferences']);
      this.visible = false;
  }

  onReject() {
      this.messageService.clear('confirm');
      this.visible = false;
  }
}
