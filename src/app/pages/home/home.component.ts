import { Component, Input } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from "../../components/card/card.component";
import { IDataAPI } from '../../models/idata-api';
import { WorkoutsService } from '../../services/workouts.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../services/user.service';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CardModule, ButtonModule, CardComponent, CommonModule, RouterLink, ToastModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  list: IDataAPI[] = [];
  listOfExercises: string[] = [];

  addToFavoritesHandler(name: string) {
    this.userService.addToFavorites(name).pipe(
      catchError((error) =>  {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Exercise already in favorites' });
        return of(null);
      })
    ).subscribe((data: any) => {
      if(data){
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exercise added to favorites' });
      }
    });
  }

  removeFromFavoritesHandler(name: string) {
    this.userService.removeFromFavorites(name).pipe(
      catchError((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Exercise not in favorites' });
        return of(null); 
      })
    ).subscribe((data: any) => {
      if (data && data.message) {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Exercise removed from favorites' });
      } 
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


  constructor(readonly workoutsService: WorkoutsService, readonly authService: AuthService, readonly userService: UserService, readonly router: Router, readonly messageService: MessageService) {
    const iduser = this.userService.getIduser();
    this.authService.getUserExercices(iduser || 1).subscribe((data) => {
      data.forEach((exercise: any) => {
        if (exercise.exercise) {
          this.listOfExercises.push(exercise.exercise);
        }
      });
      console.log(this.listOfExercises, "listOfExercises");

      // YA FUNCIONA
      // this.workoutsService.getExercises(this.listOfExercises).subscribe((data) => {
      //   this.list = data.flat();
      // });
    });
    
    // this.workoutsService.getExercises(preferences).subscribe((data) => {
    //   this.list = data.flat();
    // });
    // LIST EXAMPLE, NO API DATA
    this.list = [
      { id: 0, name: 'back lever', gifUrl: 'assets/yo4yGTLzSbR5ix.gif', equipment: 'body weight', target: 'upper back' },
      { id: 1, name: 'Exercise 2', gifUrl: 'assets/yo4yGTLzSbR5ix.gif', equipment: 'Equipment 2', target: 'Target 2' },
      { id: 2, name: 'Exercise 3', gifUrl: 'assets/yo4yGTLzSbR5ix.gif', equipment: 'Equipment 3', target: 'Target 3' },
    ];
  }
}
