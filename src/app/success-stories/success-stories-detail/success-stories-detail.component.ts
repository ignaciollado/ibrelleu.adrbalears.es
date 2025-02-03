import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { DataService } from '../../Services/data.service';
import { CanComponentDeactivate } from '../../can-deactivate.guard';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';
import { ZipCodesIBDTO } from '../../Models/zip-codes-ib.dto';
import { Observable } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'adr-success-stories-detail',
  templateUrl: './success-stories-detail.component.html',
  styleUrl: './success-stories-detail.component.scss'
})
export class SuccessStoriesDetailComponent implements CanComponentDeactivate {
  submitted: boolean = true
  theForm: FormGroup
  countries: CountriesDTO[] = []
  public zipCodeList: ZipCodesIBDTO[] = []
  filteredOptions: Observable<ZipCodesIBDTO[]>
  options: ZipCodesIBDTO[] = []
  id:string = this.route.snapshot.paramMap.get('id')
  selectedIndex: number

  constructor( private dataService: DataService, private countriesService: CountriesService, private route: ActivatedRoute ) {
    this.theForm = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required]),
      localizationAddress: new FormControl(''),
      zipCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]),
      localizationCity: new FormControl({value:'', disabled: true }),
      councilCity: new FormControl({value:'', disabled: true }),
      localizationCCAA: new FormControl({value:'', disabled: true }),
      transferDate: new FormControl('', [Validators.required]),

      consultor: new FormControl('', [Validators.required]),
      delegacion: new FormControl(''),

    })
    this.getAllZipCodes()

    this.theForm.statusChanges.subscribe(newStaus => {
      console.log('form Status changed event')
      console.log(newStaus, this.theForm.pristine, this.theForm.invalid)
    })
  }

  ngOnInit() {
    this.selectedIndex = +sessionStorage.getItem("currentSuccessStoryTab")
    this.filteredOptions = this.theForm.get('zipCode').valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
    this.theForm.get('id').setValue(this.id)
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean { 
    if (this.theForm.dirty) 
      { return confirm('You have unsaved changes. Do you really want to leave?'); } 
    return true;
  }

  get f(): { [key: string]: AbstractControl} {
    console.log (this.theForm.status)
    return this.theForm.controls
  }

  onSubmit() {
  this.submitted = true
  if (this.theForm.invalid) {
    return;
  }
  console.log(this.theForm.value);
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
    console.log ("zp seleccionado: ", this.theForm.get('zipCode').value, this.theForm.get('zipCode').value.length)
    this.theForm.get('localizationCity').setValue(this.theForm.get('zipCode').value['town'])
    this.theForm.get('councilCity').setValue(this.theForm.get('zipCode').value['council'])
    this.theForm.get('localizationCCAA').setValue(this.theForm.get('zipCode').value['island'])
  }
  
  displayFn(zpCode: ZipCodesIBDTO): string {
    return zpCode && zpCode.zipCode ? zpCode.zipCode : '';
  }
  
  private _filter(name: string): ZipCodesIBDTO[] {
    const filterValue = name;
    return this.options.filter(option => option.zipCode.includes(filterValue));
  }

  onTabChange(event: MatTabChangeEvent) {
    sessionStorage.setItem("currentSuccessStoryTab",event.index.toString())
  }
}
