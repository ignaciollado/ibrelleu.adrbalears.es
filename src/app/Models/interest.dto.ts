export class InterestDTO {
    id: number;
    contact: string;
    interestStatus: string;
    interestIbrelleuProject: string;
    interestConsultant: string;
    interestDelegation: string;
    desiredGrantorProject: string;
    desiredGrantorProjectConsultant: string;
    desiredGrantorProjectDelegation: string;
    sendInterest: string;
    creationDate: Date

    constructor(
        id: number,
        contact: string,
        interestStatus: string,
        interestIbrelleuProject: string,
        interestConsultant: string,
        interestDelegation: string,
        desiredGrantorProject: string,
        desiredGrantorProjectConsultant: string,
        desiredGrantorProjectDelegation: string,
        sendInterest: string,
        creationDate: Date
    ) {
        this.id = id
        this.contact = contact
        this.interestStatus = interestStatus
        this.interestIbrelleuProject = interestIbrelleuProject
        this.interestConsultant = interestConsultant
        this.interestDelegation = interestDelegation
        this.desiredGrantorProject = desiredGrantorProject
        this.desiredGrantorProjectConsultant = desiredGrantorProjectConsultant
        this.desiredGrantorProjectDelegation = desiredGrantorProjectDelegation
        this.sendInterest = sendInterest
        this.creationDate = creationDate
    }
}

export const interestColumns = [
    {
        key: "contact",
        type: "url",
        label: "contact"
    },
    {
        key: "interestStatus",
        type: "scope",
        label: "interestStatus"
    },
    {
        key: "interestIbrelleuProject",
        type: "scope",
        label: "interestIbrelleuProject"
    },
    {
        key: "interestConsultant",
        type: "scope",
        label: "interestConsultant"
    },
    {
        key: "interestDelegation",
        type: "scope",
        label: "interestDelegation"
    },
    {
        key: "desiredGrantorProject",
        type: "scope",
        label: "desiredGrantorProject"
    },
    {
        key: "desiredGrantorProjectConsultant",
        type: "scope",
        label: "desiredGrantorProjectConsultant"
    },
    {
        key: "desiredGrantorProjectDelegation",
        type: "scope",
        label: "desiredGrantorProjectDelegation"
    },
    {
        key: "sendInterest",
        type: "scope",
        label: "sendInterest"
    },
    {
        key: "creationDate",
        type: "date",
        label: "creationDate"
    }
]