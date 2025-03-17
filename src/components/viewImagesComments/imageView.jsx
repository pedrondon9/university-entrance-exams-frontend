import React, { useState, useCallback } from 'react';
import ImageViewer from 'react-simple-image-viewer';

export default function ImageView({ imagenes }) {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [
        'https://res.cloudinary.com/mumbex/image/upload/v1665908536/eseg_1_1_1_gvru0m.jpg',
        'https://res.cloudinary.com/mumbex/image/upload/v1665917666/d-min_2_wmonvd.jpg',
        'https://res.cloudinary.com/mumbex/image/upload/v1664784894/vijym2pkfqj7uekghg0d.jpg',
    ];

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    return (
        <div className='anounce-description-img'>
            {imagenes.map((src, index) => (
                    <img
                        className='imagenes-view'
                        src={src}
                        onClick={() => openImageViewer(index)}
                        width="300"
                        key={index}
                        style={{ margin: '2px' }}
                        alt=""
                    />
            ))}

            {isViewerOpen && (
                <ImageViewer
                    src={images}
                    currentIndex={currentImage}
                    disableScroll={false}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                />
            )}
        </div>
    );
}