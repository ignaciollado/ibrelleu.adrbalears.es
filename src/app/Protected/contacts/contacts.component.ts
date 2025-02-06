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
import { contactColumns, contactColumnsBBDD, ContactDTO } from '../../Models/contact.dto';
import { DataService } from '../../Services/data.service';
import { ContactService } from '../../Services/contact.service';
import { ContactStatesDTO } from '../../Models/contact-states.dto';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ambitos: string[] = ['AUTONÓMICO', 'BALEAR', 'ESTATAL', 'UNIÓN EUROPEA']
  
  //columnsDisplayed: string[] = contactColumns.map((col) => col.key);
  columnsDisplayed: string[] = contactColumnsBBDD.map((col) => col.key);

  contactStates: any[] = [];
  //columnsSchema: any = contactColumns;
  columnsSchema: any = contactColumnsBBDD;

  dataSource = new MatTableDataSource();
  valid: any = {};

  constructor(private dataService: DataService, private contactService: ContactService, private snackBar: MatSnackBar) {
    this.loadContactStates();
    this.loadAllContacts();
  }

  loadAllContacts() {
    this.contactService.getContacts().subscribe((contacts: ContactDTO[]) => {
      this.dataSource.data = contacts
      this.dataSource.data.map( (contact: ContactDTO) => {
        contact.firstName += " "+contact.lastName
      })
      console.log (this.dataSource.data)
      this.showError("Contacts retrieved successfully!!!")
/*       contacts.forEach((contact: ContactDTO) => {
        contact.contact_status = this.contactStates[contact.state].label; //En vez de números, muestra el estado en string
      }) */
    },
    error => {
      this.showError(error)
    })
  }

  loadContactStates() {
    this.dataService
      .getAllContactStates()
      .subscribe((contactStatesItems: ContactStatesDTO[]) => {
        this.contactStates = contactStatesItems;
      });
  }

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

  private showError(error: string): void {
    this.snackBar.open(error, 'Close', { duration: 10000, });
  }
}
