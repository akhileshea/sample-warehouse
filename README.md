# sample-warehouse

## Requirements: 
Implement a warehouse software. This software should hold articles, and the articles should contain an identification number, a name and available stock. It should be possible to load articles into the software from a file, see the attached inventory.json. The warehouse software should also have products, products are made of different articles. Products should have a name, price and a list of articles of which they are made from with a quantity. The products should also be loaded from a file, see the attached products.json.   

The warehouse should have at least the following functionality;

Get all products and quantity of each that is available with the current inventory
Remove (sell) a product and update the inventory accordingly

## Solution: 

### Database: 
  The solution uses Mongo DB for storing the products, items and stock information. 
  The DB has two collections Items and Products.
  Items holds item_id, stock and item name.
  Products holds product name, price, the items it is made of and the items quantity.
  
### Backend:
  The backend is a Node JS application with express. mongoose is used to manage DB schema and connections to the DB. 
  The backend contains the below APIs 
  1) POST items - For uploading inventory data from JSON file. 
  2) POST products - For uploading product data from JSON file. 
  3) GET items - For fetching items data from DB. 
  4) GET products - For fetching products data from DB. 
  5) PATCH products- For selling a product (reducing stock).
  
### Frontend: 
  The frontend is a React JS application with redux-thunk middleware for centralized state management.  
  The frontend has the following components
  1) MainComponent - The base component of the application.
  2) HeaderComponent - The header of the application and the upload functionality. 
  3) ProductsComponent - The products information. 

### Prerequisites for running the application:
1) Node JS and npm 
2) Mongo DB (https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials)
3) yarn.

### Steps to run the application locally
1) Clone the repository.
2) Start the Mongo DB server. 
3) Open a terminal window and navigate to the backend folder of the application. 
4) Run npm install followed by npm start to start the backend application. 
5) Open another terminal window and navigate to the frontend folder of the application. 
6) Run yarn install and yarn start to start the front end application. 
7) Open http://localhost:3004/ to view the application. 
8) Upload the sample inventory.json and product.json by clicking on manage inventory in the header. 



