import PropTypes from 'prop-types';
import './style.less';

const PriceList = ({  items, onModifyItem, onDeleteItem }) => {
  return (
    <ul className="list-group">
      {
        items.map((item) => (
          <li key={item.id}>
            <span>{item.category.name}</span>
            <span>{item.title}</span>
            <span className="fw-bold">
              {(item.category.type === 'income') ? '+' : '-'}
              {item.price}元
            </span>
            <span>{item.date}</span>
            <button className="btn btn-primary" onClick={() => {onModifyItem(item)}}>编辑</button>
            <button className="btn btn-danger" onClick={() => {onDeleteItem(item)}}>删除</button>
          </li>
        ))
      }
    </ul>
  )
};

/*类型检查*/
PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default PriceList;