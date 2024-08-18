import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar/SearchBar'
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const accessKey = 'w3RsBwLFw5aaN_KdIOBmOaPMpNDgV0OJkE9oIUEYyCE';

  const fetchImages = async (newQuery, newPage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.unsplash.com/`,
        {
          params: {
            client_id: accessKey,
            query: newQuery,
            page: newPage,
            per_page: 12,
          },
        }
      );

      setImages((prevImages) =>
        newPage === 1 ? response.data.results : [...prevImages, ...response.data.results]
      );
      setPage(newPage);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    fetchImages(newQuery, 1);
  };

  const handleLoadMore = () => {
    fetchImages(query, page + 1);
  };

  return (
    <div>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
    </div>
  );
};

export default App;
