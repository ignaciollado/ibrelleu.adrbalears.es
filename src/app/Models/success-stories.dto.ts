export class SuccessStoriesDTO {
  id: number;
  delegation: string;
  companyName: string;
  proces: string;
  grantorProject: string;
  reInterpriseProject: string;
  mainSector: string;
  activityType: string;
  transferPrice: number;
  numWorkersToBehired: number;
  numWorkersSaved: number;
  numEntrepreneursWhoWillWork: number;
  numPeopleWoringAtReempres: number;
  creationDate: Date;

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
    creationDate: Date
  ) {
    this.id = id
    this.delegation = delegation
    this.companyName = companyName
    this.proces = proces
    this.grantorProject = grantorProject
    this.reInterpriseProject = reInterpriseProject
    this.mainSector = mainSector
    this.activityType = activityType
    this.transferPrice = transferPrice
    this.numWorkersToBehired = numWorkersToBehired
    this.numWorkersSaved = numWorkersSaved
    this.numEntrepreneursWhoWillWork = numEntrepreneursWhoWillWork
    this.numPeopleWoringAtReempres = numPeopleWoringAtReempres
    this.creationDate = creationDate
  }
}

export const successStoriesColumns = [
  {
    key: 'companyName',
    type: 'url',
    label: 'Nombre',

  },
  {
    key: 'delegation',
    type: 'text',
    label: 'Delegación',

  },
  {
    key: 'process',
    type: 'readOnly',
    label: 'Proceso',

  },
  {
    key: 'grantorProject',
    type: 'readOnly',
    label: 'Proyecto cedente',

  },
  {
    key: 'reInterpriseProject',
    type: 'readOnly',
    label: 'Proyecto IbRelleu',

  },
  {
    key: 'mainSector',
    type: 'readOnly',
    label: 'Sector principal',

  },
  {
    key: 'activityType',
    type: 'readOnly',
    label: 'Actividad',

  },
  {
    key: 'transferPrice',
    type: 'money',
    label: 'Precio de cesión',

  },
  {
    key: 'numWorkersToBehired',
    type: 'number',
    label: 'Núm. de trabajadores para contratar',

  },
  {
    key: 'numWorkersSaved',
    type: 'number',
    label: 'Núm. de trabajadores salvados',

  },
  {
    key: 'numEntrepreneursWhoWillWork',
    type: 'number',
    label: 'Núm. de trabajadores emprendedores que trabajaran',

  },
  {
    key: 'numPeopleWorkingAtIbRelleu',
    type: 'number',
    label: 'Núm. total de personas trabajadoras',

  },
  {
    key: 'creationDate',
    type: 'text',
    label: 'Fecha de creación',
  },
];
