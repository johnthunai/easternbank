import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: ` 
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="flex flex-col items-center space-y-4">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p class="text-gray-700 text-lg font-medium">Processing your login...</p>
    </div>
  </div>`
})
export class CallbackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const code = this.route.snapshot.queryParamMap.get('code');
    if (!code) return;
    this.exchangeCodeForToken(code);
  }

  exchangeCodeForToken(code: string) {
    const body = new FormData();
    body.append("client_id", environment.clientId);
    body.append("code", code);
    body.append("scope", "openid email");  // FIXED
    body.append("client_secret", environment.clientSecret);
    body.append("grant_type", "authorization_code");
    body.append("redirect_uri", environment.redirectUri);

    this.http.post(environment.accessTokenApiUrl, body)
      .subscribe({
        next: (res: any) => {
          console.log("TOKEN RESPONSE:", res);
          localStorage.setItem("access_token", res.access_token);
          this.getUserInfo(res.access_token);
        },
        error: (err) => console.error("TOKEN ERROR:", err.error || err)
      });
  }

  getUserInfo(token: string) {
    const headers = { Authorization: `Bearer ${token}` };

    this.http.get(environment.userInfoApiUrl, { headers })  // FIXED NAME
      .subscribe({
        next: (user: any) => {
          console.log("USER INFO:", user);
          localStorage.setItem("user", JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        },
        error: (err) => console.error("USERINFO ERROR:", err.error || err)
      });
  }
}
