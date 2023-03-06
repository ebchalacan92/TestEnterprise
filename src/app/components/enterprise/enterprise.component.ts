import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { returnDateInput } from 'src/app/_util/DateUtil';
import { onlyNumbersValidator, onlyTextValidator } from 'src/app/_util/Validators';
import { LoginService } from '../login/login.service';
import { EnterpriseService } from './enterprise.service';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css']
})
export class EnterpriseComponent implements OnInit {

  @ViewChild('modalSaveEnterprise') modalSaveEnterprise: ElementRef;
  @ViewChild('modalEliminarEnterprise') modalEliminarEnterprise: ElementRef;
  @ViewChild('modalEditEnterprise') modalEditEnterprise: ElementRef;

  enterpriseForm: FormGroup;
  listEnterpriseForm: FormGroup;
  idEnterpriseGlobal: any;
  nameEnterpriseGlobal: any;
  listFilter: any = [];
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
      label: 'Dirección',
      value: 'address',
      param: true,
    },
    {
      label: 'Telefono',
      value: 'phone',
      param: true,
    }
  ];

  constructor(private formBuilder: FormBuilder, private enterpriseService: EnterpriseService,
    public toaster: ToastrService, private modalService: NgbModal, config: NgbModalConfig,
    public loginService: LoginService) { 
    this.enterpriseForm = this.instanceEnterprise();
    this.listEnterpriseForm = this.instanceListEnterpriseForm();
    config.backdrop = 'static';
    config.keyboard = false;
    this.loginService.userOb.subscribe(res => {
      this.usuario= res;
    });
  }

  async ngOnInit() {
    await this.printEnterprise();
  }

  instanceEnterprise() {
    return this.formBuilder.group({
    id: 0,
    createBy: '',
    createdDate: '',
    modifiedBy: '',
    modifiedDate: '',
    status:[{value: false, disabled: false}],
    address: [{value: '', disabled: false}, [Validators.required]],
    name: [{value: '', disabled: false}, [Validators.required, onlyTextValidator]],
    phone:[{value: '', disabled: false},[Validators.required, onlyNumbersValidator, Validators.maxLength(15)]],
    });
  }

  instanceListEnterpriseForm() {
    return this.formBuilder.group({
      tempData: this.formBuilder.array([]),
    });
  }
  
  get f() {
    return this.enterpriseForm.controls;
  }
  get tempData(): FormArray {
    return this.listEnterpriseForm.get('tempData') as FormArray;
  }

  async printEnterprise() {
    this.tempData.clear();
    const data: any = await this.enterpriseService.getEnterprise();
    if(data) {
      this.listEnterprise = data;
      this.listEnterprises();
    }
  }

  listEnterprises() {
    this.listEnterprise.forEach(form => {
      this.tempData.controls.push(this.formBuilder.group({
        id: {value: form.id, disabled: true},
        createBy: {value: form.createBy, disabled: true},
        createdDate: {value: form.createdDate ? returnDateInput(form.createdDate) : '', disabled: true},
        modifiedBy: {value: form.modifiedBy, disabled: true},
        modifiedDate: {value: form.modifiedDate ? returnDateInput(form.modifiedDate): '', disabled: true},
        status: {value: form.status, disabled: true},
        address: {value: form.address, disabled: true},
        name: {value: form.name, disabled: true},
        phone: {value: form.phone, disabled: true},
     }));
    });
    this.listFilter = [...this.tempData.controls];
  }

  buttonEditEnterprise(row: FormGroup) {
    this.enterpriseForm.patchValue({
      id: row.get('id').value,
      createBy: row.get('createBy').value,
      createdDate: row.get('createdDate').value,
      modifiedBy: this.usuario.name,
      modifiedDate: new Date(),
      status: !!row.get('status').value,
      address: row.get('address').value,
      name: row.get('name').value,
      phone: row.get('phone').value,
    });
    this.isEdit = true;
  }

  OpenModalSave() {
    Object.keys(this.f).forEach(field => {
    if(this.enterpriseForm.get(field).invalid) {
      this.enterpriseForm.get(field).markAsDirty();
    }
    });
    if(this.enterpriseForm.valid) {
      this.modalService.open(this.modalSaveEnterprise , {centered: true});
    } else {
      this.toaster.warning('Existen campos vacíos que son requeridos o no son válids. Verifique antes de guardar.', '');
    }
  }

  async saveEnterprise() {
    if(!this.isEdit) {
      const body: any = {
        id: this.enterpriseForm.controls.id.value ? this.enterpriseForm.controls.id.value : 0,
        createBy: this.usuario.name,
        status: this.enterpriseForm.controls.status.value ? this.enterpriseForm.controls.status.value : false,
        address: this.enterpriseForm.controls.address.value,
        name: this.enterpriseForm.controls.name.value,
        phone: this.enterpriseForm.controls.phone.value,
      }
      await this.enterpriseService.createEnterprise(body);
        this.toaster.success('Registro Guardado con Éxito','');
    } else {
      this.enterpriseForm.get('modifiedBy').setValue(this.usuario.name);
      await this.enterpriseService.editEnterprise(this.enterpriseForm.controls.id.value, this.enterpriseForm.getRawValue());
        this.toaster.success('Registro Editado con Éxito','');
    }
    await this.printEnterprise();
    this.updateEnterpriseForm();

    this.isEdit = false;
    this.modalService.dismissAll('Save Click');
  }

  openModalDelete(id: number, nombre: string) {
    this.idEnterpriseGlobal = id;
    this.nameEnterpriseGlobal = nombre;
    this.modalService.open(this.modalEliminarEnterprise , {centered: true});
  }

  async removeEnterprise(id: number) {
      this.enterpriseService.deleteEnterprise(id).subscribe(async data => {
        this.toaster.success('Registro eliminado','');
        this.isEdit = false;
        this.modalService.dismissAll('Save Click');
        await this.printEnterprise();
        this.updateEnterpriseForm();
      }, error => {
        if(error.status === 500) {
          this.toaster.error('El registro cuenta con elementos relacionados en otros tablas. Verifique antes de eliminar.','');
        }
      });
  }

  updateEnterpriseForm() {
    Object.keys(this.f).forEach(field => {
      this.enterpriseForm.get(field).reset();
      this.enterpriseForm.get(field).setValue('');
      });
      this.instanceEnterprise();
      this.isEdit = false;
  }

  filterUpdate(event) {
    this.tempData.controls = [...event.filterData];
  }
}
