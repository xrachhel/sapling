const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters."]
    },
    trackedProducts:[
        {
            type: Schema.Types.ObjectId,
            ref: "Products"
        }
    ]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;