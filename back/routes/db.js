const router = require('express').Router();
const {
  checkConnection,
  createTable,
  insertData,
  uploadFile
} = require('../controllers/db');

router.post('/check', checkConnection);
router.post('/createTable', createTable);
router.post('/insertData', insertData)
/* router.post('/upload', uploadFile) */

module.exports = router;
