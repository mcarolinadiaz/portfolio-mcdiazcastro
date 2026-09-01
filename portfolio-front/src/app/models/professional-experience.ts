export interface ProfessionalExperience {
    company: string;
    position: string;
    dates?: { startDate: Date; endDate: Date | null }[];
    startDate?: Date;
    endDate?: Date | null;
    description: string;
    stack: string[];
}
