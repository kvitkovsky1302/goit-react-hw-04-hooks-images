import PropTypes from 'prop-types';
import s from './SearchForm.module.css';

function SearchForm({ onSubmit, onChange, value }) {
  return (
    <form className={s.SearchForm} onSubmit={onSubmit}>
      <button type="submit" className={s.SearchFormButton}>
        <span className={s.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        className={s.SearchFormInput}
        type="text"
        autoComplete="off"
        autoFocus
        onChange={onChange}
        value={value}
        placeholder="Search images and photos"
      />
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default SearchForm;
