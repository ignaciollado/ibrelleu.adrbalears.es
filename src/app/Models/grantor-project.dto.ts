export class GrantorProjectsDTO {
  /* Debido a que, por el momento, no se está planteando
    utilizar relaciones con otras entidades, he creado este
    DTO básico que permita mostrar todos los datos en la tabla de grantor-project*/
  id: number;
  grantorProjectName: string;
  projectStatus: string;
  account: string;
  mainSector: string;
  mainActivity: string;
  town: string;
  transferReason: string;
  partnersNum: string;
  workersNum: string;
  propertyStatus: string;
  transferPrice: string;
  transferPriceInterval: string;
  facturation: string;
  earnings: string;
  consultant: string;
  delegation: string;
  creationDate: string;

  constructor(
    id: number,
    grantorProjectName: string,
    projectStatus: string,
    account: string,
    mainSector: string,
    mainActivity: string,
    town: string,
    transferReason: string,
    partnersNum: string,
    workersNum: string,
    propertyStatus: string,
    transferPrice: string,
    transferPriceInterval: string,
    facturation: string,
    earnings: string,
    consultant: string,
    delegation: string,
    creationDate: string
  ) {
    this.id = id;
    this.grantorProjectName = grantorProjectName;
    this.projectStatus = projectStatus;
    this.account = account;
    this.mainSector = mainSector;
    this.mainActivity = mainActivity;
    this.town = town;
    this.transferReason = transferReason;
    this.partnersNum = partnersNum;
    this.workersNum = workersNum;
    this.propertyStatus = propertyStatus;
    this.transferPrice = transferPrice;
    this.transferPriceInterval = transferPriceInterval;
    this.facturation = facturation;
    this.earnings = earnings;
    this.consultant = consultant;
    this.delegation = delegation;
    this.creationDate = creationDate;
  }
}

export const grantorProjectColumns = [
  {
    key: 'id',
    type: 'url',
    label: 'Código',
    label_ca: 'Codi',
  },
  {
    key: 'grantorProjectName',
    type: 'readOnly',
    label: 'Nombre del proyecto',
    label_ca: 'Nom del projecte',
  },
  {
    key: 'projectStatus',
    type: 'readOnly',
    label: 'Estado del proyecto',
    label_ca: 'Estat del projecte',
  },
  {
    key: 'account',
    type: 'readOnly',
    label: 'Cuenta',
    label_ca: 'Compte',
  },
  {
    key: 'mainSector',
    type: 'readOnly',
    label: 'Sector principal',
    label_ca: 'Sector principal',
  },
  {
    key: 'mainActivity',
    type: 'readOnly',
    label: 'Actividad principal',
    label_ca: 'Activitat principal',
  },
  {
    key: 'town',
    type: 'readOnly',
    label: 'Población',
    label_ca: 'Població',
  },
  {
    key: 'transferReason',
    type: 'readOnly',
    label: 'Motivación de la venta',
    label_ca: 'Motivació de la venda',
  },
  {
    key: 'partnersNum',
    type: 'number',
    label: '',
    label_ca: '',
  },
  {
    key: 'workersNum',
    type: 'number',
    label: '',
    label_ca: '',
  },
  {
    key: 'propertyStatus',
    type: 'readOnly',
    label: '',
    label_ca: '',
  },
  {
    key: 'transferPrice',
    type: 'money',
    label: '',
    label_ca: '',
  },
  {
    key: 'transferPriceInterval',
    type: 'readOnly',
    label: '',
    label_ca: '',
  },
  {
    key: 'facturation',
    type: 'money',
    label: '',
    label_ca: '',
  },
  {
    key: 'earnings',
    type: 'money',
    label: '',
    label_ca: '',
  },
  {
    key: 'consultant',
    type: 'readOnly',
    label: '',
    label_ca: '',
  },
  {
    key: 'delegation',
    type: 'readOnly',
    label: '',
    label_ca: '',
  },
  {
    key: 'creationDate',
    type: 'date',
    label: '',
    label_ca: '',
  },
];
