import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../Services/data.service';
import { GrantorProjectsDTO } from '../../Models/grantorProject.dto';

@Component({
  selector: 'adr-advertisement-detail',
  templateUrl: './advertisement-detail.component.html',
  styleUrl: './advertisement-detail.component.scss'
})
export class AdvertisementDetailComponent {

  id: string | null = null

  adForm: FormGroup;

  grantorProjectList: GrantorProjectsDTO[] = []

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.adForm = new FormGroup({

    })

    this.loadAllGrantorProjects()
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.adForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  onSubmit() {

  }

  loadAllGrantorProjects() {
    this.dataService.getAllGrantorProjects().subscribe((grantorProjects: GrantorProjectsDTO[]) => {
      this.grantorProjectList = grantorProjects
    })
  }
}
