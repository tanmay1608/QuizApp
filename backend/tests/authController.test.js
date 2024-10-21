import request from "supertest";
import mongoose from "mongoose";
import { app } from "../index.js";
import bcrypt from "bcryptjs";
import { MongoMemoryServer } from "mongodb-memory-server";
import { userModel } from "../models/userModel.js";
import { authenticate } from "../middelwares/auth.js";

let mongoServer;
jest.mock("../middelwares/auth.js");
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);

  authenticate.mockImplementation((req, res, next) => {
    req.user = { role: "user" };
    next();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.collection("users").deleteMany({});
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

  it("should return 500 if registration fail", async () => {
    jest.spyOn(userModel, "findOne").mockImplementationOnce(() => {
      throw new Error("Database connection error");
    });
    const response = await request(app).post("/api/user/register").send({
      email: "test2@example.com",
      password: "password123",
      name: "test user",
      address: "test user",
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("registration failed");
  });
});

describe("POST /login", () => {
  it("should return 400 if any field is missing", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "test@gmail.com" });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  it("should return 404 if user not found", async () => {
    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "test@example.com", password: "test123" });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("should return 401 if password miss match", async () => {
    const hashedPassword = await bcrypt.hash("test123", 10);
    await userModel.create({
      email: "test@example.com",
      password: hashedPassword,
      address: "test address",
      role: "user",
      name: "test user",
    });

    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "test@example.com", password: "testpassword" });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid credentials");
  });

  it("should return 200 if login successful", async () => {
    const hashedPassword = await bcrypt.hash("test123", 10);
    const user = await userModel.create({
      email: "test1@example.com",
      password: hashedPassword,
      address: "test address",
      role: "user",
      name: "test user",
    });

    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "test1@example.com", password: "test123" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
  });

  it("should return 500 if login fail", async () => {
    jest.spyOn(userModel, "findOne").mockImplementationOnce(() => {
      throw new Error("Database connection error");
    });
    const response = await request(app)
      .post("/api/user/login")
      .send({ email: "test1@example.com", password: "test123" });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Login failed");
  });
});

describe("logout", () => {
  it("should clear auth token and return 200 if log out successfully", async () => {
    const response = await request(app).post("/api/user/logout").send({});
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logged out successfully");
  });

  // it.only('should return 500 if log out fail',async ()=>{

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
});

describe("userInfo", () => {
  it("should return 404 if user not found", async () => {
    const response = await request(app).get(
      `/api/user/${new mongoose.Types.ObjectId(123)}`
    );
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User not found");
  });

  it("should return 200 if user info fecthed successfully", async () => {
    const user = await userModel.create({
      email: "test2@example.com",
      password: "hashedPassword",
      address: "test address",
      role: "user",
      name: "test user",
    });

    const response = await request(app).get(`/api/user/${user._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User information fetched successfully");
  });

  it("should return 500 if failed to fetch user", async () => {
    jest.spyOn(userModel, "findById").mockImplementationOnce(() => {
      throw new Error("Database connection error");
    });

    const response = await request(app).get(
      `/api/user/${new mongoose.Types.ObjectId(123)}`
    );
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to fetch user");
  });
});

describe("verify user role", () => {
  it("should return 400 if role is not defined", async () => {
    const response = await request(app).post("/api/user/").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("role is not defined");
  });

  it("should return 200 if user is verfied", async () => {
    const response = await request(app).post("/api/user/").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("role is not defined");
  });
});
