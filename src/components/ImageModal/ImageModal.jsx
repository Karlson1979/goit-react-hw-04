import React from 'react';
import Modal from 'react-modal';

const ImageModal = ({ isOpen, onRequestClose, image }) => (
  <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    <div className="modal-content">
      <img src={image.urls.regular} alt={image.alt_description} />
      <p>{image.description || image.alt_description}</p>
      <p>Author: {image.user.name}</p>
      <p>Likes: {image.likes}</p>
    </div>
  </Modal>
);

export default ImageModal;

