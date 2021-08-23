import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';
import s from './ImageGallery.module.css';

const API_KEY = '22470352-c65ac8cc67498f5a0ef8fcd03';
const BASE_URL = 'https://pixabay.com/api';

class ImageGallery extends Component {
  state = {
    page: 1,
    imagePage: [],
  };

  async fetchImages(searchQuery, page) {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`;

    const response = await fetch(url);
    const images = await response.json();
    const hits = await images.hits;
    return hits;
  }

  async fetchImagePages(searchQuery, page) {
    const imagePage = await this.fetchImages(searchQuery, page);
    const images = imagePage.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
    this.setState(prevState => ({
      imagePage: [...prevState.imagePage, ...images],
    }));
  }

  async fetchFirstImagePage(searchQuery, page) {
    const imagePage = await this.fetchImages(searchQuery, page);
    const images = imagePage.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
    this.setState({
      imagePage: images,
    });
  }

  componentDidMount() {
    const page = this.props.page;
    const searchQuery = this.props.searchQuery;
    this.fetchImagePages(searchQuery, page);
  }

  componentDidUpdate(prevProps) {
    const page = this.props.page;
    const searchQuery = this.props.searchQuery;
    if (prevProps.searchQuery !== searchQuery) {
      this.fetchFirstImagePage(searchQuery, page);
    }
    if (prevProps.page !== page) {
      this.fetchImagePages(searchQuery, page);
    }
  }

  render() {
    const { imagePage } = this.state;
    return (
      <ul className={s.ImageGallery}>
        {imagePage.map(({ id, webformatURL, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
