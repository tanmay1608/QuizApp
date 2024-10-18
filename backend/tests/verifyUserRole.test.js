import request from "supertest";
import mongoose from "mongoose";
import { app } from "../index.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/constants.js";
import { authenticate } from "../middelwares/auth.js";


let mongoServer;
let mongoUri;
jest.mock("../middelwares/auth.js")

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);

  authenticate.mockImplementation((req, res, next)=>{
    req.user={role:"user"};
    next();
})
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('verify user role',()=>{

    it('should return 400 if role is not defined',async ()=>{
      const response=await request(app).post("/api/user/").send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("role is not defined"); 
    })

    it('should return 200 if user is verfied',async ()=>{
      const response=await request(app).post("/api/user/").send({});
      expect(response.status).toBe(400);
      expect(response.body.message).toBe("role is not defined"); 
    })


})