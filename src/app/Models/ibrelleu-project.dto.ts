export class IBRelleuProjectsDTO {
  id: number;
  ibrelleuProjectName: string;
  projectStatus: string;
  mainSector: string;
  mainActivity: string;
  totalEconomicSituation: number;
  consultant: string;
  delegation: string;
  creationDate: string;

  constructor(
    id: number,
    ibrelleuProjectName: string,
    projectStatus: string,
    mainSector: string,
    mainActivity: string,
    totalEconomicSituation: number,
    consultant: string,
    delegation: string,
    creationDate: string
  ) {
    this.id = id;
    this.ibrelleuProjectName = ibrelleuProjectName;
    this.projectStatus = projectStatus;
    this.mainSector = mainSector;
    this.mainActivity = mainActivity;
    this.totalEconomicSituation = totalEconomicSituation;
    this.consultant = consultant;
    this.delegation = delegation;
    this.creationDate = creationDate;
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
