export class GrantorProjectsDTO {
  id: number;
  codi?: string;
  dataEntrada?: Date;
  nomProjecte?: string;
  esPropietariContacte?: boolean;
  personaPropietaria?: string;
  compte?: string;
  coneixement?: string;
  gestioProjecte?: string;
  estatProjecte?: string;
  motiuEstatCancelat?: string;
  delegacio?: string;
  observacionsEstat?: string;
  consultor?: string;
  empresaCedent?: boolean;
  tipusCessio?: string;
  anyIniciActivitat?: number;
  localitzacio?: string;
  mateixaLocalitzacioCompte?: boolean;
  mercatMunicipal?: boolean;
  tipusInstalacioMunicipal?: string;
  nomInstalacio?: string;
  especificarInstalacio?: string;
  codiPostal?: string;
  adreca?: string;
  districte?: string;
  poblacio?: string;
  provincia?: string;
  comarca?: string;
  pais?: string;
  comunitatAutonoma?: string;
  noDifusioPoblacio?: boolean;
  detallInstalacions?: string;
  localPropietatLloguer?: boolean;
  superficieLocal?: number;
  condicionsContractuals?: string;
  localNegociVenda?: boolean;
  altresEspecificacionsLocal?: string;
  motivacionsCessio?: string;
  motiuCessio?: string;
  dataMaximaCessio?: Date;
  descripcioMotiuCessio?: string;
  autoritzacioSocis?: boolean;
  intervalPreuCessio?: string;
  disposaPlaCessio?: boolean;
  variacioPreu?: boolean;
  dataVariacio?: Date;
  preuCessio?: number;
  interesValoracioReempresa?: boolean;
  disposaValoracioAliena?: boolean;
  descripcioMetodesValoracio?: string;
  detallOfertaCessio?: string;
  professionalExtern?: string;
  passesRealitzades?: string;
  emailProfessionalExtern?: string;
  telefonProfessionalExtern?: string;
  contacteReemprenedoraExterna?: boolean;
  perfilReemprenedora?: string;
  detallActivitat?: string;
  CNAE?: string;
  sector1?: string;
  activitat1?: string;
  sector2?: string;
  activitat2?: string;
  paradaMercatNoSedentaria?: boolean;
  descripcioActivitatCessio?: string;
  descripcioMercat?: string;
  tipologiaClientela?: string;
  descripcioClientela?: string;
  descripcioProveidors?: string;
  descripcioCompetencia?: string;
  productePropi?: boolean;
  marquesPropies?: boolean;
  descripcioProducteServei?: string;
  nomsMarques?: string;
  renovarNomComercial?: boolean;
  disposaInventari?: boolean;
  disposaAuditoria?: boolean;
  disposaLlicenciaActivitat?: boolean;
  avantatgesEmpresa?: string;
  dificultatsEmpresa?: string;
  exporta?: boolean;
  ambitGeograficExport?: string;
  importa?: boolean;
  ambitGeograficImport?: string;
  detallPersonesTreballadores?: string;
  numeroTreballadorsTotals?: number;
  comentariSalaris?: string;
  // Boolean?
  jornadaCompleta?: boolean;
  comentariAutonomsColaboradors?: string;
  // Boolean?
  jornadaParcial?: boolean;
  observacionsTreballadors?: string;
  continuenTreballadorsDespresCessio?: boolean;
  coneixenTreballadorsSituacio?: boolean;
  facturacioUltimAnyFiscal?: number;
  comentariResultatsUltimAnyFiscal?: string;
  EBITDAUltimAnyFiscal?: number;
  facturacioAnyN1?: number;
  comentariResultatsAnyN1?: string;
  EBITDAAnyN1?: number;
  facturacioAnyN2?: number;
  comentariResultatsAnyN2?: string;
  EBITDAAnyN2?: number;
  resultatUltimAnyFiscal?: number;
  resultatAnyN1?: number;
  resultatAnyN2?: number;

