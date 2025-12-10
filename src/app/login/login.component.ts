import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private router: Router) {}
  
ngOnInit(): void {
  const user = localStorage.getItem("user");
    if (user) {
      this.router.navigate(['/dashboard']); 
    }
}
  loginWithInfisign() {
    const transactionId = Date.now();
    const state = crypto.randomUUID();

    const url =
      `${environment.baseUrl}/sso/verify?tenantId=${environment.tenantId}` +
      `&authType=OpenID` +
      `&type=OpenID` +
      `&urlIdentifier=${environment.urlIdentifier}` +
      `&client_id=${environment.clientId}` +
      `&scope=openid+email` +
      `&redirect_uri=${environment.redirectUri}` +
      `&transactionid=${transactionId}` +
      `&state=${state}`+
      `&response_type=code` +
      `&response_mode=query`;

    window.location.href = url;
  }
      
}
