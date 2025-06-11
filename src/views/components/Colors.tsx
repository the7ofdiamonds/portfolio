import React from 'react';

import { Color } from '@/model/Color';

import styles from './Colors.module.scss';

interface ColorsProps {
  colors: Array<Color>;
}

export const ColorsComponent: React.FC<ColorsProps> = ({ colors }) => {

  return (
    <>
      {colors ? (
        <div className={styles.colors}>
          <h5 className={styles.title}>Colors ({colors.length})</h5>
          <div className={styles['color-row']}>
            {Array.isArray(colors) &&
              colors.map((colorObj, index) => (
                <div className={styles.colors} key={index}>
                  <span
                    className={styles['color-square']}
                    style={{ backgroundColor: colorObj.value }}></span>
                  <h5>{colorObj.value}</h5>
                </div>
              ))}
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
}