import { Taxonomy } from '@the7ofdiamonds/ui-ux';

import { Skills } from './Skills';
import {
  existsInSet,
  Framework,
  Language,
  ProjectType,
  ProjectTypeObject,
  Service,
  TaxonomyObject,
  Technology,
} from './Taxonomy';

export type LanguageGQL = {
  size: number;
  node: {
    name: string;
    color: string;
  };
};

export type ProjectSkillsObject = {
  types: Array<ProjectTypeObject> | null;
  languages: Array<TaxonomyObject> | null;
  frameworks: Array<TaxonomyObject> | null;
  technologies: Array<TaxonomyObject> | null;
  services: Array<TaxonomyObject> | null;
};

export type ProjectSkillsDataObject = {
  types: Array<string> | null;
  languages: Array<string> | null;
  frameworks: Array<string> | null;
  technologies: Array<string> | null;
  services: Array<string> | null;
};

export class ProjectSkills extends Skills {
  types: Set<ProjectType> | null;
  languages: Set<Language> | null;
  frameworks: Set<Framework> | null;
  technologies: Set<Technology> | null;
  services: Set<Service> | null;
  count: number;

  constructor(data: Record<string, any> | ProjectSkillsObject = {}) {
    super();

    this.types =
      data.types && Array.isArray(data.types) && data.types.length > 0
        ? this.getProjectTypes(data.types)
        : null;
    this.languages =
      data.languages &&
      Array.isArray(data.languages) &&
      data.languages.length > 0
        ? this.getLanguages(data.languages)
        : null;
    this.frameworks =
      data.frameworks &&
      Array.isArray(data.frameworks) &&
      data.frameworks.length > 0
        ? this.getFrameworks(data.frameworks)
        : null;
    this.technologies =
      data.technologies &&
      Array.isArray(data.technologies) &&
      data.technologies.length > 0
        ? this.getTechnologies(data.technologies)
        : null;
    this.services =
      data.services && Array.isArray(data.services) && data.services.length > 0
        ? this.getServices(data.services)
        : null;

    this.count = this.getCount();
  }

  addByID(skillsData: ProjectSkillsDataObject) {
    if (
      skillsData.types &&
      Array.isArray(skillsData.types) &&
      skillsData.types.length > 0
    ) {
      skillsData.types.map((skill) => {
        const type = new ProjectType({ id: skill });
        return this.types &&
          this.types.size > 0 &&
          !existsInSet(type, this.types)
          ? this.types.add(type)
          : (this.types = new Set([type]));
      });
    }

    if (
      skillsData.languages &&
      Array.isArray(skillsData.languages) &&
      skillsData.languages.length > 0
    ) {
      skillsData.languages.map((skill) => {
        const language = new Language({ id: skill });
        return this.languages &&
          this.languages.size > 0 &&
          !existsInSet(language, this.languages)
          ? this.languages.add(language)
          : (this.languages = new Set([language]));
      });
    }

    if (
      skillsData.frameworks &&
      Array.isArray(skillsData.frameworks) &&
      skillsData.frameworks.length > 0
    ) {
      skillsData.frameworks.map((skill) => {
        const framework = new Framework({ id: skill });
        return this.frameworks &&
          this.frameworks.size > 0 &&
          !existsInSet(framework, this.frameworks)
          ? this.frameworks.add(framework)
          : (this.frameworks = new Set([framework]));
      });
    }

    if (
      skillsData.technologies &&
      Array.isArray(skillsData.technologies) &&
      skillsData.technologies.length > 0
    ) {
      skillsData.technologies.map((skill) => {
        const technology = new Technology({ id: skill });
        return this.technologies &&
          this.technologies.size > 0 &&
          !existsInSet(technology, this.technologies)
          ? this.technologies.add(technology)
          : (this.technologies = new Set([technology]));
      });
    }

    if (
      skillsData.services &&
      Array.isArray(skillsData.services) &&
      skillsData.services.length > 0
    ) {
      skillsData.services.map((skill) => {
        const service = new Service({ id: skill });
        return this.services &&
          this.services.size > 0 &&
          !existsInSet(service, this.services)
          ? this.services.add(service)
          : (this.services = new Set([service]));
      });
    }
  }

