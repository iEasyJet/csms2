import './ModalInfo.scss';
import excelExample from '../../imgs/excelExample.png';

function ModalInfo(props) {
  return (
    <div
      className={`modal-info ${props.modalIfo ? 'modal-info_open' : ''}`}
      onClick={props.closeOnOverlay}
    >
      <ul className='modal-info__list'>
        <li className='modal-info__item'>
          1. Формат файла {'=>'}{' '}
          <span className='modal-info__item_red'>.xlsx</span>
        </li>
        <li className='modal-info__item'>
          2. Первая строка в файле должна состоять из шапки
        </li>
        <li className='modal-info__item'>
          3. В шапке можно использовать анлийиские буквы без пробелов и нижних
          подчеркиваний
        </li>
        <img
          className='modal-info__img'
          src={excelExample}
          alt='Пример Excel-файла'
        />
      </ul>
    </div>
  );
}

export default ModalInfo;
