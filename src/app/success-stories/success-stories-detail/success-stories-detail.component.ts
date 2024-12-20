import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { DataService } from '../../Services/data.service';
import { successStoriesColumns, SuccessStoriesDTO } from '../../Models/success-stories.dto';
import { SharedService } from '../../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'adr-success-stories-detail',
  templateUrl: './success-stories-detail.component.html',
  styleUrl: './success-stories-detail.component.scss'
})
export class SuccessStoriesDetailComponent {
  isElevated: boolean = true
  formSuccessStories: FormGroup
  countries: CountriesDTO[] = []
  id: string
  public zipCodeList: ZipCodesIBDTO[] = []
  filteredOptions: Observable<ZipCodesIBDTO[]>
  options: ZipCodesIBDTO[] = []

  constructor( private dataService: DataService, private countriesService: CountriesService, private route: ActivatedRoute ) {
    this.formSuccessStories = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),

      localizationAddress: new FormControl(''),
      zipCode: new FormControl('', [Validators.minLength(5), Validators.maxLength(5)]),
      localizationCity: new FormControl(''),
      councilCity: new FormControl(''),
      localizationCCAA: new FormControl(''),

      consultor: new FormControl('', [Validators.required]),
      delegacion: new FormControl(''),

    })
    this.id = this.route.snapshot.paramMap.get('id')
    this.getCountries()
    this.getAllZipCodes()
  }

  ngOnInit() {
    this.filteredOptions = this.formSuccessStories.get('zipCode').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  getCountries() {
    this.countriesService.getAll()
      .subscribe((countries:CountriesDTO[])=> {
        this.countries = countries
    })
  }

  onSubmit() {
   console.log(this.formSuccessStories.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  getAllZipCodes() {
    this.dataService.getAllZipCodes()
      .subscribe((zpCodes:ZipCodesIBDTO[])=> {
        this.zipCodeList = zpCodes
        this.options = zpCodes
    })
  }
  
  selectedValue(event: any) {
    console.log ("zp seleccionado: ", this.formSuccessStories.get('zipCode').value, this.formSuccessStories.get('zipCode').value.length)
    this.formSuccessStories.get('localizationCity').setValue(this.formSuccessStories.get('zipCode').value['town'])
    this.formSuccessStories.get('councilCity').setValue(this.formSuccessStories.get('zipCode').value['council'])
    this.formSuccessStories.get('localizationCCAA').setValue(this.formSuccessStories.get('zipCode').value['island'])
  }
  
  displayFn(zpCode: ZipCodesIBDTO): string {
    return zpCode && zpCode.zipCode ? zpCode.zipCode : '';
  }
  
  private _filter(name: string): ZipCodesIBDTO[] {
    const filterValue = name;
    return this.options.filter(option => option.zipCode.includes(filterValue));
  }

}
