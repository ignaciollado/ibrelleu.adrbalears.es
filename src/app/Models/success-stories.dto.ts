export class SuccessStoriesDTO {
  id: number
  delegation: string
  companyName: string
  proces: string
  grantorProject: string
  reInterpriseProject: string
  mainSector: string
  activityType: string
  transferPrice: number
  numWorkersToBehired: number
  numWorkersSaved: number
  numEntrepreneursWhoWillWork: number
  numPeopleWoringAtReempres: number
  creationDate: Date


  constructor(
    id: number,
    delegation: string,
    companyName: string,
    proces: string,
    grantorProject: string,
    reInterpriseProject: string,
    mainSector: string,
    activityType: string,
    transferPrice: number,
    numWorkersToBehired: number,
    numWorkersSaved: number,
    numEntrepreneursWhoWillWork: number,
    numPeopleWoringAtReempres: number,
    creationDate: Date,
  ) {
    this.id = id
    this.delegation = delegation,
    this.companyName = companyName,
    this.proces = proces,
    this.grantorProject = grantorProject,
    this.reInterpriseProject = reInterpriseProject,
    this.mainSector = mainSector,
    this.activityType = activityType,
    this.transferPrice = transferPrice,
    this.numWorkersToBehired = numWorkersToBehired,
    this.numWorkersSaved = numWorkersSaved,
    this.numEntrepreneursWhoWillWork = numEntrepreneursWhoWillWork,
    this.numPeopleWoringAtReempres = numPeopleWoringAtReempres,
    this.creationDate = creationDate
    }
}

export const successStoriesColumns = [
  {
    key: "id",
    type: "url",
    label: "Código",
    label_ca: "Codi"
  },
  {
    key: "delegation",
    type: "text",
    label: "Delegación",
    label_ca: "Delegació"
  },
  {
    key: "companyName",
    type: "readOnly",
    label: "Nom",
    label_ca: "Nom"
  },
  {
    key: "proces",
    type: "readOnly",
    label: "Proceso",
    label_ca: "Procés"
  },
  {
    key: "grantorProject",
    type: "readOnly",
    label: "Projecto cedente",
    label_ca: "Projecte cedent"

  },
  {
    key: "reInterpriseProject",
    type: "readOnly",
    label: "Proyecto Reempresa",
    label_ca: "Projecte Reempresa"
  },
  {
    key: "mainSector",
    type: "readOnly",
    label: "Sector principal",
    label_ca: "Sector principal"
  },
  {
    key: "activityType",
    type: "readOnly",
    label: "Actividad",
    label_ca: "Activitat"
  },
  {
    key: "transferPrice",
    type: "money",
    label: "Precio de cesión",
    label_ca: "Preu de cesió"

  },    
  {
    key: "numWorkersToBehired",
    type: "number",
    label: "Núm. de trabajadores para contratar",
    label_ca: "Núm. de treballadors per contractar"
  },
  {
    key: "numWorkersSaved",
    type: "number",
    label: "Núm. de trebajadores salvados",
    label_ca: "Núm. de treballadores salvats"
  },
  {
    key: "numEntrepreneursWhoWillWork",
    type: "number",
    label: "Núm. de trebajadores salvados",
    label_ca: "Núm. de treballadores salvats"
  },
  {
    key: "numPeopleWoringAtReempres",
    type: "number",
    label: "Núm. de emprenedores que trebajarán",
    label_ca: "Núm. de emprenedors que treballaran"
  },
  {
    key: "creationDate",
    type: "text",
    label: "Fecha de creación",
    label_ca: "Data de creació"
  },  
  {
    key: "isEdit",
    type: "isEdit",
    label: ""
  },
]