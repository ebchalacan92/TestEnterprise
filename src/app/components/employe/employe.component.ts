import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { returnDateInput } from 'src/app/_util/DateUtil';
import { onlyTextValidator, emailValidator } from 'src/app/_util/Validators';
import { LoginService } from '../login/login.service';
import { EmployeService } from './employe.service';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  @ViewChild('modalSaveEmploye') modalSaveEmploye: ElementRef;
  @ViewChild('modalEliminarEmploye') modalEliminarEmploye: ElementRef;

  employeForm: FormGroup;
  listEmployeForm: FormGroup;
  idEmployeGlobal: any;
  nameEmployeGlobal: any;
  listFilter: any = [];
  listEmploye: any = [];
  isEdit = false;
  usuario: any;
  public options = [
    {
      label: 'Nombre',
      value: 'name',
      param: true,
    },
    {
      label: 'Apellido',
      value: 'surname',
      param: true,
    },
    {
      label: 'Correo',
      value: 'email',
      param: true,
    },
    {
      label: 'Usuario',
      value: 'userName',
      param: true,
    }
  ];

  constructor(private formBuilder: FormBuilder, private employeService: EmployeService,
    public toaster: ToastrService, private modalService: NgbModal, config: NgbModalConfig,
    public loginService: LoginService) { 
    this.employeForm = this.instanceemploye();
    this.listEmployeForm = this.instanceListemployeForm();
    config.backdrop = 'static';
    config.keyboard = false;
    this.loginService.userOb.subscribe(res => {
      this.usuario= res;
    });
  }

  async ngOnInit() {
    await this.printEmploye();
  }

  instanceemploye() {
    return this.formBuilder.group({
    id: 0,
    createBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    status:[{value: false, disabled: false}],
    age: [{value: 0, disabled: false}, [Validators.required]],
    email: [{value: '', disabled: false}, [Validators.required, emailValidator]],
    name:[{value: '', disabled: false},[Validators.required, onlyTextValidator]],
    position:[{value: '', disabled: false},[Validators.required]],
    surname:[{value: '', disabled: false},[Validators.required, onlyTextValidator]],
    userName:[{value: '', disabled: false},[Validators.required]],
    password:[{value: '', disabled: false},[Validators.required]],
    isAdmin:[{value: false, disabled: false}]
    });
  }

  instanceListemployeForm() {
    return this.formBuilder.group({
      tempData: this.formBuilder.array([]),
    });
  }
  
  get f() {
    return this.employeForm.controls;
  }
  get tempData(): FormArray {
    return this.listEmployeForm.get('tempData') as FormArray;
  }

  async printEmploye() {
    this.tempData.clear();
    const data: any = await this.employeService.getEmploye();
    if(data) {
      this.listEmploye = data;
      this.listEmployes();
    }
  }

  listEmployes() {
    this.listEmploye.forEach(form => {
      this.tempData.controls.push(this.formBuilder.group({
        id: {value: form.id, disabled: true},
        createBy: {value: form.createBy, disabled: true},
        createdDate: {value: form.createdDate ? returnDateInput(form.createdDate) : '', disabled: true},
        modifiedBy: {value: form.modifiedBy, disabled: true},
        modifiedDate: {value: form.modifiedDate ? returnDateInput(form.modifiedDate): '', disabled: true},
        status: {value: form.status, disabled: true},
        age: {value: form.age, disabled: true},
        email: {value: form.email, disabled: true},
        name: {value: form.name, disabled: true},
        position: {value: form.position, disabled: true},
        surname: {value: form.surname, disabled: true},
        userName: {value: form.userName, disabled: true},
        password: {value: form.password, disabled: true},
        isAdmin: {value: form.isAdmin, disabled: true},
     }));
    });
    this.listFilter = [...this.tempData.controls];
  }

  buttonEditemploye(row: FormGroup) {
    this.employeForm.patchValue({
      id: row.get('id').value,
      createBy: row.get('createBy').value,
      createdDate: row.get('createdDate').value,
      modifiedBy: this.usuario.name,
      modifiedDate: new Date(),
      status: !!row.get('status').value,
      age: row.get('age').value,
      email: row.get('email').value,
      name: row.get('name').value,
      position: row.get('position').value,
      surname: row.get('surname').value,
      userName: row.get('userName').value,
      password: {value: row.get('password').value, disabled: true},
      isAdmin: row.get('isAdmin').value,
    });
    this.isEdit = true;
  }

  OpenModalSave() {
    Object.keys(this.f).forEach(field => {
    if(this.employeForm.get(field).invalid) {
      this.employeForm.get(field).markAsDirty();
    }
    });
    if(this.employeForm.valid) {
      this.modalService.open(this.modalSaveEmploye , {centered: true});
    } else {
      this.toaster.warning('Existen campos vacíos que son requeridos o no son válids. Verifique antes de guardar.', '');
    }
  }

  async saveEmploye() {
    if(!this.isEdit) {
      const body: any = {
        id: this.employeForm.controls.id.value ? this.employeForm.controls.id.value : 0,
        createBy: this.usuario.name,
        status: this.employeForm.controls.status.value ? this.employeForm.controls.status.value : false,
        age: this.employeForm.controls.age.value,
        email: this.employeForm.controls.email.value,
        name: this.employeForm.controls.name.value,
        position: this.employeForm.controls.position.value,
        surname: this.employeForm.controls.surname.value,
        userName: this.employeForm.controls.userName.value,
        password: this.employeForm.controls.password.value,
        isAdmin: this.employeForm.controls.isAdmin.value,
      }
      await this.employeService.createEmploye(body);
        this.toaster.success('Registro Guardado con Éxito','');
    } else {
      this.employeForm.get('modifiedBy').setValue(this.usuario.name);
      await this.employeService.editEmploye(this.employeForm.controls.id.value, this.employeForm.getRawValue());
        this.toaster.success('Registro Editado con Éxito','');
    }
    await this.printEmploye();
    this.updateEmployeForm();

    this.isEdit = false;
    this.modalService.dismissAll('Save Click');
  }

  openModalDelete(id: number, nombre: string) {
    this.idEmployeGlobal = id;
    this.nameEmployeGlobal = nombre;
    this.modalService.open(this.modalEliminarEmploye , {centered: true});
  }

  async removeEmploye(id: number) {
      this.employeService.deleteEmploye(id).subscribe(async data => {
        this.toaster.success('Registro eliminado','');
        this.isEdit = false;
        this.modalService.dismissAll('Save Click');
        await this.printEmploye();
        this.updateEmployeForm();
      }, error => {
        if(error.status === 500) {
          this.toaster.error('El registro cuenta con elementos relacionados en otros tablas. Verifique antes de eliminar.','');
        }
      });
  }

  updateEmployeForm() {
    Object.keys(this.f).forEach(field => {
      this.employeForm.get(field).reset();
      this.employeForm.get(field).setValue('');
      });
      this.instanceemploye();
      this.isEdit = false;
  }

  filterUpdate(event) {
    this.tempData.controls = [...event.filterData];
  }
}
