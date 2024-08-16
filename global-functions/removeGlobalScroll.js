import React from 'react';

const removeGlobalScroll = () => {
  if (document && document.body) {
    document.body.style.overflow = 'hidden';
  }
};

export default removeGlobalScroll;
