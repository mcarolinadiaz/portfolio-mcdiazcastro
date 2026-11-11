import { SkillCategory } from '../../core/constants/skill-categories';

export interface SkillGroup {
  readonly category: SkillCategory;
  readonly skills: readonly string[];
}
