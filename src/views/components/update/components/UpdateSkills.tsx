import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  setMessage,
  setMessageType,
  setShowStatusBar,
} from '@/controllers/messageSlice';
import {
  getProjectTypes,
  getLanguages,
  getFrameworks,
  getTechnologies
} from '@/controllers/taxonomiesSlice';
import { updateProjectSkills } from '@/controllers/updateSlice';

import type { AppDispatch, RootState } from '@/model/store';
import ProjectSkills, { ProjectSkillsObject } from '@/model/ProjectSkills';
import { Framework, Language, ProjectType, Service, Technology, existsInSet } from '@/model/Taxonomy';
import Skills from '@/model/Skills';

interface UpdateSkillsProps {
  projectSkills: ProjectSkills;
}

const UpdateSkills: React.FC<UpdateSkillsProps> = ({ projectSkills }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { projectTypesObject, languagesObject, frameworksObject, technologiesObject } = useSelector(
    (state: RootState) => state.taxonomies
  );

  const [selectedProjectTypes, setSelectedProjectTypes] = useState<Set<ProjectType>>(projectSkills.types ?? new Set());
  const [selectedLanguages, setSelectedLanguages] = useState<Set<Language>>(projectSkills.languages ?? new Set());
  const [selectedFrameworks, setSelectedFrameworks] = useState<Set<Framework>>(projectSkills.frameworks ?? new Set());
  const [selectedTechnologies, setSelectedTechnologies] = useState<Set<Technology>>(projectSkills.technologies ?? new Set());
  const [selectedServices, setSelectedServices] = useState<Set<Service>>(projectSkills.services ?? new Set());

  const [skills, setSkills] = useState<Skills>(new Skills());

  useEffect(() => {
    dispatch(getProjectTypes());
  }, []);

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  useEffect(() => {
    dispatch(getFrameworks());
  }, []);

  useEffect(() => {
    dispatch(getTechnologies());
  }, []);

  useEffect(() => {
    if (projectSkills.types) {
      setSelectedProjectTypes(projectSkills.types);
    }
  }, [projectSkills.types, setSelectedProjectTypes]);

  useEffect(() => {
    if (projectSkills.languages) {
      setSelectedLanguages(projectSkills.languages);
    }
  }, [projectSkills.languages, setSelectedLanguages]);

  useEffect(() => {
    if (projectSkills.frameworks) {
      setSelectedFrameworks(projectSkills.frameworks);
    }
  }, [projectSkills.frameworks, setSelectedFrameworks]);

  useEffect(() => {
    if (projectSkills.technologies) {
      setSelectedTechnologies(projectSkills.technologies);
    }
  }, [projectSkills.technologies, setSelectedTechnologies]);

  useEffect(() => {
    if (projectSkills.services) {
      setSelectedServices(projectSkills.services);
    }
  }, [projectSkills.services, setSelectedServices]);

  const handleProjectTypesCheckboxChange = (type: ProjectType) => {
    setSelectedProjectTypes((prevTypes) => {
      const updatedSelection = new Set(prevTypes);
      const exists = existsInSet(type, selectedProjectTypes);
      return exists ? new Set(Array.from(updatedSelection).filter((t) => t.id !== type.id)) : updatedSelection.add(type);
    });
  };

  const handleLanguagesCheckboxChange = (language: Language) => {
    setSelectedLanguages((prevLangs) => {
      const updatedSelection = new Set(prevLangs);
      const exists = existsInSet(language, selectedLanguages);
      return exists ? new Set(Array.from(updatedSelection).filter((t) => t.id !== language.id)) : updatedSelection.add(language)
    });
  };

  const handleFrameworksCheckboxChange = (framework: Framework) => {
    setSelectedFrameworks((prevFrameworks) => {
      const updatedSelection = new Set(prevFrameworks);
      const exists = existsInSet(framework, selectedFrameworks);
      return exists ? new Set(Array.from(updatedSelection).filter((t) => t.id !== framework.id)) : updatedSelection.add(framework)
    });
  };

  const handleTechnologiesCheckboxChange = (technology: Technology) => {
    setSelectedTechnologies((prevTechnologies) => {
      const updatedSelection = new Set(prevTechnologies);
      const exists = existsInSet(technology, selectedTechnologies);
      return exists ? new Set(Array.from(updatedSelection).filter((t) => t.id !== technology.id)) : updatedSelection.add(technology)
    });
  };

  const handleServicesCheckboxChange = (service: Service) => {
    setSelectedServices((prevServices) => {
      const updatedSelection = new Set(prevServices);
      const exists = existsInSet(service, selectedServices);
      return exists ? new Set(Array.from(updatedSelection).filter((t) => t.id !== service.id)) : updatedSelection.add(service)
    });
  };

  const handleUpdateSkills = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const updatedSkills: ProjectSkillsObject = {
        types: selectedProjectTypes.size > 0 ? Array.from(selectedProjectTypes).map((type) => type.toProjectTypeObject()) : [],
        languages: selectedLanguages.size > 0 ? Array.from(selectedLanguages).map((language) => language.toLanguageObject()) : [],
        frameworks: selectedFrameworks.size > 0 ? Array.from(selectedFrameworks).map((framework) => framework.toFrameworkObject()) : [],
        technologies: selectedTechnologies.size > 0 ? Array.from(selectedTechnologies).map((technology) => technology.toTechnologyObject()) : [],
        services: selectedServices.size > 0 ? Array.from(selectedServices).map((service) => service.toServiceObject()) : []
      };

      dispatch(updateProjectSkills(new ProjectSkills(updatedSkills)));
    } catch (error) {
      const err = error as Error;
      dispatch(setMessageType('error'));
      dispatch(setMessage(err.message));
      dispatch(setShowStatusBar(Date.now()));
    }
  };

  return (
    <div className='update' id='update_skills'>
      <h3>Update Skills</h3>

      <div className="project-selection form-item">
        <label htmlFor="options">Choose Project Types:</label>

        {skills.types.size > 0 &&
          Array.from(skills.types)
            .map((type) => new ProjectType(type))
            .map((type) => (
              <div className="form-item-flex" key={type.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${type.id}`}
                  value={type.id}
                  checked={existsInSet(type, selectedProjectTypes)}

                  onChange={() => handleProjectTypesCheckboxChange(type)}
                />
                <label htmlFor={`checkbox-${type.id}`}>{type.title}</label>
              </div>
            ))}
      </div>

      <div className="project-selection form-item">
        <label htmlFor="options">Choose Languages:</label>

        {skills.languages.size > 0 &&
          Array.from(skills.languages)
            .map((lang) => new Language(lang))
            .map((language) => (
              <div className="form-item-flex" key={language.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${language.id}`}
                  value={language.id}
                  checked={existsInSet(language, selectedLanguages)}
                  onChange={() => handleLanguagesCheckboxChange(language)}
                />
                <label htmlFor={`checkbox-${language.id}`}>{language.title}</label>
              </div>
            ))}
      </div>

      <div className="project-selection form-item">
        <label htmlFor="options">Choose Frameworks:</label>

        {skills.frameworks.size > 0 &&
          Array.from(skills.frameworks)
            .map((framework) => new Framework(framework))
            .map((framework) => (
              <div className="form-item-flex" key={framework.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${framework.id}`}
                  value={framework.id}
                  checked={existsInSet(framework, selectedFrameworks)}
                  onChange={() => handleFrameworksCheckboxChange(framework)}
                />
                <label htmlFor={`checkbox-${framework.id}`}>{framework.title}</label>
              </div>
            ))}
      </div>

      <div className="project-selection form-item">
        <label htmlFor="options">Choose Technologies:</label>

        {skills.technologies.size > 0 &&
          Array.from(skills.technologies)
            .map((tech) => new Technology(tech))
            .map((technology) => (
              <div className="form-item-flex" key={technology.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${technology.id}`}
                  value={technology.id}
                  checked={existsInSet(technology, selectedTechnologies)}
                  onChange={() => handleTechnologiesCheckboxChange(technology)}
                />
                <label htmlFor={`checkbox-${technology.id}`}>{technology.title}</label>
              </div>
            ))}
      </div>

      <div className="project-selection form-item">
        <label htmlFor="options">Choose Services:</label>

        {skills.services.size > 0 &&
          Array.from(skills.services)
            .map((service) => new Service(service))
            .map((service) => (
              <div className="form-item-flex" key={service.id}>
                <input
                  type="checkbox"
                  id={`checkbox-${service.id}`}
                  value={service.id}
                  checked={existsInSet(service, selectedServices)}
                  onChange={() => handleServicesCheckboxChange(service)}
                />
                <label htmlFor={`checkbox-${service.id}`}>{service.title}</label>
              </div>
            ))}
      </div>

      <button onClick={handleUpdateSkills}>
        <h3>Update Skills</h3>
      </button>
    </div>
  )
}

export default UpdateSkills;