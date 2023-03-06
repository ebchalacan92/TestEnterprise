import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './security/add.guard';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { JwtInterceptor } from './security/jwt.interceptor';
import { LoginComponent } from './components/login/login.component';
import { CabeceraPaginasComponent } from './components/cabecera-paginas/cabecera-paginas.component';
import { EnterpriseComponent } from './components/enterprise/enterprise.component';
import { EmployeComponent } from './components/employe/employe.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentEmployeeComponent } from './components/department-employee/department-employee.component';
import { SpinnerMejoradoModule } from './spinner/spinner-mejorado/spinner-mejorado.module';
import { SpinnerInterceptor } from './security/spinner.interceptor';
import { CustomFilterComponent } from './components/custom/custom-filter/custom-filter.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'enterprise',
    component: EnterpriseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employe',
    component: EmployeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'department-employee',
    component: DepartmentEmployeeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  }
]
@NgModule({
  declarations: 
  [
    AppComponent,
    EnterpriseComponent,
    CabeceraPaginasComponent,
    LoginComponent,
    EmployeComponent,
    DepartmentComponent,
    DepartmentEmployeeComponent,
    CustomFilterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    CommonModule,
    NgSelectModule,
    NgbModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    SpinnerMejoradoModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
