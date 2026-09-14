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
            company: "Freelance",
            position: "Software Engineer",
            startDate: new Date("2026-09-01"),
            endDate: new Date(),
            description: `Develop and maintain application platforms for Escuela de Natha Yoga (Natha Yoga School) using Laravel, Zend Framework and PHP.`,
            stack: ["PHP", "Laravel", "Zend Framework", "MariaDB", "HTML", "Javascript", "CSS"]
        },
        {
            company: "UNICEN",
            position: "Graduate Teaching Assistant",
            dates: [
                { startDate: new Date("2026-08-01"), endDate: new Date() }, 
                { startDate: new Date("2024-10-01"), endDate: new Date("2026-05-31") },
                { startDate: new Date("2020-05-01"), endDate: new Date("2021-09-30") },
                { startDate: new Date("2019-04-01"), endDate: new Date("2019-09-30") }
            ],
            description: `I taught several different courses over the years at university. My current teaching role is for one of the last courses in the program, called “Compiladores e intérpretes 1” (“Compilers and interpreters 1”)`,
            stack: [""]
        },
        {
            company: "LIESA",
            position: "Software Developer",
            startDate: new Date("2024-09-01"),
            endDate: new Date("2026-05-31"),
            description: `Developed UI component library follows a Figma design. Used Bootstrap v5 for utility classes and LESS. 
            Developed and maintained applications using Angular v18 (HTML, SCSS, TypeScript), Odoo, Magento 2, PHP, JavaScript, .NET (C#) for an electrical distribution products.`,
            stack: ["Angular-v18", "TypeScript", "SCSS", ".NET", "C#", "Odoo", "Magento 2", "PHP", "JavaScript", "LESS"]
        },
        {
            company: "HMS",
            position: "Software Developer",
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-09-30"),
            description: `Implemented scalable and maintainable software solutions using Angular v18 for Argentine digital company health.`,
            stack: ["Angular-v18", "TypeScript", "SCSS", "JavaScript"]
        },
        {
            company: "Freelance",
            position: "Front-End Developer",
            startDate: new Date("2022-03-01"),
            endDate: new Date("2023-01-31"),
            description: `Provided support and maintenance for existing systems using Angular v15.
            Developed and maintained frontend web applications using Wordpress, Javascript and PHP for lawyer service application in cloud-based environments (AWS).`,
            stack: ["Angular-v15", "WordPress", "PHP", "JavaScript", "SCSS"]
        },
        {
            company: "EDSA",
            position: "Software Developer",
            startDate: new Date("2021-05-01"),
            endDate: new Date("2021-12-31"),
            description: `Worked on support and maintenance using PL/SQL, JavaScript, and JSP and developed frontend features using Angular v15 for a private health insurance in a software factory company.`,
            stack: ["PL/SQL", "JavaScript", "JSP", "Angular-v15", "Azure"]
        },
        {
            company: "Pladema",
            position: "Front-End Developer",
            startDate: new Date("2020-08-01"),
            endDate: new Date("2021-05-31"),
            description: `Developed and maintabled user interfaces using Angular v11 (HTML, SCSS, TypeScript) for urban video surveillance system platform in Tandil.`,
            stack: ["Angular-v11", "HTML", "SCSS", "TypeScript"]
        },
        {
            company: "Pladema",
            position: "Intern",
            startDate: new Date("2019-08-01"),
            endDate: new Date("2020-08-31"),
            description: `Test and analysis of AI platforms (YOLOv3) using Python.`,
            stack: ["Python", "Yolov3", "TensorFlow", "Javascript"]
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
        },
        {
            name: "Email",
            url: "mailto:diazmariacarolina6@gmail.com",
            icon: "assets/icons-email.svg"
        }
    ];

    readonly user = signal<UserInformation>({
        fullname: 'María Carolina Díaz Castro',
        name: 'Carolina',
        nickname: 'Caro',
        degree: 'Software engineer',
        about: `Hi there! I’m Caro and I'm a software engineer. I have experience in software development and expertise in the frontend and backend areas. When I'm faced with new challenges, I start with a thorough analysis and ask the necessary questions upfront, so the requirements are clear before I begin. I like to collaborate on projects where I can give my ideas and share my knowledge with others. I consider myself a curious person so I love learning new things and staying up to date with the latest in tech.
Throughout my career I worked collaboratively with teams in research like Pladema, software factories like EDSA, Argentine digital company health like Health Management Solutions (HMS) and an electrical distribution products like LIESA. At my first work experience, I worked as an intern at Pladema in a research team doing “Test and analysis of AI platforms”. In that role, I won the 1st prize at EST, JAIIO 49 with "Bad Smell Detection in Microservices-based Applications” at UNICEN.
Currently, I work as a software engineer doing a collaboration at the Escuela de Natha Yoga (Natha Yoga School) platform and I teach as a Teaching Assistant at UNICEN. My first experience as a Teaching Assistant started in 2019, after that, I taught several different courses over the years. I like to mentor others. My current teaching role is for one of the last courses in the program, called “Compilers and interpreters 1”.
In my spare time, you can find me hiking, cycling, doing pottery or dancing tango. Also, I like reading sci-fi or fantasy novels so much. Some of my current favorite authors are Brandon Sanderson and Solvej Balle. It’s very important to me to be close to the people I care about, so I love hanging out with friends or family and spending time with my partner.`,
        location: 'Tandil, Buenos Aires, Argentina',
        workAuthorization: 'EU / Argentina',
        email: 'diazmariacarolina6@gmail.com',
        languages: this.languages,
        professionalExperiences: this.professionalExperiences,
        professionalNetworks: this.professionalNetworks,
    });

    readonly education = signal<ProfessionalExperience>({
        company: "UNICEN",
        position: "Bachelor’s Degree in Software Engineering",
        startDate: new Date("2015-03-01"),
        endDate: new Date("2026-07-01"),
        description: `Thesis: Bad Smell Detection in Microservices-based Applications (Technologies: Java, Maven, Spring Boot, Docker.).`,
        stack: []
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

    getEducation(): ProfessionalExperience {
        return this.education();
    }
}


