export class AdvertisementDTO {
  advertisement?: string;
  code?: string;
  publicinmarketplace?: boolean;
  advertisementstate?: string;
  language?: string;
  title?: string;
  publicationdate?: Date;
  description?: string;
  experienciaCompetencies?: string;
  publicinweb?: boolean;
  notes?: string;
  grantorprojectid: number;
  id: number;

  constructor(
    grantorprojectid: number,
    id: number,
    advertisement?: string,
    code?: string,
    publicinmarketplace?: boolean,
    advertisementstate?: string,
    language?: string,
    title?: string,
    publicationdate?: Date,
    description?: string,
    experienciaCompetencies?: string,
    publicinweb?: boolean,
    notes?: string,
  ) {
    this.grantorprojectid = grantorprojectid;
    this.id = id;
    this.advertisement = advertisement;
    this.code = code;
    this.publicinmarketplace = publicinmarketplace;
    this.advertisementstate = advertisementstate;
    this.language = language;
    this.title = title;
    this.publicationdate = publicationdate;
    this.description = description;
    this.experienciaCompetencies = experienciaCompetencies;
    this.publicinweb = publicinweb;
    this.notes = notes;
  }
}

export const advertisementColumnsBBDD = [
  {
    key: "title",
    type: "url",
  },
  {
    key: "language",
    type: "language",
  },
  {
    key: "advertisementstate",
    type: "scope",
  },
  {
    key: "grantorprojectid",
    type: "scope",
  },
  {
    key: "publicationdate",
    type: "date",
  },
]