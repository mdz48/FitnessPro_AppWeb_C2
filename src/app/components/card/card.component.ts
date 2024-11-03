import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDataAPI } from '../../models/idata-api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() exercise: IDataAPI = {
    id: 0,
    gifUrl: '',
    name: '',
    equipment: '',
    target: '',
  };

  @Output() addToFavorites = new EventEmitter<string>();
  @Output() removeFromFavorites = new EventEmitter<string>();

  addToFavoritesHandler() {
    this.addToFavorites.emit(this.exercise.name);
  }

  removeFromFavoritesHandler() {
    this.removeFromFavorites.emit(this.exercise.name);
  }

  constructor(readonly router: Router, private authService: AuthService) {}

  logout() {
    this.authService.setIsLogged(false);
    this.router.navigate(['/login']);
  }
}
