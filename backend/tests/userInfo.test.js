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

describe('userInfo',()=>{

    it('should return 404 if user not found',async ()=>{
        
        // jest.spyOn(userModel,'findById').mockImplementationOnce(()=>{
        //     return null;
        // })
        const response=await request(app).get(`/api/user/${new mongoose.Types.ObjectId(123)}`)
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("User not found");  
    })

    it('should return 200 if user info fecthed successfully',async()=>{
        
        const user= await userModel.create({
            email: "test1@example.com",
            password: "hashedPassword",
            address: "test address",
            role: "user",
            name: "test user",
          });
          
        const response=await request(app).get(`/api/user/${user._id}`)
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User information fetched successfully");
    })

    it('should return 500 if failed to fetch user',async()=>{

        jest.spyOn(userModel, 'findById').mockImplementationOnce(() => {
            throw new Error('Database connection error');
        });
        
        const response=await request(app).get(`/api/user/${new mongoose.Types.ObjectId(123)}`)
        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Failed to fetch user");
    })


})