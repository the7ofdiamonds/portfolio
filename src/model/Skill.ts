import { SkillObject, Skill } from '@the7ofdiamonds/communications';

export class ProjectType extends Skill {  
  readonly path: string = 'project-types';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'project-types' });
  }
}

export class Language extends Skill {
  readonly path: string = 'languages';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'languages' });
  }
}

export class Framework extends Skill {
  readonly path: string = 'frameworks';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'frameworks' });
  }
}

export class Technology extends Skill {
  readonly path: string = 'technologies';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'technologies' });
  }
}

export class Service extends Skill {
  readonly path: string = 'services';

  constructor(data?: SkillObject | Partial<SkillObject>) {
    super({ ...data, path: 'services' });
  }
}
