import React, { useEffect, useRef } from 'react';

import { IconComponent } from '../IconComponent';

import { Taxonomy } from '@/model/Taxonomy';
import { Skills } from '@/model/Skills';

import styles from './Member.module.scss';

interface MemberKnowledgeProps {
  skills: Skills;
}

export const MemberKnowledgeComponent: React.FC<MemberKnowledgeProps> = ({ skills }) => {
  const {
    languages,
    frameworks,
    technologies,
    services
  } = skills;

  const arrayLang = languages ? Array.from(languages) : [];
  const arrayFrame = frameworks ? Array.from(frameworks) : [];
  const arrayTech = technologies ? Array.from(technologies) : [];
  const arrayService = services ? Array.from(services) : [];

  const knowledge = [...arrayLang, ...arrayFrame, ...arrayTech, ...arrayService];

  const skillsSlideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const skillsSlide = skillsSlideRef.current;

    if (skillsSlide) {
      const totalSkills = skillsSlide.children.length;

      if (skillsSlide.dataset.cloned) {

        for (let i = 0; i < totalSkills; i++) {
          const clonedNode = skillsSlide.children[i].cloneNode(true);
          skillsSlide.appendChild(clonedNode);
        }

        skillsSlide.dataset.cloned = "true";
        document.documentElement.style.setProperty("--total-skills", `${totalSkills}`);
      }

      const width = window.getComputedStyle(document.documentElement).getPropertyValue("--icon-width");
      const gap = window.getComputedStyle(document.documentElement).getPropertyValue("--icon-gap");
      const totalWidth = parseFloat(width) + parseFloat(gap);
      const total = totalSkills * totalWidth;
      const duration = total * (.25 / parseFloat(gap));

      document.documentElement.style.setProperty("--animation-duration", `${duration}s`);
      document.documentElement.style.setProperty("--total-width", `${total}rem`);
      document.documentElement.style.setProperty("--total-skills", `${totalSkills}`);
    }
  }, [knowledge]);

  return (
    <>
      <div className={styles['author-knowledge']}>
        <div className={styles['author-knowledge-slide']} ref={skillsSlideRef}>
          {Array.isArray(knowledge) &&
            knowledge.length > 0 &&
            knowledge.map((knowledge: Taxonomy, index) => (

              <a href={`/projects/${knowledge.path}/${knowledge.id}`} key={index} >
                {knowledge.image && <IconComponent imageClass={knowledge.image} />}
              </a>
            ))}
        </div>
      </div>
    </>
  );
};