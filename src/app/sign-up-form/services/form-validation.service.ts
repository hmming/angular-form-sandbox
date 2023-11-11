import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'any',
})
export class FormValidationService {
  private containsValuesFromFields(
    control: AbstractControl,
    fieldsToCheck: string[]
  ): boolean {
    const keyWords = fieldsToCheck
      .map((fieldKey: string) => {
        return control.parent?.get(fieldKey)?.value.trim();
      })
      .filter((fieldValue) => {
        return fieldValue !== undefined;
      })
      .reduce((acc, cur) => {
        return `${acc} ${cur}`;
      }, '')
      .trim();

    return keyWords.split(' ').some((item: string) => {
      const upperCasedValue = control.value.toUpperCase();
      const upperCasedItem = item.toUpperCase();
      return item ? upperCasedValue.includes(upperCasedItem) : false;
    });
  }
  containsFieldValuesValidator(fieldKeys: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasValues: boolean = this.containsValuesFromFields(
        control,
        fieldKeys
      );
      return hasValues ? { passwordChecks: true } : null;
    };
  }
  emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      // inspired by http://emailregex.com/ and other resources for valid email characters
      const emailPattern =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;

      if (control.value === '') {
        return null;
      }

      return emailPattern.test(control.value)
        ? null
        : { emailValidation: true };
    };
  }
}
