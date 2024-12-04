import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'adr-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss'
})
export class ContactDetailComponent {
  items = ['Informació del contacte', 'Dades de contacte', 'Localització', 'Informació laboral i curricular', 'Documentació'];
  expandedIndex = 0;
  isElevated: boolean = true
  formContactDetail: FormGroup;

  constructor() {
    this.formContactDetail = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      nacionalidad: new FormControl(''),
      perfilTecnicoCedente: new FormControl('', [Validators.required]),
      estadoContacto: new FormControl('', [Validators.required]),
      genero: new FormControl(''),
      motivoEstado: new FormControl(''),
      consultor: new FormControl(''),
      aceptaRGPD: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.formContactDetail.value);
    // Aquí puedes llamar a tu servicio para guardar los datos en MariaDB
  }
}
