// export class SuccessStoriesDTO {
//   identificacio: string;
//   codi: string;
//   dataEntradaTransmissio: Date;
//   nomProjecte: string;
//   personaResponsable: string;
//   personaResponsableContacte: boolean;
//   compte: string;
//   gestioProjecte: string;
//   consultor: string;
//   delegacio: string;
//   estatProjecte: string;
//   observacionsEstatProjecte: string;
//   comEnsHaConegut: string;
//   preferenciesEmpresaReemprendre: string;
//   enviarCorreuAutomatic: boolean;
//   perfilEmpresaDesitjada: string;
//   sectorPrincipal: string;
//   activitat1: string;
//   sector2: string;
//   activitat2: string;
//   interesMercatMunicipal: boolean;
//   interesFranquicia: boolean;
//   ambitGeografic: string;
//   provincia: string;
//   comunidadAutonoma: string;
//   pais: string;
//   numeroMaximTreballadors: number;
//   numeroMinimTreballadors: number;
//   propietatLocal: boolean;
//   motiuCessio: string;
//   capacitatInversio: number;
//   intervalPreuCessio: number;
//   aportacionsSocis: number;
//   financamentParticular: number;
//   financamentBancari: number;
//   capitalitzacioAtur: number;
//   financamentAltres: number;
//   totalCapacitatEconomica: number;
//   comReempren: string;
//   motiuReemprendre: string;
//   passesRealitzades: string;
//   avantatgesProjecteReempresa: string;
//   dificultatsProjecteReempresa: string;
//   formacioManca: string;
//   dataLimitReemprendre: Date;
//   contacteEmpresaCedent: boolean;
//   dadesEmpresaCedent: string;
//   contacteIntermediari: boolean;
//   dadesIntermediari: string;

//   constructor(
//     identificacio: string,
//     codi: string,
//     dataEntradaTransmissio: Date,
//     nomProjecte: string,
//     personaResponsable: string,
//     personaResponsableContacte: boolean,
//     compte: string,
//     gestioProjecte: string,
//     consultor: string,
//     delegacio: string,
//     estatProjecte: string,
//     observacionsEstatProjecte: string,
//     comEnsHaConegut: string,
//     preferenciesEmpresaReemprendre: string,
//     enviarCorreuAutomatic: boolean,
//     perfilEmpresaDesitjada: string,
//     sectorPrincipal: string,
//     activitat1: string,
//     sector2: string,
//     activitat2: string,
//     interesMercatMunicipal: boolean,
//     interesFranquicia: boolean,
//     ambitGeografic: string,
//     provincia: string,
//     comunidadAutonoma: string,
//     pais: string,
//     numeroMaximTreballadors: number,
//     numeroMinimTreballadors: number,
//     propietatLocal: boolean,
//     motiuCessio: string,
//     capacitatInversio: number,
//     intervalPreuCessio: number,
//     aportacionsSocis: number,
//     financamentParticular: number,
//     financamentBancari: number,
//     capitalitzacioAtur: number,
//     financamentAltres: number,
//     totalCapacitatEconomica: number,
//     comReempren: string,
//     motiuReemprendre: string,
//     passesRealitzades: string,
//     avantatgesProjecteReempresa: string,
//     dificultatsProjecteReempresa: string,
//     formacioManca: string,
//     dataLimitReemprendre: Date,
//     contacteEmpresaCedent: boolean,
//     dadesEmpresaCedent: string,
//     contacteIntermediari: boolean,
//     dadesIntermediari: string
//   ) {
//     this.identificacio = identificacio;
//     this.codi = codi;
//     this.dataEntradaTransmissio = dataEntradaTransmissio;
//     this.nomProjecte = nomProjecte;
//     this.personaResponsable = personaResponsable;
//     this.personaResponsableContacte = personaResponsableContacte;
//     this.compte = compte;
//     this.gestioProjecte = gestioProjecte;
//     this.consultor = consultor;
//     this.delegacio = delegacio;
//     this.estatProjecte = estatProjecte;
//     this.observacionsEstatProjecte = observacionsEstatProjecte;
//     this.comEnsHaConegut = comEnsHaConegut;
//     this.preferenciesEmpresaReemprendre = preferenciesEmpresaReemprendre;
//     this.enviarCorreuAutomatic = enviarCorreuAutomatic;
//     this.perfilEmpresaDesitjada = perfilEmpresaDesitjada;
//     this.sectorPrincipal = sectorPrincipal;
//     this.activitat1 = activitat1;
//     this.sector2 = sector2;
//     this.activitat2 = activitat2;
//     this.interesMercatMunicipal = interesMercatMunicipal;
//     this.interesFranquicia = interesFranquicia;
//     this.ambitGeografic = ambitGeografic;
//     this.provincia = provincia;
//     this.comunidadAutonoma = comunidadAutonoma;
//     this.pais = pais;
//     this.numeroMaximTreballadors = numeroMaximTreballadors;
//     this.numeroMinimTreballadors = numeroMinimTreballadors;
//     this.propietatLocal = propietatLocal;
//     this.motiuCessio = motiuCessio;
//     this.capacitatInversio = capacitatInversio;
//     this.intervalPreuCessio = intervalPreuCessio;
//     this.aportacionsSocis = aportacionsSocis;
//     this.financamentParticular = financamentParticular;
//     this.financamentBancari = financamentBancari;
//     this.capitalitzacioAtur = capitalitzacioAtur;
//     this.financamentAltres = financamentAltres;
//     this.totalCapacitatEconomica = totalCapacitatEconomica;
//     this.comReempren = comReempren;
//     this.motiuReemprendre = motiuReemprendre;
//     this.passesRealitzades = passesRealitzades;
//     this.avantatgesProjecteReempresa = avantatgesProjecteReempresa;
//     this.dificultatsProjecteReempresa = dificultatsProjecteReempresa;
//     this.formacioManca = formacioManca;
//     this.dataLimitReemprendre = dataLimitReemprendre;
//     this.contacteEmpresaCedent = contacteEmpresaCedent;
//     this.dadesEmpresaCedent = dadesEmpresaCedent;
//     this.contacteIntermediari = contacteIntermediari;
//     this.dadesIntermediari = dadesIntermediari;
//   }
// }

