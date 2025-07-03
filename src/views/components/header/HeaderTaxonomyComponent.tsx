import React from 'react'

import { IconComponent } from '@the7ofdiamonds/ui-ux'

import { Taxonomy } from '@/model/Taxonomy'

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