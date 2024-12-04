import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';

@Component({
  selector: 'adr-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})
export class ContactDetailComponent {
  items = ['Informació del contacte', 'Dades de contacte', 'Localització', 'Informació laboral i curricular', 'Documentació'];
  perfilTecnicoItems = ['Reemprendedor', 'Cedente', 'Externo', 'Usuario de servicio PH/REC']
  expandedIndex = 0;
  isElevated: boolean = true
  formContactDetail: FormGroup
  countries:CountriesDTO[] = []
  firstPanelOpenState: boolean = false;
  secondPanelOpenState: boolean = false;
  thirdPanelOpenState: boolean = false;
  fourthPanelOpenState: boolean = false;



  constructor( private countriesService: CountriesService) {
    this.formContactDetail = new FormGroup({
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
    });
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

  onFileSelected(e:Event) {
    console.log (e)
  }
}
