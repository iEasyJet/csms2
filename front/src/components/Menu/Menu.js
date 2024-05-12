import './Menu.scss';

function Menu(props) {
  return (
    <ul className='menu'>
      <li
        className={`menu__item ${
          props.activeTab.connnection ? 'menu__item_active' : ''
        }`}
        onClick={props.isMoveConnection}
      >
        Подключение к БД
      </li>
      <li
        className={`menu__item ${
          props.activeTab.loadExcel ? 'menu__item_active' : ''
        }`}
        onClick={props.isMoveLoadEXcel}
      >
        Загрузка EXCEL-файла
      </li>
      <li
        className={`menu__item ${
          props.activeTab.createTable ? 'menu__item_active' : ''
        }`}
        onClick={props.isMoveCreateTable}
      >
        Создание таблицы
      </li>
    </ul>
  );
}

export default Menu;
