import { Routes } from '@angular/router';
import { Home } from './home/home';
import { ProfessionalExperience } from './professional-experience/professional-experience';
import { Education } from './education/education';
import { Contact } from './contact/contact';
import { About } from './about/about';



export const routes: Routes = [
    { 
      path: '', 
      component: Home,
      children: [
        { path: '', component: About, title: 'Carolina Díaz | About me' },
        { path: 'professional-experience', component: ProfessionalExperience, title: 'Carolina Díaz | Professional Experience' },
        { path: 'education', component: Education, title: 'Carolina Díaz | Education' },
        { path: 'keep-in-touch', component: Contact, title: 'Carolina Díaz | Keep in Touch' }
      ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];
