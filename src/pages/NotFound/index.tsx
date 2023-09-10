import { useNavigate } from 'react-router-dom';
// import component
import Button from '@components/Button';
// import enum
import { HTTP_STATUS_CODES } from '@/enum/status.enum';
// import constants
import {
  GO_HOME_BUTTON,
  NOT_FOUND_DESCRIPTION,
  PAGE_NOT_FOUND,
} from '@/constants/label.constants';
// import styles
import './styles.scss';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="page-container-nf">
      <h1 className="heading"> {HTTP_STATUS_CODES.NOT_FOUND} </h1>
      <div className="horizontal-line"> </div>
      <h5 className="title"> {PAGE_NOT_FOUND} </h5>
      <span className="description"> {NOT_FOUND_DESCRIPTION} </span>
      <Button
        label={GO_HOME_BUTTON}
        onClick={() => navigate('/')}
        category="primary"
      />
    </div>
  );
};

export default NotFound;
