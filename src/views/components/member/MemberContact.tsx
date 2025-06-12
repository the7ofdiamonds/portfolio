import React from 'react'

import { ContactMethods } from '@/model/ContactMethods';

import { ContactBar } from '@/views/components/ContactBar';

import styles from './Member.module.scss';

interface MemberContactProps {
    contactMethods: ContactMethods
}

export const MemberContact: React.FC<MemberContactProps> = ({ contactMethods }) => {

    return (
        <div className={styles['author-contact']}>
            <ContactBar contactMethods={contactMethods} location='' />
        </div>)
}