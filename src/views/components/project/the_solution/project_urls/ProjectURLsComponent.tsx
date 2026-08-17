import React, { useEffect, useState } from "react";

import { ButtonImage } from "@the7ofdiamonds/ui-ux";
import { ProjectURL, ProjectURLs } from "@the7ofdiamonds/ui-ux";

import styles from './ProjectURLs.module.scss';

interface ProjectURLsProps {
  projectUrls: ProjectURLs;
}

const ProjectURLsComponent: React.FC<ProjectURLsProps> = ({ projectUrls }) => {
  const [homepage, setHomepage] = useState<ProjectURL | null>(null);
  const [ios, setIos] = useState<ProjectURL | null>(null);
  const [android, setAndroid] = useState<ProjectURL | null>(null);

  useEffect(() => {
    if (projectUrls?.homepage && projectUrls.homepage?.url && projectUrls.homepage.url?.trim()) {
      setHomepage(projectUrls.homepage);
    }
  }, [projectUrls?.homepage]);

  useEffect(() => {
    if (projectUrls?.ios && projectUrls.ios?.url && projectUrls.ios.url?.trim()) {
      setIos(projectUrls.ios);
    }
  }, [projectUrls?.ios]);

  useEffect(() => {
    if (projectUrls?.android && projectUrls.android?.url && projectUrls.android.url?.trim()) {
      setAndroid(projectUrls.android);
    }
  }, [projectUrls?.android]);

  const hasContent = homepage || ios || android;

  const goTo = (projectURL: ProjectURL) => {
    if (projectURL?.url) {
      window.open(projectURL.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>{hasContent && (
      <div className={styles['project-urls']}>
        {homepage && <ButtonImage action={() => goTo(homepage)} image={homepage.image} name={homepage.name} url={homepage.url} />}

        {ios && <ButtonImage action={() => goTo(homepage)} image={ios.image} name={ios.name} url={ios.url} />}

        {android && <ButtonImage action={() => goTo(homepage)} image={android.image} name={android.name} url={android.url} />}
      </div>)}
    </>
  );
}

export default ProjectURLsComponent;
