import { Component, Input } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CardComponent } from "../../components/card/card.component";
import { IDataAPI } from '../../models/idata-api';
import { WorkoutsService } from '../../services/workouts.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CardModule, ButtonModule, CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  list: IDataAPI[] = [];
  links = { name: 'Home', link: '/' }
  button = { name: 'Log Out', link: '/login' }

  constructor(private workoutsService: WorkoutsService) {
    const preferences = JSON.parse(localStorage.getItem('preferences') || '[]');
    console.log(preferences);
    this.workoutsService.getExercises(preferences).subscribe((data) => {
      this.list = data.flat();
      console.log("Soy la data", data);
      console.log("Soy la lista", this.list);
    });
  }
}
