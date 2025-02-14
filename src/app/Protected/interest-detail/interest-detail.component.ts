import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../Services/data.service';
import { InterestDTO } from '../../Models/interest.dto';

@Component({
  selector: 'adr-interest-detail',
  templateUrl: './interest-detail.component.html',
  styleUrl: './interest-detail.component.scss'
})
export class InterestDetailComponent {
  selectedIndex: number;
  interestForm: FormGroup
  id: string = this.route.snapshot.paramMap.get('id')

  interestConsultantList: string[] = []
  grantorProjectsConsultantList: string[] = []

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.interestForm = new FormGroup({})

    // this.loadConsultants();
  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem('currentInterestTab')
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

  // loadConsultants() {
  //   this.dataService.getAllInterests().subscribe((interestList: InterestDTO[]) => {
  //     interestList.forEach((interest) => {
  //       if (!this.interestConsultantList.includes(interest.interestConsultant)) {
  //         this.interestConsultantList.push(interest.interestConsultant)
  //       }

  //       if (!this.grantorProjectsConsultantList.includes(interest.desiredGrantorProjectConsultant)) {
  //         this.grantorProjectsConsultantList.push(interest.desiredGrantorProjectConsultant)
  //       }
  //     })
  //   })



  // }

}
