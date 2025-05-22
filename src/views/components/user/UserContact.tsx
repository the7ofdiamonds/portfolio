import React from 'react'

import { ContactMethods } from '@/model/ContactMethods';

import { ContactBar } from '../ContactBar';

interface MemberContactProps {
    contactMethods: ContactMethods
}

const UserContact: React.FC<MemberContactProps> = ({ contactMethods }) => {

    return (
        <div className="user-contact">
            <ContactBar contactMethods={contactMethods} location='' />
        </div>)
}

export default UserContact