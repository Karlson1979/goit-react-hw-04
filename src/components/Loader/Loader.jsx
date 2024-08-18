import React from 'react';
import { Oval } from 'react-loader-spinner';

const Loader = () => (
  <Oval
    height={80}
    width={80}
    color="#4fa94d"
    ariaLabel="loading"
  />
);

export default Loader;
