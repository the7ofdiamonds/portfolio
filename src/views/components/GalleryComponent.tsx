import React, { useState, useRef } from 'react';

import { Image } from '@/model/Image';

interface GalleryProps {
  title: string;
  gallery: Array<Image>;
}

const GalleryComponent: React.FC<GalleryProps> = ({ title, gallery }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const galleryRowRef = useRef<HTMLDivElement | null>(null);

  const previousPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const nextPhoto = () => {
    if (currentPhotoIndex < gallery.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (galleryRowRef?.current) {
      const touchStartX = e.touches[0].clientX;
      galleryRowRef.current.setAttribute('data-touch-start', touchStartX.toString());
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (galleryRowRef.current) {
      const touchStartValue = galleryRowRef.current.getAttribute('data-touch-start');

      if (touchStartValue) {
        // Calculate the difference between the starting and ending X coordinates
        const touchStartX = parseInt(touchStartValue, 10);
        const touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;

        // Determine swipe direction based on deltaX
        if (deltaX > 50) {
          previousPhoto(); // Swipe right
        } else if (deltaX < -50) {
          nextPhoto(); // Swipe left
        }
      }
    }
  };

  return (
    <>
      {gallery && gallery.length > 0 ? (
        <>
          {title && <h5 className="title">{title}</h5>}

          <div className="gallery">
            {currentPhotoIndex !== 0 ? (
              <button className="arrow-left" onClick={previousPhoto}>
                <h2>V</h2>
              </button>
            ) : (
              ''
            )}

            <div
              className="gallery-row"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              ref={galleryRowRef}>
              {Array.isArray(gallery) && (
                <span className="gallery-photo">
                  <img
                    className="photo"
                    src={gallery[currentPhotoIndex].url}
                    alt={gallery[currentPhotoIndex].title}
                    title={gallery[currentPhotoIndex].title}
                  />
                </span>
              )}
            </div>

            {currentPhotoIndex !== gallery.length - 1 ? (
              <button className="arrow-right" onClick={nextPhoto}>
                <h2>V</h2>
              </button>
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default GalleryComponent;
