import {AbstractControl} from '@angular/forms';

export function onlyTextValidator(control: AbstractControl): { [key: string]: any } | null {
  const expresion = /^[a-zA-z\s]+$/.test(control.value);
  return expresion ? null : {invalidText: {valid: false, value: control.value}};
};

export function onlyNumbersValidator(control: AbstractControl): { [key: string]: any } | null {
  const expresion = /^([0-9])*$/.test(control.value);
  return expresion ? null : {invalidNumber: {valid: false, value: control.value}};
};
export function onlyNumbersWithDecimalsValidator(control: AbstractControl): { [key: string]: any } | null {
  const expresion = /^[0-9]+([.][0-9]+)?$/.test(control.value);
  return expresion ? null : {invalidNumber: {valid: false, value: control.value}};
};
export function onlyNumbersEnterosWithDecimalsValidator(control: AbstractControl): { [key: string]: any } | null {
  const expresion = /^[+-]?[0-9]{1,9}(?:.[0-9]{1,2})?$/.test(control.value);
  return expresion ? null : {invalidNumber: {valid: false, value: control.value}};
};

export function emailValidator(control: AbstractControl): {
  [key: string]: any
} | null {
  const valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    .test(control.value);
  return valid
    ? null
    : {invalidText: {valid: false, value: control.value}};
}