  constructor(
    id: number,
    codi?: string,
    dataEntrada?: Date,
    nomProjecte?: string,
    esPropietariContacte?: boolean,
    personaPropietaria?: string,
    compte?: string,
    coneixement?: string,
    gestioProjecte?: string,
    estatProjecte?: string,
    motiuEstatCancelat?: string,
    delegacio?: string,
    observacionsEstat?: string,
    consultor?: string,
    empresaCedent?: boolean,
    tipusCessio?: string,
    anyIniciActivitat?: number,
    localitzacio?: string,
    mateixaLocalitzacioCompte?: boolean,
    mercatMunicipal?: boolean,
    tipusInstalacioMunicipal?: string,
    nomInstalacio?: string,
    especificarInstalacio?: string,
    codiPostal?: string,
    adreca?: string,
    districte?: string,
    poblacio?: string,
    provincia?: string,
    comarca?: string,
    pais?: string,
    comunitatAutonoma?: string,
    noDifusioPoblacio?: boolean,
    detallInstalacions?: string,
    localPropietatLloguer?: boolean,
    superficieLocal?: number,
    condicionsContractuals?: string,
    localNegociVenda?: boolean,
    altresEspecificacionsLocal?: string,
    motivacionsCessio?: string,
    motiuCessio?: string,
    dataMaximaCessio?: Date,
    descripcioMotiuCessio?: string,
    autoritzacioSocis?: boolean,
    intervalPreuCessio?: string,
    disposaPlaCessio?: boolean,
    variacioPreu?: boolean,
    dataVariacio?: Date,
    preuCessio?: number,
    interesValoracioReempresa?: boolean,
    disposaValoracioAliena?: boolean,
    descripcioMetodesValoracio?: string,
    detallOfertaCessio?: string,
    professionalExtern?: string,
    passesRealitzades?: string,
    emailProfessionalExtern?: string,
    telefonProfessionalExtern?: string,
    contacteReemprenedoraExterna?: boolean,
    perfilReemprenedora?: string,
    detallActivitat?: string,
    CNAE?: string,
    sector1?: string,
    activitat1?: string,
    sector2?: string,
    activitat2?: string,
    paradaMercatNoSedentaria?: boolean,
    descripcioActivitatCessio?: string,
    descripcioMercat?: string,
    tipologiaClientela?: string,
    descripcioClientela?: string,
    descripcioProveidors?: string,
    descripcioCompetencia?: string,
    productePropi?: boolean,
    marquesPropies?: boolean,
    descripcioProducteServei?: string,
    nomsMarques?: string,
    renovarNomComercial?: boolean,
    disposaInventari?: boolean,
    disposaAuditoria?: boolean,
    disposaLlicenciaActivitat?: boolean,
    avantatgesEmpresa?: string,
    dificultatsEmpresa?: string,
    exporta?: boolean,
    ambitGeograficExport?: string,
    importa?: boolean,
    ambitGeograficImport?: string,
    detallPersonesTreballadores?: string,
    numeroTreballadorsTotals?: number,
    comentariSalaris?: string,
    jornadaCompleta?: boolean,
    comentariAutonomsColaboradors?: string,
    jornadaParcial?: boolean,
    observacionsTreballadors?: string,
    continuenTreballadorsDespresCessio?: boolean,
    coneixenTreballadorsSituacio?: boolean,
    facturacioUltimAnyFiscal?: number,
    comentariResultatsUltimAnyFiscal?: string,
    EBITDAUltimAnyFiscal?: number,
    facturacioAnyN1?: number,
    comentariResultatsAnyN1?: string,
    EBITDAAnyN1?: number,
    facturacioAnyN2?: number,
    comentariResultatsAnyN2?: string,
    EBITDAAnyN2?: number,
    resultatUltimAnyFiscal?: number,
    resultatAnyN1?: number,
    resultatAnyN2?: number
  ) {
    this.id = id;
    this.codi = codi;
    this.dataEntrada = dataEntrada;
    this.nomProjecte = nomProjecte;
    this.esPropietariContacte = esPropietariContacte;
    this.personaPropietaria = personaPropietaria;
    this.compte = compte;
    this.coneixement = coneixement;
    this.gestioProjecte = gestioProjecte;
    this.estatProjecte = estatProjecte;
    this.motiuEstatCancelat = motiuEstatCancelat;
    this.delegacio = delegacio;
    this.observacionsEstat = observacionsEstat;
    this.consultor = consultor;
    this.empresaCedent = empresaCedent;
    this.tipusCessio = tipusCessio;
    this.anyIniciActivitat = anyIniciActivitat;
    this.localitzacio = localitzacio;
    this.mateixaLocalitzacioCompte = mateixaLocalitzacioCompte;
    this.mercatMunicipal = mercatMunicipal;
    this.tipusInstalacioMunicipal = tipusInstalacioMunicipal;
    this.nomInstalacio = nomInstalacio;
    this.especificarInstalacio = especificarInstalacio;
    this.codiPostal = codiPostal;
    this.adreca = adreca;
    this.districte = districte;
    this.poblacio = poblacio;
    this.provincia = provincia;
    this.comarca = comarca;
    this.pais = pais;
    this.comunitatAutonoma = comunitatAutonoma;
    this.noDifusioPoblacio = noDifusioPoblacio;
    this.detallInstalacions = detallInstalacions;
    this.localPropietatLloguer = localPropietatLloguer;
    this.superficieLocal = superficieLocal;
    this.condicionsContractuals = condicionsContractuals;
    this.localNegociVenda = localNegociVenda;
    this.altresEspecificacionsLocal = altresEspecificacionsLocal;
    this.motivacionsCessio = motivacionsCessio;
    this.motiuCessio = motiuCessio;
    this.dataMaximaCessio = dataMaximaCessio;
    this.descripcioMotiuCessio = descripcioMotiuCessio;
    this.autoritzacioSocis = autoritzacioSocis;
    this.intervalPreuCessio = intervalPreuCessio;
    this.disposaPlaCessio = disposaPlaCessio;
    this.variacioPreu = variacioPreu;
    this.dataVariacio = dataVariacio;
    this.preuCessio = preuCessio;
    this.interesValoracioReempresa = interesValoracioReempresa;
    this.disposaValoracioAliena = disposaValoracioAliena;
    this.descripcioMetodesValoracio = descripcioMetodesValoracio;
    this.detallOfertaCessio = detallOfertaCessio;
    this.professionalExtern = professionalExtern;
    this.passesRealitzades = passesRealitzades;
    this.emailProfessionalExtern = emailProfessionalExtern;
    this.telefonProfessionalExtern = telefonProfessionalExtern;
    this.contacteReemprenedoraExterna = contacteReemprenedoraExterna;
    this.perfilReemprenedora = perfilReemprenedora;
    this.detallActivitat = detallActivitat;
    this.CNAE = CNAE;
    this.sector1 = sector1;
    this.activitat1 = activitat1;
    this.sector2 = sector2;
    this.activitat2 = activitat2;
    this.paradaMercatNoSedentaria = paradaMercatNoSedentaria;
    this.descripcioActivitatCessio = descripcioActivitatCessio;
    this.descripcioMercat = descripcioMercat;
    this.tipologiaClientela = tipologiaClientela;
    this.descripcioClientela = descripcioClientela;
    this.descripcioProveidors = descripcioProveidors;
    this.descripcioCompetencia = descripcioCompetencia;
    this.productePropi = productePropi;
    this.marquesPropies = marquesPropies;
    this.descripcioProducteServei = descripcioProducteServei;
    this.nomsMarques = nomsMarques;
    this.renovarNomComercial = renovarNomComercial;
    this.disposaInventari = disposaInventari;
    this.disposaAuditoria = disposaAuditoria;
    this.disposaLlicenciaActivitat = disposaLlicenciaActivitat;
    this.avantatgesEmpresa = avantatgesEmpresa;
    this.dificultatsEmpresa = dificultatsEmpresa;
    this.exporta = exporta;
    this.ambitGeograficExport = ambitGeograficExport;
    this.importa = importa;
    this.ambitGeograficImport = ambitGeograficImport;
    this.detallPersonesTreballadores = detallPersonesTreballadores;
    this.numeroTreballadorsTotals = numeroTreballadorsTotals;
    this.comentariSalaris = comentariSalaris;
    this.jornadaCompleta = jornadaCompleta;
    this.comentariAutonomsColaboradors = comentariAutonomsColaboradors;
    this.jornadaParcial = jornadaParcial;
    this.observacionsTreballadors = observacionsTreballadors;
    this.continuenTreballadorsDespresCessio = continuenTreballadorsDespresCessio;
    this.coneixenTreballadorsSituacio = coneixenTreballadorsSituacio;
    this.facturacioUltimAnyFiscal = facturacioUltimAnyFiscal;
    this.comentariResultatsUltimAnyFiscal = comentariResultatsUltimAnyFiscal;
    this.EBITDAUltimAnyFiscal = EBITDAUltimAnyFiscal;
    this.facturacioAnyN1 = facturacioAnyN1;
    this.comentariResultatsAnyN1 = comentariResultatsAnyN1;
    this.EBITDAAnyN1 = EBITDAAnyN1;
    this.facturacioAnyN2 = facturacioAnyN2;
    this.comentariResultatsAnyN2 = comentariResultatsAnyN2;
    this.EBITDAAnyN2 = EBITDAAnyN2;
    this.resultatUltimAnyFiscal = resultatUltimAnyFiscal;
    this.resultatAnyN1 = resultatAnyN1;
    this.resultatAnyN2 = resultatAnyN2;
  }
}

