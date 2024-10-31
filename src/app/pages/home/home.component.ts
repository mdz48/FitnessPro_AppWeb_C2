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
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CardModule, ButtonModule, CardComponent, CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  list: IDataAPI[] = [];
  listOfExercises: string[] = [];
  links = { name: 'Home', link: '/' }
  button = { name: 'Log Out', link: '/login' }

  constructor(private workoutsService: WorkoutsService, readonly authService: AuthService, readonly userService: UserService) {
    const iduser = this.userService.getIduser();
    this.authService.getUserExercices(iduser || 1).subscribe((data) => {
      console.log(data, "home data");
      data.forEach((exercise: any) => {
        if (exercise.exercise) {
          this.listOfExercises.push(exercise.exercise);
        }
      });
      console.log(this.listOfExercises, "listOfExercises");
      this.workoutsService.getExercises(this.listOfExercises).subscribe((data) => {
        this.list = data.flat();
      });
    });
    
    // this.workoutsService.getExercises(preferences).subscribe((data) => {
    //   this.list = data.flat();
    // });
    // LIST EXAMPLE, NO API DATA
    // this.list = [
    //   { id: 1, name: 'Exercise 1', gifUrl: 'assets/yo4yGTLzSbR5ix.gif', equipment: 'Equipment 1', target: 'Target 1' },
    //   { id: 2, name: 'Exercise 2', gifUrl: 'assets/yo4yGTLzSbR5ix.gif', equipment: 'Equipment 2', target: 'Target 2' },
    //   { id: 3, name: 'Exercise 3', gifUrl: 'assets/yo4yGTLzSbR5ix.gif', equipment: 'Equipment 3', target: 'Target 3' },
    // ];
  }
}
