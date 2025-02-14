export class SuccessStoriesDTO {
    identificacio: string;
    codi: string;
    dataEntradaTransmissio: Date;
    nomProjecte: string;
    personaResponsable: string;
    personaResponsableContacte: boolean;
    compte: string;
    gestioProjecte: string;
    consultor: string;
    delegacio: string;
    estatProjecte: string;
    observacionsEstatProjecte: string;
    comEnsHaConegut: string;
    preferenciesEmpresaReemprendre: string;
    enviarCorreuAutomatic: boolean;
    perfilEmpresaDesitjada: string;
    sectorPrincipal: string;
    activitat1: string;
    sector2: string;
    activitat2: string;
    interesMercatMunicipal: boolean;
    interesFranquicia: boolean;
    ambitGeografic: string;
    provincia: string;
    comunidadAutonoma: string;
    pais: string;
    numeroMaximTreballadors: number;
    numeroMinimTreballadors: number;
    propietatLocal: boolean;
    motiuCessio: string;
    capacitatInversio: number;
    intervalPreuCessio: number;
    aportacionsSocis: number;
    financamentParticular: number;
    financamentBancari: number;
    capitalitzacioAtur: number;
    financamentAltres: number;
    totalCapacitatEconomica: number;
    comReempren: string;
    motiuReemprendre: string;
    passesRealitzades: string;
    avantatgesProjecteReempresa: string;
    dificultatsProjecteReempresa: string;
    formacioManca: string;
    dataLimitReemprendre: Date;
    contacteEmpresaCedent: boolean;
    dadesEmpresaCedent: string;
    contacteIntermediari: boolean;
    dadesIntermediari: string;
  
    constructor(
      identificacio: string,
      codi: string,
      dataEntradaTransmissio: Date,
      nomProjecte: string,
      personaResponsable: string,
      personaResponsableContacte: boolean,
      compte: string,
      gestioProjecte: string,
      consultor: string,
      delegacio: string,
      estatProjecte: string,
      observacionsEstatProjecte: string,
      comEnsHaConegut: string,
      preferenciesEmpresaReemprendre: string,
      enviarCorreuAutomatic: boolean,
      perfilEmpresaDesitjada: string,
      sectorPrincipal: string,
      activitat1: string,
      sector2: string,
      activitat2: string,
      interesMercatMunicipal: boolean,
      interesFranquicia: boolean,
      ambitGeografic: string,
      provincia: string,
      comunidadAutonoma: string,
      pais: string,
      numeroMaximTreballadors: number,
      numeroMinimTreballadors: number,
      propietatLocal: boolean,
      motiuCessio: string,
      capacitatInversio: number,
      intervalPreuCessio: number,
      aportacionsSocis: number,
      financamentParticular: number,
      financamentBancari: number,
      capitalitzacioAtur: number,
      financamentAltres: number,
      totalCapacitatEconomica: number,
      comReempren: string,
      motiuReemprendre: string,
      passesRealitzades: string,
      avantatgesProjecteReempresa: string,
      dificultatsProjecteReempresa: string,
      formacioManca: string,
      dataLimitReemprendre: Date,
      contacteEmpresaCedent: boolean,
      dadesEmpresaCedent: string,
      contacteIntermediari: boolean,
      dadesIntermediari: string
    ) {
      this.identificacio = identificacio;
      this.codi = codi;
      this.dataEntradaTransmissio = dataEntradaTransmissio;
      this.nomProjecte = nomProjecte;
      this.personaResponsable = personaResponsable;
      this.personaResponsableContacte = personaResponsableContacte;
      this.compte = compte;
      this.gestioProjecte = gestioProjecte;
      this.consultor = consultor;
      this.delegacio = delegacio;
      this.estatProjecte = estatProjecte;
      this.observacionsEstatProjecte = observacionsEstatProjecte;
      this.comEnsHaConegut = comEnsHaConegut;
      this.preferenciesEmpresaReemprendre = preferenciesEmpresaReemprendre;
      this.enviarCorreuAutomatic = enviarCorreuAutomatic;
      this.perfilEmpresaDesitjada = perfilEmpresaDesitjada;
      this.sectorPrincipal = sectorPrincipal;
      this.activitat1 = activitat1;
      this.sector2 = sector2;
      this.activitat2 = activitat2;
      this.interesMercatMunicipal = interesMercatMunicipal;
      this.interesFranquicia = interesFranquicia;
      this.ambitGeografic = ambitGeografic;
      this.provincia = provincia;
      this.comunidadAutonoma = comunidadAutonoma;
      this.pais = pais;
      this.numeroMaximTreballadors = numeroMaximTreballadors;
      this.numeroMinimTreballadors = numeroMinimTreballadors;
      this.propietatLocal = propietatLocal;
      this.motiuCessio = motiuCessio;
      this.capacitatInversio = capacitatInversio;
      this.intervalPreuCessio = intervalPreuCessio;
      this.aportacionsSocis = aportacionsSocis;
      this.financamentParticular = financamentParticular;
      this.financamentBancari = financamentBancari;
      this.capitalitzacioAtur = capitalitzacioAtur;
      this.financamentAltres = financamentAltres;
      this.totalCapacitatEconomica = totalCapacitatEconomica;
      this.comReempren = comReempren;
      this.motiuReemprendre = motiuReemprendre;
      this.passesRealitzades = passesRealitzades;
      this.avantatgesProjecteReempresa = avantatgesProjecteReempresa;
      this.dificultatsProjecteReempresa = dificultatsProjecteReempresa;
      this.formacioManca = formacioManca;
      this.dataLimitReemprendre = dataLimitReemprendre;
      this.contacteEmpresaCedent = contacteEmpresaCedent;
      this.dadesEmpresaCedent = dadesEmpresaCedent;
      this.contacteIntermediari = contacteIntermediari;
      this.dadesIntermediari = dadesIntermediari;
    }
  }

