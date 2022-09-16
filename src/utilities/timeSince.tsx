/* eslint-disable no-unreachable */
import React from 'react';

const timeSince = (date: number) => {
  // convert date in milliseconds to seconds
  const seconds = Math.floor((Number(new Date()) - date) / 1000);

  switch (true) {
    case seconds / (60 * 60 * 24) >= 1:
      return Math.floor(seconds / (60 * 60 * 24)) + ' days';
    case seconds / (60 * 60) >= 1:
      return Math.floor(seconds / (60 * 60)) + ' hours';
    case seconds / 60 >= 1:
      return Math.floor(seconds / 60) + ' minutes';
    default:
      return Math.floor(seconds) + ' seconds';
  }
};
export default timeSince;
