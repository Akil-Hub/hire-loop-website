import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db('hire-loop-website');

export const auth = betterAuth({

  emailAndPassword: {
    enabled: true,
  },

  user:{
       additionalFields: {
    role: {
      default:'seeker',
      input:true,
    }
  },
  },

  database: mongodbAdapter(db, {
    
    client
  }),
 

});