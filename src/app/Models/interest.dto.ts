export class InterestDTO {
    id: number;
    contact: string;
    interestStatus: string;
    interestIbrelleuProject: string;
    interestConsultant: string;
    interestDelegation: string;
    interestedGrantorProject: string;
    interestedConsultant: string;
    interestedDelegation: string;
    sendInterest: string;
    creationDate: Date

    constructor(
        id: number,
        contact: string,
        interestStatus: string,
        interestIbrelleuProject: string,
        interestConsultant: string,
        interestDelegation: string,
        interestedGrantorProject: string,
        interestedConsultant: string,
        interestedDelegation: string,
        sendInterest: string,
        creationDate: Date
    ) {
        this.id = id
        this.contact = contact
        this.interestStatus = interestStatus
        this.interestIbrelleuProject = interestIbrelleuProject
        this.interestConsultant = interestConsultant
        this.interestDelegation = interestDelegation
        this.interestedGrantorProject = interestedGrantorProject
        this.interestedConsultant = interestedConsultant
        this.interestedDelegation = interestedDelegation
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
        key: "interestedGrantorProject",
        type: "scope",
        label: "interestedGrantorProject"
    },
    {
        key: "interestedConsultant",
        type: "scope",
        label: "interestedConsultant"
    },
    {
        key: "interestedDelegation",
        type: "scope",
        label: "interestedDelegation"
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