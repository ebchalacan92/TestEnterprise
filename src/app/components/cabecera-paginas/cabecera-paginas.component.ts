import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-cabecera-paginas',
  templateUrl: './cabecera-paginas.component.html',
  styleUrls: ['./cabecera-paginas.component.css']
})
export class CabeceraPaginasComponent implements OnInit {

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
    }

}
