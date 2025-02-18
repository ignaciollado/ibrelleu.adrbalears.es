import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomValidatorsService {
  // Pendiente de comentar
  private organizationCode: string[] = ['A', 'B', 'E', 'H', 'K', 'P', 'Q', 'S'];

  // Solo Baleares
  private provinceCode: String[] = ['07', '57'];

  private numberControlDigit: string[] = ['A', 'B', 'E', 'H'];
  private letterControlDigit: string[] = ['K', 'P', 'Q', 'S'];

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

  private controlDigitList: any[] = [
    'J',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
  ];

  private isSettingValues = new BehaviorSubject<boolean>(false);

  dniNieCifValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.isSettingValues.value) {
        return null;
      }
      let data = control.value;
      if (!data) {
        return null;
      } else {
        data = data.toUpperCase();
      }
      let typeDefiningCharacter = data.substring(0, 1);
      let nie: boolean = false;
      let dni: boolean = false;
      let cif: boolean = false;

      let validData: any;

      if (data.length == 9) {
        if (this.nieInitialLetters.indexOf(typeDefiningCharacter) != -1) {
          nie = true;
          data =
            this.nieInitialLetters.indexOf(typeDefiningCharacter) +
            data.slice(1, 9);
        } else if (this.organizationCode.indexOf(typeDefiningCharacter) != -1) {
          cif = true;
        } else if (!isNaN(typeDefiningCharacter)) {
          dni = true;
        }

        if (dni || nie) {
          validData = this.dniNieValidator(data, dni ? 'dni' : 'nie');
        } else if (cif) {
          validData = this.cifValidator(data);
        } else {
          validData = null;
        }

        // He añadido este boolean como propiedad de la clase para evitar que, al setear el valor, se quede en un bucle infinito.
        if (validData != null) {
          this.isSettingValues.next(true);
          control.setValue(validData, { emitEvent: false });
          this.isSettingValues.next(false);
        } else {
          return { dniNieCifValidator: false };
        }
      }
      return null;
    };
  }

  cifValidator(cif: any) {
    let cifOrganizationCode = cif.substring(0, 1);

    let organizationType: string;

    if (this.numberControlDigit.indexOf(cifOrganizationCode) != -1) {
      organizationType = 'number';
    } else if (this.letterControlDigit.indexOf(cifOrganizationCode) != -1) {
      organizationType = 'letter';
    }

    let cifProvinceCode = cif.substring(1, 3);

    if (this.provinceCode.indexOf(cifProvinceCode) == -1) {
      return null;
    }

    let cifNumeration = cif.substring(1, 8);
    let odd = [];
    let even = [];

    for (let i = 0; i < cifNumeration.length; i++) {
      if (i % 2 == 0) {
        odd.push(cifNumeration[i]);
      } else {
        even.push(cifNumeration[i]);
      }
    }

    let sumEven = even.reduce((a, b) => parseInt(a) + parseInt(b));

    let sumOdd = 0;
    for (let i = 0; i < odd.length; i++) {
      let oddNumber = parseInt(odd[i]) * 2;
      if (oddNumber > 9) {
        oddNumber = oddNumber - 9;
      }
      sumOdd += oddNumber;
    }

    let totalSum = sumEven + sumOdd;
    let controlDigit = 10 - (totalSum % 10);

    let validControlDigit: any;

    switch (organizationType) {
      case 'letter': {
        validControlDigit = this.controlDigitList[controlDigit];
        return cifOrganizationCode + cifNumeration + validControlDigit;
      }
      case 'number': {
        validControlDigit = controlDigit;
        return cifOrganizationCode + cifNumeration + validControlDigit;
      }
    }
  }

  dniNieValidator(dni: string, type: string) {
    switch (type) {
      case 'dni': {
        let dniNumbers = parseInt(dni.substring(0, 8));
        let operationResult = dniNumbers % 23;
        return dniNumbers + this.dniLetters[operationResult];
      }
      case 'nie': {
        let nieInitialLetter = this.nieInitialLetters[dni.substring(0, 1)];
        let nieNumbers = parseInt(dni.substring(0, 8));
        let nieNumbersNoLetter = dni.substring(1, 8);
        let operationResult = nieNumbers % 23;

        return (
          nieInitialLetter +
          nieNumbersNoLetter +
          this.dniLetters[operationResult]
        );
      }
    }
    return null;
  }
}
