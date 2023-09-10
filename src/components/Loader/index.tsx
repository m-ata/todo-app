import LoaderImg from '/gifs/loader.svg';
import './styles.scss';

const Loader = () => {
  return (
    <span className="loader">
      <img src={LoaderImg} alt="loader" />
    </span>
  );
};

export default Loader;
