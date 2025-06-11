import React from 'react';

import { ContactBar } from '../ContactBar';

import { ContactMethods } from '@/model/ContactMethods';

interface SocialBarProps {
  contactMethods: ContactMethods;
}

export const SocialBar: React.FC<SocialBarProps> = ({ contactMethods }) => {
  return (
    <div className="footer-bar">
      <ContactBar contactMethods={contactMethods} location='footer' />
    </div>
  );
}