export class AccountDTO {
  id: number;
  documentacioNif?: string;
  gestionaParadesMercat?: boolean;
  empresaEntitatColaboradora?: boolean;
  gestionaEstablimentsComercials?: boolean;
  gestionaConcessionsAdministratives?: boolean;
  empresaEnFuncionament?: boolean;
  anyConstitucio?: number;
  anyEntradaEmpresa?: number;
  fundacioEmpresa?: string;
  adreca?: string;
  codiPostal?: string;
  provincia?: string;
  comarca?: string;
  pais?: string;
  comunitatAutonoma?: string;
  correuElectronic?: string;
  telefonPrincipal?: string;
  web?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  altresXarxes?: string;
  facebook?: string;
  comptaAmbSuportExtern?: boolean;
  sector2?: string;
  activitat2?: string;
  descripcioActivitat?: string;
  breuDescripcioTrajectoriaEconomica?: string;
  disposaProductePropi?: boolean;
  descripcioProducteServei?: string;
  descripcioProcesProductiu?: string;
  disposaMarquesPropies?: boolean;
  nomsMarques?: string;
  disposaInventari?: boolean;
  descripcioEstatEstoc?: string;
  disposaAuditoria?: boolean;
  disposaLlicenciaActivitat?: boolean;
  descripcioMercat?: string;
  descripcioClientela?: string;
  tipologiaClientela?: string;
  descripcioProveidors?: string;
  descripcioCompetencia?: string;
  detallExportacioImportacio?: string;
  exporta?: boolean;
  ambitGeograficExportacio?: string;
  comentariExportacio?: string;
  importa?: boolean;
  ambitGeograficImportacio?: string;
  comentariImportacio?: string;
  numeroSocis?: number;
  estructuraEmpresa?: string;
  comentariSocis?: string;
  comentariGestioDiaADia?: string;
  jornadaComplerta?: number;
  jornadaParcial?: number;
  numeroTreballadorsTotals?: number;
  comentariAntiguitat?: string;
  comentariSalaris?: string;
  comentariAutonomsColaboradors?: string;
  localPropietatLloguer?: string;
  preuLloguer?: number;
  superficieLocal?: number;
  condicionsContractualsLocal?: string;
  altresEspecificacionsLocal?: string;
  comentariFinancamentEmpresa?: string;
  empresaAmbDeutes?: boolean;
  facturacioUltimAnyFiscal?: number;
  resultatUltimAnyFiscal?: number;
  ebitdaUltimAnyFiscal?: number;
  comentariResultatsUltimAnyFiscal?: string;
  facturacioAnyN1?: number;
  resultatAnyN1?: number;
  comentariResultatsAnyN1?: string;
  ebitdaAnyN1?: number;
  facturacioAnyN2?: number;
  resultatAnyN2?: number;
  comentariResultatsAnyN2?: string;
  ebitdaAnyN2?: number;
  liquidacioIvaModel390?: string;
  liquidacioIrpfModel190?: string;
  declaracioIrpfModel100?: string;
  pagamentsCompteIrpfModel130131?: string;
  fotocopiaCifEmpresa?: string;
  escripturesConstitucioModificacio?: string;
  escripturesPodersSocietat?: string;
  perduesGuanysUltimsAnys?: string;
  balancSituacioUltimsAnys?: string;
  impostSocietatsModel200?: string;

