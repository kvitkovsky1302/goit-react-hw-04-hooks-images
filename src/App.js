import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import s from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';

const API_KEY = '22470352-c65ac8cc67498f5a0ef8fcd03';
const BASE_URL = 'https://pixabay.com/api';

class App extends Component {
  state = {
    searchQuery: '',
    imagePage: [],
    page: 1,
    total: null,
    loading: false,
    showModal: false,
    bigImageUrl: '',
  };

  componentDidMount() {
    this.setState({ loading: true });
    const page = this.state.page;
    const searchQuery = this.state.searchQuery;
    this.fetchFirstImagePage(searchQuery, page);
  }

  componentDidUpdate(prevProps, prevState) {
    const page = this.state.page;
    const searchQuery = this.state.searchQuery;

    if (prevState.searchQuery !== searchQuery) {
      this.setState({ loading: true });
      this.fetchFirstImagePage(searchQuery, page);
    }
    if (prevState.page !== page) {
      this.fetchNextImagePages(searchQuery, page);
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  toggleModal = bigImageUrl => {
    this.setState({
      showModal: !this.state.showModal,
      bigImageUrl,
    });
  };

  async fetchImages(searchQuery, page) {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${API_KEY}`;

    const response = await fetch(url);
    const images = await response.json();
    this.setState({ loading: false });
    return images;
  }

  async fetchNextImagePages(searchQuery, page) {
    const { hits } = await this.fetchImages(searchQuery, page);
    const images = hits.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
    this.setState(prevState => ({
      imagePage: [...prevState.imagePage, ...images],
    }));
  }

  async fetchFirstImagePage(searchQuery, page) {
    const { hits, total } = await this.fetchImages(searchQuery, page);
    const images = hits.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
    this.setState({
      imagePage: images,
      total,
    });
  }

  formSubmitHandler = value => {
    this.setState({
      searchQuery: value,
    });
  };

  handleClickMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchQuery, imagePage, total, loading, showModal, bigImageUrl } =
      this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        {loading && <Loader />}
        <ImageGallery
          searchQuery={searchQuery}
          imagePage={imagePage}
          onOpenModal={this.toggleModal}
        />
        {total > 0 ? (
          <Button onClick={this.handleClickMoreImages} />
        ) : (
          <p className={s.notificationText}>
            Sorry, we do not have any images for your request
          </p>
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} bigImageUrl={bigImageUrl} />
        )}
        <ToastContainer
          autoClose={2000}
          position="top-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
