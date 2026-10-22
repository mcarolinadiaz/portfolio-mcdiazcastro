import { Service, signal } from '@angular/core';
import { UserInformation } from '../models/user-information';
import { Language } from '../models/language';
import { ProfessionalExperience } from '../models/professional-experience';
import { ProfessionalNetwork } from '../models/professional-network';
import { COMPANY } from '../../core/constants/companies';

@Service()
export class UserInformationService {
  readonly languages: Language[] = [
    { idiom: 'LANGUAGES_INFO.SPANISH', level: 'LANGUAGES_INFO.NATIVE' },
    { idiom: 'LANGUAGES_INFO.ENGLISH', level: 'LANGUAGES_INFO.UPPER_INTERMEDIATE' },
  ];

  readonly professionalExperiences: ProfessionalExperience[] = [
    {
      company: 'Freelance',
      position: 'EXPERIENCE.FREELANCE_SWE.POSITION',
      startDate: new Date('2026-09-01'),
      endDate: null,
      description: 'EXPERIENCE.FREELANCE_SWE.DESCRIPTION',
      stack: ['PHP', 'Laravel', 'Zend Framework', 'MariaDB', 'HTML', 'Javascript', 'CSS'],
    },
    {
      company: COMPANY.UNICEN,
      position: 'EXPERIENCE.UNICEN_TA.POSITION',
      dates: [
        { startDate: new Date('2026-08-01'), endDate: null },
        { startDate: new Date('2024-10-01'), endDate: new Date('2026-05-31') },
        { startDate: new Date('2020-05-01'), endDate: new Date('2021-09-30') },
        { startDate: new Date('2019-04-01'), endDate: new Date('2019-09-30') },
      ],
      description: 'EXPERIENCE.UNICEN_TA.DESCRIPTION',
      stack: [''],
    },
    {
      company: 'LIESA',
      position: 'EXPERIENCE.LIESA.POSITION',
      startDate: new Date('2024-09-01'),
      endDate: new Date('2026-05-31'),
      description: 'EXPERIENCE.LIESA.DESCRIPTION',
      stack: [
        'Angular-v18',
        'TypeScript',
        'SCSS',
        '.NET',
        'C#',
        'Odoo',
        'Magento 2',
        'PHP',
        'JavaScript',
        'LESS',
      ],
    },
    {
      company: 'HMS',
      position: 'EXPERIENCE.HMS.POSITION',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-09-30'),
      description: 'EXPERIENCE.HMS.DESCRIPTION',
      stack: ['Angular-v18', 'TypeScript', 'SCSS', 'JavaScript'],
    },
    {
      company: 'Freelance',
      position: 'EXPERIENCE.FREELANCE_FRONTEND.POSITION',
      startDate: new Date('2022-03-01'),
      endDate: new Date('2023-01-31'),
      description: 'EXPERIENCE.FREELANCE_FRONTEND.DESCRIPTION',
      stack: ['Angular-v15', 'WordPress', 'PHP', 'JavaScript', 'SCSS'],
    },
    {
      company: 'EDSA',
      position: 'EXPERIENCE.EDSA.POSITION',
      startDate: new Date('2021-05-01'),
      endDate: new Date('2021-12-31'),
      description: 'EXPERIENCE.EDSA.DESCRIPTION',
      stack: ['PL/SQL', 'JavaScript', 'JSP', 'Angular-v15', 'Azure'],
    },
    {
      company: 'Pladema',
      position: 'EXPERIENCE.PLADEMA_FRONTEND.POSITION',
      startDate: new Date('2020-08-01'),
      endDate: new Date('2021-05-31'),
      description: 'EXPERIENCE.PLADEMA_FRONTEND.DESCRIPTION',
      stack: ['Angular-v11', 'HTML', 'SCSS', 'TypeScript'],
    },
    {
      company: 'Pladema',
      position: 'EXPERIENCE.PLADEMA_INTERN.POSITION',
      startDate: new Date('2019-08-01'),
      endDate: new Date('2020-08-31'),
      description: 'EXPERIENCE.PLADEMA_INTERN.DESCRIPTION',
      stack: ['Python', 'Yolov3', 'TensorFlow', 'Javascript'],
    },
  ];

  readonly professionalNetworks: ProfessionalNetwork[] = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mariacarolinadiaz/',
      icon: 'assets/icons-linkedin.svg',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/mcarolinadiaz',
      icon: 'assets/icons-github.svg',
    },
    {
      name: 'Email',
      url: 'mailto:diazmariacarolina6@gmail.com',
      icon: 'assets/icons-email.svg',
    },
  ];

  readonly user = signal<UserInformation>({
    fullname: 'María Carolina Díaz Castro',
    name: 'Carolina',
    nickname: 'Caro',
    degree: 'ABOUT.DEGREE',
    about: 'ABOUT.BIO',
    location: 'Tandil, Buenos Aires, Argentina',
    workAuthorization: 'EU / Argentina',
    email: 'diazmariacarolina6@gmail.com',
    languages: this.languages,
    professionalExperiences: this.professionalExperiences,
    professionalNetworks: this.professionalNetworks,
  });

  readonly education = signal<ProfessionalExperience>({
    company: COMPANY.UNICEN,
    position: 'EDUCATION_DEGREE.POSITION',
    startDate: new Date('2015-03-01'),
    endDate: new Date('2026-07-01'),
    description: 'EDUCATION_DEGREE.DESCRIPTION',
    stack: [],
  });

  readonly certifications = signal<ProfessionalExperience[]>([
    {
      company: 'Solvd',
      position: 'CERTIFICATIONS_INFO.SOLVD.POSITION',
      startDate: new Date('2022-12-01'),
      endDate: new Date('2023-02-28'),
      description: 'CERTIFICATIONS_INFO.SOLVD.DESCRIPTION',
      stack: [],
    },
    {
      company: 'JAIIO 49 (EST Contest)',
      position: 'CERTIFICATIONS_INFO.JAIIO.POSITION',
      startDate: new Date('2021-10-01'),
      endDate: new Date('2021-10-31'),
      description: 'CERTIFICATIONS_INFO.JAIIO.DESCRIPTION',
      stack: [],
    },
    {
      company: 'CACIC',
      position: 'CERTIFICATIONS_INFO.CACIC.POSITION',
      startDate: new Date('2018-10-01'),
      endDate: new Date('2018-10-31'),
      description: 'CERTIFICATIONS_INFO.CACIC.DESCRIPTION',
      stack: [],
    },
    {
      company: 'IBM Program',
      position: 'CERTIFICATIONS_INFO.IBM.POSITION',
      startDate: new Date('2017-10-01'),
      endDate: new Date('2017-10-31'),
      description: 'CERTIFICATIONS_INFO.IBM.DESCRIPTION',
      stack: [],
    },
  ]);

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
      workAuthorization: this.user().workAuthorization,
    };
  }

  getTechnicalSkills(): string[] {
    let stack: string[] = [];
    this.professionalExperiences.forEach((experience) => {
      experience.stack.forEach((skill) => {
        if (!stack.includes(skill)) {
          stack.push(skill);
        }
      });
    });
    stack.push('Claude', 'Github Copilot', 'Opencode');
    return stack;
  }

  getEducation(): ProfessionalExperience {
    return this.education();
  }

  getCertifications(): ProfessionalExperience[] {
    return this.certifications();
  }
}
