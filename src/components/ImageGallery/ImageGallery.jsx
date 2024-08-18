import React from 'react';
import ImageCard from './ImageGallery';

const ImageGallery = ({ images=[] }) => {
  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
