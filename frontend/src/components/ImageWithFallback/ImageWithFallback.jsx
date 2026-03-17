import { useState } from 'react';
import styles from './ImageWithFallback.module.css';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const fallbackImages = [
    'https://picsum.photos/400/200?random=1',
    'https://picsum.photos/400/200?random=2',
    'https://picsum.photos/400/200?random=3',
    'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'200\' viewBox=\'0 0 400 200\'%3E%3Crect width=\'400\' height=\'200\' fill=\'%232563eb\' opacity=\'0.1\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-family=\'system-ui, -apple-system, sans-serif\' font-size=\'18\' fill=\'%232563eb\'%3E🚀 Project Image%3C/text%3E%3C/svg%3E',
    'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'400\' height=\'200\' viewBox=\'0 0 400 200\'%3E%3Crect width=\'400\' height=\'200\' fill=\'%23f3f4f6\'/%3E%3Ccircle cx=\'200\' cy=\'100\' r=\'40\' fill=\'%23d1d5db\'/%3E%3Ctext x=\'200\' y=\'160\' text-anchor=\'middle\' font-family=\'system-ui\' font-size=\'14\' fill=\'%236b7280\'%3ENo Preview%3C/text%3E%3C/svg%3E'
  ];

  const handleError = () => {
    if (fallbackIndex < fallbackImages.length - 1) {
      // Try next fallback
      setFallbackIndex(prev => prev + 1);
      setImgSrc(fallbackImages[fallbackIndex + 1]);
    } else {
      // Last resort - transparent placeholder
      setImgSrc('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || 'Project image'}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;