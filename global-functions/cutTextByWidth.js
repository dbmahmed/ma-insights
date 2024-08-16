import React from 'react';

const cutTextByWidth = (text, blockWidth, offset) => {
  if (!text || !blockWidth) {
    return '-';
  }
  const contentWith = blockWidth > 1200 ? 1200 : blockWidth;
  const length = Math.floor(contentWith - (offset || 0)) / 7.5 - 3;
  console.log('length', length);

  if (text.length <= length) {
    return text;
  }

  return text.slice(0, length).trim() + '...';
};

export default cutTextByWidth;
