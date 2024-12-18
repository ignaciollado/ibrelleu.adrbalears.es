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
import { accountColumns, AccountDTO } from '../../Models/account.dto';
import { DataService } from '../../Services/data.service';

export interface PeriodicElement {
  id: number
  mainContact: string
  nif: string
  legalForm: string
  companyName: string
  tradeMarkName: string
  sector: string
  registrationDate: Date
  consultant: string
  delegation: string
  town: string
  activityType: string
}



@Component({
  selector: 'adr-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})

export class AccountComponent {
  ambitos: string[] = ['AUTONÓMICO','BALEAR','ESTATAL','UNIÓN EUROPEA']
  columnsDisplayed: string[] = accountColumns.map((col) => col.key)
  legalFormList: any[] = []
  columnsSchema: any = accountColumns
  dataSource: any
  valid: any = {}


  constructor( private dataService: DataService) {
    this.loadAllAccounts()
    this.loadLegalFormList()
  }


  loadAllAccounts() {
    this.dataService.getAllAccounts()
      .subscribe((accounts: AccountDTO[])=> {
        this.dataSource = accounts
      })
  }

  loadLegalFormList() {
    this.dataService.getAllLegalForms()
      .subscribe((legalItems: AccountDTO[])=> {
        this.legalFormList = legalItems
      })
  }

  editRow(row: AccountDTO) {
    console.log (row)
  }

  removeRow(id: number) {
    console.log (id)
  }

  applyFilter(item: any) {
    console.log (item.value)
    const filterValue = item.value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log (this.dataSource)
  }

  selectedValue(item: any) {
    console.log ("valor seleccionado: ", item.value)
  }
}
