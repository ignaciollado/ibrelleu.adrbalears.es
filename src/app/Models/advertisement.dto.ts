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
  grantorprojectid?: number;
  relleuprojectid?: number;
  projecttype: string;
  id: number;

  constructor(
    projecttype: string,
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
    grantorprojectid?: number,
    relleuprojectid?: number
  ) {
    this.projecttype = projecttype;
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
    this.grantorprojectid = grantorprojectid;
    this.relleuprojectid = relleuprojectid;
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
    key: "publicinweb",
    type: "webBoolean",
  },
  {
    key: "publicationdate",
    type: "date",
  },
]