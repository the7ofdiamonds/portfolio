import React, { useEffect, useState } from 'react';

import { getRepoFile } from '@/controllers/githubSlice';

import { ContentURL } from '@/model/ContentURL';
import { RepoContentQuery } from '@/model/RepoContentQuery';

import styles from './Content.module.scss';

interface ContentComponentProps {
  title: string | null;
  content: ContentURL;
}

export const ContentComponent: React.FC<ContentComponentProps> = ({ title, content }) => {
  const [query, setQuery] = useState<RepoContentQuery | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [html, setHTML] = useState<string | object | null>(null);

  useEffect(() => {
    if (content) {
      setQuery(content.toRepoContentQuery())
    }
  }, [content]);

  useEffect(() => {
    let isMounted = true;

    if (query) {
      try {
        getRepoFile(query)
          .then((file) => {
            const regex = /<(\w+)[^>]*>(.*?)<\/\1>/;
            const match = file.match(regex);

            if (match && match[2]) {
              setFile(file)
            } else {
              return null;
            }
          })
          .catch(console.error);
      } catch (error) {
        console.error(error)
      }
    }

    return () => {
      isMounted = false;
    };
  }, [query]);

  useEffect(() => {
    if (file) {
      try {
        const htmlContent = content.fromMdtoHTML(file);

        if (htmlContent) {
          setHTML(htmlContent);
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [file]);

  return (
    <>
      {html && html != "" && (
        <div className={styles.content}>
          {title && <h4 className={styles.title}>{title}</h4>}
          <div className={styles['content-html']} dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      )}
    </>
  );
};