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
  transferPrice: number;
  transferPriceInterval: string;
  facturation: number;
  earnings: number;
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
    transferPrice: number,
    transferPriceInterval: string,
    facturation: number,
    earnings: number,
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
    label: 'Número de socios',
    label_ca: 'Número de socis',
  },
  {
    key: 'workersNum',
    type: 'number',
    label: 'Número de trabajadores',
    label_ca: 'Número de treballadors',
  },
  {
    key: 'propertyStatus',
    type: 'readOnly',
    label: 'Local en propiedad o alquiler',
    label_ca: 'Local en propietat o lloguer',
  },
  {
    key: 'transferPrice',
    type: 'money',
    label: 'Precio de cesión',
    label_ca: 'Preu de cessió',
  },
  {
    key: 'transferPriceInterval',
    type: 'readOnly',
    label: 'Intervalo de precio de cesión',
    label_ca: 'Interval de preu de cessió',
  },
  {
    key: 'facturation',
    type: 'money',
    label: 'Facturación',
    label_ca: 'Facturació',
  },
  {
    key: 'earnings',
    type: 'money',
    label: 'Beneficio',
    label_ca: 'Benefici',
  },
  {
    key: 'consultant',
    type: 'readOnly',
    label: 'Consultor',
    label_ca: 'Consultor',
  },
  {
    key: 'delegation',
    type: 'readOnly',
    label: 'Delegación',
    label_ca: 'Degelació',
  },
  {
    key: 'creationDate',
    type: 'date',
    label: 'Fecha de creación',
    label_ca: 'Data de creació',
  },
];
