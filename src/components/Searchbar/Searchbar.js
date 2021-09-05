import { useState } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import SearchForm from '../SearchForm';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
    if (searchQuery === '') {
      toast.error('Please, enter your request!');
    }
  };

  return (
    <header className={s.Searchbar}>
      <SearchForm
        onSubmit={handleSubmit}
        onChange={handleSearchQuery}
        value={searchQuery}
      />
    </header>
  );
}

export default Searchbar;
