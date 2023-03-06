import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']})
export class LoginComponent implements OnInit {
    
    loginForm: FormGroup;

    constructor(public loginService: LoginService, private formBuilder: FormBuilder, public toaster: ToastrService,
        private router: Router) {
        this.loginForm = this.instanceLogin();
        if(this.loginService.usuarioData){
            this.router.navigate(['']);
        } else {
            this.router.navigate(['login']);
        }
    }
    ngOnInit() {
    }

    instanceLogin() {
        return this.formBuilder.group({
        name: [{value: '', disabled: false}, [Validators.required]],
        password: [{value: '', disabled: false}, [Validators.required]],
        })
      }

    async login () {
    this.loginService.login(this.loginForm.controls.name.value, this.loginForm.controls.password.value).subscribe(async response => {
        if(response.succesfull === 1) {
          this.router.navigate(['enterprise']);
      }
    }, error => {
        if(error.status === 400) {
          this.toaster.error('Usuario o Contraseña Incorrectos.','');
          this.loginForm.patchValue({
            name: '',
            password: '',
          })
        }
    });
    
    }
    
    get f() {
        return this.loginForm.controls;
      }
}