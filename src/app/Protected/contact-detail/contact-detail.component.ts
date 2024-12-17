import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CountriesDTO } from '../../Models/countries.dto';
import { CountriesService } from '../../Services/countries.service';
import { CpibDTO } from '../../Models/cpib.dto';
import { CpibService } from '../../Services/cp-ib.service';

@Component({
  selector: 'adr-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})

export class ContactDetailComponent {
  perfilTecnicoItems_es = ['Reemprendedor', 'Cedente', 'Externo', 'Usuario de servicio PH/REC']
  perfilTecnicoItems_ca = ['Reemprenedor', 'Cedent', 'Extern', 'Usuari de serveis PH/REC']

  estadoContacto_es = ['Pendiente de contactar', 'Activo', 'Volver a contactar', 'Cita programada', 'Cancelado']
  estadoContacto_ca = ['Pendent de contactar', 'Actiu', 'Tornar a contactar', 'Cita programada', 'Cancel·lat']

  timeFrame_es = ['Mañana', 'Tarde', 'Todo el día']
  timeFrame_ca = ['Matí', 'Tarda', 'Tot el día']

  expandedIndex = 0
  isElevated: boolean = true
  formContactDetail: FormGroup
  countries:CountriesDTO[] = []
  firstPanelOpenState: boolean = false
  secondPanelOpenState: boolean = false
  thirdPanelOpenState: boolean = false
  fourthPanelOpenState: boolean = false

  constructor( private countriesService: CountriesService) {
    this.formContactDetail = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      nacionalidad: new FormControl(''),
      perfilTecnicoCedente: new FormControl('', [Validators.required]),
      perfil: new FormControl('', [Validators.required]),
      estadoContacto: new FormControl('', [Validators.required]),
      genero: new FormControl(''),
      motivoEstado: new FormControl(''),
      consultor: new FormControl('', [Validators.required]),
      aceptaRGPD: new FormControl(''),
      delegacion: new FormControl(''),
      prefijo: new FormControl(''),
      mainPhone: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      mainMail: new FormControl('', [Validators.required, Validators.email]),
      secondaryPhone: new FormControl('', [ Validators.minLength(9), Validators.maxLength(9)]),
      secondaryMail: new FormControl('', [ Validators.email]),
      contactingComments: new FormControl(''),
      socialNetTwitter: new FormControl(''),
      socialNetLinkedIn: new FormControl(''),
      socialNetFacebook: new FormControl(''),
      localizationAddress: new FormControl('', [Validators.required, Validators.maxLength(150)]),
      zipCode: new FormControl('', [Validators.minLength(5), Validators.maxLength(5)]),
      localizationCity: new FormControl(''),
      localizationCCAA: new FormControl('Illes Balears'),
      localizationCountry: new FormControl ('España')
    })
    
    this.getContries()
    /* this.getCpIB() */
  }

  getContries() {
    this.countriesService.getAll()
      .subscribe((countries:CountriesDTO[])=> {
        this.countries = countries
    })
  }

/*    getCpIB() {
    this.cpibService.getCPList()
      .subscribe((cpItem:CpibDTO[])=> {
        console.log(cpItem)
    })
  }  */

  onSubmit() {
    console.log(this.formContactDetail.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }

  onFileSelected(e:Event) {
    console.log (e)
  }
}
