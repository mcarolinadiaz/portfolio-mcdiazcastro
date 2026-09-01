import { Component, input } from '@angular/core';
import { ProfessionalExperience } from '../../models/professional-experience';
import { DatePipe } from '@angular/common';
import { ListGroup } from "./list-group/list-group";

@Component({
  selector: 'app-card-information',
  imports: [DatePipe, ListGroup],
  templateUrl: './card-information.html',
  styleUrl: './card-information.scss',
})
export class CardInformation {
  professionalExperience = input.required<ProfessionalExperience>();
  
  get experience(): ProfessionalExperience {
      return this.professionalExperience();
  }

  get isTeachingAssistant(): boolean {
    return this.experience.company.includes('UNICEN');
  }

  getEndDate(date: Date | null | undefined): string {
    if (date && date.getDate() === new Date().getDate()) {
      return 'Present';
    }
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      year: '2-digit'
    };
    return date ? date.toLocaleDateString('en-US', options) : '-';
  }

  getListGroupItems(dates: { startDate: Date; endDate: Date | null }[] | undefined): string[] {
    if (!dates || dates.length === 0) {
      return [];
    }
    return dates.map(dateRange => {
      const startDate = dateRange.startDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      const endDate = this.getEndDate(dateRange.endDate);
      return `${startDate} - ${endDate}`;
    });
  }
}
