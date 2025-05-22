import React from 'react';

import { Image } from '@/model/Image';

interface ImageComponentProps {
  image: Image
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ image }) => {
  const { title, className, url } = image;

  return url ? (
    <img src={url} alt={title} title={title} />
  ) : (
    className && <i className={className} title={title}></i>
  );
}