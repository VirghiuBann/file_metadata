const express = require('express');
const cors = require('cors');
require('dotenv').config()

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile') , async (req, res) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(402).json({ message: 'The upfile field is required.' });
      }
      console.log(file);

      res.json({
        name: file.originalname,
        type: file.mimetype,
        size: file.size
      });

    } catch (error) {
      res.status(500).json({ message: 'Internal server error.' });
    }
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
