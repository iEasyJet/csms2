import './CreateTable.scss';
import { useRef, useState } from 'react';
import ColumnNames from '../ColumnNames/ColumnNames';
import ProcessCreateTable from '../ProcessCreateTable/ProcessCreateTable';
import InsertIntoValues from '../InsertIntoValues/InsertIntoValues';

function CreateTable(props) {
  const tableNameRef = useRef('');
  const createTextRef = useRef('');
  const createInsertRef = useRef('');

  const [openColumnNames, setColumnNames] = useState(false);
  const [openProcessCreateTable, setOpenProcessCreateTable] = useState(false);
  const [openInsertIntoValues, setOpenInsertIntoValues] = useState(false);




  function closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      setColumnNames(false);
      setOpenProcessCreateTable(false);
      setOpenInsertIntoValues(false)
    }
  }

  function handleClickColumnNames() {
    setColumnNames(true);
  }

  function handleClickProcessCreateTable() {
    setOpenProcessCreateTable(true);
  }

  function handleClickInsertIntoValues() {
    setOpenInsertIntoValues(true);
  }

  return (
    <div className='create-table'>

      <ColumnNames
        tableData={props.tableData}
        closeOnOverlay={closeOnOverlay}
        openColumnNames={openColumnNames}
      />

      <ProcessCreateTable
        tableNameRef={tableNameRef}
        createTextRef={createTextRef}
        tableData={props.tableData}
        closeOnOverlay={closeOnOverlay}
        openProcessCreateTable={openProcessCreateTable}
        connectionDB={props.connectionDB}
      />

      <InsertIntoValues
        closeOnOverlay={closeOnOverlay}
        createInsertRef={createInsertRef}
        tableNameRef={tableNameRef}
        tableData={props.tableData}
        openInsertIntoValues={openInsertIntoValues}
      />

      <div className='create-table__inputs-wrapper'>
        <label className='create-table__label'>
          <span className='create-table__text'>Название таблицы:</span>
          <input
            className='create-table__input-text'
            type='text'
            placeholder='__conv__appart'
            name='cosmos2_table_name'
            autoComplete='off'
            onChange={props.tableCheck}
            ref={tableNameRef}
          />
        </label>
      </div>

      <input
        type='button'
        className='create-table__button'
        value='Типы и наименование столбцов'
        onClick={handleClickColumnNames}
      />

      <input
        type='button'
        className='create-table__button'
        value='Создание таблицы'
        onClick={handleClickProcessCreateTable}
      />

      <input
        type='button'
        className='create-table__button'
        value='Внесение данных в таблицу'
        onClick={handleClickInsertIntoValues}
      />

      <ul className='create-table__menu'>
        <li
          className='create-table__menu-item'
          onClick={() => {
            props.createTable(createTextRef.current.textContent);
          }}
        >
          Создать таблицу в БД?
        </li>
        <li
          className='create-table__menu-item'
          onClick={() => {
            props.insertData(createInsertRef.current.textContent);
          }}
        >
          Загрузить данные в таблицу?
        </li>
      </ul>
    </div>
  );
}

export default CreateTable;
