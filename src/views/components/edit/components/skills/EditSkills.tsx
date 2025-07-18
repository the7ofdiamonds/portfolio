import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ProjectSkills, ProjectSkillsObject } from '@the7ofdiamonds/ui-ux';
import { Framework, Language, ProjectType, Service, Technology } from '@the7ofdiamonds/ui-ux';
import { Skills } from '@the7ofdiamonds/ui-ux';

import { updateProjectSkills } from '@/controllers/updateSlice';

import type { AppDispatch, RootState } from '@/model/store';

import styles from './Skills.module.scss';

interface EditSkillsProps {
  projectSkills: ProjectSkills;
  setProjectSkills: (projectSkills: ProjectSkills) => void
}

export const EditSkills: React.FC<EditSkillsProps> = ({ projectSkills, setProjectSkills }) => {
  const dispatch = useDispatch<AppDispatch>();

  // const { projectTypesObject, languagesObject, frameworksObject, technologiesObject } = useSelector(
  //   (state: RootState) => state.taxonomies
  // );

  const [selectedProjectTypes, setSelectedProjectTypes] = useState<Set<ProjectType>>(projectSkills.types ?? new Set());
  const [selectedLanguages, setSelectedLanguages] = useState<Set<Language>>(projectSkills.languages ?? new Set());
  const [selectedFrameworks, setSelectedFrameworks] = useState<Set<Framework>>(projectSkills.frameworks ?? new Set());
  const [selectedTechnologies, setSelectedTechnologies] = useState<Set<Technology>>(projectSkills.technologies ?? new Set());
  const [selectedServices, setSelectedServices] = useState<Set<Service>>(projectSkills.services ?? new Set());

  const [skills, setSkills] = useState<Skills>(new Skills());

  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<string>('info');
  const [showStatusBar, setShowStatusBar] = useState<'show' | 'hide'>('hide');

  useEffect(() => {
    if (projectSkills.types) {
      setSelectedProjectTypes(projectSkills.types);
    }
  }, [projectSkills.types]);

  useEffect(() => {
    if (projectSkills.languages) {
      setSelectedLanguages(projectSkills.languages);
    }
  }, [projectSkills.languages]);

  useEffect(() => {
    if (projectSkills.frameworks) {
      setSelectedFrameworks(projectSkills.frameworks);
    }
  }, [projectSkills.frameworks]);

  useEffect(() => {
    if (projectSkills.technologies) {
      setSelectedTechnologies(projectSkills.technologies);
    }
  }, [projectSkills.technologies]);

  useEffect(() => {
    if (projectSkills.services) {
      setSelectedServices(projectSkills.services);
    }
  }, [projectSkills.services]);

  const handleProjectTypesCheckboxChange = (type: ProjectType) => {
    if (!projectSkills.existsInSet(projectSkills.types, type)) {
      projectSkills.types.add(type)
      setSelectedProjectTypes(projectSkills.types)
    }
  };

  const handleLanguagesCheckboxChange = (language: Language) => {
    if (!projectSkills.existsInSet(projectSkills.languages, language)) {
      projectSkills.languages.add(language)
      setSelectedLanguages(projectSkills.languages)
    }
  };

  const handleFrameworksCheckboxChange = (framework: Framework) => {
    if (!projectSkills.existsInSet(projectSkills.frameworks, framework)) {
      projectSkills.frameworks.add(framework)
      setSelectedFrameworks(projectSkills.frameworks)
    }
  };

  const handleTechnologiesCheckboxChange = (technology: Technology) => {
    if (!projectSkills.existsInSet(projectSkills.technologies, technology)) {
      projectSkills.technologies.add(technology)
      setSelectedTechnologies(projectSkills.technologies)
    }
  };

  const handleServicesCheckboxChange = (service: Service) => {
    if (!projectSkills.existsInSet(projectSkills.services, service)) {
      projectSkills.services.add(service)
      setSelectedServices(projectSkills.services)
    }
  };

  const handleUpdateSkills = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      projectSkills.setProjectTypes(selectedProjectTypes)
      projectSkills.setLanguages(selectedLanguages)
      projectSkills.setFrameworks(selectedFrameworks)
      projectSkills.setTechnologies(selectedTechnologies)
      projectSkills.setServices(selectedServices)
      setProjectSkills(projectSkills)
    } catch (error) {
      const err = error as Error;
      setMessageType('error');
      setMessage(err.message);
      setShowStatusBar('show');
    }
  };

  return (
    <div className={styles.edit} id='edit_skills'>
      <h3>Edit Skills</h3>

      <div className={`${styles['project-selection']} ${styles['form-item']}`}>
        <label className={styles.label} htmlFor="options">Choose Project Types:</label>

        {skills?.types && skills.types.size > 0 &&
          Array.from(skills.types)
            .map((type) => new ProjectType(type))
            .map((type) => (
              <div className={styles['form-item-flex']} key={type.id}>
                <input
                  className={styles.button}
                  type="checkbox"
                  id={`checkbox-${type.id}`}
                  value={type.id ?? ''}
                  checked={projectSkills.existsInSet(selectedProjectTypes, type)}

                  onChange={() => handleProjectTypesCheckboxChange(type)}
                />
                <label className={styles.button} htmlFor={`checkbox-${type.id}`}>{type.title}</label>
              </div>
            ))}
      </div>

      <div className={`${styles['project-selection']} ${styles['form-item']}`}>
        <label className={styles.label} htmlFor="options">Choose Languages:</label>

        {skills.languages && skills.languages.size > 0 &&
          Array.from(skills.languages)
            .map((lang) => new Language(lang))
            .map((language) => (
              <div className={styles['form-item-flex']} key={language.id}>
                <input
                  className={styles.input}
                  type="checkbox"
                  id={`checkbox-${language.id}`}
                  value={language.id ?? ''}
                  checked={projectSkills.existsInSet(selectedLanguages, language)}
                  onChange={() => handleLanguagesCheckboxChange(language)}
                />
                <label className={styles.label} htmlFor={`checkbox-${language.id}`}>{language.title}</label>
              </div>
            ))}
      </div>

      <div className={`${styles['project-selection']} ${styles['form-item']}`}>
        <label className={styles.label} htmlFor="options">Choose Frameworks:</label>

        {skills.frameworks && skills.frameworks.size > 0 &&
          Array.from(skills.frameworks)
            .map((framework) => new Framework(framework))
            .map((framework) => (
              <div className={styles['form-item-flex']} key={framework.id}>
                <input
                  className={styles.input}
                  type="checkbox"
                  id={`checkbox-${framework.id}`}
                  value={framework.id ?? ''}
                  checked={projectSkills.existsInSet(selectedFrameworks, framework)}
                  onChange={() => handleFrameworksCheckboxChange(framework)}
                />
                <label className={styles.label} htmlFor={`checkbox-${framework.id}`}>{framework.title}</label>
              </div>
            ))}
      </div>

      <div className={`${styles['project-selection']} ${styles['form-item']}`}>
        <label className={styles.label} htmlFor="options">Choose Technologies:</label>

        {skills.technologies && skills.technologies.size > 0 &&
          Array.from(skills.technologies)
            .map((tech) => new Technology(tech))
            .map((technology) => (
              <div className={styles['form-item-flex']} key={technology.id}>
                <input
                  className={styles.input}
                  type="checkbox"
                  id={`checkbox-${technology.id}`}
                  value={technology.id ?? ''}
                  checked={projectSkills.existsInSet(selectedTechnologies, technology)}
                  onChange={() => handleTechnologiesCheckboxChange(technology)}
                />
                <label className={styles.label} htmlFor={`checkbox-${technology.id}`}>{technology.title}</label>
              </div>
            ))}
      </div>

      <div className={`${styles['project-selection']} ${styles['form-item']}`}>
        <label className={styles.label} htmlFor="options">Choose Services:</label>

        {skills.services && skills.services.size > 0 &&
          Array.from(skills.services)
            .map((service) => new Service(service))
            .map((service) => (
              <div className={styles['form-item-flex']} key={service.id}>
                <input
                  className={styles.input}
                  type="checkbox"
                  id={`checkbox-${service.id}`}
                  value={service.id ?? ''}
                  checked={projectSkills.existsInSet(selectedServices, service)}
                  onChange={() => handleServicesCheckboxChange(service)}
                />
                <label className={styles.label} htmlFor={`checkbox-${service.id}`}>{service.title}</label>
              </div>
            ))}
      </div>

      <button className={styles.button} onClick={handleUpdateSkills}>
        <h3>Edit Skills</h3>
      </button>
    </div>
  )
}