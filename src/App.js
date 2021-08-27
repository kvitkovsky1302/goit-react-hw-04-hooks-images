import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import s from './App.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import fetchImages from './service/fetchImages';

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

  async fetchNextImagePages(searchQuery, page) {
    const { hits } = await fetchImages(searchQuery, page);
    const images = hits.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
    this.setState(prevState => ({
      imagePage: [...prevState.imagePage, ...images],
    }));
  }

  async fetchFirstImagePage(searchQuery, page) {
    const { hits, total } = await fetchImages(searchQuery, page);
    const images = hits.map(({ id, webformatURL, largeImageURL }) => {
      return { id, webformatURL, largeImageURL };
    });
    this.setState({
      imagePage: images,
      total,
      loading: false,
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
        <ImageGallery
          searchQuery={searchQuery}
          imagePage={imagePage}
          onOpenModal={this.toggleModal}
        />
        {loading && <Loader />}
        {total > 0 && <Button onClick={this.handleClickMoreImages} />}
        {!loading && total === 0 && (
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
