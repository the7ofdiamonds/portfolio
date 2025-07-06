import {
  Skill,
  SkillsObject,
  Skills as SkillsCommunications,
  SkillObject,
} from '@the7ofdiamonds/communications';

import { Framework, Language, ProjectType, Service, Technology } from './Skill';
import { ProjectSkills } from './ProjectSkills';

export class Skills extends SkillsCommunications {
  types: Set<ProjectType> = new Set();
  languages: Set<Language> = new Set();
  frameworks: Set<Framework> = new Set();
  technologies: Set<Technology> = new Set();
  services: Set<Service> = new Set();
  count: number;

  constructor(data?: SkillsObject) {
    super(data);

    if (data && data.list && data.list.length > 0) {
      this.types = this.getProjectTypes(data.list);
      this.languages = this.getLanguages(data.list);
      this.frameworks = this.getFrameworks(data.list);
      this.technologies = this.getTechnologies(data.list);
      this.services = this.getServices(data.list);
    }

    this.count = this.getCount();
  }

  getProjectTypes(data: Array<SkillObject>) {
    const projectType = new ProjectType();

    let types: Set<ProjectType> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === projectType.path) {
        types.add(new ProjectType(skillObject));
      }
    });

    return types;
  }

  getLanguages(data: Array<Record<string, any>> = []) {
    const language = new Language();

    let languages: Set<Language> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === language.path) {
        languages.add(new Language(skillObject));
      }
    });

    return languages;
  }

  getFrameworks(data: Array<Record<string, any>> = []) {
    const framework = new Framework();

    let frameworks: Set<Framework> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === framework.path) {
        frameworks.add(new Framework(skillObject));
      }
    });

    return frameworks;
  }

  getTechnologies(data: Array<Record<string, any>> = []) {
    const technology = new Technology();

    let technologies: Set<Technology> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === technology.path) {
        technologies.add(new Technology(skillObject));
      }
    });

    return technologies;
  }

  getServices(data: Array<Record<string, any>> = []) {
    const service = new Service();

    let services: Set<Service> = new Set();

    data.forEach((skillObject) => {
      if (skillObject.path === service.path) {
        services.add(new Service(skillObject));
      }
    });

    return services;
  }

  existsInSet(skills: Set<Skill>, skill: Skill) {
    const map = new Map(Array.from(skills).map((skill) => [skill.id, skill]));

    return map.has(skill.id);
  }

  filter(term: string): Skill {
    return this.list.find((skill) => skill.id === term) ?? new Skill();
  }

  // show(skillsUsed: ProjectSkills): ProjectSkills {
  //   const filteredSkills: ProjectSkills = new ProjectSkills();
  //   const skills = new Skills();

  //   const { types, languages, frameworks, technologies, services } = skills;

  //   if (skillsUsed.count > 0) {
  //     if (skillsUsed.types && skillsUsed.types.size > 0) {
  //       skillsUsed.types.forEach((typeUsed) => {
  //         this.types?.forEach((type) => {
  //           if (typeUsed.id === type.id) {
  //             if (filteredSkills.types) {
  //               filteredSkills.types.add(type);
  //             } else {
  //               filteredSkills.types = new Set([type]);
  //             }
  //           }
  //         });
  //       });
  //     }

  //     if (skillsUsed.languages && skillsUsed.languages.size > 0) {
  //       skillsUsed.languages.forEach((languageUsed) => {
  //         this.languages?.forEach((language) => {
  //           if (languageUsed.id === language.id) {
  //             if (filteredSkills.languages) {
  //               filteredSkills.languages.add(language);
  //             } else {
  //               filteredSkills.languages = new Set([language]);
  //             }
  //           }
  //         });
  //       });
  //     }

  //     if (skillsUsed.frameworks && skillsUsed.frameworks.size > 0) {
  //       skillsUsed.frameworks.forEach((frameworkUsed) => {
  //         this.frameworks?.forEach((framework) => {
  //           if (frameworkUsed.id === framework.id) {
  //             if (filteredSkills.frameworks) {
  //               filteredSkills.frameworks.add(framework);
  //             } else {
  //               filteredSkills.frameworks = new Set([framework]);
  //             }
  //           }
  //         });
  //       });
  //     }

  //     if (skillsUsed.technologies && skillsUsed.technologies.size > 0) {
  //       skillsUsed.technologies.forEach((technologyUsed) => {
  //         this.technologies?.forEach((technology) => {
  //           if (technologyUsed.id === technology.id) {
  //             if (filteredSkills.technologies) {
  //               filteredSkills.technologies.add(technology);
  //             } else {
  //               filteredSkills.technologies = new Set([technology]);
  //             }
  //           }
  //         });
  //       });
  //     }

  //     if (skillsUsed.services && skillsUsed.services.size > 0) {
  //       skillsUsed.services.forEach((serviceUsed) => {
  //         this.services?.forEach((service) => {
  //           if (serviceUsed.id === service.id) {
  //             if (filteredSkills.services) {
  //               filteredSkills.services.add(service);
  //             } else {
  //               filteredSkills.services = new Set([service]);
  //             }
  //           }
  //         });
  //       });
  //     }
  //   }

  //   return filteredSkills;
  // }

  getCount(): number {
    let types = this.types ? this.types.size : 0;
    let languages = this.languages ? this.languages.size : 0;
    let frameworks = this.frameworks ? this.frameworks.size : 0;
    let technologies = this.technologies ? this.technologies.size : 0;
    let services = this.services ? this.services.size : 0;

    return types + languages + frameworks + technologies + services;
  }

  getAll() {
    let types = this.types ? this.types : [];
    let languages = this.languages ? this.languages : [];
    let frameworks = this.frameworks ? this.frameworks : [];
    let technologies = this.technologies ? this.technologies : [];
    let services = this.services ? this.services : [];

    return Array.from([
      ...types,
      ...languages,
      ...frameworks,
      ...technologies,
      ...services,
    ]);
  }
}
