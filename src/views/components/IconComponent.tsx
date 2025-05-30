import React, { useEffect, useState } from 'react';

import { Image } from '../../model/Image';

interface IconComponentProps {
  imageClass: Image;
}

export const IconComponent: React.FC<IconComponentProps> = ({ imageClass }) => {
  const [image, setImage] = useState<Image>(imageClass);

  useEffect(() => { setImage(imageClass) }, [imageClass, setImage]);

  return (
    <>
      {image?.url ? (
        <img className="icon" src={image.url} alt={image.title} title={image.title} />
      ) : (
        image?.className && (
          <i className={image.className} title={image.title}></i>
        )
      )}
    </>
  );
}