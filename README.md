# Sapling 

## 
Have you ever been in a big box retailer and price checked something you were about to buy against Amazon? We've all been there, Sapling allows you to do this but goes a step futhere enabling users to do this from anywhere as well as track products on a convenient dashbaord to wait for price drops. Sapling is a MERN stack application leveraging 3 retail APIs allowing users to track product prices across Amazon, Walmart, and Best Buy. Built on a React front end, Sapling's React UI components utilize a global state file to pass state and effect hooks to refactor compartmentalized components used elsewhere in the application. User authentication is handled by passport while user account information is handled by a MongoDB backend.

![Site](assets/images/demo.gif) 

 
## Technologies Used
* [React](https://reactjs.org/docs/getting-started.html): Used to dynamically render components on browser and initiate functionality of the game based on user inputs
* [React-bootstrap](https://www.npmjs.com/package/react-bootstrap): Front-end framework built for React
* [Passport ](http://www.passportjs.org/): An authentication middleware for Node. js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more
* [Mongoose](https://www.npmjs.com/package/mongoose): An Object Data Modeling (ODM) library for MongoDB and Node. js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB
* [Express-Session ](https://www.npmjs.com/package/express-session): Uses a cookie to store a session id (with an encryption signature) in the user's browser and then, on subsequent requests, uses the value of that cookie to retrieve session information stored on the server. Express-session reads and writes cookies directly on the req/res
* [Dotenv](https://www.npmjs.com/package/dotenv): Zero-dependency module that loads environment variables from a . env file into process. env . Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology
* [Body-parser](https://www.npmjs.com/package/body-parser): Extracts the entire body portion of an incoming request stream and exposes it on req. body . The middleware was a part of Express. js earlier but now you have to install it separately. This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request
* [Connect-mongo](https://www.npmjs.com/package/connect-mongo): MongoDB session store for Connect and Express
* [Charts.js](https://www.chartjs.org/): A free open-source JavaScript library for data visualization, which supports 8 chart types: bar, line, area, pie, bubble,radar, polar, and scatter. Used in sapling to render price trends from different retailers the user saves to their dashbaord to track
* [Node.js](https://nodejs.org/en/): Used for package managment and to execute JavaScript code to build the command line tool for server-side scripting
* [npm.js](https://docs.npmjs.com/): package manager for JavaScript
* [Express.js](https://expressjs.com/): A Node. js web application server framework, designed for building single-page, multi-page, and hybrid web applications. Used in this application to set middle ware for end point connection between the front end and backend
* [MongoDB](https://www.mongodb.com/): An object-oriented, simple, dynamic, and scalable NoSQL database. It is based on the NoSQL document store model. MongoBD in this application is used as the main data store for product and user information
* [Morgan](https://www.npmjs.com/package/morgan): Request logger middleware for Node.js that easily logs requests, errors, and more to the console

 
## Code snippet
Sapling's reducer is used to set State Hooks that will be used throught the application. Each page makes api calls to big box retail stores based on user actions, or the useEffect hook that loads products pulled from the api requests during the react components Mounting lifecycle. The reducer function is used as the Global state to set the specific product requested from information that is stored in the database or pulled directly from the retail api requests that data is requested from. This information is then being displayed on the DOM during our react components render lifecycle.

```js
const reducer = (state, action) => {
  switch (action.type) {
  case SET_CURRENT_PRODUCT:
    return {
      ...state,
      currentProduct: action.product,
      loading: false
    };

  case SET_BESTBUY_PRODUCT:
    return {
      ...state,
      bestbuyProduct: action.product,
      loading: false
    };

case SET_AMAZON_PRODUCT:
    return {
        ...state,
        amazonProduct: action.product,
        loading: false
    };
case ITEMS_ONE:
    return {
        ...state,
        CarasuleItemOne: [...action.CarasuleItemOne],
        loading: false
        };
case ITEMS_TWO:
    return {
        ...state,
        CarasuleItemTwo: [...action.CarasuleItemTwo],
        loading: false
        };
case ITEMS_THREE:
    return {
        ...state,
        CarasuleItemThree: [...action.CarasuleItemThree],
        loading: false
        };

case UPDATE_RESULT_LIST:
    return {
        ...state,
        productList: [...action.productList],
        loading: false
};

  case TRACK_PRODUCT:
    return {
      ...state,
      trackedList: [action.product, ...state.trackedList],
    };

case REMOVE_PRODUCT:
return {
    ...state,
    trackedList: state.trackedList.filter((product) => {
    return product.sku !== action.sku; 
    })
};

case UPDATE_DASHBOARD_LIST:
return {
    ...state,
    trackedList: [...state.trackedList],
    loading: false
};

case SET_DASHBOARD_LIST:
return{
    ...state,
    trackedList: [...action.trackedList],
    loading: false
};

case LOADING:
return{
    ...state,
    loading: false
};
case LOG_IN:{
return{
    ...state,
    LogIn:true
}
}

  default:
    return state;
  }
};

```
## Code snippet 
Using the global state when a user clicks to track a product on the product page, the state is set for this product and a put request is executed to the database that will later be retreived to render on the user's dashboard. 3 prices from the three different big box retail APIs are requested and sent to the database. This is used as the first data point to render a price graph using charts.js for each product the user wants to track starting from the day they saved the product on their dashboard. 


```js
    const trackProduct = (event) => {
        event.preventDefault();
        console.log(state.currentProduct.upc)
        const productObj = { 
            name: state.currentProduct.name, 
            upc: state.currentProduct.upc, 
            itemId: state.currentProduct.itemId,
            price: state.currentProduct.price, 
            image: state.currentProduct.image,
            amazonPrice: state.amazonProduct.price,
            bestbuyPrice: state.bestbuyProduct.price
        }
        API.trackProduct(userId, productObj)
            .then(res => {
                console.log(res.data)
                dispatch({
                    type: TRACK_PRODUCT,
                    product: state.currentProduct
                });
            })
            .catch(err => console.log(err))

    };
```





## Authors

**Chris Melby**
- [LinkedIn](https://www.linkedin.com/in/chris-melby-71106b126/)
- [Github](https://github.com/cmelby)
- [Portfolio](https://cmelby.github.io/portfolio/)

**Kevin Chengyu Ko**
- [LinkedIn](https://www.linkedin.com/in/kevin-ko-ab7a98196/)
- [Github](https://github.com/kokevin678/)
- [Portfolio](https://kokevin678.github.io/portfolio/)

**Casey Moldavon**
- [LinkedIn](https://www.linkedin.com/in/casey-moldavon-442a1761/)
- [Github](https://github.com/casey-moldavon)
- [Portfolio](https://casey-moldavon.github.io/react-portfolio/)

**Yali Miranda**
- [LinkedIn](https://www.linkedin.com/in/yal%C3%AD-miranda-8b4b94199/)
- [Github](https://github.com/yjmiranda)
- [Portfolio](https://yali-miranda-portfolio.herokuapp.com/)

**Rachel Yeung**
- [LinkedIn](https://www.linkedin.com/in/rachel-yeung-814986159/)
- [Github](https://github.com/xrachhel)
- [Portfolio](https://rachelyeung.herokuapp.com/)

**Andres Jimenez**
- [LinkedIn](https://www.linkedin.com/in/andres-felipe-jimenez-ferreira-b67a35192/)
- [Github](https://github.com/AndresF97?tab=repositories)
- [Portfolio](https://andresf97.github.io/Basic_portfolio_2/public/index.html)