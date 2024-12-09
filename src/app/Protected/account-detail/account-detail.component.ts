import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';

@Component({
  selector: 'adr-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss'
})
export class AccountDetailComponent {
  isElevated: boolean = true
  formAccountDetail: FormGroup
  countries:CountriesDTO[] = []
  firstPanelOpenState: boolean = false;
  secondPanelOpenState: boolean = false;
  thirdPanelOpenState: boolean = false;
  fourthPanelOpenState: boolean = false;

  constructor( private countriesService: CountriesService) {
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
      delegacion: new FormControl('')
    })
    
    this.getContries()
  }

  getContries() {
    this.countriesService.getAll()
      .subscribe((countries:CountriesDTO[])=> {
        this.countries = countries
    })
  }

  onSubmit() {
    //console.log(this.formContactDetail.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }
}
