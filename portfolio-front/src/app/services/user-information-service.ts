import { Service, signal } from '@angular/core';
import { UserInformation } from '../models/user-information';
import { Language } from '../models/language';
import { ProfessionalExperience } from '../models/professional-experience';
import { ProfessionalNetwork } from '../models/professional-network';

@Service()
export class UserInformationService {
    readonly languages: Language[] = [
        { idiom: 'Español', level: 'Nativo' },
        { idiom: 'Inglés', level: 'Avanzado' },
    ];

    readonly professionalExperiences: ProfessionalExperience[] = [
        {
            company: "UNICEN",
            position: "Graduate Teaching Assistant",
            dates: [
                { startDate: new Date("2026-08-01"), endDate: new Date() }, 
                { startDate: new Date("2024-10-01"), endDate: new Date("2026-05-31") },
                { startDate: new Date("2020-05-01"), endDate: new Date("2021-09-30") },
                { startDate: new Date("2019-04-01"), endDate: new Date("2019-09-30") }
            ],
            description: "",
            stack: [""]
        },
        {
            company: "LIESA",
            position: "Software Developer",
            startDate: new Date("2024-09-01"),
            endDate: new Date("2026-05-31"),
            description: "Front-End Manager leading development initiatives. Developed web applications using Angular (HTML, SCSS, TypeScript) and .NET (C#). Worked with Odoo, Magento 2, PHP, JavaScript, and LESS. Delivered scalable and maintainable solutions following best practices.",
            stack: ["Angular-v18", "TypeScript", "SCSS", ".NET", "C#", "Odoo", "Magento 2", "PHP", "JavaScript", "LESS"]
        },
        {
            company: "HMS",
            position: "Software Developer",
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-09-30"),
            description: "Developed and maintained applications using Angular. Implemented scalable and maintainable software solutions.",
            stack: ["Angular-v18", "TypeScript", "SCSS", "JavaScript"]
        },
        {
            company: "Freelance",
            position: "Front-End Developer",
            startDate: new Date("2022-03-01"),
            endDate: new Date("2023-01-31"),
            description: "Developed and maintained web applications using Angular and WordPress. Provided support and maintenance for existing systems.",
            stack: ["Angular-v15", "WordPress", "PHP", "JavaScript", "SCSS"]
        },
        {
            company: "Juzto.co",
            position: "Front-End Developer",
            startDate: new Date("2022-10-01"),
            endDate: new Date("2023-01-31"),
            description: "Developed and maintained frontend web applications. Implemented scalable solutions in cloud-based environments. Applied best practices in software development.",
            stack: ["Angular-v15", "WordPress", "PHP", "JavaScript", "SCSS"]
        },
        {
            company: "EDSA",
            position: "Software Developer",
            startDate: new Date("2021-05-01"),
            endDate: new Date("2021-12-31"),
            description: "Worked on support and maintenance using PL/SQL, JavaScript, and JSP. Developed frontend features using Angular. Used tools such as Azure.",
            stack: ["PL/SQL", "JavaScript", "JSP", "Angular-v15", "Azure"]
        },
        {
            company: "Pladema",
            position: "Front-End Developer",
            startDate: new Date("2020-08-01"),
            endDate: new Date("2021-05-31"),
            description: "Developed user interfaces using Angular (HTML, SCSS, TypeScript). Improved usability and performance of applications. Worked with JSON data and version control tools (Git, Taiga). Participated in UX/UI design.",
            stack: ["Angular-v11", "HTML", "SCSS", "TypeScript"]
        }
    ];

    readonly professionalNetworks: ProfessionalNetwork[] = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/mariacarolinadiaz/",
            icon: "assets/icons-linkedin.svg"
        },
        {
            name: "GitHub",
            url: "https://github.com/mcarolinadiaz",
            icon: "assets/icons-github.svg"
        }
    ];

    readonly user = signal<UserInformation>({
        fullname: 'María Carolina Díaz Castro',
        name: 'Carolina',
        nickname: 'Caro',
        degree: 'Software engineer',
        about: 'I am a software engineer...',
        location: 'Tandil, Buenos Aires, Argentina',
        workAuthorization: 'EU / Argentina',
        email: 'diazmariacarolina6@gmail.com',
        languages: this.languages,
        professionalExperiences: this.professionalExperiences,
        professionalNetworks: this.professionalNetworks,
    });

    getLanguages(): Language[] {
        return this.languages;
    }

    getProfessionalExperiences(): ProfessionalExperience[] {
        return this.professionalExperiences;
    }
    
    getProfessionalNetworks(): ProfessionalNetwork[] {
        return this.professionalNetworks;
    }

    getContactInformation(): { email: string; location: string; workAuthorization: string } {
        return {
            email: this.user().email,
            location: this.user().location,
            workAuthorization: this.user().workAuthorization
        };
    }

    getTechnicalSkills(): string[] {
        let stack: string[] = [];
        this.professionalExperiences.forEach(experience => {
            experience.stack.forEach(skill => {
                if (!stack.includes(skill)) {
                    stack.push(skill);
                }
            });
        });
        return stack;
    }
}


