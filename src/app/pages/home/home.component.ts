import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CardModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  links = { name: 'Home', link: '/' }
  button = { name: 'Log Out', link: '/login' }
}