export const grantorProjectColumnsBBDD = [
  {
    key: 'nomProjecte',
    type: 'url'
  },
  {
    key: 'estatProjecte',
    type: 'readOnly'
  },
  {
    key: 'compte',
    type: 'readOnly'
  },
  {
    key: 'sector1',
    type: 'scope'
  },
  {
    key: 'activitat1',
    type: 'scope'
  },
  {
    key: 'poblacio',
    type: 'scope'
  },
  {
    key: 'motiuCessio',
    type: 'readOnly'
  },
  {
    key: 'numeroTreballadorsTotals',
    type: 'scope'
  },
  {
    key: 'localPropietatLloguer',
    type: 'scope'
  },
  {
    key: 'preuCessio',
    type: 'money'
  },
  {
    key: 'intervalPreuCessio',
    type: 'scope'
  },
  {
    key: 'facturacioUltimAnyFiscal',
    type: 'money'
  },
  {
    key: 'resultatUltimAnyFiscal',
    type: 'money'
  },
  {
    key: 'consultor',
    type: 'scope'
  },
  {
    key: 'delegacio',
    type: 'scope'
  },
  {
    key: 'dataEntrada',
    type: 'date'
  },
]

// export const grantorProjectColumns = [
//   {
//     key: 'nomProjecte',
//     type: 'url',
//     label: 'Nombre del proyecto',
//     label_ca: 'Nom del projecte',
//   },
//   {
//     key: 'projectStatus',
//     type: 'readOnly',
//     label: 'Estado del proyecto',
//     label_ca: 'Estat del projecte',
//   },
//   {
//     key: 'account',
//     type: 'readOnly',
//     label: 'Cuenta',
//     label_ca: 'Compte',
//   },
//   {
//     key: 'mainSector',
//     type: 'readOnly',
//     label: 'Sector principal',
//     label_ca: 'Sector principal',
//   },
//   {
//     key: 'mainActivity',
//     type: 'readOnly',
//     label: 'Actividad principal',
//     label_ca: 'Activitat principal',
//   },
//   {
//     key: 'town',
//     type: 'readOnly',
//     label: 'Población',
//     label_ca: 'Població',
//   },
//   {
//     key: 'transferReason',
//     type: 'readOnly',
//     label: 'Motivación de la venta',
//     label_ca: 'Motivació de la venda',
//   },
//   {
//     key: 'partnersNum',
//     type: 'number',
//     label: 'Número de socios',
//     label_ca: 'Número de socis',
//   },
//   {
//     key: 'workersNum',
//     type: 'number',
//     label: 'Número de trabajadores',
//     label_ca: 'Número de treballadors',
//   },
//   {
//     key: 'propertyStatus',
//     type: 'readOnly',
//     label: 'Local en propiedad o alquiler',
//     label_ca: 'Local en propietat o lloguer',
//   },
//   {
//     key: 'transferPrice',
//     type: 'money',
//     label: 'Precio de cesión',
//     label_ca: 'Preu de cessió',
//   },
//   {
//     key: 'transferPriceInterval',
//     type: 'readOnly',
//     label: 'Intervalo de precio de cesión',
//     label_ca: 'Interval de preu de cessió',
//   },
//   {
//     key: 'facturation',
//     type: 'money',
//     label: 'Facturación',
//     label_ca: 'Facturació',
//   },
//   {
//     key: 'earnings',
//     type: 'money',
//     label: 'Beneficio',
//     label_ca: 'Benefici',
//   },
//   {
//     key: 'consultant',
//     type: 'readOnly',
//     label: 'Consultor',
//     label_ca: 'Consultor',
//   },
//   {
//     key: 'delegation',
//     type: 'readOnly',
//     label: 'Delegación',
//     label_ca: 'Degelació',
//   },
//   {
//     key: 'creationDate',
//     type: 'date',
//     label: 'Fecha de creación',
//     label_ca: 'Data de creació',
//   },
// ];
