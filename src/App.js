import { Component } from 'react';
import s from './App.module.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
// import Modal from './Modal';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  formSubmitHandler = value => {
    this.setState({
      searchQuery: value,
    });
  };

  handleClickMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchQuery, page } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery searchQuery={searchQuery} page={page} />
        <Button onClick={this.handleClickMoreImages} />
        {/* <Modal /> */}
      </div>
    );
  }
}

export default App;
