import LoaderSpiner from 'react-loader-spinner';
import s from './Loader.module.css';

function Loader() {
  return (
    <LoaderSpiner
      className={s.loader}
      type="Circles"
      color="#3f51b5"
      height={100}
      width={100}
    />
  );
}

export default Loader;
