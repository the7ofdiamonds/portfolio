import React, { useEffect, useState } from "react";

import { ButtonImage } from "@the7ofdiamonds/ui-ux";

import { ProjectURLs } from "@/model/ProjectURLs";
import { ProjectURL } from "@/model/ProjectURL";

import styles from './Project.module.scss';

interface ProjectURLsProps {
  projectUrls: ProjectURLs;
}

const ProjectURLsComponent: React.FC<ProjectURLsProps> = ({ projectUrls }) => {
  const [homepage, setHomepage] = useState<ProjectURL | null>(null);
  const [ios, setIos] = useState<ProjectURL | null>(null);
  const [android, setAndroid] = useState<ProjectURL | null>(null);

  useEffect(() => {
    if (projectUrls.homepage) {
      setHomepage(projectUrls.homepage);
    }
  }, [projectUrls.homepage]);

  useEffect(() => {
    if (projectUrls.ios) {
      setIos(projectUrls.ios);
    }
  }, [projectUrls.ios]);

  useEffect(() => {
    if (projectUrls.android) {
      setAndroid(projectUrls.android);
    }
  }, [projectUrls.android]);

  const hasContent = homepage || ios || android;

  return (
    <>{hasContent && (
      <div className={styles['project-urls']}>
        {homepage && <ButtonIconExternal buttonProps={homepage} />}

        {ios && <ButtonIconExternal buttonProps={ios} />}

        {android && <ButtonIconExternal buttonProps={android} />}
      </div>)}
    </>
  );
}

export default ProjectURLsComponent;
