import { FC } from 'react';
import { ICardProps, ITodo } from '@/interfaces/todo.interface';
import deleteIcon from '/icons/delete.svg';
import editIcon from '/icons/edit.svg';
import checkIcon from '/icons/check.svg';
import './styles.scss';
import { getStatus } from '@/utils/status.util';
import { parseDateStringFormat } from '@/utils/date.util';
import EmptyData from '../EmptyData';

const Card: FC<ICardProps> = ({ data }: ICardProps) => (
  <>
    {!data?.length && <EmptyData />}
    {data.map((item: ITodo) => (
      <div className="card" key={item.id}>
        <header>
          <div className={`status ${getStatus(item)}`}>{getStatus(item)}</div>
          <div className="actions">
            <button type="button" className="icon-btn delete">
              <img src={deleteIcon} alt="delete-icon" />
            </button>
            <button type="button" className="icon-btn edit">
              <img src={editIcon} alt="edit-icon" />
            </button>
            <button type="button" className="icon-btn check">
              <img src={checkIcon} alt="check-icon" />
            </button>
          </div>
        </header>
        <div className="card-data">
          <div className="group">
            <h5>Task</h5>
            <span>{item.task}</span>
          </div>
          <hr />
          <div className="group">
            <h5>Deadline</h5>
            <span>{parseDateStringFormat(item.deadline)}</span>
          </div>
        </div>
      </div>
    ))}
  </>
);

export default Card;
