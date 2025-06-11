import React from 'react';

import { Feature } from '@/model/Feature';
import { Version } from '@/model/Version';

import styles from './Project.module.scss';

interface FeaturesProps {
  features: Set<Feature>;
  currentVersion: Version;
}

const Features: React.FC<FeaturesProps> = ({ features, currentVersion }) => {
  return (
    features.size > 0 && (
      <div className={`${styles['product-features-card'], styles['card']}`}>
        <h3>Features</h3>

        <div className={styles['product-features']}>
          {Array.from(features).filter((feature) => {
            if (feature.version && feature.version.major && currentVersion.major && feature.version.major <= currentVersion.major) {
              return feature;
            }
          }).map((feature) => (
            <p className={styles['product-feature']} key={feature.id}>
              <span className={styles['product-feature-point']}>-</span> {feature.description}
            </p>
          ))}
        </div>
      </div>
    )
  );
}

export default Features;
