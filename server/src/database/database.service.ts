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
}
