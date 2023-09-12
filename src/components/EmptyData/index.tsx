import emptyData from '/images/empty-data.svg';

import { DATA_NOT_FOUND } from '@/constants/label.constants';

import './styles.scss';

const EmptyData = () => {
  return (
    <div className="empty-data">
      <img src={emptyData} alt="empty-data" />
      <span> {DATA_NOT_FOUND} </span>
    </div>
  );
};

export default EmptyData;