  constructor(
    id: number,
    documentacioNif?: string,
    gestionaParadesMercat?: boolean,
    empresaEntitatColaboradora?: boolean,
    gestionaEstablimentsComercials?: boolean,
    gestionaConcessionsAdministratives?: boolean,
    empresaEnFuncionament?: boolean,
    anyConstitucio?: number,
    anyEntradaEmpresa?: number,
    fundacioEmpresa?: string,
    adreca?: string,
    codiPostal?: string,
    provincia?: string,
    comarca?: string,
    pais?: string,
    comunitatAutonoma?: string,
    correuElectronic?: string,
    telefonPrincipal?: string,
    web?: string,
    instagram?: string,
    linkedin?: string,
    twitter?: string,
    youtube?: string,
    altresXarxes?: string,
    facebook?: string,
    comptaAmbSuportExtern?: boolean,
    sector2?: string,
    activitat2?: string,
    descripcioActivitat?: string,
    breuDescripcioTrajectoriaEconomica?: string,
    disposaProductePropi?: boolean,
    descripcioProducteServei?: string,
    descripcioProcesProductiu?: string,
    disposaMarquesPropies?: boolean,
    nomsMarques?: string,
    disposaInventari?: boolean,
    descripcioEstatEstoc?: string,
    disposaAuditoria?: boolean,
    disposaLlicenciaActivitat?: boolean,
    descripcioMercat?: string,
    descripcioClientela?: string,
    tipologiaClientela?: string,
    descripcioProveidors?: string,
    descripcioCompetencia?: string,
    detallExportacioImportacio?: string,
    exporta?: boolean,
    ambitGeograficExportacio?: string,
    comentariExportacio?: string,
    importa?: boolean,
    ambitGeograficImportacio?: string,
    comentariImportacio?: string,
    numeroSocis?: number,
    estructuraEmpresa?: string,
    comentariSocis?: string,
    comentariGestioDiaADia?: string,
    jornadaComplerta?: number,
    jornadaParcial?: number,
    numeroTreballadorsTotals?: number,
    comentariAntiguitat?: string,
    comentariSalaris?: string,
    comentariAutonomsColaboradors?: string,
    localPropietatLloguer?: string,
    preuLloguer?: number,
    superficieLocal?: number,
    condicionsContractualsLocal?: string,
    altresEspecificacionsLocal?: string,
    comentariFinancamentEmpresa?: string,
    empresaAmbDeutes?: boolean,
    facturacioUltimAnyFiscal?: number,
    resultatUltimAnyFiscal?: number,
    ebitdaUltimAnyFiscal?: number,
    comentariResultatsUltimAnyFiscal?: string,
    facturacioAnyN1?: number,
    resultatAnyN1?: number,
    comentariResultatsAnyN1?: string,
    ebitdaAnyN1?: number,
    facturacioAnyN2?: number,
    resultatAnyN2?: number,
    comentariResultatsAnyN2?: string,
    ebitdaAnyN2?: number,
    liquidacioIvaModel390?: string,
    liquidacioIrpfModel190?: string,
    declaracioIrpfModel100?: string,
    pagamentsCompteIrpfModel130131?: string,
    fotocopiaCifEmpresa?: string,
    escripturesConstitucioModificacio?: string,
    escripturesPodersSocietat?: string,
    perduesGuanysUltimsAnys?: string,
    balancSituacioUltimsAnys?: string,
    impostSocietatsModel200?: string
  ) {
    this.id = id;
    this.documentacioNif = documentacioNif;
    this.gestionaParadesMercat = gestionaParadesMercat;
    this.empresaEntitatColaboradora = empresaEntitatColaboradora;
    this.gestionaEstablimentsComercials = gestionaEstablimentsComercials;
    this.gestionaConcessionsAdministratives = gestionaConcessionsAdministratives;
    this.empresaEnFuncionament = empresaEnFuncionament;
    this.anyConstitucio = anyConstitucio;
    this.anyEntradaEmpresa = anyEntradaEmpresa;
    this.fundacioEmpresa = fundacioEmpresa;
    this.adreca = adreca;
    this.codiPostal = codiPostal;
    this.provincia = provincia;
    this.comarca = comarca;
    this.pais = pais;
    this.comunitatAutonoma = comunitatAutonoma;
    this.correuElectronic = correuElectronic;
    this.telefonPrincipal = telefonPrincipal;
    this.web = web;
    this.instagram = instagram;
    this.linkedin = linkedin;
    this.twitter = twitter;
    this.youtube = youtube;
    this.altresXarxes = altresXarxes;
    this.facebook = facebook;
    this.comptaAmbSuportExtern = comptaAmbSuportExtern;
    this.sector2 = sector2;
    this.activitat2 = activitat2;
    this.descripcioActivitat = descripcioActivitat;
    this.breuDescripcioTrajectoriaEconomica = breuDescripcioTrajectoriaEconomica;
    this.disposaProductePropi = disposaProductePropi;
    this.descripcioProducteServei = descripcioProducteServei;
    this.descripcioProcesProductiu = descripcioProcesProductiu;
    this.disposaMarquesPropies = disposaMarquesPropies;
    this.nomsMarques = nomsMarques;
    this.disposaInventari = disposaInventari
    this.descripcioEstatEstoc = descripcioEstatEstoc,
    this.disposaAuditoria = disposaAuditoria,
    this.disposaLlicenciaActivitat = disposaLlicenciaActivitat,
    this.descripcioMercat = descripcioMercat,
    this.descripcioClientela = descripcioClientela,
    this.tipologiaClientela = tipologiaClientela,
    this.descripcioProveidors = descripcioProveidors,
    this.descripcioCompetencia = descripcioCompetencia,
    this.detallExportacioImportacio = detallExportacioImportacio,
    this.exporta = exporta,
    this.ambitGeograficExportacio = ambitGeograficExportacio,
    this.comentariExportacio = comentariExportacio,
    this.importa = importa,
    this.ambitGeograficImportacio = ambitGeograficImportacio,
    this.comentariImportacio = comentariImportacio,
    this.numeroSocis = numeroSocis,
    this.estructuraEmpresa = estructuraEmpresa,
    this.comentariSocis = comentariSocis,
    this.comentariGestioDiaADia = comentariGestioDiaADia,
    this.jornadaComplerta = jornadaComplerta,
    this.jornadaParcial = jornadaParcial,
    this.numeroTreballadorsTotals = numeroTreballadorsTotals,
    this.comentariAntiguitat = comentariAntiguitat,
    this.comentariSalaris = comentariSalaris,
    this.comentariAutonomsColaboradors = comentariAutonomsColaboradors,
    this.localPropietatLloguer = localPropietatLloguer,
    this.preuLloguer = preuLloguer,
    this.superficieLocal = superficieLocal,
    this.condicionsContractualsLocal = condicionsContractualsLocal,
    this.altresEspecificacionsLocal = altresEspecificacionsLocal,
    this.comentariFinancamentEmpresa = comentariFinancamentEmpresa,
    this.empresaAmbDeutes = empresaAmbDeutes,
    this.facturacioUltimAnyFiscal = facturacioUltimAnyFiscal,
    this.resultatUltimAnyFiscal = resultatUltimAnyFiscal,
    this.ebitdaUltimAnyFiscal = ebitdaUltimAnyFiscal,
    this.comentariResultatsUltimAnyFiscal = comentariResultatsUltimAnyFiscal,
    this.facturacioAnyN1 = facturacioAnyN1,
    this.resultatAnyN1 = resultatAnyN1,
    this.comentariResultatsAnyN1 = comentariResultatsAnyN1,
    this.ebitdaAnyN1 = ebitdaAnyN1,
    this.facturacioAnyN2 = facturacioAnyN2,
    this.resultatAnyN2 = resultatAnyN2,
    this.comentariResultatsAnyN2 = comentariResultatsAnyN2,
    this.ebitdaAnyN2 = ebitdaAnyN2,
    this.liquidacioIvaModel390 = liquidacioIvaModel390,
    this.liquidacioIrpfModel190 = liquidacioIrpfModel190,
    this.declaracioIrpfModel100 = declaracioIrpfModel100,
    this.pagamentsCompteIrpfModel130131 = pagamentsCompteIrpfModel130131,
    this.fotocopiaCifEmpresa = fotocopiaCifEmpresa,
    this.escripturesConstitucioModificacio = escripturesConstitucioModificacio,
    this.escripturesPodersSocietat = escripturesPodersSocietat,
    this.perduesGuanysUltimsAnys = perduesGuanysUltimsAnys,
    this.balancSituacioUltimsAnys = balancSituacioUltimsAnys,
    this.impostSocietatsModel200 = impostSocietatsModel200
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
