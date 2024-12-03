import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { contactColumns, ContactDTO } from '../../Models/contact.dto';
export interface PeriodicElement {
  name: string;
  nif: string;
  mainEmail: string;
  mainPhone: string;
  profile: string;
  state: string;
  registrationDate: Date;
  consultant: string;
  delegation: string;
  town: string;
  employementStatus: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {nif: '41000000G', name: 'Hydrogen', mainEmail: '1.0079', mainPhone: 'H', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
  {nif: '41000000G', name: 'Helium', mainEmail: '4.0026', mainPhone: 'He', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
  {nif: '41000000G', name: 'Lithium', mainEmail: '6.941', mainPhone: 'Li', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
  {nif: '41000000G', name: 'Beryllium', mainEmail: '9.0122', mainPhone: 'Be', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
  {nif: '41000000G', name: 'Boron', mainEmail: '10.811', mainPhone: 'B', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
  {nif: '41000000G', name: 'Carbon', mainEmail: '12.0107', mainPhone: 'C', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
  {nif: '41000000G', name: 'Nitrogen', mainEmail: '14.0067', mainPhone: 'N', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
  {nif: '41000000G', name: 'Oxygen', mainEmail: '15.9994', mainPhone: 'O', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
  {nif: '41000000G', name: 'Fluorine', mainEmail: '18.9984', mainPhone: 'F', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
  {nif: '41000000G', name: 'Neon', mainEmail: '20.1797', mainPhone: 'Ne', profile: '', state: '', registrationDate: new Date(), consultant: '', delegation: '', town: '', employementStatus: '', },
];

@Component({
  selector: 'adr-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})

export class ContactsComponent {
  ambitos: string[] = ['AUTONÓMICO','BALEAR','ESTATAL','UNIÓN EUROPEA']
  columnsDisplayed: string[] = contactColumns.map((col) => col.key);
  columnsSchema: any = contactColumns;
  dataSource: any = ELEMENT_DATA;
  valid: any = {}

  editRow(row: ContactDTO) {
    console.log (row)
  }

  removeRow(id: number) {
    console.log (id)
  }
 
}