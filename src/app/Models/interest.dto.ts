export class InterestDTO {
  id: bigint;
  codi?: string;
  dataGeneracio?: Date;
  estatInteres?: string;
  comentari?: string;
  interessat?: string;
  contacte?: string;
  telefonContacte?: string;
  correuContacte?: string;
  codiPCInteressat?: string;
  projecteCedentInteressat?: string;
  codiPRInteressat?: string;
  projecteReempresaInteressat?: string;
  consultorContacteInteressat?: string;
  delegacioInteressat?: string;
  telefonConsultorInteressat?: string;
  correuConsultorInteressat?: string;
  interessatEn?: string;
  anunci?: string;
  enllaçAnunciWeb?: string;
  codiPCDesitjat?: string;
  projecteCedentDesitjat?: string;
  codiPRDesitjat?: string;
  projecteReempresaDesitjat?: string;
  consultorProjecteDesitjat?: string;
  delegacioProjecteDesitjat?: string;
  telefonConsultorDesitjat?: string;
  correuConsultorDesitjat?: string;
  derivacioInteres?: string;
  comentariDerivacio?: string;
  enviarInteres?: boolean;
  documentacio?: string;
  fitxerAdjunt?: string;

  constructor(
    id: bigint,
    codi?: string,
    dataGeneracio?: Date,
    estatInteres?: string,
    comentari?: string,
    interessat?: string,
    contacte?: string,
    telefonContacte?: string,
    correuContacte?: string,
    codiPCInteressat?: string,
    projecteCedentInteressat?: string,
    codiPRInteressat?: string,
    projecteReempresaInteressat?: string,
    consultorContacteInteressat?: string,
    delegacioInteressat?: string,
    telefonConsultorInteressat?: string,
    correuConsultorInteressat?: string,
    interessatEn?: string,
    anunci?: string,
    enllaçAnunciWeb?: string,
    codiPCDesitjat?: string,
    projecteCedentDesitjat?: string,
    codiPRDesitjat?: string,
    projecteReempresaDesitjat?: string,
    consultorProjecteDesitjat?: string,
    delegacioProjecteDesitjat?: string,
    telefonConsultorDesitjat?: string,
    correuConsultorDesitjat?: string,
    derivacioInteres?: string,
    comentariDerivacio?: string,
    enviarInteres?: boolean,
    documentacio?: string,
    fitxerAdjunt?: string
  ) {
    this.id = id;
    this.codi = codi;
    this.dataGeneracio = dataGeneracio;
    this.estatInteres = estatInteres;
    this.comentari = comentari;
    this.interessat = interessat;
    this.contacte = contacte;
    this.telefonContacte = telefonContacte;
    this.correuContacte = correuContacte;
    this.codiPCInteressat = codiPCInteressat;
    this.projecteCedentInteressat = projecteCedentInteressat;
    this.codiPRInteressat = codiPRInteressat;
    this.projecteReempresaInteressat = projecteReempresaInteressat;
    this.consultorContacteInteressat = consultorContacteInteressat;
    this.delegacioInteressat = delegacioInteressat;
    this.telefonConsultorInteressat = telefonConsultorInteressat;
    this.correuConsultorInteressat = correuConsultorInteressat;
    this.interessatEn = interessatEn;
    this.anunci = anunci;
    this.enllaçAnunciWeb = enllaçAnunciWeb;
    this.codiPCDesitjat = codiPCDesitjat;
    this.projecteCedentDesitjat = projecteCedentDesitjat;
    this.codiPRDesitjat = codiPRDesitjat;
    this.projecteReempresaDesitjat = projecteReempresaDesitjat;
    this.consultorProjecteDesitjat = consultorProjecteDesitjat;
    this.delegacioProjecteDesitjat = delegacioProjecteDesitjat;
    this.telefonConsultorDesitjat = telefonConsultorDesitjat;
    this.correuConsultorDesitjat = correuConsultorDesitjat;
    this.derivacioInteres = derivacioInteres;
    this.comentariDerivacio = comentariDerivacio;
    this.enviarInteres = enviarInteres;
    this.documentacio = documentacio;
    this.fitxerAdjunt = fitxerAdjunt;
  }
}

export const interestColumns = [
  {
    key: 'codi',
    type: 'url',
  },
  {
    key: 'crationDate',
    type: 'date',
  },
  {
    key: 'interestState',
    type: 'readOnly',
  },
  {
    key: 'contact',
    type: 'readOnly',
  },
  {
    key: 'pcCodeInter',
    type: 'readOnly',
  },
  {
    key: 'prCodeInter',
    type: 'readOnly',
  },
  {
    key: 'consultInter',
    type: 'readOnly',
  },
  {
    key: 'delegationInter',
    type: 'readOnly',
  },
  {
    key: 'creationDate',
    type: 'date',
  },
];