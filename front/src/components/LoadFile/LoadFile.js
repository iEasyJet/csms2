import './LoadFile.scss';
import { useRef, useState } from 'react';
import ModalInfo from '../ModalInfo/ModalInfo';

function LoadFile(props) {
  const [modalIfo, setModalInfo] = useState(false);
  const [data, setData] = useState([]);

  const [isLoadingFile, setIsLoadingFile] = useState({
    statusLoad: false,
    textLoad: 'Отправить файл на сервер!',
  });

  const [selectFile, setSelectFile] = useState({
    statusSelect: false,
    textSelect: 'Нужно выбрать EXCEL-файл!',
  });

  const inputRef = useRef();

  function handleClickInfoButton() {
    setModalInfo(true);
  }

  function handleLoadingFile() {
    const fileName = inputRef.current.files[0];
    if (fileName) {
      setSelectFile({
        statusSelect: true,
        textSelect: `Выбран файл: ${fileName.name}`,
      });
    } else {
      setSelectFile({
        statusSelect: false,
        textSelect: 'Нужно выбрать EXCEL-файл!',
      });
      inputRef.current.files = undefined;
    }
    setIsLoadingFile({
      statusLoad: false,
      textLoad: 'Загрузить файл!',
    });
  }

  function uploadFile() {
    const file = inputRef.current.files[0];
    const formData = new FormData();
    
    formData.append('file', file);
    setIsLoadingFile(
      (prev) =>
        (prev = {
          statusLoad: true,
          textLoad: `Файл "${file.name}" загружен!`,
        })
    );
    props.uploadFile(formData);
  }

  function closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      setModalInfo(false);
    }
  }

  return (
    <div className='loading-file'>
      <ModalInfo modalIfo={modalIfo} closeOnOverlay={closeOnOverlay} />

      <div className='loading-file__wrapper'>
        <button onClick={handleClickInfoButton} className='loading-file__info'>
          !
        </button>
        <input
          type='file'
          className='loading-file__file'
          id='file'
          ref={inputRef}
          onChange={handleLoadingFile}
        />
        <label
          htmlFor='file'
          className={`loading-file__label ${
            selectFile.statusSelect ? 'loading-file_load' : ''
          }`}
        >
          {selectFile.textSelect}
        </label>
        <input
          type='button'
          className={`loading-file__button ${
            isLoadingFile.statusLoad ? 'loading-file_load' : ''
          } ${!selectFile.statusSelect ? 'loading-file_disabled' : ''}`}
          value={isLoadingFile.textLoad}
          onClick={uploadFile}
          disabled={!selectFile.statusSelect}
        />
      </div>
    </div>
  );
}

export default LoadFile;
