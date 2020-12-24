var express = require('express');
const bodyParser = require('body-parser');
const Items = require('../models/items');
const multer = require('multer');
const cors = require('./cors');
const fs = require("fs");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public');
  },
  filename: (req, file, cb) => {
          cb(null, 'items.json');
  }
});

const jsonFileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(json)$/)) {
      return cb(new Error('You can upload only JSON files!'), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: jsonFileFilter});
const itemRouter = express.Router();
itemRouter.use(bodyParser.json());

itemRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,upload.single('file'),(req, res, next) => {
  insertItemsToDb(req,res,next)
  .then((inventory) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(inventory);
  })
  .catch((err) => {
      res.statusCode = 500;
      res.json({error:err});
  })
})
.put(cors.corsWithOptions,(req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /items');
})
.get(cors.corsWithOptions,(req, res, next) => {
  Items.find({})
  .then((items)=> {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(items);
  })
  .catch((err) => {
    res.statusCode = 404;
    res.json({error:err});
  })
})
.delete(cors.corsWithOptions,(req, res, next) => {
  res.statusCode = 403;
  res.end('DELETE operation not supported on /items');
})

const insertItemsToDb = async(req,res,next) => {
  let inventory = JSON.parse(fs.readFileSync(req.file.path,'utf8')).inventory;
  //let inventory = req.file.inventory;
  for(let i=0;i<inventory.length;i++) {
    let item = inventory[i];
    try {
      let itemFromDb = await Items.findOne({art_id:item.art_id});
      if(itemFromDb === null) {
        //Set _id same as item_id
        item._id = item.art_id;
        await Items.create(item);
      }
      else {
        //Item already exists update inventory
        itemFromDb.stock = item.stock;
        await itemFromDb.save();
      }
    } catch(err) {
      throw Error(err);
    }
  }
  return inventory;
}
module.exports = itemRouter;
