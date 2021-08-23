import s from './Button.module.css';

function Button({ onClick }) {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}

export default Button;
