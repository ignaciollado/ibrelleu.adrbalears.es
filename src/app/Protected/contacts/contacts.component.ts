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
import { DataService } from '../../Services/data.service';


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

@Component({
  selector: 'adr-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})

export class ContactsComponent {
  ambitos: string[] = ['AUTONÓMICO','BALEAR','ESTATAL','UNIÓN EUROPEA']
  columnsDisplayed: string[] = contactColumns.map((col) => col.key);
  columnsSchema: any = contactColumns;
  dataSource: any
  valid: any = {}

  constructor( private dataService: DataService ) {
    this.getAllContacts()
  }

  getAllContacts() {
      this.dataService.getAllContacts()
        .subscribe((contacts: ContactDTO[])=> {
          this.dataSource = contacts
        })
    }

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