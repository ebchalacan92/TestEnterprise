import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { returnDateInput } from 'src/app/_util/DateUtil';
import { DepartmentService } from '../department/department.service';
import { EmployeService } from '../employe/employe.service';
import { LoginService } from '../login/login.service';
import { DepartmentEmployeeService } from './department-employee.service';

@Component({
  selector: 'app-department-employee',
  templateUrl: './department-employee.component.html',
  styleUrls: ['./department-employee.component.css']
})
export class DepartmentEmployeeComponent implements OnInit {

  @ViewChild('modalSaveDepartmentEmployee') modalSaveDepartmentEmployee: ElementRef;
  @ViewChild('modalEliminarDepartmentEmployee') modalEliminarDepartmentEmployee: ElementRef;
  @ViewChild('modalEditDepartmentEmployee') modalEditDepartmentEmployee: ElementRef;

  departmentEmployeeForm: FormGroup;
  listDepartmentEmployeeForm: FormGroup;
  idDepartmentEmployeeGlobal: any;
  nameDepartmentEmployeeGlobal: any;
  listFilter: any = [];
  listDepartmentEmployee: any = [];
  listDepartment: any = [];
  listEmployee: any = [];
  isEdit = false;
  usuario: any;
  public options = [
    {
      label: 'Nombre',
      value: 'nombre',
      param: true,
    },
    {
      label: 'Ruc',
      value: 'ruc',
      param: true,
    },
    {
      label: 'Representante',
      value: 'representante',
      param: true,
    },
    {
      label: 'Email',
      value: 'email',
      param: true,
    }
  ];

  constructor(private formBuilder: FormBuilder, private departmentEmployeeService: DepartmentEmployeeService,
    public toaster: ToastrService, private modalService: NgbModal, config: NgbModalConfig,
    public loginService: LoginService,private departmentService: DepartmentService,
     private employeService: EmployeService) { 
    this.departmentEmployeeForm = this.instanceDepartmentEmployee();
    this.listDepartmentEmployeeForm = this.instanceListDepartmentEmployeeForm();
    config.backdrop = 'static';
    config.keyboard = false;
    this.loginService.userOb.subscribe(res => {
      this.usuario= res;
    });
  }

  async ngOnInit() {
    await this.printDepartmentEmployee();
    this.listDepartment = await this.departmentService.getDepartment();
    this.listEmployee = await this.employeService.getEmploye();
  }

  instanceDepartmentEmployee() {
    return this.formBuilder.group({
    id: 0,
    idDepartment:[{value: 0, disabled: false},[Validators.required]],
    idEmployee:[{value: 0, disabled: false},[Validators.required]],
    createBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    status:[{value: false, disabled: false}],
    });
  }

  instanceListDepartmentEmployeeForm() {
    return this.formBuilder.group({
      tempData: this.formBuilder.array([]),
    });
  }
  
  get f() {
    return this.departmentEmployeeForm.controls;
  }
  get tempData(): FormArray {
    return this.listDepartmentEmployeeForm.get('tempData') as FormArray;
  }

  async printDepartmentEmployee() {
    this.tempData.clear();
    const data: any = await this.departmentEmployeeService.getDepartmentEmployee();
    if(data) {
      this.listDepartmentEmployee = data;
      this.listDepartmentEmployees();
    }
  }

  listDepartmentEmployees() {
    this.listDepartmentEmployee.forEach(form => {
      this.tempData.controls.push(this.formBuilder.group({
        id: {value: form.id, disabled: true},
        idDepartment: {value: form.idDepartment, disabled: true},
        idEmployee: {value: form.idEmployee, disabled: true},
        createBy: {value: form.createBy, disabled: true},
        createdDate: {value: form.createdDate ? returnDateInput(form.createdDate) : '', disabled: true},
        modifiedBy: {value: form.modifiedBy, disabled: true},
        modifiedDate: {value: form.modifiedDate ? returnDateInput(form.modifiedDate): '', disabled: true},
        status: {value: form.status, disabled: true},
     }));
    });
    this.listFilter = [...this.tempData.controls];
  }

  buttonEditDepartmentEmployee(row: FormGroup) {
    this.departmentEmployeeForm.patchValue({
      id: row.get('id').value,
      idDepartment: row.get('idDepartment').value,
      idEmployee: row.get('idEmployee').value,
      createBy: row.get('createBy').value,
      createdDate: row.get('createdDate').value,
      modifiedBy: this.usuario.name,
      modifiedDate: new Date(),
      status: !!row.get('status').value,
    });
    this.isEdit = true;
  }

  OpenModalSave() {
    Object.keys(this.f).forEach(field => {
    if(this.departmentEmployeeForm.get(field).invalid) {
      this.departmentEmployeeForm.get(field).markAsDirty();
    }
    });
    if(this.departmentEmployeeForm.valid) {
      this.modalService.open(this.modalSaveDepartmentEmployee , {centered: true});
    } else {
      this.toaster.warning('Existen campos vacíos que son requeridos o no son válids. Verifique antes de guardar.', '');
    }
  }

  async saveDepartmentEmployee() {
    if(!this.isEdit) {
      const body: any = {
        id: this.departmentEmployeeForm.controls.id.value ? this.departmentEmployeeForm.controls.id.value : 0,
        idDepartment: this.departmentEmployeeForm.controls.idDepartment.value
         ? this.departmentEmployeeForm.controls.idDepartment.value : 0,
         idEmployee: this.departmentEmployeeForm.controls.idEmployee.value ?
          this.departmentEmployeeForm.controls.idEmployee.value : 0,
        createBy: this.usuario.name,
        status: this.departmentEmployeeForm.controls.status.value ? this.departmentEmployeeForm.controls.status.value : false,
      }
      await this.departmentEmployeeService.createDepartmentEmployee(body);
        this.toaster.success('Registro Guardado con Éxito','');
    } else {
      this.departmentEmployeeForm.get('modifiedBy').setValue(this.usuario.name);
      await this.departmentEmployeeService.editDepartmentEmployee(this.departmentEmployeeForm.controls.id.value, this.departmentEmployeeForm.getRawValue());
        this.toaster.success('Registro Editado con Éxito','');
    }
    await this.printDepartmentEmployee();
    this.updateDepartmentEmployeeForm();

    this.isEdit = false;
    this.modalService.dismissAll('Save Click');
  }

  openModalDelete(id: number) {
    this.idDepartmentEmployeeGlobal = id;
    this.modalService.open(this.modalEliminarDepartmentEmployee , {centered: true});
  }

  async removeDepartmentEmployee(id: number) {
      this.departmentEmployeeService.deleteDepartmentEmployee(id).subscribe(async data => {
        this.toaster.success('Registro eliminado','');
        this.isEdit = false;
        this.modalService.dismissAll('Save Click');
        await this.printDepartmentEmployee();
        this.updateDepartmentEmployeeForm();
      }, error => {
        if(error.status === 500) {
          this.toaster.error('El registro cuenta con elementos relacionados en otros tablas. Verifique antes de eliminar.','');
        }
      });
  }

  updateDepartmentEmployeeForm() {
    Object.keys(this.f).forEach(field => {
      this.departmentEmployeeForm.get(field).reset();
      this.departmentEmployeeForm.get(field).setValue('');
      });
      this.instanceDepartmentEmployee();
      this.isEdit = false;
  }

  filterUpdate(event) {
    this.tempData.controls = [...event.filterData];
  }
}
