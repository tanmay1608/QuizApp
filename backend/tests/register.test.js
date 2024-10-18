import request from "supertest";
import mongoose from "mongoose";
import { app } from "../index.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { userModel } from "../models/userModel.js";

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("POST /register", () => {
  it("should return 400 if any field is missing", async () => {
    const response = await request(app)
      .post("/api/user/register")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  it("should return 400 if user already exist ", async () => {
    await userModel.create({
      email: "test@example.com",
      password: "hashedpassword",
      address: "test address",
      role: "user",
      name: "test user",
    });

    const response = await request(app).post("/api/user/register").send({
      email: "test@example.com",
      password: "password123",
      name: "test user",
      address: "test user",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User already exists");
  });

  it("should register a new user successfully", async () => {
    const response = await request(app).post("/api/user/register").send({
      email: "test2@example.com",
      password: "password123",
      name: "test user",
      address: "test user",
    });
    console.log(response.body.message);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
  });

  it('should return 500 if registration fail',async ()=>{
       
    jest.spyOn(userModel, 'findOne').mockImplementationOnce(() => {
        throw new Error('Database connection error');
    });
    const response=await request(app).post("/api/user/register").send({
      email: "test2@example.com",
      password: "password123",
      name: "test user",
      address: "test user",
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("registration failed"); 
})
});
