import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { successStoriesColumns, SuccessStoriesDTO } from '../../Models/success-stories.dto';
import { DataService } from '../../Services/data.service';
import { MatPaginator } from '@angular/material/paginator';
import { SharedService } from '../../Services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';

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

  constructor( private countriesService: CountriesService, private route: ActivatedRoute ) {
    this.formSuccessStories = new FormGroup({
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
      paradesMercat: new FormControl('')
    })
    this.id = this.route.snapshot.paramMap.get('id')
    this.getContries()
  }

  getContries() {
    this.countriesService.getAll()
      .subscribe((countries:CountriesDTO[])=> {
        this.countries = countries
    })
  }

  onSubmit() {
   console.log(this.formSuccessStories.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

}
