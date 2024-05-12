const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const multer = require('multer');
const cors = require('cors');
const db = require('./routes/db');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use(fileUpload()); */

app.use(cors())

// Настройка multer для сохранения загруженных файлов
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // путь к папке для сохранения файлов
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage }).single('file');

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Ошибка Multer при загрузке
      res.status(500).send({ error: err.message });
    } else if (err) {
      // Неизвестная ошибка
      res.status(500).send({ error: err.message });
    } else {
      // Все прошло успешно
      console.log(req.file);
      res.send('Файл загружен');
    }
  });
});


// Маршрут для загрузки файла
/* app.post('/upload', (req, res) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Доступ к загруженному файлу
  let uploadedFile = req.files.uploadedFile;

  // Сохранение файла
  uploadedFile.mv('/path/to/destination', function(err) {
    if (err) {
      console.log(1);
      return res.status(500).send(err);
    }
    res.send('File uploaded!');
  });
}); */

app.use('/', db)

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  console.log(err);
});


const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
}) 