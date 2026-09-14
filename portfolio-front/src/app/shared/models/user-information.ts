import { Language } from "./language";
import { ProfessionalExperience } from "./professional-experience";
import { ProfessionalNetwork } from "./professional-network";

export interface UserInformation {
    fullname: string;
    name: string;
    nickname: string;
    degree: string;
    about: string;
    location: string;
    workAuthorization: string;
    email: string;
    languages: Language[];
    professionalExperiences: ProfessionalExperience[];
    professionalNetworks: ProfessionalNetwork[];
}
