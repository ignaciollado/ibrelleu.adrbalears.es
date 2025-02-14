export class IBRelleuProjectsDTO {
    id: bigint;
    codi?: string;
    dataEntrada?: Date;
    nomProjecte?: string;
    responsableProjecte?: string;
    esResponsableContacte?: boolean;
    compte?: string;
    gestioProjecte?: string;
    consultor?: string;
    delegacio?: string;
    estatProjecte?: string;
    motiuEstatCancelat?: string;
    observacionsEstat?: string;
    desigTallerMecanic?: boolean;
    coneixement?: string;
    preferenciesEmpresaReemprendre?: string;
    enviarPropostesMatching?: boolean;
    perfilEmpresaDesitjada?: string;
    sectorPrincipal?: string;
    activitat1?: string;
    sector2?: string;
    activitat2?: string;
    interesMercatMunicipal?: boolean;
    interesFranquicia?: boolean;
    ambitGeografic?: string;
    provincia?: string;
    numMaxTreballadors?: number;
    numMinTreballadors?: number;
    propietatLocal?: string;
    motiuCessio?: string;
    capacitatInversio?: number;
    intervalPreuCessio?: string;
    aportacionsSocis?: number;
    financamentParticular?: number;
    financamentBancari?: number;
    capitalitzacioAtur?: number;
    financamentAltres?: number;
    totalCapacitatEconomica?: number;
    comReempren?: string;
    motiuReemprendre?: string;
    passesReemprendre?: string;
    avantatgesProjecteReempresa?: string;
    dificultatsProjecteReempresa?: string;
    formacioManca?: string;
    dataLimitReemprendre?: Date;
    contacteEmpresaCedentExterna?: boolean;
    dadesEmpresaCedent?: string;
    contacteIntermediari?: boolean;
    dadesIntermediari?: string;
  
    constructor(
      id: bigint,
      codi?: string,
      dataEntrada?: Date,
      nomProjecte?: string,
      responsableProjecte?: string,
      esResponsableContacte?: boolean,
      compte?: string,
      gestioProjecte?: string,
      consultor?: string,
      delegacio?: string,
      estatProjecte?: string,
      motiuEstatCancelat?: string,
      observacionsEstat?: string,
      desigTallerMecanic?: boolean,
      coneixement?: string,
      preferenciesEmpresaReemprendre?: string,
      enviarPropostesMatching?: boolean,
      perfilEmpresaDesitjada?: string,
      sectorPrincipal?: string,
      activitat1?: string,
      sector2?: string,
      activitat2?: string,
      interesMercatMunicipal?: boolean,
      interesFranquicia?: boolean,
      ambitGeografic?: string,
      provincia?: string,
      numMaxTreballadors?: number,
      numMinTreballadors?: number,
      propietatLocal?: string,
      motiuCessio?: string,
      capacitatInversio?: number,
      intervalPreuCessio?: string,
      aportacionsSocis?: number,
      financamentParticular?: number,
      financamentBancari?: number,
      capitalitzacioAtur?: number,
      financamentAltres?: number,
      totalCapacitatEconomica?: number,
      comReempren?: string,
      motiuReemprendre?: string,
      passesReemprendre?: string,
      avantatgesProjecteReempresa?: string,
      dificultatsProjecteReempresa?: string,
      formacioManca?: string,
      dataLimitReemprendre?: Date,
      contacteEmpresaCedentExterna?: boolean,
      dadesEmpresaCedent?: string,
      contacteIntermediari?: boolean,
      dadesIntermediari?: string
    ) {
      this.id = id;
      this.codi = codi;
      this.dataEntrada = dataEntrada;
      this.nomProjecte = nomProjecte;
      this.responsableProjecte = responsableProjecte;
      this.esResponsableContacte = esResponsableContacte;
      this.compte = compte;
      this.gestioProjecte = gestioProjecte;
      this.consultor = consultor;
      this.delegacio = delegacio;
      this.estatProjecte = estatProjecte;
      this.motiuEstatCancelat = motiuEstatCancelat;
      this.observacionsEstat = observacionsEstat;
      this.desigTallerMecanic = desigTallerMecanic;
      this.coneixement = coneixement;
      this.preferenciesEmpresaReemprendre = preferenciesEmpresaReemprendre;
      this.enviarPropostesMatching = enviarPropostesMatching;
      this.perfilEmpresaDesitjada = perfilEmpresaDesitjada;
      this.sectorPrincipal = sectorPrincipal;
      this.activitat1 = activitat1;
      this.sector2 = sector2;
      this.activitat2 = activitat2;
      this.interesMercatMunicipal = interesMercatMunicipal;
      this.interesFranquicia = interesFranquicia;
      this.ambitGeografic = ambitGeografic;
      this.provincia = provincia;
      this.numMaxTreballadors = numMaxTreballadors;
      this.numMinTreballadors = numMinTreballadors;
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
      this.passesReemprendre = passesReemprendre;
      this.avantatgesProjecteReempresa = avantatgesProjecteReempresa;
      this.dificultatsProjecteReempresa = dificultatsProjecteReempresa;
      this.formacioManca = formacioManca;
      this.dataLimitReemprendre = dataLimitReemprendre;
      this.contacteEmpresaCedentExterna = contacteEmpresaCedentExterna;
      this.dadesEmpresaCedent = dadesEmpresaCedent;
      this.contacteIntermediari = contacteIntermediari;
      this.dadesIntermediari = dadesIntermediari;
    }
  }

export const ibrelleuProjectColumns = [
  {
    key: 'ibrelleuProjectName',
    type: 'url',
  },
  {
    key: 'projectStatus',
    type: 'readOnly',
  },
  {
    key: 'mainSector',
    type: 'readOnly',
  },
  {
    key: 'mainActivity',
    type: 'readOnly',
  },
  {
    key: 'totalEconomicSituation',
    type: 'money',
  },
  {
    key: 'consultant',
    type: 'readOnly',
  },
  {
    key: 'delegation',
    type: 'readOnly',
  },
  {
    key: 'creationDate',
    type: 'date',
  },
];
