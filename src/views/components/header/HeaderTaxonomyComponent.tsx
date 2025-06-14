import React from 'react'

import { Taxonomy } from '@/model/Taxonomy'

import { IconComponent } from '@/views/components/IconComponent'

import styles from './Header.module.scss';

interface HeaderTaxonomyComponentProps {
    skill: Taxonomy
}

export const HeaderTaxonomyComponent: React.FC<HeaderTaxonomyComponentProps> = ({ skill }) => {
    return (
        <>
            <h1 className={styles['page-title']}>
                {skill.image && <IconComponent imageClass={skill.image} />}
                {skill.title}
            </h1>
        </>
    )
}