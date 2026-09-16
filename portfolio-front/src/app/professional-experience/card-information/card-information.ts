import { Component, input } from '@angular/core';
import { ProfessionalExperience } from '../../shared/models/professional-experience';
import { ListGroup } from "../../shared/list-group/list-group";

@Component({
  selector: 'app-card-information',
  imports: [ListGroup],
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

  private getToLocaleDateString(date: Date | null | undefined): string {
    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC'
    };
    return date?.toLocaleDateString('en-US', options) ?? '-';
  }

  getEndDate(date: Date | null | undefined): string {
    if (date === null) {
      return 'Present';
    }
    return date ? this.getToLocaleDateString(date) : '-';
  }

  getDateToString(startDate: Date | null | undefined, endDate: Date | null | undefined): string {
    const startDateToString = this.getToLocaleDateString(startDate);
    const endDateToString = this.getEndDate(endDate);
    if (endDate === null || startDate?.getUTCFullYear() !== endDate?.getUTCFullYear()) {
      return `${startDateToString} - ${endDateToString}`;
    }
    return `${startDateToString.split(' ')[0]} - ${endDateToString}`;
  }

  getListGroupItems(dates: { startDate: Date; endDate: Date | null }[] | undefined): string[] {
    if (!dates || dates.length === 0) {
      return [];
    }
    return dates.map(dateRange => {
      return this.getDateToString(dateRange.startDate, dateRange.endDate);
    });
  }
}
