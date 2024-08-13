import React from 'react';

const cutText = (text, length) => {
  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length).trim() + '...';
};

export default cutText;
