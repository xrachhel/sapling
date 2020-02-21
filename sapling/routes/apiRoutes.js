const db = require("../models");
const axios = require("axios");

module.exports = function(app){

    //returns a list of all the users
    app.get("/api/user",(req,res)=>{
        db.User.find({})
            .populate("trackedProducts")
            .then(dbUser =>{
                res.json(dbUser);
            }).catch(err=>{
                res.send(err);
            });
    });

    //returns a specific user
    app.get("/api/user/:id",(req,res)=>{
        db.User.findOne({_id: req.params.id})
            .populate("trackedProducts")
            .then(user=>{
                res.json(user);
            }).catch(err=>{
                res.send(err);
            });
    });

    //returns a specific product
    app.get("/api/products/:id",(req,res)=>{
        db.Products.findOne({_id: req.params.id})
            .then(product=>{
                res.json(product);
            }).catch(err=>{
                res.send(err);
            });
    });

    //creates one user
    app.post("/api/user",(req,res)=>{
        db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }).then(dbUser =>{
            res.json(dbUser);
        }).catch(err =>{
            res.send(err);
        });
    });

    //creates a product and adds it to  the user's trackeProduct list
    app.put("/api/user/:id",(req,res)=>{
        db.Products.create(req.body).then(dbProducts=>db.User.findOneAndUpdate(
            {_id: req.params.id},
            {
                $push: {
                    trackedProducts: dbProducts.id
                }
            },
            { new: true}
        )).then(dbUser =>{
            res.json(dbUser);
        }).catch(err=>{
            res.send(err);
        });
    });

    //pushes the a product's old price to the recent prices list,
    //and updates the current price
    app.put("/api/products/:id/:price", (req,res)=>{
        db.Products.findOne({_id: req.params.id})
            .then(product=>{
                let oldPrice = product.price;
                db.Products.findOneAndUpdate(
                    {_id: req.params.id},
                    {
                        $push:{
                            recentPrices: oldPrice
                        },
                        $set:{
                            price: req.params.price
                        }
                    }
                ).then(result=>{
                    res.json(result);
                }).catch(err => {
                    res.send(err);
                });
            }).catch(err=>{
                res.send(err);
            });
    })

    //removes product from user's tracked product list and deletes it
    app.delete("/api/products/:userId/:productId",(req,res)=>{
        db.User.findOne({_id:req.params.userId})
            .then(user=>{
                let trackedProducts = user.trackedProducts;
                let index = trackedProducts.indexOf(req.params.productId);
                trackedProducts.splice(index,1);
                db.User.updateOne(
                    {_id: req.params.userId},
                    {
                        $set:{
                            trackedProducts: trackedProducts
                        }
                    }).then(()=>{
                        db.Products.deleteOne({_id: req.params.productId})
                            .then(product=>{
                                res.json(product);
                            }).catch(err=>{
                                res.send(err);
                            });
                    }).catch(err=>{
                        res.send(err);
                    });
            }).catch(err =>{
                res.send(err);
            });
    });

    //deletes one user
    app.delete("/api/user/:id",(req,res)=>{
        db.User.deleteOne({_id: req.params.id})
            .then(user=>{
                res.json(user);
            }).catch(err=>{
                res.send(err);
            });
    });

    //searches for a product on amazon and returns result list
    app.get("/api/rainforest/:product",(req,res)=>{
        const params = {
            api_key: process.env.RAINFOREST_API_KEY,
            type: "search",
            amazon_domain: "amazon.com",
            search_term: req.params.product
        }

        axios.get('https://api.rainforestapi.com/request', { params })
            .then(result =>{
                res.json(result.data);
            }).catch(err=>{
                res.send(err);
            });
    });

    //searches for a specific product on amazon
    app.get("/api/rainforest/product/:gtin", (req,res)=>{
        const params = {
            api_key: process.env.RAINFOREST_API_KEY,
            type: "product",
            amazon_domain: "amazon.com",
            gtin: req.params.gtin
        }

        axios.get('https://api.rainforestapi.com/request', { params })
            .then(result =>{
                res.json(result.data);
            }).catch(err=>{
                res.send(err);
            });
    });



//// WALMART API ROUTES


    app.get("/api/walmart/:product", (req,res)=>{
        const params = {
            query: req.params.product,
            format: "json",
            apiKey: process.env.WALMART_API_KEY
        }

        axios.get("http://api.walmartlabs.com/v1/search?",{params})
            .then(result =>{
                res.json(result.data);
            }).catch(err=>{
                res.send(err);
            });
    });

    //searches for a specific product on walmart api
    app.get("/api/walmart/product/:itemId", (req,res)=>{
        const params = {
            format: "json",
            apiKey: process.env.WALMART_API_KEY
        }
        axios.get(`http://api.walmartlabs.com/v1/items/${req.params.itemId}?`,{params})
            .then(result =>{
                res.json(result.data);
            }).catch(err=>{
                res.send(err);
            });
    });


    //GET Top products
    app.get("/api/walmart", (req,res)=>{
        const params = {
            format: "json",
            apiKey: process.env.WALMART_API_KEY
        }

        axios.get("http://api.walmartlabs.com/v1/trends?",{params})
            .then(result =>{
                res.json(result.data);
            }).catch(err=>{
                res.send(err);
            });
    });

    //searches best buy api
    app.get("/api/bestbuy/product/:upc", (req,res)=>{
        axios.get(`https://api.bestbuy.com/v1/products(upc=${req.params.upc}*)?format=json&apiKey=${process.env.BEST_BUY_API_KEY}`)
            .then(result =>{
                res.json(result.data);
            }).catch(err=>{
                res.send(err);
            });
    });
};