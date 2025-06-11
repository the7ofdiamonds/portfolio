import React, { useEffect, useState } from 'react';

import { SocialBar } from '@/views/components/footer/FooterBar';

import { User } from '@/model/User';
import { ContactMethods } from '@/model/ContactMethods';

interface FooterComponentProps {
  user: User;
}

export const FooterComponent: React.FC<FooterComponentProps> = ({ user }) => {
  const [contactMethods, setContactMethods] = useState<ContactMethods | null>(null);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    if (user.contactMethods) {
      setContactMethods(user.contactMethods)
    }
  }, [user]);

  useEffect(() => {
    if (user.name) {
      setName(user.name)
    }
  }, [user]);

  const year = new Date().getFullYear();

  return (
    <footer>
      {contactMethods && <SocialBar contactMethods={contactMethods} />}
      <span className="legal">© Copyright 2010 - {year} {name}. All Rights Reserved.</span>
    </footer>
  );
}