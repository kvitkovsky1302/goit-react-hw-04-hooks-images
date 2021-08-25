import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

function ImageGallery(props) {
  const { imagePage, onOpenModal } = props;

  return (
    <ul className={s.ImageGallery}>
      {imagePage.map(({ id, webformatURL, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onOpenModal={onOpenModal}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  imagePage: PropTypes.arrayOf(PropTypes.shape).isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGallery;
