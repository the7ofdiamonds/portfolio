import { Model } from './Model';
import {
   Taxonomy,
  Framework,
  Language,
  ProjectType,
  Service,
  Technology,
} from './Taxonomy';
import { ProjectSkills } from './ProjectSkills';

export type SkillsObject = {
  types: Array<Record<string, any>> | null;
  languages: Array<Record<string, any>> | null;
  frameworks: Array<Record<string, any>> | null;
  technologies: Array<Record<string, any>> | null;
  services: Array<Record<string, any>> | null;
};

export class Skills extends Model {
  types: Set<ProjectType> | null;
  languages: Set<Language> | null;
  frameworks: Set<Framework> | null;
  technologies: Set<Technology> | null;
  services: Set<Service> | null;
  count: number;

  constructor(data: Record<string, any> | SkillsObject = []) {
    super();

    this.types = data?.types ? this.getProjectTypes(data.types) : new Set();
    this.languages = data?.languages
      ? this.getLanguages(data.languages)
      : new Set();
    this.frameworks = data?.frameworks
      ? this.getFrameworks(data.frameworks)
      : new Set();
    this.technologies = data?.technologies
      ? this.getTechnologies(data.technologies)
      : new Set();
    this.services = data?.services
      ? this.getServices(data.services)
      : new Set();

    this.count = this.getCount();
  }

  getProjectTypes(data: Array<Record<string, any>> = []) {
    let types: Set<ProjectType> = new Set();

    data.forEach((type) => {
      types.add(new ProjectType(type));
    });

    return types;
  }

  getLanguages(data: Array<Record<string, any>> = []) {
    let languages: Set<Language> = new Set();

    data.forEach((language) => {
      languages.add(new Language(language));
    });

    return languages;
  }

  getFrameworks(data: Array<Record<string, any>> = []) {
    let frameworks: Set<Framework> = new Set();

    data.forEach((framework) => {
      frameworks.add(new Framework(framework));
    });

    return frameworks;
  }

  getTechnologies(data: Array<Record<string, any>> = []) {
    let technologies: Set<Technology> = new Set();

    data.forEach((technology) => {
      technologies.add(new Technology(technology));
    });

    return technologies;
  }

  getServices(data: Array<Record<string, any>> = []) {
    let services: Set<Service> = new Set();

    data.forEach((service) => {
      services.add(new Service(service));
    });

    return services;
  }

  existsInSet(skills: Set<Taxonomy>, skill: Taxonomy) {
    const map = new Map(Array.from(skills).map((skill) => [skill.id, skill]));

    return map.has(skill.id);
  }

  filter(taxonomy: string, term: string) {
    if (taxonomy === 'project-types' && this.types) {
      for (const type of this.types) {
        if (type.id === term) {
          return type;
        }
      }
    }

    if (taxonomy === 'languages' && this.languages) {
      for (const language of this.languages) {
        if (language.id === term) {
          return language;
        }
      }
    }

    if (taxonomy === 'frameworks' && this.frameworks) {
      for (const framework of this.frameworks) {
        if (framework.id === term) {
          return framework;
        }
      }
    }

    if (taxonomy === 'technologies' && this.technologies) {
      for (const technology of this.technologies) {
        if (technology.id === term) {
          return technology;
        }
      }
    }

    if (taxonomy === 'services' && this.services) {
      for (const service of this.services) {
        if (service.id === term) {
          return service;
        }
      }
    }

    return new Taxonomy();
  }

  show(skillsUsed: ProjectSkills): ProjectSkills {
    const filteredSkills: ProjectSkills = new ProjectSkills();
    const skills = new Skills();

    const { types, languages, frameworks, technologies, services } = skills;

    if (skillsUsed.count > 0) {
      if (skillsUsed.types && skillsUsed.types.size > 0) {
        skillsUsed.types.forEach((typeUsed) => {
          this.types?.forEach((type) => {
            if (typeUsed.id === type.id) {
              if (filteredSkills.types) {
                filteredSkills.types.add(type);
              } else {
                filteredSkills.types = new Set([type]);
              }
            }
          });
        });
      }

      if (skillsUsed.languages && skillsUsed.languages.size > 0) {
        skillsUsed.languages.forEach((languageUsed) => {
          this.languages?.forEach((language) => {
            if (languageUsed.id === language.id) {
              if (filteredSkills.languages) {
                filteredSkills.languages.add(language);
              } else {
                filteredSkills.languages = new Set([language]);
              }
            }
          });
        });
      }

      if (skillsUsed.frameworks && skillsUsed.frameworks.size > 0) {
        skillsUsed.frameworks.forEach((frameworkUsed) => {
          this.frameworks?.forEach((framework) => {
            if (frameworkUsed.id === framework.id) {
              if (filteredSkills.frameworks) {
                filteredSkills.frameworks.add(framework);
              } else {
                filteredSkills.frameworks = new Set([framework]);
              }
            }
          });
        });
      }

      if (skillsUsed.technologies && skillsUsed.technologies.size > 0) {
        skillsUsed.technologies.forEach((technologyUsed) => {
          this.technologies?.forEach((technology) => {
            if (technologyUsed.id === technology.id) {
              if (filteredSkills.technologies) {
                filteredSkills.technologies.add(technology);
              } else {
                filteredSkills.technologies = new Set([technology]);
              }
            }
          });
        });
      }

      if (skillsUsed.services && skillsUsed.services.size > 0) {
        skillsUsed.services.forEach((serviceUsed) => {
          this.services?.forEach((service) => {
            if (serviceUsed.id === service.id) {
              if (filteredSkills.services) {
                filteredSkills.services.add(service);
              } else {
                filteredSkills.services = new Set([service]);
              }
            }
          });
        });
      }
    }

    return filteredSkills;
  }

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

  toSkillsObject(): SkillsObject {
    return {
      types: this.types
        ? Array.from(this.types).map((type) => type.toTaxonomyObject())
        : null,
      languages: this.languages
        ? Array.from(this.languages).map((language) =>
            language.toTaxonomyObject()
          )
        : null,
      frameworks: this.frameworks
        ? Array.from(this.frameworks).map((framework) =>
            framework.toTaxonomyObject()
          )
        : null,
      technologies: this.technologies
        ? Array.from(this.technologies).map((technology) =>
            technology.toTaxonomyObject()
          )
        : null,
      services: this.services
        ? Array.from(this.services).map((service) => service.toTaxonomyObject())
        : null,
    };
  }
}
