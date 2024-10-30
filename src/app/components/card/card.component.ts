import { Component, Input } from '@angular/core';
import { IDataAPI } from '../../models/idata-api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

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
}
