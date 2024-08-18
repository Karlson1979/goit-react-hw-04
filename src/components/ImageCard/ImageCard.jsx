import React, { useState } from 'react';
import ImageModal from './ImageModal';

const ImageCard = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <ImageModal
          image={image.urls.regular}
          alt={image.alt_description}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default ImageCard;
