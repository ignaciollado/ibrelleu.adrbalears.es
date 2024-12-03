export class AccountDTO {
  id: number
  mainContact: string
  nif: string
  legalForm: string
  companyName: string
  tradeMarkName: string
  sector: string
  registrationDate: Date
  consultant: string
  delegation: string
  town: string
  activityType: string

  constructor(
    id: number,
    mainContact: string,
    nif: string,
    legalForm: string,
    companyName: string,
    tradeMarkName: string,
    sector: string,
    registrationDate: Date,
    consultant: string,
    delegation: string,
    town: string,
    activityType: string
  ) {
    this.id = id
    this.mainContact = mainContact
    this.nif = nif,
    this.legalForm = legalForm,
    this.companyName = companyName,
    this.tradeMarkName = tradeMarkName,
    this.sector = sector,
    this.registrationDate = registrationDate,
    this.consultant = consultant,
    this.delegation = delegation,
    this.town = town,
    this.activityType = activityType
    }
}

export const accountColumns = [
  {
    key: "mainContact",
    type: "url",
    label: "Contacto principal"
  },
  {
    key: "legalForm",
    type: "readOnly",
    label: "forma jurídica"
  },
  {
    key: "companyName",
    type: "readOnly",
    label: "Razón social"
  },
  {
    key: "nif",
    type: "readOnly",
    label: "NIF"
  },
  {
    key: "tradeMarkName",
    type: "readOnly",
    label: "Nombre marca comercial OLD"
  },
  {
    key: "sector",
    type: "readOnly",
    label: "Sector"
  },
  {
    key: "activityType",
    type: "readOnly",
    label: "Actividad"
  },
  {
    key: "town",
    type: "readOnly",
    label: "Población"
  },
  {
    key: "consultant",
    type: "readOnly",
    label: "Consultor"
  },    
  {
    key: "delegation",
    type: "scope",
    label: "Delegación"
  },
  {
    key: "registrationDate",
    type: "date",
    label: "Fecha de alta"
  },  
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  },
]