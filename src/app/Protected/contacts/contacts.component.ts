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
  {nif: '41000000G', name: 'Hydrogen', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Reemprenedor', state: 'Tornar a contactar', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
  {nif: '41000000G', name: 'Helium', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Reemprenedor', state: 'Tornar a contactar', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
  {nif: '41000000G', name: 'Lithium', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Extern', state: 'Actiu', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
  {nif: '41000000G', name: 'Beryllium', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Extern', state: 'Tornar a contactar', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
  {nif: '41000000G', name: 'Boron', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Cedent', state: 'Actiu', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
  {nif: '41000000G', name: 'Carbon', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Cedent', state: 'Actiu', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
  {nif: '41000000G', name: 'Nitrogen', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Cedent', state: 'Actiu', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
  {nif: '41000000G', name: 'Oxygen', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Extern', state: 'Actiu', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
  {nif: '41000000G', name: 'Fluorine', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Extern', state: 'Actiu', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
  {nif: '41000000G', name: 'Neon', mainEmail: 'mainmail@dominio.com', mainPhone: '971971971', profile: 'Extern', state: 'Actiu', registrationDate: new Date(), consultant: 'Marta Riutord', delegation: 'Mallorca - Central', town: 'Palma', employementStatus: 'Activo' },
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

  applyFilter(event: Event) {
    console.log (event)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
}