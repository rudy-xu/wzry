import { Injectable } from "@nestjs/common";
import mongoose from "mongoose";

@Injectable()
export class DBService {
  public connectDB() {
    mongoose.connect('mongodb://localhost:27017/wzry', {
      authSource: "admin",
      user: "root",
      pass:"Aa123456",
      // useNewUrlParser: true,
      // useUnifiedTopology: true
      // "useMongoClient": true
    }).then(() => {
      console.log('successfully connected to the mongodb');
    });

    mongoose.connection.on('error', (err) => {
      console.log('>> Failed to connect to MongoDB, retrying...');

      setTimeout(() => {
        // mongoose.connect(mongoConnectionString, options);
      }, 5000);
    });

    // //quote model js to avoid error which would't be quoted
    // require("require-all")(__dirname + "/../models");
  }

  public createSchema() {
    const schema1 = new mongoose.Schema({
      name: {type: String},
      parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
    });

    const schema2 = new mongoose.Schema({
      title: {type: String},
      categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
      body: {type: String},
    },{
      timestamps: true
    });
  

    mongoose.model("Category", schema1);
    mongoose.model("Article", schema2);
  }
}