export class SuccessStoriesDTO {
  id: number;

  // Dades generals
  caseName?: string;
  reenterpriseTypology?: string;
  process?: string;
  ibrelleuProject?: string;
  grantorProject?: string;
  mainSector?: string;
  mainActivity?: string;
  zipCode?: string;
  poblacio?: string;
  comarca?: string;
  province?: string;
  consultant?: string;
  delegation?: string;

  // Acord
  cessionDate?: Date;
  contractTypology?: string;
  transferTypology?: string;
  transferPrice?: number;
  propertyValue?: number;
  comercialEstablishmentSell?: boolean;
  paymentType?: string;
  paymentTypology?: string;
  numberOfHiredWorkers?: number;
  numberOfSavedWorkers?: number;
  numberOfEnterpriseWorkers?: number;
  totalOfWorkers?: number;
  agreementFramework?: string

  // Dades projecte IBRelleu
  ibrelleuPersonFullName?: string;
  ibrelleuPersonPhone?: string;
  ibrelleuPersonMail?: string;
  ibrelleuPersonDniNie?: string;
  ibrelleuPersonLegalForm?: string;
  ibrelleuCompanyNif?: string;

  // Testimonial
  webTestimonial?: boolean;
  testimonialsObservations?: string;

  // Seguiment
  offeredServiceSummary?: string;

  creationDate?: Date

  constructor(
    id?: number,
    caseName?: string,
    reenterpriseTypology?: string,
    process?: string,
    ibrelleuProject?: string,
    grantorProject?: string,
    mainSector?: string,
    mainActivity?: string,
    zipCode?: string,
    poblacio?: string,
    comarca?: string,

    province?: string,
    consultant?: string,
    delegation?: string,
    cessionDate?: Date,
    contractTypology?: string,
    transferTypology?: string,
    transferPrice?: number,
    propertyValue?: number,
    comercialEstablishmentSell?: boolean,
    paymenType?: string,
    paymentTypology?: string,
    numberOfHiredWorkers?: number,
    numberOfSavedWorkers?: number,
    numberOfEnterpriseWorkers?: number,
    totalOfWorkers?: number,
    agreementFramework?: string,
    ibrelleuPersonFullName?: string,
    ibrelleuPersonPhone?: string,
    ibrelleuPersonMail?: string,
    ibrelleuPersonDniNie?: string,
    ibrelleuPersonLegalForm?: string,
    ibrelleuCompanyNif?: string,
    webTestimonial?: boolean,
    testimonialsObservations?: string,
    offeredServiceSummary?: string,
    creationDate?: Date
  ) {
    this.id = id
    this.caseName = caseName,
      this.reenterpriseTypology = reenterpriseTypology
    this.process = process
    this.ibrelleuProject = ibrelleuProject
    this.grantorProject = grantorProject
    this.mainSector = mainSector
    this.mainActivity = mainActivity
    this.zipCode = zipCode
    this.poblacio = poblacio
    this.comarca = comarca
    this.province = province
    this.consultant = consultant
    this.delegation = delegation
    this.cessionDate = cessionDate
    this.contractTypology = contractTypology
    this.transferTypology = transferTypology
    this.transferPrice = transferPrice
    this.propertyValue = propertyValue
    this.comercialEstablishmentSell = comercialEstablishmentSell,
      this.paymentType = paymenType
    this.paymentTypology = paymentTypology
    this.numberOfHiredWorkers = numberOfHiredWorkers
    this.numberOfSavedWorkers = numberOfSavedWorkers
    this.numberOfEnterpriseWorkers = numberOfEnterpriseWorkers
    this.totalOfWorkers = totalOfWorkers
    this.agreementFramework = agreementFramework
    this.ibrelleuPersonFullName = ibrelleuPersonFullName
    this.ibrelleuPersonPhone = ibrelleuPersonPhone
    this.ibrelleuPersonMail = ibrelleuPersonMail
    this.ibrelleuPersonDniNie = ibrelleuPersonDniNie
    this.ibrelleuPersonLegalForm = ibrelleuPersonLegalForm
    this.ibrelleuCompanyNif = ibrelleuCompanyNif
    this.webTestimonial = webTestimonial
    this.testimonialsObservations = testimonialsObservations
    this.offeredServiceSummary = offeredServiceSummary
    this.creationDate = creationDate
  }
}

export const SuccessStoriesColumnsBBDD = [
  {
    key: "caseName",
    type: "url"
  },
  {
    key: "process",
    type: "readOnly"
  },
  {
    key: "ibrelleuProject",
    type: "readOnly"
  },
  {
    key: "grantorProject",
    type: "readOnly"
  },
  {
    key: "mainSector",
    type: "readOnly"
  },
  {
    key: "mainActivity",
    type: "readOnly"
  },
  {
    key: "transferPrice",
    type: "money"
  },
  {
    key: "numberOfHiredWorkers",
    type: "number"
  },
  {
    key: "numberOfSavedWorkers",
    type: "number"
  },
  {
    key: "numberOfEnterpriseWorkers",
    type: "number"
  },
  {
    key: "totalOfWorkers",
    type: "number"
  },
  {
    key: "delegation",
    type: "scope"
  },
  {
    key: "creationDate",
    type: "date"
  },
]