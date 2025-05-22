import React, { useEffect, useState } from 'react';

import Taxonomy from '@/model/Taxonomy';

interface TaxListProps {
  taxonomiesSet: Set<Taxonomy>;
  taxonomiesTitle: string;
}

const TaxList: React.FC<TaxListProps> = ({ taxonomiesSet, taxonomiesTitle }) => {
  const [taxonomies, setTaxonomies] = useState<Array<Taxonomy>>(Array.from(taxonomiesSet));
  const [title, setTitle] = useState<string>(taxonomiesTitle);

  useEffect(() => {
    setTaxonomies(Array.from(taxonomiesSet))
  }, [taxonomiesSet, setTaxonomies]);

  useEffect(() => {
    setTitle(taxonomiesTitle)
  }, [taxonomiesTitle, setTitle]);

  const handleClick = (taxonomy: Taxonomy) => {
    handleSkills();
    window.location.href = `/#/projects/${taxonomy.path}/${taxonomy.id}`;
  };

  const handleSkills = () => {
    const skillsElement = document.getElementById('top');

    if (skillsElement) {
      skillsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    taxonomies && taxonomies.length > 0 && (
      <div className="tax-list">
        <h5 className="title">{title}</h5>

        <div className="tax-row">
          {taxonomies.map((taxonomy, index) =>
            taxonomy && taxonomy.title ? (
              <button
                key={index}
                className="tag"
                onClick={() => handleClick(taxonomy)}>
                <h6>{taxonomy.title}</h6>
              </button>
            ) : null
          )}
        </div>
      </div>
    )
  );
}

export default TaxList;
