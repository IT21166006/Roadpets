import { useEffect, useRef } from 'react';
import lightGallery from 'lightgallery';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.umd.js';
import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.umd.js';

const Gallery = () => {
    const galleryRef = useRef(null);

    useEffect(() => {
        if (galleryRef.current) {
            lightGallery(galleryRef.current, {
                selector: '.lg-item',
                plugins: [lgZoom, lgThumbnail],
                licenseKey: "0000-0000-000-0000", // Use the free version key
            });
        }
    }, []);
    
    return (
        <div className="row mx-0" ref={galleryRef}>
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0 px-2">
                <a className="lg-item" data-lg-size="1600-1067" data-src="https://d1ivb2c2d81ilf.cloudfront.net/city/Connect/Blog/_1740x1070_crop_center-center_none/dogs-and-cats.jpg">
                    <img src="https://d1ivb2c2d81ilf.cloudfront.net/city/Connect/Blog/_1740x1070_crop_center-center_none/dogs-and-cats.jpg" className="w-100 shadow-1-strong mb-3" alt="Boat on Calm Water" />
                </a>
                <a className="lg-item" data-lg-size="1600-2400" data-src="https://www.onepointmedical.com.au/wp-content/uploads/2015/12/gp-melbourne-189974771-1500x1066.jpg">
                    <img src="https://www.onepointmedical.com.au/wp-content/uploads/2015/12/gp-melbourne-189974771-1500x1066.jpg" className="w-100 shadow-1-strong" alt="Wintry Mountain Landscape" />
                </a>
            </div>
            <div className="col-lg-4 mb-4 mb-lg-0 px-2">
                <a className="lg-item" data-lg-size="1600-2398" data-src="img/img3.jpg">
                    <img src="https://d1ivb2c2d81ilf.cloudfront.net/city/Connect/Blog/_1740x1070_crop_center-center_none/dogs-and-cats.jpg" className="w-100 shadow-1-strong mb-3" alt="Mountains in the Clouds" />
                </a>
                <a className="lg-item" data-lg-size="1600-1065" data-src="img/img4.jpg">
                    <img src="https://d1ivb2c2d81ilf.cloudfront.net/city/Connect/Blog/_1740x1070_crop_center-center_none/dogs-and-cats.jpg" className="w-100 shadow-1-strong" alt="Boat on Calm Water" />
                </a>
            </div>
        </div>
    );
};

export default Gallery;
