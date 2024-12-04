export class ContactDTO {
  id: number
  name: string
  nif: string
  mainEmail: string
  mainPhone: string
  profile: string
  state: string
  registrationDate: Date
  consultant: string
  delegation: string
  town: string
  employementStatus: string

  constructor(
    id: number,
    name: string,
    nif: string,
    mainEmail: string,
    mainPhone: string,
    profile: string,
    state: string,
    registrationDate: Date,
    consultant: string,
    delegation: string,
    town: string,
    employementStatus: string
  ) {
    this.id = id
    this.name = name
    this.nif = nif,
    this.mainEmail = mainEmail,
    this.mainPhone = mainPhone,
    this.profile = profile,
    this.state = state,
    this.registrationDate = registrationDate,
    this.consultant = consultant,
    this.delegation = delegation,
    this.town = town,
    this.employementStatus = employementStatus
    }
}

export const contactColumns = [
  {
    key: "name",
    type: "url",
    label: "Nombre completo"
  },
  {
    key: "nif",
    type: "readOnly",
    label: "DNI/NIE"
  },
  {
    key: "mainEmail",
    type: "mail",
    label: "Correo electrónico principal"
  },
  {
    key: "mainPhone",
    type: "text",
    label: "Teléfono principal"
  },
  {
    key: "profile",
    type: "text",
    label: "Perfíl"
  },
  {
    key: "state",
    type: "text",
    label: "Estado contacto"
  },
  {
    key: "registrationDate",
    type: "date",
    label: "Fecha de alta"
  },
  {
    key: "consultant",
    type: "text",
    label: "Consultor"
  },
  {
    key: "delegation",
    type: "scope",
    label: "Delegación"
  },
  {
    key: "town",
    type: "text",
    label: "Población"
  },
  {
    key: "employementStatus",
    type: "text",
    label: "Estado"
  },  
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  },
]