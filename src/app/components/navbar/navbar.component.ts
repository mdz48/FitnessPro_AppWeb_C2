import { Component, Input } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
@Input() link = {
  name: '',
  link: ''
}
@Input() button = {
  name: '',
  link: ''
}

  constructor(readonly authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
