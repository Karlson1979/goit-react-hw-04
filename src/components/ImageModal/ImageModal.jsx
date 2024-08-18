import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const ImageModal = ({ image, alt, onClose }) => {
  return (
    <ReactModal isOpen onRequestClose={onClose} contentLabel="Image Modal">
      <button onClick={onClose}>Close</button>
      <img src={image} alt={alt} style={{ width: '100%' }} />
    </ReactModal>
  );
};

export default ImageModal;
