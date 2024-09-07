import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import { toast } from 'react-hot-toast'; 

const UNSPLASH_ACCESS_KEY = 'w3RsBwLFw5aaN_KdIOBmOaPMpNDgV0OJkE9oIUEYyCE';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(''); 
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  
  useEffect(() => {
    if (!query) return; 

    const fetchImages = async () => {
      setLoading(true); 
      try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
          params: {
            query, 
            page,
            per_page: 12,
            client_id: UNSPLASH_ACCESS_KEY,
          },
        });

        if (response.data.results.length === 0) {
          toast.error('No images found for your search.');
        }

        if (page === 1) {
          setImages(response.data.results); 
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]); 
        }
      } catch (error) {
        setError('Failed to fetch images');
      } finally {
        setLoading(false); 
      }
    };

    fetchImages();
  }, [query, page]); 

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery); 
    setPage(1); 
    setError(null);
    setImages([]); 
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); 
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
      {showModal && (
        <ImageModal isOpen={showModal} onRequestClose={closeModal} image={selectedImage} />
      )}
    </div>
  );
};

export default App;
