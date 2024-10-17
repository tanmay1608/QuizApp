import {app} from "../index.js";
import request from 'supertest';
import bcrypt from "bcryptjs"
import { quizModel } from "../models/quizModel.js";
import { userModel } from "../models/userModel.js";
import { connectDBAndStartServer,closeServer } from "../index.js";


jest.mock("../models/userModel.js")
jest.mock("bcryptjs");


beforeAll(async ()=>{
    //await connectDBAndStartServer();
})

afterAll(async ()=>{
    await closeServer();
})

describe('register user',()=>{
    
    beforeEach(()=> jest.clearAllMocks())

    test('it should return 400 if any field is missing',async ()=>{
        const response= await request(app).post('/api/user/register').send({email:"test@gmail.com"});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: "All fields are required", success: false })
    })

    test('it should return 400 if user already exist',async ()=>{
       
        userModel.findOne.mockResolvedValue({ message: "User already exists", success: false });
        const response= await request(app).post('/api/user/register').send({email:"test@gmail.com"});
       expect(response.status).toBe(400);
       //expect(response.body).toEqual({ message: "User already exists", success: false });       
    })
})