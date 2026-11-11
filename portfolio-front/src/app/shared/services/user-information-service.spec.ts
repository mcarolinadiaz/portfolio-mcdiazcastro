import { TestBed } from '@angular/core/testing';
import { UserInformationService } from './user-information-service';
import { SKILL_CATEGORY } from '../../core/constants/skill-categories';

describe('UserInformationService', () => {
  let service: UserInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the configured languages, experiences, networks, education, and certifications', () => {
    expect(service.getLanguages()).toEqual([
      { idiom: 'LANGUAGES_INFO.SPANISH', level: 'LANGUAGES_INFO.NATIVE' },
      { idiom: 'LANGUAGES_INFO.ENGLISH', level: 'LANGUAGES_INFO.B2' },
    ]);
    expect(service.getProfessionalExperiences()).toHaveLength(8);
    expect(service.getProfessionalExperiences()[0].position).toBe(
      'EXPERIENCE.FREELANCE_SWE.POSITION',
    );
    expect(service.getProfessionalNetworks().map((network) => network.name)).toEqual([
      'LinkedIn',
      'GitHub',
      'Email',
    ]);
    expect(service.getEducation().position).toBe('EDUCATION_DEGREE.POSITION');
    expect(service.getCertifications()).toHaveLength(4);
    expect(service.getCertifications()[0].position).toBe('CERTIFICATIONS_INFO.SOLVD.POSITION');
  });

  it('should return unique technical skills in experience order', () => {
    expect(service.getTechnicalSkills()).toEqual([
      'PHP',
      'Laravel',
      'Zend Framework',
      'MariaDB',
      'HTML',
      'JavaScript',
      'CSS',
      'Angular-v18',
      'TypeScript',
      'SCSS',
      '.NET',
      'C#',
      'Odoo',
      'Magento 2',
      'LESS',
      'Angular-v15',
      'WordPress',
      'PL/SQL',
      'JSP',
      'Azure',
      'Angular-v11',
      'Python',
      'Yolov3',
      'TensorFlow',
      'Claude',
      'Github Copilot',
      'Opencode',
    ]);
  });

  it('should classify every technical skill in a known category', () => {
    const categories = service.getTechnicalSkillGroups().map((group) => group.category);

    expect(categories).not.toContain(SKILL_CATEGORY.OTHER);
  });

  it('should group every technical skill exactly once', () => {
    const grouped = service.getTechnicalSkillGroups().flatMap((group) => group.skills);

    expect([...grouped].sort()).toEqual([...service.getTechnicalSkills()].sort());
  });
});
