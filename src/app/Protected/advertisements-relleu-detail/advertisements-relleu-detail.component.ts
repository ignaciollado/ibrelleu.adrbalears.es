import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IBRelleuProjectsDTO } from '../../Models/ibrelleuproject.dto';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../Services/data.service';
import { AdvertisementService } from '../../Services/advertisement.service';
import { AdvertisementDTO } from '../../Models/advertisement.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'adr-advertisements-relleu-detail',
  templateUrl: './advertisements-relleu-detail.component.html',
  styleUrl: './advertisements-relleu-detail.component.scss'
})
export class AdvertisementsRelleuDetailComponent {
  id: string | null = null

  adForm: FormGroup;

  ibrelleuProjectList: IBRelleuProjectsDTO[] = []

  constructor(private route: ActivatedRoute, private dataService: DataService, private adService: AdvertisementService) {
    this.adForm = new FormGroup({
      ibrelleuProject: new FormControl(''),
      publicinmarketplace: new FormControl(''),
      title: new FormControl(''),
      advertisementstate: new FormControl(''),
      description: new FormControl(''),
      professionalExperiences: new FormControl(''),
      language: new FormControl(''),
      publicinweb: new FormControl(''),
    })

    this.loadAllIBRelleuProjects();

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')
      if (this.id) {
        this.adService.getAllAdvertisements().subscribe((ads: AdvertisementDTO[]) => {
          let targetAd: AdvertisementDTO = ads.find(ad => ad.id.toString() === this.id)
          this.loadAdFormInfo(targetAd)
        })
      }
    })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.adForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  onSubmit() {
    console.log("Submit relleu")

  }

  loadAllIBRelleuProjects() {
    this.dataService.getAllIbRelleuProjects().subscribe((ibrelleuProjects: IBRelleuProjectsDTO[]) => {
      this.ibrelleuProjectList = ibrelleuProjects
    })
  }

  loadAdFormInfo(ad: AdvertisementDTO) {
    this.adForm.patchValue({
      ibrelleuProject: ad.relleuprojectid,
      publicinmarketplace: ad.publicinmarketplace,
      title: ad.title,
      advertisementstate: ad.advertisementstate,
      description: ad.description,
      professionalExperiences: ad.experienciaCompetencies,
      language: ad.language,
      publicinweb: ad.publicinweb
    })
  }
}