export const successStoriesColumns = [
  {
    key: 'companyName',
    type: 'url',
    label: 'Nombre',
    /*  label_ca: 'Nom', */
  },
  {
    key: 'delegation',
    type: 'text',
    label: 'Delegación',
    /*  label_ca: 'Delegació', */
  },
  {
    key: 'process',
    type: 'readOnly',
    label: 'Proceso',
    /*    label_ca: 'Procés', */
  },
  {
    key: 'grantorProject',
    type: 'readOnly',
    label: 'Proyecto cedente',
    /*  label_ca: 'Projecte cedent', */
  },
  {
    key: 'reInterpriseProject',
    type: 'readOnly',
    label: 'Proyecto IbRelleu',
    /*     label_ca: 'Projecte IbRelleu', */
  },
  {
    key: 'mainSector',
    type: 'readOnly',
    label: 'Sector principal',
    /*     label_ca: 'Sector principal', */
  },
  {
    key: 'activityType',
    type: 'readOnly',
    label: 'Actividad',
    /*     label_ca: 'Activitat', */
  },
  {
    key: 'transferPrice',
    type: 'money',
    label: 'Precio de cesión',
    /*     label_ca: 'Preu de cesió', */
  },
  {
    key: 'numWorkersToBehired',
    type: 'number',
    label: 'Núm. de trabajadores para contratar',
    /*     label_ca: 'Núm. de treballadors per contractar', */
  },
  {
    key: 'numWorkersSaved',
    type: 'number',
    label: 'Núm. de trabajadores salvados',
    /*     label_ca: 'Núm. de treballadores salvats', */
  },
  {
    key: 'numEntrepreneursWhoWillWork',
    type: 'number',
    label: 'Núm. de trabajadores emprendedores que trabajaran',
    /*     label_ca: 'Núm. de treballadors emprenedors que treballaran', */
  },
  {
    key: 'numPeopleWorkingAtIbRelleu',
    type: 'number',
    label: 'Núm. total de personas trabajadoras',
    /*     label_ca: 'Núm. total de persones treballadores', */
  },
  {
    key: 'creationDate',
    type: 'text',
    label: 'Fecha de creación',
    /*     label_ca: 'Data de creació', */
  },
];
