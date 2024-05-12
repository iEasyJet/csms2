import { useRef, useEffect, useState } from 'react';
import './Db.scss';

function Db(props) {
  const refTypeDB = useRef();
  const refUser = useRef();
  const refPassword = useRef();
  const refDataBase = useRef();
  const refHost = useRef();

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [defautlValue, setDefautlValue] = useState({
    type: null,
    user: null,
    password: null,
    database: null,
    host: null,
  });

  useEffect(() => {
    const defautlValue = JSON.parse(localStorage.getItem('cosmos2Conv'));
    if (defautlValue) {
      setDefautlValue(defautlValue);
    }
    setIsLoadingPage(true);
  }, []);

  function connectionDB(e) {
    e.preventDefault();
    const inpitsValue = {
      type: refTypeDB.current.value,
      user: refUser.current.value,
      password: refPassword.current.value,
      database: refDataBase.current.value,
      host: refHost.current.value,
    };
    props.tryToConnectionDB(inpitsValue);
  }

  return isLoadingPage ? (
    <div className='db'>
      <h2 className='db__title'>{props.dbState.title}</h2>
      <form className='db__inputs-wrapper' onSubmit={connectionDB}>
        <label className='db__label'>
          <span className='db__text'>Тип БД:</span>
          <select
            className='db__input-select'
            name='cosmos2_type'
            ref={refTypeDB}
            defaultValue={defautlValue.type}
          >
            <option value='pg'>PG</option>
            <option value='mssql'>MSSQL</option>
          </select>
        </label>
        <label className='db__label'>
          <span className='db__text'>Логин:</span>
          <input
            className='db__input-text'
            type='text'
            placeholder='user'
            name='cosmos2_user'
            ref={refUser}
            defaultValue={defautlValue.user}
            autoComplete='off'
          />
        </label>
        <label className='db__label'>
          <span className='db__text'>Пароль:</span>
          <input
            className='db__input-text'
            type='password'
            placeholder='password'
            name='cosmos2_password'
            ref={refPassword}
            defaultValue={defautlValue.password}
            autoComplete='off'
          />
        </label>
        <label className='db__label'>
          <span className='db__text'>Название БД:</span>
          <input
            className='db__input-text'
            type='text'
            placeholder='database'
            name='cosmos2_database'
            ref={refDataBase}
            defaultValue={defautlValue.database}
            autoComplete='off'
          />
        </label>
        <label className='db__label'>
          <span className='db__text'>Имя сервера:</span>
          <input
            className='db__input-text'
            type='text'
            placeholder='host'
            name='cosmos2_host'
            ref={refHost}
            defaultValue={defautlValue.host}
            autoComplete='off'
          />
        </label>
        <button className='db__input-btn' type='submit'>
          {props.dbState.buttonState
            ? 'Подключение...'
            : 'Проверить подключение БД'}
        </button>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default Db;
