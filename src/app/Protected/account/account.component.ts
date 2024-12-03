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

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 9999, nif: '41000000G', mainContact: 'Hydrogen', legalForm: 'Societat Limitada (SL)', companyName: 'H', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
  {id: 9999, nif: '41000000G', mainContact: 'Helium', legalForm: 'Societat Limitada (SL)', companyName: 'He', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
  {id: 9999, nif: '41000000G', mainContact: 'Lithium', legalForm: 'Societat Limitada (SL)', companyName: 'Li', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
  {id: 9999, nif: '41000000G', mainContact: 'Beryllium', legalForm: 'Societat Limitada (SL)', companyName: 'Be', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
  {id: 9999, nif: '41000000G', mainContact: 'Boron', legalForm: 'Societat Limitada (SL)', companyName: 'B', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
  {id: 9999, nif: '41000000G', mainContact: 'Carbon', legalForm: 'Societat Limitada (SL)', companyName: 'C', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
  {id: 9999, nif: '41000000G', mainContact: 'Nitrogen', legalForm: 'Societat Limitada (SL)', companyName: 'N', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
  {id: 9999, nif: '41000000G', mainContact: 'Oxygen', legalForm: 'Societat Limitada (SL)', companyName: 'O', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
  {id: 9999, nif: '41000000G', mainContact: 'Fluorine', legalForm: 'Societat Limitada (SL)', companyName: 'F', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
  {id: 9999, nif: '41000000G', mainContact: 'Neon', legalForm: 'Societat Limitada (SL)', companyName: 'Ne', tradeMarkName: '', sector: 'Industria', registrationDate: new Date(), consultant: '', delegation: '', town: '', activityType: 'Metal' },
];

@Component({
  selector: 'adr-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})

export class AccountComponent {
  ambitos: string[] = ['AUTONÓMICO','BALEAR','ESTATAL','UNIÓN EUROPEA']
  columnsDisplayed: string[] = accountColumns.map((col) => col.key);
  columnsSchema: any = accountColumns;
  dataSource: any = ELEMENT_DATA;
  valid: any = {}

  editRow(row: AccountDTO) {
    console.log (row)
  }

  removeRow(id: number) {
    console.log (id)
  }


}
