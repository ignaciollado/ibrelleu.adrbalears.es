
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import {MatTableModule} from '@angular/material/table';
import { accountColumns, accountColumnsBBDD, AccountDTO } from '../../Models/account.dto';
import { DataService } from '../../Services/data.service';
import { AccountService } from '../../Services/account.service';
import { LegalFormDTO } from '../../Models/legal-form.dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'adr-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})

export class AccountComponent {
  ambitos: string[] = ['AUTONÓMICO','BALEAR','ESTATAL','UNIÓN EUROPEA']
  //columnsDisplayed: string[] = accountColumns.map((col) => col.key)
  columnsDisplayed: string[] = accountColumnsBBDD.map((col) => col.key);
  
  legalFormList: any[] = []
  //columnsSchema: any = accountColumns
  columnsSchema: any = accountColumnsBBDD;
  dataSource = new MatTableDataSource()
  valid: any = {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private dataService: DataService, private accountService: AccountService, private snackBar: MatSnackBar) {
    this.loadAllAccounts()
    this.loadLegalFormList()
    this.dataSource.paginator = this.paginator
    /* this.paginator.pageSizeOptions = [5, 10, 20];
    this.paginator.showFirstLastButtons = true; */
  }

/*   loadAllAccounts() {
    this.dataService.getAllAccounts()
      .subscribe((accounts: AccountDTO[])=> {
        this.dataSource.data = accounts
      })
  }
 */

  loadAllAccounts() {
      this.accountService.getAccounts()
      .subscribe((accounts: AccountDTO[]) => {
        this.dataSource.data = accounts
        this.dataSource.paginator = this.paginator
        this.showSnackBar("Accounts retrieved successfully!!!")
      },
      error => {
        this.showSnackBar(error)
      })
    }


  loadLegalFormList() {
    this.dataService.getAllLegalForms()
      .subscribe((legalItems: LegalFormDTO[])=> {
        this.legalFormList = legalItems
      })
  }

  editRow(row: AccountDTO) {
    console.log (row)
  }

  removeRow(id: number) {
    console.log (id)
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value
    /* console.log (filterValue) */
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
/*     console.log (this.dataSource) */
  }

  selectedValue(item: any) {
    console.log ("valor seleccionado: ", item.value)
  }

  private showSnackBar(error: string): void {
    this.snackBar.open( error, 'Close', { duration: 5000, verticalPosition: 'top', 
      horizontalPosition: 'center', panelClass: ["custom-snackbar"]} );
  }
}
