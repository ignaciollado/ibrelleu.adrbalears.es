import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { contactColumns, ContactDTO } from '../../Models/contact.dto';
import { DataService } from '../../Services/data.service';
import { ContactStatesDTO } from '../../Models/contact-states.dto';

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
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  ambitos: string[] = ['AUTONÓMICO', 'BALEAR', 'ESTATAL', 'UNIÓN EUROPEA'];
  columnsDisplayed: string[] = contactColumns.map((col) => col.key);
  contactStates: any[] = [];
  columnsSchema: any = contactColumns;
  dataSource = new MatTableDataSource();
  valid: any = {};

  constructor(private dataService: DataService) {
    this.loadContactStates();
    this.loadAllContacts();
  }

  loadAllContacts() {
    this.dataService.getAllContacts().subscribe((contacts: ContactDTO[]) => {
      this.dataSource.data = contacts;
      contacts.forEach((contact: ContactDTO) => {
        contact.state = this.contactStates[contact.state].label; //En vez de números, muestra el estado en string
      });
    });
  }

  loadContactStates() {
    this.dataService
      .getAllContactStates()
      .subscribe((contactStatesItems: ContactStatesDTO[]) => {
        this.contactStates = contactStatesItems;
      });
  }

  // filterContactStates(valueToFilter: any) {
  //   this.dataService
  //     .getAllLegalForms()
  //     .subscribe((contactStateItems: any[]) => {
  //       return contactStateItems.filter((stateItem: any) => {
  //         stateItem.value === valueToFilter;
  //       });
  //     });
  // }

  editRow(row: ContactDTO) {
    console.log(row);
  }

  removeRow(id: number) {
    console.log(id);
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectedValue(contactStates: any) {
    console.log('valor seleccionado: ', contactStates.value);
    //   this.dataService.getAllContacts().subscribe((contacts: ContactDTO[]) => {
    //     const matchedContacts: ContactDTO[] = contacts.filter(
    //       (item: ContactDTO) => {
    //         return item.state === contactState.value.value;
    //       }
    //     );
    //     this.dataSource = matchedContacts;
    //   });
  }
}
