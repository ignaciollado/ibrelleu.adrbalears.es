export class AccountDTO {
  id: number;
  mainContact: string;
  nif: string;
  legalForm: string;
  companyName: string;
  tradeMarkName: string;
  sector: string;
  registrationDate: string;
  consultant: string;
  delegation: string;
  town: string;
  activityType: string;

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
    this.id = id;
    this.mainContact = mainContact;
    (this.nif = nif),
      (this.legalForm = legalForm),
      (this.companyName = companyName),
      (this.tradeMarkName = tradeMarkName),
      (this.sector = sector),
      (this.registrationDate = registrationDate),
      (this.consultant = consultant),
      (this.delegation = delegation),
      (this.town = town),
      (this.activityType = activityType);
  }
}

export const accountColumns = [
  {
    key: 'companyName',
    type: 'url',
    label: 'Raó Social',
  },
  {
    key: 'legalForm',
    type: 'readOnly',
    label: 'Forma jurídica',
  },
  {
    key: 'nif',
    type: 'readOnly',
    label: 'NIF',
  },
  {
    key: 'tradeMarkName',
    type: 'readOnly',
    label: 'Nombre marca comercial OLD',
  },
  {
    key: 'sector',
    type: 'readOnly',
    label: 'Sector',
  },
  {
    key: 'activityType',
    type: 'readOnly',
    label: 'Activitat',
  },
  {
    key: 'town',
    type: 'readOnly',
    label: 'Població',
  },
  {
    key: 'consultant',
    type: 'readOnly',
    label: 'Consultor',
  },
  {
    key: 'delegation',
    type: 'scope',
    label: 'Delegació',
  },
  {
    key: 'registrationDate',
    type: 'date',
    label: "Data d'entrada",
    labeles: 'Fecha de entrada',
  }
];

export const accountColumnsBBDD = [
  {
    key: 'rao_social',
    type: 'url',
    label: 'Raó Social',
  },
  {
    key: 'forma_juridica',
    type: 'readOnly',
    label: 'Forma jurídica',
  },
  {
    key: 'nif',
    type: 'readOnly',
    label: 'NIF',
  },
  {
    key: 'nom_comercial',
    type: 'readOnly',
    label: 'Nombre marca comercial OLD',
  },
  {
    key: 'sector_principal',
    type: 'readOnly',
    label: 'Sector',
  },
  {
    key: 'activitat_principal',
    type: 'readOnly',
    label: 'Activitat',
  },
  {
    key: 'poblacio',
    type: 'readOnly',
    label: 'Població',
  },
  {
    key: 'consultor',
    type: 'readOnly',
    label: 'Consultor',
  },
  {
    key: 'delegacio',
    type: 'scope',
    label: 'Delegació',
  },
  {
    key: 'data_entrada',
    type: 'date',
    label: "Data d'entrada",
    labeles: 'Fecha de entrada',
  }
];
