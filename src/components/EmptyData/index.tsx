import emptyData from '/images/empty-data.svg';
import './styles.scss';

const EmptyData = () => {
  return (
    <div className="empty-data">
      <img src={emptyData} alt="empty-data" />
      <span> Data Not Found </span>
    </div>
  );
};

export default EmptyData;
