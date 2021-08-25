import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import SearchForm from '../SearchForm';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSearchQuery = e => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
    if (this.state.searchQuery === '') {
      toast.error('Please, enter your request!');
    }
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={s.Searchbar}>
        <SearchForm
          onSubmit={this.handleSubmit}
          onChange={this.handleSearchQuery}
          value={searchQuery}
        />
      </header>
    );
  }
}

export default Searchbar;
