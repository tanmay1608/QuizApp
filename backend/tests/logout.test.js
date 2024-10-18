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

describe('logout',()=>{

    it('should clear auth token and return 200 if log out successfully',async ()=>{
        const response=await request(app).post("/api/user/logout").send({});
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Logged out successfully");  
    })

    // it('should return 500 if log out fail',async ()=>{

    //     const res={
    //         clearCookie:jest.fn(),
    //     }
    //     jest.spyOn(res, "clearCookie").mockImplementation(() => {
    //         throw new Error("Error occurred");
    //     });
    //     const response=await request(app).post("/api/user/logout").send({});
    //     expect(response.status).toBe(500);
    //     expect(response.body.message).toBe("Logout failed. Please try again.");  
    // })
})
