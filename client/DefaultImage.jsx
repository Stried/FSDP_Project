import React from 'react';

const DefaultImage = ({ src, alt, ...props }) => {
  const handleError = (e) => {
    e.target.src = '/src/assets/defaultimage.jpeg'; 
  };

  return <img src={src} alt={alt} onError={handleError} {...props} />;
};

export default DefaultImage;