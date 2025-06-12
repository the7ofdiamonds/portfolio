import React from 'react'

import { Taxonomy } from '@/model/Taxonomy'

import { IconComponent } from '@/views/components/IconComponent'

interface HeaderTaxonomyComponentProps {
    skill: Taxonomy
}

export const HeaderTaxonomyComponent: React.FC<HeaderTaxonomyComponentProps> = ({ skill }) => {
    return (
        <>
            <h1 className="page-title">
                {skill.image && <IconComponent imageClass={skill.image} />}
                {skill.title}
            </h1>
        </>
    )
}