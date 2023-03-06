import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './components/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Test';
  usuario: any;
  isLicenciamiento: Boolean;

  constructor(public loginService: LoginService, private router: Router) {
    this.loginService.userOb.subscribe(res => {
      this.usuario= res;
    });
    this.isLicenciamiento = false;
  }

  logout() {
  this.loginService.logout();
  this.router.navigate(['/login']);
  }
}
