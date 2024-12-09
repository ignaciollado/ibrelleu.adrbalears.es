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
    label: "Nom complet"
  },
  {
    key: "nif",
    type: "readOnly",
    label: "DNI/NIE"
  },
  {
    key: "mainEmail",
    type: "mail",
    label: "Correu electrònic principal"
  },
  {
    key: "mainPhone",
    type: "text",
    label: "Telèfon principal"
  },
  {
    key: "profile",
    type: "text",
    label: "Perfil"
  },
  {
    key: "state",
    type: "text",
    label: "Estat contacte"
  },
  {
    key: "registrationDate",
    type: "date",
    label: "Data d'entrada"
  },
  {
    key: "consultant",
    type: "text",
    label: "Consultor"
  },
  {
    key: "delegation",
    type: "scope",
    label: "Delegació"
  },
  {
    key: "town",
    type: "text",
    label: "Població"
  },
  {
    key: "employementStatus",
    type: "text",
    label: "Situació laboral"
  },  
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  },
]