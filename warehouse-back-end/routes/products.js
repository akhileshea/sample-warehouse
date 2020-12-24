var express = require('express');
const bodyParser = require('body-parser');
const Items = require('../models/items');
const multer = require('multer');
const cors = require('./cors');
const fs = require("fs");
const Products = require('../models/products');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
            cb(null, 'products.json');
    }
  });
  
const jsonFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(json)$/)) {
        return cb(new Error('You can upload only JSON files!'), false);
    }
    cb(null, true);
  };
  
const upload = multer({ storage: storage, fileFilter: jsonFileFilter});

const productsRouter = express.Router();

productsRouter.use(bodyParser.json());

productsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions,upload.single('file'),(req, res, next) => {
    insertproductsToDb(req,res,next)
    .then((products) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(products);
    })
    .catch((err) => {
        res.statusCode = 400;
        res.json({error:err});
    })
  })
.get(cors.cors,(req,res,next) => {
    Products.find({})
    .populate('Items')
    .then((products) => {
        calculateStock(products)
        .then((products) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(products);
        })
    }, (err) => next(err))
    .catch((err) => {
        res.statusCode = 500;
        res.json({error:err});
    })
  })
  .patch(cors.corsWithOptions,(req,res,next) => {
    let productToSell = req.body.name;
    sellProduct(productToSell)
    .then((product) => {
      Products.findOne({name:product})
      .then((prod) => {
        res.status=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(prod);
      })
    })
    .catch((err) => {
      res.statusCode = 500;
      res.json({error:err});
    })
  })

const insertproductsToDb = async(req,res,next) => {
    let products = JSON.parse(fs.readFileSync(req.file.path,'utf8')).products;
    for(let i=0;i<products.length;i++) {
      let product = products[i];
      try {
        let productFromDb = await Products.findOne({name:product.name});
        if(productFromDb === null) {
          await Products.create(product);
        }
      } catch(err) {
        throw Error(err);
      }
    }
    return products;
  }

const calculateStock = async(products) => {
    for(let i=0;i<products.length;i++) {
        try {
            let childItems = products[i].contain_articles;
            let itemFromDb = await Items.findById(childItems[0].art_id);
            let itemStock = itemFromDb.stock;
            let productStock = Math.trunc(itemStock/childItems[0].amount_of); 
            if(childItems.length>1) {
                for (let j=0; j<childItems.length;j++) {
                    itemFromDb = await Items.findById(childItems[j].art_id);
                    itemStock = itemFromDb.stock;
                    let tempProductStock = Math.trunc(itemStock/childItems[j].amount_of);
                    productStock = tempProductStock<productStock?tempProductStock:productStock; 
                }
            }
            products[i].stock = productStock;
        }
        catch (err) {
            throw Error(err);
        }
    }
    return products;
}

const sellProduct = async(product) => {
  try{
    let productFromDb = await Products.findOne({name:product});
    let articlesToUpdate = productFromDb.contain_articles;
    for(let i=0;i<articlesToUpdate.length;i++) {
      let articleFromInventory = await Items.findById(articlesToUpdate[i].art_id);
      let newStock = articleFromInventory.stock - articlesToUpdate[i].amount_of;
      articleFromInventory.stock = newStock;
      articleFromInventory.save();
    }
  }
  catch (err) {
    throw Error(err);
  }
  return product;
}
module.exports = productsRouter;