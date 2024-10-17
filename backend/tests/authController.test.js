import { app } from "../index.js";
import request from "supertest";
import bcrypt from "bcryptjs";
import { quizModel } from "../models/quizModel.js";
import { userModel } from "../models/userModel.js";
import { connectDBAndStartServer, closeServer } from "../index.js";

jest.mock("../models/userModel.js");
jest.mock("bcryptjs");

// import request from 'supertest';
// import app from '../app'; // Adjust according to your app structure
// import userModel from '../models/userModel.js';
// import bcrypt from 'bcrypt';

// jest.mock('../models/userModel.js');
// jest.mock('bcrypt');

// describe('User Registration', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('should return 400 if any field is missing', async () => {
//     const response = await request(app).post('/api/user/register').send({ email: "test@gmail.com" });
//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({ message: "All fields are required", success: false });
//   });

//   test('should return 400 if user already exists', async () => {jest.mock("../models/userModel.js");
jest.mock("bcryptjs");
//       address: "123 Main St",
//       name: "Test User"
//     });
//     expect(response.status).toBe(400);
//     expect(response.body).toEqual({ message: "User already exists", success: false });
//   });

//   test('should create a new user and return 201', async () => {
//     userModel.findOne.mockResolvedValueOnce(null); // No existing user
//     userModel.countDocuments.mockResolvedValueOnce(0); // No users in the database
//     bcrypt.hash.mockResolvedValueOnce('hashedPassword'); // Mock hashed password

//     const response = await request(app).post('/api/user/register').send({
//       email: "newuser@gmail.com",
//       password: "password123",
//       address: "456 Another St",
//       name: "New User"
//     });

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual({ message: "User created successfully", success: true });
//     expect(userModel.create).toHaveBeenCalledWith({
//       email: "newuser@gmail.com",
//       password: 'hashedPassword',
//       address: "456 Another St",
//       role: "admin",
//       name: "New User"
//     });
//   }); beforeEach(() => jest.clearAllMocks()

//   test('should handle server errors', async () => {
//     userModel.findOne.mockRejectedValueOnce(new Error('DB error'));

//     const response = await request(app).post('/api/user/register').send({
//       email: "test@gmail.com",
//       password: "password123",
//       address: "123 Main St",
//       name: "Test User"
//     });

//     expect(response.status).toBe(500);
//     expect(response.body).toEqual({ message: "Registration failed", success: false, error: 'DB error' });
//   });
// });

beforeAll(async () => {
  //await connectDBAndStartServer();
});

afterAll(async () => {
  await closeServer();
});

describe("register user", () => {
  beforeEach(() => jest.clearAllMocks());

  it("should return 400 if any field is missing", async () => {
    const response = await request(app)
      .post("/api/user/register")
      .send({ email: "test@gmail.com" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "All fields are required",
      success: false,
    });
  });

  it("should return 400 if user already exist", async () => {
    userModel.findOne.mockResolvedValue({
      message: "User already exists",
      success: false,
    });
    const user = {
      email: "test@gmail.com",
      name: "test",
      password: "random",
      address: "jaipur",
    };
    const response = await request(app).post("/api/user/register").send(user);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "User already exists",
      success: false,
    });
  });

  it("should create a new user and return and return 201", async () => {

    userModel.findOne.mockResolvedValueOnce(null);
    userModel.countDocuments.mockResolvedValueOnce(0);
    bcrypt.hash.mockResolvedValueOnce("hashedpassword");
    
    const user = {
        email: "test@gmail.com",
        name: "test",
        password: "random",
        address: "jaipur",
      };
    const response = await request(app).post("/api/user/register").send(user);
    console.log(response.body);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "User created successfully", success: true });
  });

  it('should handle server error',async()=>{
     userModel.findOne.mockRejectedValueOnce(new Error('DB error'));
     const user = {
        email: "test@gmail.com",
        name: "test",
        password: "random",
        address: "jaipur",
      };
    const response = await request(app).post("/api/user/register").send(user);
    console.log(response.body);
    expect(response.status).toBe(201);

  })
});
