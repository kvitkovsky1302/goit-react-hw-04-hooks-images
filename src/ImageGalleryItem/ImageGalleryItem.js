import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem(props) {
  const { id, webformatURL, largeImageURL } = props;
  return (
    <li key={id} className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt=""
        className={s.ImageGalleryItemImage}
        data-large={largeImageURL}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
