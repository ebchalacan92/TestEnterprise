import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-custom-filter',
  templateUrl: './custom-filter.component.html',
})
export class CustomFilterComponent implements OnInit {

  @Input() public options;
  @Input() public data;
  @Output() filterComplete: EventEmitter<any> = new EventEmitter<any>();

  optionsForm: FormGroup;
  showForm = false;
  validOption = false;

  constructor(private formBuilder: FormBuilder) {
    this.optionsForm = this.instanciarForm();
  }

  ngOnInit(): void {
    if (this.data) {
      this.showForm = true;
    }
  }

  filter(event) {
    let filterData = [];
    const val = event.target.value.toString().toLowerCase();
    const option = this.optionsForm.controls.option.value;
      filterData = this.filterParam(option, val);
    this.filterComplete.emit({filterData: filterData});
  }

  filterParam(option, val) {
    const filterData = [];
    let list;
    if (this.data instanceof FormArray) {
      list = this.data.controls;
    } else {
      list = this.data;
    }
    list.forEach(register => {
      if (this.registerIncludes(register, option, val)) {
        filterData.push(register);
      }
    });
    return filterData;
  }

  registerIncludes(register, option, val) {
    let value;
    if (register instanceof FormGroup) {
      value = register.get(option).value;
    } else {
      value = _.get(register, option, '');
    }
    return value.toString().toLowerCase().includes(val);
  }

  instanciarForm() {
    return this.formBuilder.group({
      option: ['0', [Validators.required]]
    });
  }

  validateOption() {
    this.validOption = this.optionsForm.controls.option.value !== '0';
  }
 
}
