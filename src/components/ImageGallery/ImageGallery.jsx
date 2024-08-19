import React from 'react';
import ImageCard from '../ImageCard/ImageCard';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ul className="image-gallery">
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
