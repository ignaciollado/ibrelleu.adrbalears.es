import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'adr-interest-detail',
  templateUrl: './interest-detail.component.html',
  styleUrl: './interest-detail.component.scss'
})
export class InterestDetailComponent {
  selectedIndex: number;
  interestForm: FormGroup
  id: string = this.route.snapshot.paramMap.get('id')

  constructor(private route: ActivatedRoute) {
    this.interestForm = new FormGroup({})
  }


  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.interestForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  onSubmit() {
    console.log(this.interestForm.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem('currentInterestTab', event.index.toString());
  }

}
