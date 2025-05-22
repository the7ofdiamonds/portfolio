import React, { useEffect, useState } from 'react';

import { User } from '@/model/User';
import { DocumentURL } from '@/model/DocumentURL';

import DocumentComponent from '@/views/components/DocumentComponent';

interface ResumeProps {
  user: User;
}

export const Resume: React.FC<ResumeProps> = ({ user }) => {

  const [resume, setResume] = useState<DocumentURL | null>(null);

  useEffect(() => {
    if (user.name) {
      document.title = `Resume - ${user.name}`
    }
  }, [user]);

  useEffect(() => {
    if (user.resume) {
      setResume(new DocumentURL(user.resume))
    }
  }, [user]);

  return (
    <section className="resume">
      {resume ? (
        <DocumentComponent documentURL={resume} />
      ) : (
        <h1>No resume available</h1>
      )}
    </section>
  );
}