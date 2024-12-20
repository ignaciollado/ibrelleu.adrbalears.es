import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';
import { DataService } from '../../Services/data.service';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';
import { map, Observable, startWith } from 'rxjs';
import { CanComponentDeactivate } from '../../can-deactivate.guard';

@Component({
  selector: 'adr-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss'
})
export class AccountDetailComponent  implements CanComponentDeactivate {
  isElevated: boolean = true
  formAccountDetail: FormGroup
  countries: CountriesDTO[] = []
  zipCodeList: ZipCodesIBDTO[] = []
  filteredOptions: Observable<ZipCodesIBDTO[]>
  options: ZipCodesIBDTO[] = []
  
  constructor( private dataService: DataService, private countriesService: CountriesService ) {
    this.formAccountDetail = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      nacionalidad: new FormControl(''),
      perfilTecnicoCedente: new FormControl('', [Validators.required]),
      perfil: new FormControl('', [Validators.required]),
      estadoContacto: new FormControl('', [Validators.required]),
      genero: new FormControl(''),
      motivoEstado: new FormControl(''),
      consultor: new FormControl('', [Validators.required]),
      aceptaRGPD: new FormControl(''),
      delegacion: new FormControl(''),
      paradesMercat: new FormControl(''),
      zipCode: new FormControl('', [Validators.minLength(5), Validators.maxLength(5)]),
      localizationCity: new FormControl({value:'', disabled: true }),
      councilCity: new FormControl({value:'', disabled: true }),
      localizationCCAA: new FormControl({value:'', disabled: true }),
      localizationCountry: new FormControl ({value:'España', disabled: true }),
    })
    
    this.getCountries()
    this.getAllZipCodes()
  }

  ngOnInit() {
    this.filteredOptions = this.formAccountDetail.get('zipCode').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean { 
    if (this.formAccountDetail.dirty) 
      { return confirm('You have unsaved changes. Do you really want to leave?'); } 
    return true;
  }

  getCountries() {
    this.countriesService.getAll()
      .subscribe((countries:CountriesDTO[])=> {
        this.countries = countries
    })
  }

  onSubmit() {
    console.log(this.formAccountDetail.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  getAllZipCodes() {
      this.dataService.getAllZipCodes()
        .subscribe((zpCodes:ZipCodesIBDTO[])=> {
          this.zipCodeList = zpCodes
          this.options = zpCodes
          console.log (this.options)
        })
    }
  
    selectedValue(event: any) {
      console.log ("zp seleccionado: ", this.formAccountDetail.get('zipCode').value)
      this.formAccountDetail.get('localizationCity').setValue(this.formAccountDetail.get('zipCode').value['town'])
      this.formAccountDetail.get('localizationCCAA').setValue(this.formAccountDetail.get('zipCode').value['island'])
    }
  
    displayFn(zpCode: ZipCodesIBDTO): string {
      return zpCode && zpCode.zipCode ? zpCode.zipCode : '';
    }
  
    private _filter(name: string): ZipCodesIBDTO[] {
      const filterValue = name;
      return this.options.filter(option => option.zipCode.includes(filterValue));
    }
}
