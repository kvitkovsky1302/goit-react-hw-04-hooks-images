import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

function ImageGalleryItem(props) {
  const { webformatURL, largeImageURL, onOpenModal } = props;
  return (
    <li className={s.ImageGalleryItem}>
      <img
        onClick={e => {
          onOpenModal(e.target.dataset.large);
        }}
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
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
