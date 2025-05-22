import React from 'react';

import { Color } from '@/model/Color';

interface ColorsProps {
  colors: Array<Color>;
}

const ColorsComponent: React.FC<ColorsProps> = ({ colors }) => {

  return (
    <>
      {colors ? (
        <div className="colors">
          <h5 className="title">Colors ({colors.length})</h5>
          <div className="color-row">
            {Array.isArray(colors) &&
              colors.map((colorObj, index) => (
                <div className="color" key={index}>
                  <span
                    className="color-square"
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

export default ColorsComponent;
