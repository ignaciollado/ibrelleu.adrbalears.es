import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../../Services/data.service';
import { GrantorProjectsDTO } from '../../Models/grantorProject.dto';
import { AdvertisementService } from '../../Services/advertisement.service';
import { AdvertisementDTO } from '../../Models/advertisement.dto';

@Component({
  selector: 'adr-advertisement-detail',
  templateUrl: './advertisement-detail.component.html',
  styleUrl: './advertisement-detail.component.scss'
})
export class AdvertisementDetailComponent {

  id: string | null = this.route.snapshot.paramMap.get('id');

  adForm: FormGroup;

  grantorProjectList: GrantorProjectsDTO[] = []

  constructor(private route: ActivatedRoute, private dataService: DataService, private adService: AdvertisementService) {
    this.adForm = new FormGroup({
      grantorProject: new FormControl(''),
      publicinmarketplace: new FormControl(''),
      title: new FormControl(''),
      advertisementstate: new FormControl(''),
      description: new FormControl(''),
      language: new FormControl(''),
      publicinweb: new FormControl(''),
    })

    this.loadAllGrantorProjects()
  }

  ngOnInit() {
    if (this.id) {
      this.adService.getAllAdvertisements().subscribe((ads: AdvertisementDTO[]) => {
        let targetAd: AdvertisementDTO = ads.find(ad => ad.id.toString() === this.id)
        this.loadAdFormInfo(targetAd)
      })
    }

  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.adForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  onSubmit() {
    console.log("Submit grantor")

  }

  loadAllGrantorProjects() {
    this.dataService.getAllGrantorProjects().subscribe((grantorProjects: GrantorProjectsDTO[]) => {
      this.grantorProjectList = grantorProjects
    })
  }

  loadAdFormInfo(ad: AdvertisementDTO) {
    this.adForm.patchValue({
      grantorProject: ad.grantorprojectid,
      publicinmarketplace: ad.publicinmarketplace,
      title: ad.title,
      advertisementstate: ad.advertisementstate,
      description: ad.description,
      language: ad.language,
      publicinweb: ad.publicinweb
    })
  }
}
