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
  contactStates: any[] = []
  columnsDisplayed: string[] = contactColumns.map((col) => col.key);
  columnsSchema: any = contactColumns;
  dataSource: any
  valid: any = {}

  constructor( private dataService: DataService ) {
    this.loadAllContacs()
    this.loadContactStates()
  }

  loadAllContacs() {
      this.dataService.getAllContacts()
        .subscribe((contacts: ContactDTO[])=> {
          this.dataSource = contacts
          this.dataSource.map((item:ContactDTO)=> {
           console.log( item.state,  this.filterContactStates(item.state) )
           /* item.state = this.contactStates[item.state]['label'] */
          })
      })
  }
  loadContactStates() {
    this.dataService.getAllLegalForms()
      .subscribe((contactStateItems: any[])=> {
        this.contactStates = contactStateItems
    })
  }

  filterContactStates(valueToFilter:any) {
    this.dataService.getAllLegalForms()
      .subscribe((contactStateItems: any[])=> {
        return contactStateItems.filter((stateItem:any) => {
          console.log (stateItem.value, valueToFilter)
          stateItem.value === valueToFilter})
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

  selectedValue(contactState: any) {
    console.log ("valor seleccionado: ", contactState.value.value)
    this.dataService.getAllContacts()
    .subscribe((contacts: ContactDTO[])=> {
      const matchedContacts:ContactDTO[] = contacts.filter((item:ContactDTO) => {return item.state === contactState.value.value})
      console.log (matchedContacts)
      this.dataSource = matchedContacts
    })
  } 
 
}