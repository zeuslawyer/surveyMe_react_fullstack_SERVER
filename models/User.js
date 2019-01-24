const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchemaConfig = { strict: false };

const userSchema = new Schema(
  {
    googleID: String,
    credits: {
      type: Number,
      default: 0
    }
  },
  userSchemaConfig
);

mongoose.model("users", userSchema);
