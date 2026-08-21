import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProfessionalExperience } from './professional-experience/professional-experience';
import { TechnicalSkills } from './technical-skills/technical-skills';
import { Education } from './education/education';
import { Contact } from './contact/contact';
import { About } from './about/about';



export const routes: Routes = [
    { 
      path: '', 
      component: Home,
      children: [
        { path: '', redirectTo: 'about', pathMatch: 'full' }, // default route
        { path: 'about', component: About, title: 'About me | MCDíazCastro' },
        { path: 'professional-experience', component: ProfessionalExperience, title: 'Professional Experience | MCDíazCastro' },
        { path: 'technical-skills', component: TechnicalSkills, title: 'Technical Skills | MCDíazCastro' },
        { path: 'education', component: Education, title: 'Education | MCDíazCastro' },
        { path: 'keep-in-touch', component: Contact, title: 'Keep in Touch | MCDíazCastro' }
      ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];