  add(skills: ProjectSkills) {
    skills.types
      ? Array.from(skills.types).map((type) => {
          return this.types &&
            this.types.size > 0 &&
            !existsInSet(type, this.types)
            ? this.types.add(type)
            : (this.types = new Set([type]));
        })
      : this.types;

    skills.languages
      ? Array.from(skills.languages).map((language) => {
          return this.languages &&
            this.languages.size > 0 &&
            !existsInSet(language, this.languages)
            ? this.languages.add(language)
            : (this.languages = new Set([language]));
        })
      : this.languages;

    skills.frameworks
      ? Array.from(skills.frameworks).map((framework) => {
          return this.frameworks &&
            this.frameworks.size > 0 &&
            !existsInSet(framework, this.frameworks)
            ? this.frameworks.add(framework)
            : (this.frameworks = new Set([framework]));
        })
      : this.frameworks;

    skills.technologies
      ? Array.from(skills.technologies).map((technology) => {
          return this.technologies &&
            this.technologies.size > 0 &&
            !existsInSet(technology, this.technologies)
            ? this.technologies.add(technology)
            : (this.technologies = new Set([technology]));
        })
      : this.technologies;

    skills.services
      ? Array.from(skills.services).map((service) => {
          return this.services &&
            this.services.size > 0 &&
            !existsInSet(service, this.services)
            ? this.services.add(service)
            : (this.services = new Set([service]));
        })
      : this.services;
  }

  getProjectTypes(data: Array<Record<string, any>> = []) {
    let types: Set<ProjectType> = new Set();

    if (data.length > 0) {
      data.forEach((type) => {
        types.add(new ProjectType(type));
      });
    }

    return types;
  }

  getLanguages(data: Array<Record<string, any>> = []) {
    let languages: Set<Language> = new Set();

    if (data.length > 0) {
      data.forEach((language) => {
        const lang = new Language(language);
        languages.add(lang);
      });
    }

    return languages;
  }

  getFrameworks(data: Array<Record<string, any>> = []) {
    let frameworks: Set<Framework> = new Set();

    if (data.length > 0) {
      data.forEach((framework) => {
        frameworks.add(new Framework(framework));
      });
    }

    return frameworks;
  }

  getTechnologies(data: Array<Record<string, any>> = []) {
    let technologies: Set<Technology> = new Set();

    if (data.length > 0) {
      data.forEach((technology) => {
        technologies.add(new Technology(technology));
      });
    }

    return technologies;
  }

  getServices(data: Array<Record<string, any>> = []) {
    let services: Set<Service> = new Set();

    if (data.length > 0) {
      data.forEach((service) => {
        services.add(new Service(service));
      });
    }

    return services;
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

    return new Taxonomy();
  }

  set(skills: ProjectSkills) {
    this.frameworks = skills.frameworks;
    this.languages = skills.languages;
    this.technologies = skills.technologies;
    this.types = skills.types;
  }

  // show(skillsUsed: ProjectSkills): ProjectSkills {
  //   const filteredSkills: ProjectSkills = new ProjectSkills();
  //   const skills = new Skills();

  //   const { types, languages, frameworks, technologies, services } = skills;

  //   if (skillsUsed.count > 0) {
  //     if (skillsUsed.types && skillsUsed.types.size > 0) {
  //       skillsUsed.types.forEach((typeUsed) => {
  //         types.forEach((type) => {
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
  //         languages.forEach((language) => {
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
  //         frameworks.forEach((framework) => {
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
  //         technologies.forEach((technology) => {
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
  //         services.forEach((service) => {
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

  //     return filteredSkills;
  //   }

  //   return this;
  // }

  getCount(): number {
    const typesSize: number = this.types ? this.types.size : 0;
    const languagesSize: number = this.languages ? this.languages.size : 0;
    const frameworksSize: number = this.frameworks ? this.frameworks.size : 0;
    const technologiesSize: number = this.technologies
      ? this.technologies.size
      : 0;
    const servicesSize: number = this.services ? this.services.size : 0;

    return (
      typesSize +
      languagesSize +
      frameworksSize +
      technologiesSize +
      servicesSize
    );
  }

  fromGitHubGraphQL(languages: Array<LanguageGQL>) {
    if (Array.isArray(languages) && languages.length > 0) {
      languages.forEach((language) => {
        const name = language.node.name;
        const usage = language.size;

        if (name === 'Dockerfile') {
          const dockerFile = new Technology();
          dockerFile.setID('docker');
          dockerFile.setTitle('Docker');
          dockerFile.setUsage(usage);

          if (this.technologies) {
            this.technologies.add(dockerFile);
          } else {
            this.technologies = new Set([dockerFile]);
          }
        }

        if (name === 'SCSS') {
          const scss = new Technology();
          scss.setID('sass');
          scss.setTitle('Sass');
          scss.setUsage(usage);

          if (this.technologies) {
            this.technologies.add(scss);
          } else {
            this.technologies = new Set([scss]);
          }
        }

        if (name === 'hack') {
          const hack = new Language();
          hack.setID('hack');
          hack.setTitle('Hack');
          hack.setUsage(usage);

          if (this.languages) {
            this.languages.add(hack);
          } else {
            this.languages = new Set([hack]);
          }
        }

        if (name !== 'hack' && name !== 'SCSS' && name !== 'Dockerfile') {
          const lang = new Language();
          lang.setID(name.toLowerCase());
          lang.setTitle(name.toUpperCase());
          lang.setUsage(usage);

          if (this.languages) {
            this.languages.add(lang);
          } else {
            this.languages = new Set([lang]);
          }
        }
      });
    }
  }

