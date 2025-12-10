import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboardcomponent',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboardcomponent.component.html',
  styleUrl: './dashboardcomponent.component.css'
})
export class DashboardcomponentComponent {
  constructor(private router: Router) {}
logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('access_token');
  this.router.navigate(['/login']);
}
}
