import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { returnDateInput } from 'src/app/_util/DateUtil';
import { onlyNumbersValidator } from 'src/app/_util/Validators';
import { EnterpriseService } from '../enterprise/enterprise.service';
import { LoginService } from '../login/login.service';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  @ViewChild('modalSaveDepartment') modalSaveDepartment: ElementRef;
  @ViewChild('modalEliminarDepartment') modalEliminarDepartment: ElementRef;
  @ViewChild('modalEditDepartment') modalEditDepartment: ElementRef;

  departmentForm: FormGroup;
  listdepartmentForm: FormGroup;
  idDepartmentGlobal: any;
  nameDepartmentGlobal: any;
  listFilter: any = [];
  listDepartment: any = [];
  listEnterprise: any = [];
  isEdit = false;
  usuario: any;
  public options = [
    {
      label: 'Nombre',
      value: 'name',
      param: true,
    },
    {
      label: 'Telefono',
      value: 'phone',
      param: true,
    }
  ];

  constructor(private formBuilder: FormBuilder, private DepartmentService: DepartmentService,
    public toaster: ToastrService, private modalService: NgbModal, config: NgbModalConfig,
    public loginService: LoginService,private enterpriseService: EnterpriseService) { 
    this.departmentForm = this.instanceDepartment();
    this.listdepartmentForm = this.instanceListdepartmentForm();
    config.backdrop = 'static';
    config.keyboard = false;
    this.loginService.userOb.subscribe(res => {
      this.usuario= res;
    });
  }

  async ngOnInit() {
    await this.printDepartment();
    this.listEnterprise = await this.enterpriseService.getEnterprise();
  }

  instanceDepartment() {
    return this.formBuilder.group({
    id: 0,
    idEnterprise:0,
    createBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    status:[{value: false, disabled: false}],
    description: [{value: '', disabled: false}, [Validators.required]],
    name: [{value: '', disabled: false}, [Validators.required]],
    phone:[{value: '', disabled: false},[Validators.required, onlyNumbersValidator, Validators.maxLength(15)]],
    });
  }

  instanceListdepartmentForm() {
    return this.formBuilder.group({
      tempData: this.formBuilder.array([]),
    });
  }
  
  get f() {
    return this.departmentForm.controls;
  }
  get tempData(): FormArray {
    return this.listdepartmentForm.get('tempData') as FormArray;
  }

  async printDepartment() {
    this.tempData.clear();
    const data: any = await this.DepartmentService.getDepartment();
    if(data) {
      this.listDepartment = data;
      this.listDepartments();
    }
  }

  listDepartments() {
    this.listDepartment.forEach(form => {
      this.tempData.controls.push(this.formBuilder.group({
        id: {value: form.id, disabled: true},
        idEnterprise: {value: form.idEnterprise, disabled: true},
        createBy: {value: form.createBy, disabled: true},
        createdDate: {value: form.createdDate ? returnDateInput(form.createdDate) : '', disabled: true},
        modifiedBy: {value: form.modifiedBy, disabled: true},
        modifiedDate: {value: form.modifiedDate ? returnDateInput(form.modifiedDate): '', disabled: true},
        status: {value: form.status, disabled: true},
        description: {value: form.description, disabled: true},
        name: {value: form.name, disabled: true},
        phone: {value: form.phone, disabled: true},
     }));
    });
    this.listFilter = [...this.tempData.controls];
  }

  buttonEditDepartment(row: FormGroup) {
    this.departmentForm.patchValue({
      id: row.get('id').value,
      idEnterprise: row.get('idEnterprise').value,
      createBy: row.get('createBy').value,
      createdDate: row.get('createdDate').value,
      modifiedBy: this.usuario.name,
      modifiedDate: new Date(),
      status: !!row.get('status').value,
      description: row.get('description').value,
      name: row.get('name').value,
      phone: row.get('phone').value,
    });
    this.isEdit = true;
  }

  OpenModalSave() {
    Object.keys(this.f).forEach(field => {
    if(this.departmentForm.get(field).invalid) {
      this.departmentForm.get(field).markAsDirty();
    }
    });
    if(this.departmentForm.valid) {
      this.modalService.open(this.modalSaveDepartment , {centered: true});
    } else {
      this.toaster.warning('Existen campos vacíos que son requeridos o no son válids. Verifique antes de guardar.', '');
    }
  }

  async saveDepartment() {
    if(!this.isEdit) {
      const body: any = {
        id: this.departmentForm.controls.id.value ? this.departmentForm.controls.id.value : 0,
        idEnterprise: this.departmentForm.controls.idEnterprise.value ? this.departmentForm.controls.idEnterprise.value : 0,
        createBy: this.usuario.name,
        status: this.departmentForm.controls.status.value ? this.departmentForm.controls.status.value : false,
        description: this.departmentForm.controls.description.value,
        name: this.departmentForm.controls.name.value,
        phone: this.departmentForm.controls.phone.value,
      }
      await this.DepartmentService.createDepartment(body);
        this.toaster.success('Registro Guardado con Éxito','');
    } else {
      this.departmentForm.get('modifiedBy').setValue(this.usuario.name);
      await this.DepartmentService.editDepartment(this.departmentForm.controls.id.value, this.departmentForm.getRawValue());
        this.toaster.success('Registro Editado con Éxito','');
    }
    await this.printDepartment();
    this.updatedepartmentForm();

    this.isEdit = false;
    this.modalService.dismissAll('Save Click');
  }

  openModalDelete(id: number, nombre: string) {
    this.idDepartmentGlobal = id;
    this.nameDepartmentGlobal = nombre;
    this.modalService.open(this.modalEliminarDepartment , {centered: true});
  }

  async removeDepartment(id: number) {
      this.DepartmentService.deleteDepartment(id).subscribe(async data => {
        this.toaster.success('Registro eliminado','');
        this.isEdit = false;
        this.modalService.dismissAll('Save Click');
        await this.printDepartment();
        this.updatedepartmentForm();
      }, error => {
        if(error.status === 500) {
          this.toaster.error('El registro cuenta con elementos relacionados en otros tablas. Verifique antes de eliminar.','');
        }
      });
  }

  updatedepartmentForm() {
    Object.keys(this.f).forEach(field => {
      this.departmentForm.get(field).reset();
      this.departmentForm.get(field).setValue('');
      });
      this.instanceDepartment();
      this.isEdit = false;
  }

  filterUpdate(event) {
    this.tempData.controls = [...event.filterData];
  }
}
