import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../Services/data.service';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { CountriesDTO } from '../../Models/countries.dto';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';
import { Observable } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CustomValidatorsService } from '../../Services/custom-validators.service';
import { SuccessStoriesDTO } from '../../Models/success-stories.dto';

@Component({
  selector: 'adr-success-stories-detail',
  templateUrl: './success-stories-detail.component.html',
  styleUrl: './success-stories-detail.component.scss',
})
export class SuccessStoriesDetailComponent implements CanComponentDeactivate {
  submitted: boolean = true;
  storyForm: FormGroup;

  public zipCodeList: ZipCodesIBDTO[] = [];
  filteredOptions: Observable<ZipCodesIBDTO[]>;
  options: ZipCodesIBDTO[] = [];
  id: string = this.route.snapshot.paramMap.get('id');
  selectedIndex: number;

  consultantList: any[] = [];
  sectorList: any[] = [];
  activityList: any[] = [];

  legalFormList: any[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) {
    this.storyForm = new FormGroup({
      // Datos generales
      caseName: new FormControl(''),
      ibrelleuTypology: new FormControl(''),
      process: new FormControl(''),
      ibrelleuProject: new FormControl(''),
      grantorProject: new FormControl(''),
      mainSector: new FormControl(''),
      mainActivity: new FormControl(''),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
      ]),
      localizationCity: new FormControl({ value: '', disabled: true }),
      councilCity: new FormControl({ value: '', disabled: true }),
      localizationCCAA: new FormControl({ value: '', disabled: true }),
      consultant: new FormControl('', [Validators.required]),
      delegation: new FormControl(''),

      // Acuerdo
      cessionDate: new FormControl(''),
      contractTypology: new FormControl(''),
      transferTypology: new FormControl(''),
      transferPrice: new FormControl(''),
      propertyValue: new FormControl(''),
      comercialEstablishmentSell: new FormControl(''),
      paymentType: new FormControl(''),
      paymentTypology: new FormControl(''),
      numberOfHiredWorkers: new FormControl(''),
      numberOfSavedWorkers: new FormControl(''),
      numberOfEnterpriseWorkers: new FormControl(''),
      totalOfWorkers: new FormControl(''),
      agreementFramework: new FormControl(''),

      // Datos proyecto IBRelleu
      ibrelleuPersonFullName: new FormControl(''),
      ibrelleuPersonPhone: new FormControl(''),
      ibrelleuPersonMail: new FormControl(''),
      ibrelleuPersonDniNie: new FormControl(''),
      ibrelleuPersonLegalForm: new FormControl(''),
      ibrelleuCompanyNif: new FormControl(''),

      // Testimonial
      webTestimonial: new FormControl(''),
      testimonialsObservations: new FormControl(''),

      // Seguimiento
      offeredServiceSummary: new FormControl(''),

    });


    this.getAllZipCodes();
    this.loadSectorList();
    this.loadActivityList();
    this.loadLegalForm();
    this.loadConsultantData();

  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem('currentSuccessStoryTab');
    this.filteredOptions = this.storyForm.get('zipCode').valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      })
    );

    this.dataService.getSuccessStories().subscribe((successStories: SuccessStoriesDTO[]) => {
      let targetSuccessStory = successStories.find(successStory => successStory.id.toString() === this.id)
      this.loadStoryFormInfo(targetSuccessStory)
    })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.storyForm.dirty) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  get f(): { [key: string]: AbstractControl } {
    console.log(this.storyForm.status);
    return this.storyForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.storyForm.invalid) {
      return;
    }
    console.log(this.storyForm.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  getAllZipCodes() {
    this.dataService.getAllZipCodes().subscribe((zpCodes: ZipCodesIBDTO[]) => {
      this.zipCodeList = zpCodes;
      this.options = zpCodes;
    });
  }

  loadSectorList() {
    this.dataService.getAllSectors().subscribe((sectors) => {
      this.sectorList = sectors;
    });
  }

  loadActivityList() {
    this.dataService.getAllActivities().subscribe((activities) => {
      this.activityList = activities;
    });
  }

  loadLegalForm() {
    this.dataService.getAllLegalForms().subscribe((legalForm) => {
      this.legalFormList = legalForm;
    });
  }

  selectedValue(event: any) {
    // console.log ("zp seleccionado: ", this.storyForm.get('zipCode').value, this.storyForm.get('zipCode').value.length)
    this.storyForm
      .get('localizationCity')
      .setValue(this.storyForm.get('zipCode').value['town']);
    this.storyForm
      .get('councilCity')
      .setValue(this.storyForm.get('zipCode').value['council']);
    this.storyForm
      .get('localizationCCAA')
      .setValue(this.storyForm.get('zipCode').value['island']);
  }

  displayFn(zpCode: ZipCodesIBDTO): string {
    return zpCode && zpCode.zipCode ? zpCode.zipCode : '';
  }

  private _filter(name: string): ZipCodesIBDTO[] {
    const filterValue = name;
    return this.options.filter((option) =>
      option.zipCode.includes(filterValue)
    );
  }

  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem('currentSuccessStoryTab', event.index.toString());
  }

  loadConsultantData() {
    this.dataService.getSuccessStories().subscribe((successStories: SuccessStoriesDTO[]) => {
      successStories.forEach(successStory => {
        if (!this.consultantList.includes(successStory.consultant)) {
          this.consultantList.push(successStory.consultant)
        }
      });
    })
  }

  loadStoryFormInfo(story: SuccessStoriesDTO) {
    this.storyForm.patchValue({
      caseName: story.caseName,
      ibrelleuTypology: story.reenterpriseTypology,
      process: story.process,
      ibrelleuProject: story.ibrelleuProject,
      grantorProject: story.grantorProject,
      mainSector: Array.isArray(story.mainSector) ? story.mainSector : [story.mainSector],
      mainActivity: Array.isArray(story.mainActivity) ? story.mainActivity : [story.mainActivity],
      zipCode: story.zipCode,
      localizationCity: story.poblacio,
      councilCity: story.comarca,
      localizationCCAA: story.province,
      consultant: story.consultant,
      delegation: story.delegation,
      cessionDate: story.cessionDate,
      contractTypology: story.contractTypology,
      transferTypology: story.transferTypology,
      transferPrice: story.transferPrice,
      propertyValue: story.propertyValue,
      comercialEstablishmentSell: story.comercialEstablishmentSell,
      paymentType: story.paymentType,
      paymentTypology: story.paymentTypology,
      numberOfHiredWorkers: story.numberOfHiredWorkers,
      numberOfSavedWorkers: story.numberOfSavedWorkers,
      numberOfEnterpriseWorkers: story.numberOfEnterpriseWorkers,
      totalOfWorkers: story.totalOfWorkers,
      agreementFramework: story.agreementFramework,
      ibrelleuPersonFullName: story.ibrelleuPersonFullName,
      ibrelleuPersonPhone: story.ibrelleuPersonPhone,
      ibrelleuPersonMail: story.ibrelleuPersonMail,
      ibrelleuPersonDniNie: story.ibrelleuPersonDniNie,
      ibrelleuPersonLegalForm: story.ibrelleuPersonLegalForm,
      ibrelleuCompanyNif: story.ibrelleuCompanyNif,
      webTestimonial: story.webTestimonial,
      testimonialsObservations: story.testimonialsObservations,
      offeredServiceSummary: story.offeredServiceSummary
    })
  }
}
