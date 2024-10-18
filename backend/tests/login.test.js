import request from "supertest";
import mongoose from "mongoose";
import { app } from "../index.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants.js";


let mongoServer;
let mongoUri;


beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('POST /login',()=>{

   
    
    it('should return 400 if any field is missing',async()=>{
        const response=await request(app).post("/api/user/login").send({email:"test@gmail.com"});
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("All fields are required");  
    })

    it('should return 404 if user not found',async ()=>{
        const response=await request(app).post("/api/user/login").send({email:"test@example.com",password:"test123"});
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found");  
    })

    it('should return 401 if password miss match',async ()=>{
        const hashedPassword=await bcrypt.hash("test123", 10);
        await userModel.create({
            email: "test@example.com",
            password: hashedPassword,
            address: "test address",
            role: "user",
            name: "test user",
          });
      
        const response=await request(app).post("/api/user/login").send({email:"test@example.com",password:"testpassword"});
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Invalid credentials");  
    })

    it('should return 200 if login successful',async ()=>{

        const hashedPassword=await bcrypt.hash("test123", 10);
       const user= await userModel.create({
            email: "test1@example.com",
            password: hashedPassword,
            address: "test address",
            role: "user",
            name: "test user",
          });
               
         const response=await request(app).post("/api/user/login").send({email:"test1@example.com",password:"test123"});

          expect(response.status).toBe(200);
          expect(response.body.message).toBe("Login successful"); 
    });

    it('should return 500 if login fail',async ()=>{
       
        jest.spyOn(userModel, 'findOne').mockImplementationOnce(() => {
            throw new Error('Database connection error');
        });
        const response=await request(app).post("/api/user/login").send({email:"test1@example.com",password:"test123"});

        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Login failed"); 
    })

})
