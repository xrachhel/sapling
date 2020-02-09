const db = require("../models");

module.exports = function(app){
    app.get("/api/user",(req,res)=>{
        db.User.find({})
            .populate("trackedProducts")
            .then(dbUser =>{
                res.json(dbUser);
            }).catch(err=>{
                res.send(err);
            });
    });

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

    app.put("/api/user/:id",(req,res)=>{
        db.Products.create({
            name: req.body.name
        }).then(dbProducts=>db.User.findOneAndUpdate(
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

    app.delete("/api/products/:userId",(req,res)=>{
        
        db.User.find({
            _id: req.params.userId
        }).then(dbUser =>{
            let trackedProducts = dbUser.trackedProducts;
            let newProductList = trackedProducts.splice(trackedProducts.indexOf(req.body.productId),1);

            db.User.updateOne(
                {_id: req.params.id},
                {
                    $set:{
                        trackedProducts: newProductList
                    }
                }
            ).then(()=>{
                db.Products.deleteOne({_id: req.body.productId})
                    .then(result=>res.json(result))
                    .catch(err=>res.send(err));

            }).catch(err=>res.send(err));
            
        }).catch(err=>res.send(err));
    });
};