  languagesFromGithub(data: Array<Record<string, any>>) {
    if (Array.isArray(data) && data.length > 0) {
      let languages: Array<Record<string, any>> = [];

      data.forEach(({ language, usage }) => {
        let skill: Record<string, any> = {};

        if (language === 'Dockerfile') {
          skill = {
            type: 'technology',
            id: 'docker',
            title: 'Docker',
            icon_url: '',
            class_name: '',
            usage: usage,
          };
        }

        if (language === 'SCSS') {
          skill = {
            type: 'technology',
            id: 'sass',
            title: 'Sass',
            icon_url: '',
            class_name: '',
            usage: usage,
          };
        }

        if (language === 'hack') {
          skill = {
            type: 'language',
            id: 'hack',
            title: 'Hack',
            icon_url: '',
            class_name: '',
            usage: usage,
          };
        }

        if (
          language !== 'hack' &&
          language !== 'SCSS' &&
          language !== 'Dockerfile'
        ) {
          skill = {
            type: 'language',
            id: language.toLowerCase(),
            title: language.toUpperCase(),
            icon_url: '',
            class_name: '',
            usage: usage,
          };
        }

        languages.push(skill);
      });

      // this.setSkills(languages);
    }
  }

  fromDocumentData(data: ProjectSkillsDataObject) {
    const skills = new ProjectSkills();

    if (
      data?.frameworks &&
      Array.isArray(data.frameworks) &&
      data.frameworks.length > 0
    ) {
      data.frameworks.forEach((id) => {
        skills.frameworks ? skills.frameworks : (skills.frameworks = new Set());
        const framework = new Framework();
        framework.setID(id);
        skills.frameworks.add(framework);
      });
    }

    if (
      data?.languages &&
      Array.isArray(data.languages) &&
      data.languages.length > 0
    ) {
      data.languages.forEach((id) => {
        skills.languages ? skills.languages : (skills.languages = new Set());
        const language = new Language();
        language.setID(id);
        skills.languages.add(language);
      });
    }

    if (
      data?.services &&
      Array.isArray(data.services) &&
      data.services.length > 0
    ) {
      data.services.forEach((id) => {
        skills.services ? skills.services : (skills.services = new Set());
        const service = new Service();
        service.setID(id);
        skills.services.add(service);
      });
    }

    if (
      data?.technologies &&
      Array.isArray(data.technologies) &&
      data.technologies.length > 0
    ) {
      data.technologies.forEach((id) => {
        skills.technologies
          ? skills.technologies
          : (skills.technologies = new Set());
        const technology = new Technology();
        technology.setID(id);
        skills.technologies.add(technology);
      });
    }

    if (data?.types && Array.isArray(data.types) && data.types.length > 0) {
      data.types.forEach((id) => {
        skills.types ? skills.types : (skills.types = new Set());
        const type = new ProjectType();
        type.setID(id);
        skills.types.add(type);
      });
    }

    this.add(skills);
  }

  toProjectSkillsObject(): ProjectSkillsObject {
    return {
      types:
        this.types && this.types.size > 0
          ? Array.from(this.types).map((type) => type.toProjectTypeObject())
          : null,
      languages:
        this.languages && this.languages.size > 0
          ? Array.from(this.languages).map((language) =>
              language.toLanguageObject()
            )
          : null,
      frameworks:
        this.frameworks && this.frameworks.size > 0
          ? Array.from(this.frameworks).map((framework) =>
              framework.toFrameworkObject()
            )
          : null,
      technologies:
        this.technologies && this.technologies.size > 0
          ? Array.from(this.technologies).map((technology) =>
              technology.toTechnologyObject()
            )
          : null,
      services:
        this.services && this.services.size > 0
          ? Array.from(this.services).map((service) =>
              service.toServiceObject()
            )
          : null,
    };
  }

  toProjectSkillsDataObject(): ProjectSkillsDataObject {
    return {
      types:
        this.types && this.types.size > 0
          ? Array.from(this.types).map((type) => type.id)
          : null,
      languages:
        this.languages && this.languages.size > 0
          ? Array.from(this.languages).map((language) => language.id)
          : null,
      frameworks:
        this.frameworks && this.frameworks.size > 0
          ? Array.from(this.frameworks).map((framework) => framework.id)
          : null,
      technologies:
        this.technologies && this.technologies.size > 0
          ? Array.from(this.technologies).map((technology) => technology.id)
          : null,
      services:
        this.services && this.services.size > 0
          ? Array.from(this.services).map((service) => service.id)
          : null,
    };
  }
}
