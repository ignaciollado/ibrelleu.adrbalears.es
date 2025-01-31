import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  // Pendiente de comentar
  private organizationCode: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'S',
  ];

  // Solo Baleares
  private provinceCode: String[] = ['07', '57'];

  private letterControlDigit: string[] = ['K', 'P', 'Q', 'S'];
  private numberControlDigit: string[] = ['A', 'B', 'E', 'H'];

  private dniLetters: string[] = [
    'T',
    'R',
    'W',
    'A',
    'G',
    'M',
    'Y',
    'F',
    'P',
    'D',
    'X',
    'B',
    'N',
    'J',
    'Z',
    'S',
    'Q',
    'V',
    'H',
    'L',
    'C',
    'K',
    'E',
  ];

  private nieInitialLetters: string[] = ['X', 'Y', 'Z'];

  dniNieCifValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value.length == 9) {
        let data = control.value.toUpperCase();
        let typeDefiningCharacter = data.substring(0, 1);
        if (this.nieInitialLetters.indexOf(typeDefiningCharacter) != -1) {
          typeDefiningCharacter = this.nieInitialLetters.indexOf(
            typeDefiningCharacter
          );
          let nie = data.slice(1, 9);
          data = typeDefiningCharacter + nie;
        }

        let valid: boolean = false;

        if (isNaN(typeDefiningCharacter)) {
          if (this.cifValidator(data)) {
            valid = true;
          }
        } else if (!isNaN(typeDefiningCharacter)) {
          if (this.dniNieValidator(data)) {
            valid = true;
          }
        }

        return !valid ? { validData: true } : null;
      } else {
        //poner a "" campo nif
      }

      return null;
    };
  }

  cifValidator(cif: any) {
    let cifOrganizationCode = cif.substring(0, 1);

    let cifProvinceCode = cif.substring(1, 3);

    let cifNumeration = cif.substring(3, 8);

    let cifControlDigit = cif.substring(8, 9);

    cifControlDigit;

    let validOrganizationCode: boolean =
      this.organizationCode.indexOf(cifOrganizationCode) != -1;

    let validProvinceCode: boolean =
      this.provinceCode.indexOf(cifProvinceCode) != -1;

    let validNumeration: boolean = !isNaN(cifNumeration);

    let validControlDigit: boolean = false;

    if (
      isNaN(cifControlDigit) &&
      this.letterControlDigit.indexOf(cifOrganizationCode) != -1
    ) {
      validControlDigit = true;
    } else if (
      !isNaN(cifControlDigit) &&
      this.numberControlDigit.indexOf(cifOrganizationCode) != -1
    ) {
      validControlDigit = true;
    }

    if (
      !validOrganizationCode ||
      !validProvinceCode ||
      !validNumeration ||
      !validControlDigit
    ) {
      return false;
    } else {
      return true;
    }
  }

  dniNieValidator(dni: string) {
    let dniNumbers = parseInt(dni.substring(0, 8));
    let dniLetter = dni.substring(8, 9);

    let dniLetterValue = this.dniLetters.indexOf(dniLetter);

    let operationResult = dniNumbers % 23;

    console.log ("y la posición es:", this.dniLetters[operationResult], dni.substring(0, 8)+this.dniLetters[operationResult])

    if (dniLetterValue == operationResult) {
      return true;
    } else {
      return false;
    }
  }
}
