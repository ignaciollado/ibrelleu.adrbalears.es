export class AccountDTO {
  id: number
  mainContact: string
  nif: string
  legalForm: string
  companyName: string
  tradeMarkName: string
  sector: string
  registrationDate: string
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
    registrationDate: string,
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
    type: "readOnly",
    label: "Contacte principal"
  },
  {
    key: "legalForm",
    type: "readOnly",
    label: "Forma jurídica"
  },
  {
    key: "companyName",
    type: "url",
    label: "Raó Social"
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
    label: "Activitat"
  },
  {
    key: "town",
    type: "readOnly",
    label: "Població"
  },
  {
    key: "consultant",
    type: "readOnly",
    label: "Consultor"
  },    
  {
    key: "delegation",
    type: "scope",
    label: "Delegació"
  },
  {
    key: "registrationDate",
    type: "date",
    label: "Data d'entrada",
    labeles: "Fecha de entrada"
  }/* ,  
  {
    key: "isEdit",
    type: "isEdit",
    label: "Edit row"
  }, */
]