import React from 'react'

import Taxonomy from '@/model/Taxonomy'

import IconComponent from './IconComponent'

interface HeaderTaxonomyComponentProps {
    skill: Taxonomy
}

const HeaderTaxonomyComponent: React.FC<HeaderTaxonomyComponentProps> = ({ skill }) => {
    return (
        <>
            <h1 className="page-title">
                {skill.image && <IconComponent imageClass={skill.image} />}
                {skill.title}
            </h1>
        </>
    )
}

export default HeaderTaxonomyComponent