import { useRef, useState } from 'react';
import './App.scss';
import Db from '../Db/Db';
import api from '../utils/Api';
import Menu from '../Menu/Menu';
import LoadFile from '../LoadFile/LoadFile';
import CreateTable from '../CreateTable/CreateTable';

function App() {
  const [move, setMove] = useState(0);

  const [tableData, setTableData] = useState({
    name: '',
    data: [],
  });
  const tableNameRef = useRef('');

  const [activeTab, setActiveTab] = useState({
    connnection: true,
    loadExcel: false,
    createTable: false,
  });

  const [connectionDB, setConnectionDB] = useState({
    type: null,
    user: null,
    password: null,
    database: null,
    host: null,
  });

  const [dbState, setDbState] = useState({
    title: 'Нет актуального подключения!',
    buttonState: false,
  });

  function tryToConnectionDB(values) {
    setDbState((prev) => {
      return {
        ...prev,
        buttonState: true,
      };
    });

    setConnectionDB(values);
    localStorage.setItem('cosmos2Conv', JSON.stringify(values));

    api
      .checkConnect(values)
      .then(() => {
        setDbState({
          title: 'Подключиться смог!',
          buttonState: false,
        });
      })
      .catch(() => {
        setDbState({ title: 'Подключиться не смог!', buttonState: false });
      });
  }

  function createTable(query) {
    api.createTable(connectionDB, query).then(() => {
      console.log(1);
    });
  }

  function insertData(query) {
    api.insertData(connectionDB, query).then(() => {
      console.log(2);
    });
  }

  function isMove(newVal) {
    setMove(newVal);
  }

  function isMoveConnection() {
    isMove(0);
    setActiveTab({
      connnection: true,
      loadExcel: false,
      createTable: false,
    });
  }

  function isMoveLoadEXcel() {
    isMove(-100);
    setActiveTab({
      connnection: false,
      loadExcel: true,
      createTable: false,
    });
  }

  function isMoveCreateTable() {
    isMove(-200);
    setActiveTab({
      connnection: false,
      loadExcel: false,
      createTable: true,
    });
  }

  function tableCheck() {
    setTableData((prev) => {
      return {
        ...prev,
        name: tableNameRef.current.value,
      };
    });

    tableData.columnsType = [];
    const selects = document.querySelectorAll('#select');
    selects.forEach((el) => {
      tableData.columnsType.push({
        name: el.dataset.name,
        type: el.value,
      });
    });
  }

/*   function uploadFile(file) {
    api.uploadFile(file).then((res) => {
      console.log(res);
    })
  } */

  return (
    <div className='app' style={{ marginLeft: move + 'vw' }}>
      <Menu
        isMoveConnection={isMoveConnection}
        isMoveLoadEXcel={isMoveLoadEXcel}
        isMoveCreateTable={isMoveCreateTable}
        activeTab={activeTab}
      />

      <Db
        dbState={dbState}
        tryToConnectionDB={tryToConnectionDB}
        connectionDB={connectionDB}
        isMove={isMove}
      />

      <LoadFile setTableData={setTableData} tableData={tableData} />

      <CreateTable
        tableCheck={tableCheck}
        tableData={tableData}
        createTable={createTable}
        insertData={insertData}
        connectionDB={connectionDB}
      />
    </div>
  );
}

export default App;
