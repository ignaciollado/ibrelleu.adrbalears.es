export class AdvertisementDTO {
  anunci?: string;
  codi?: string;
  interesPublicarMarketplace?: boolean;
  estatAnunci?: string;
  idioma?: string;
  titolAnunci?: string;
  dataPublicacio?: Date;
  descripcioAnunci?: string;
  experienciaCompetencies?: string;
  publicatWeb?: boolean;
  notes?: string;
  idAccount: number;
  id: number;

  constructor(
    idAccount: number,
    id: number,
    anunci?: string,
    codi?: string,
    interesPublicarMarketplace?: boolean,
    estatAnunci?: string,
    idioma?: string,
    titolAnunci?: string,
    dataPublicacio?: Date,
    descripcioAnunci?: string,
    experienciaCompetencies?: string,
    publicatWeb?: boolean,
    notes?: string,
  ) {
    this.idAccount = idAccount;
    this.id = id;
    this.anunci = anunci;
    this.codi = codi;
    this.interesPublicarMarketplace = interesPublicarMarketplace;
    this.estatAnunci = estatAnunci;
    this.idioma = idioma;
    this.titolAnunci = titolAnunci;
    this.dataPublicacio = dataPublicacio;
    this.descripcioAnunci = descripcioAnunci;
    this.experienciaCompetencies = experienciaCompetencies;
    this.publicatWeb = publicatWeb;
    this.notes = notes;
  }
}