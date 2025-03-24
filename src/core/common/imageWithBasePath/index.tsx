import React from 'react';
import { img_path } from '../../../environment';

interface Image {
  className?: string;
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  id?: string;
}

const ImageWithBasePath = (props: Image) => {
  // Check if the src is a Base64 string
  const isBase64 = props.src.startsWith('data:image');
  const isAbsoluteURL = props.src.startsWith('http://') || props.src.startsWith('https://');

  // Use the original src if it's Base64, else prepend img_path
  // const fullSrc = isBase64 ? props.src : `${img_path}${props.src}`;
  const fullSrc = isBase64 || isAbsoluteURL ? props.src : `${img_path}${props.src}`;
// console.log('fullSrc', fullSrc)
  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={props.alt}
      width={props.width}
      id={props.id}
    />
  );
};

export default ImageWithBasePath;
