import request from "supertest";
import mongoose from "mongoose";
import { app } from "./serverForTesting.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../models/userModel.js";
import { Quiz } from "../models/quizModel.js";
import { authenticate, authorize } from "../middelwares/auth.js";

let mongoServer;
let mongoUri;
jest.mock("../middelwares/auth.js");

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  mongoUri = mongoServer.getUri();

  await mongoose.connect(mongoUri);

  authenticate.mockImplementation((req, res, next) => {
    req.user = { role: "admin" };
    next();
  });

  authorize.mockImplementation((req, res, next) => {
    if (req.user.role === "admin") {
      next();
    }
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  //await mongoose.connection.collection("users").deleteMany({});
});

describe("create quiz", () => {
  it("should return 400 if any field is miising", async () => {
    const response = await request(app).post("/api/quizzes/create-quiz").send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Title, category, and questions are required."
    );
  });

  it("should return 409 if quiz already exists", async () => {
    await Quiz.create({
      title: "test title",
      category: "test category",
      questions: [
        {
          questionText: "test question",
          options: ["1", "2", "3", "4"],
          correctOption: "1",
        },
      ],
    });

    const response = await request(app)
      .post("/api/quizzes/create-quiz")
      .send({
        title: "test title",
        category: "test category",
        questions: [
          {
            questionText: "test question",
            options: ["1", "2", "3", "4"],
            correctOption: "1",
          },
        ],
      });
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Quiz title already exists");
  });

  it("should return 201 if quiz created successfully", async () => {
    const response = await request(app)
      .post("/api/quizzes/create-quiz")
      .send({
        title: "test title new",
        category: "test category",
        questions: [
          {
            questionText: "test question",
            options: ["1", "2", "3", "4"],
            correctOption: "1",
          },
        ],
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Quiz created successfully");
  });

  it("should return 500 if failed to create quiz", async () => {
    jest.spyOn(Quiz, "findOne").mockImplementationOnce(() => {
      throw new Error("Database connection error");
    });
    const response = await request(app)
      .post("/api/quizzes/create-quiz")
      .send({
        title: "title",
        category: "test category",
        questions: [
          {
            questionText: "test question",
            options: ["1", "2", "3", "4"],
            correctOption: "1",
          },
        ],
      });
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to create quiz");
  });
});

describe("get all quizzes", () => {
  
  it("should return 200 if quizzes fetched successfully", async () => {
    const response = await request(app).get("/api/quizzes/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Quizzes fetched successfully");
  });

  it("should return 500 if failed to fetch quizzes", async () => {
    jest.spyOn(Quiz, "find").mockImplementationOnce(() => {
      throw new Error("db error");
    });
    const response = await request(app).get("/api/quizzes/");
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to fetch quizzes");
  });
});

describe("get quiz by id", () => {
  it("should return 404 if quiz not found", async () => {
    const response = await request(app).get(
      `/api/quizzes/${new mongoose.Types.ObjectId()}`
    );
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Quiz not found");
  });

  it("should return 200 if quiz fetched successfully", async () => {
    
   const quiz= await Quiz.create({
        title: "test title 2",
        category: "test category",
        questions: [
          {
            questionText: "test question",
            options: ["1", "2", "3", "4"],
            correctOption: "1",
          },
        ],
      });

    const response = await request(app).get(`/api/quizzes/${quiz._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Quiz fetched successfully");
  });

  it("should return 500 if failed to fetch quiz", async () => {
    jest.spyOn(Quiz, "findById").mockImplementationOnce(() => {
      throw new Error("db error");
    });
    const response = await request(app).get(`/api/quizzes/${new mongoose.Types.ObjectId()}`);
    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Failed to fetch quiz");
  });
});

describe("delete quiz by id", () => {
    it("should return 404 if quiz not found", async () => {
      const response = await request(app).delete(
        `/api/quizzes/${new mongoose.Types.ObjectId()}`
      );
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Quiz not found");
    });
  
    it("should return 200 if quiz fetched successfully", async () => {
      
      const quiz=await Quiz.findOne();
      const response = await request(app).delete(`/api/quizzes/${quiz._id}`);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Quiz deleted successfuly");
    });
  
    it("should return 500 if failed to delete quiz", async () => {
      jest.spyOn(Quiz, "deleteOne").mockImplementationOnce(() => {
        throw new Error("db error");
      });
      const response = await request(app).delete(`/api/quizzes/${new mongoose.Types.ObjectId()}`);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Failed to delete quiz");
    });
  });

describe("submit quiz", () => {

    it("should return 404 if user not found", async () => {
      const response = await request(app).post(
        `/api/quizzes/submit`
      );
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  
    it("should return 404 if quiz not found", async () => {

      const user=await User.create({
        email: "testsubmit@example.com",
        password: "hashedPassword",
        address: "test address",
        role: "user",
        name: "test user",
      });
      
     
      const response = await request(app).post(`/api/quizzes/submit`).send({userId:user._id, quizId:new mongoose.Types.ObjectId(), score:4 })
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Quiz not found");

    });

    it("should return 200 if quiz submitted successfully", async () => {

      const user=await User.findOne();
      
      const quiz=await Quiz.create({
        title: "test title2",
        category: "test category",
        questions: [
          {
            questionText: "test question",
            options: ["1", "2", "3", "4"],
            correctOption: "1",
           
          },
        ],
        takenBy: [{userId: new mongoose.Types.ObjectId()},{userId:user._id}]
      });
      
      const response = await request(app).post(`/api/quizzes/submit`).send({userId:user._id, quizId:quiz._id, score:4 })
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Quiz submitted successfully");

    });
  
    it("should return 500 if failed to submit quiz", async () => {

      const user=await User.findOne();
      const quiz=await Quiz.findOne();
     
      jest.spyOn(Quiz, "findById").mockImplementationOnce(() => {
        throw new Error("db error");
      });
      const response = await request(app).post(`/api/quizzes/submit`).send({userId:user._id, quizId:quiz._id, score:4 })
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Failed to submit quiz");

    });
  });
  
describe("get leaderboard", () => {

    
    it("should return 404 if quiz not found", async () => {
      
      const id=new mongoose.Types.ObjectId();
      const response = await request(app).get(`/api/quizzes/${id}/leaderboard`)
      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Quiz not found");

    });

    it("should return 200 if leaderboard fetched successfully", async () => {

      const user=await User.findOne();
      const quiz=await Quiz.create({
        title: "test title3",
        category: "test category",
        questions: [
          {
            questionText: "test question",
            options: ["1", "2", "3", "4"],
            correctOption: "1",
           
          },
        ],
        takenBy: [{userId: new mongoose.Types.ObjectId()},{userId:user._id}]
      });
      
    
      const response = await request(app).get(`/api/quizzes/${quiz._id}/leaderboard`)
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Leaderboard fetched successfully");

    });
  
    it("should return 500 if failed to fetch leaderboard", async () => {

     
      const quiz=await Quiz.findOne();
      jest.spyOn(Quiz, "findById").mockImplementationOnce(() => {
        throw new Error("db error");
      });

      const response = await request(app).get(`/api/quizzes/${quiz._id}/leaderboard`)
      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Failed to fetch leaderboard");

    });
  });  

  describe("route method not allowed", () => {
    it("should return 405 for PATCH request on / route", async () => {
      const response = await request(app).patch("/api/quizzes");
      expect(response.status).toBe(405);
      expect(response.body.message).toBe(
        "Method PATCH not allowed on this route"
      );
    });
  
    it("should return 405 for GET request on /submit route", async () => {
      const response = await request(app).get("/api/quizzes/submit");
      expect(response.status).toBe(405);
      expect(response.body.message).toBe(
        "Method GET not allowed on /submit route"
      );
    });
  
    it("should return 405 for POST request on /:id route", async () => {
      const response = await request(app).post(`/api/quizzes/${123}`);
      expect(response.status).toBe(405);
      expect(response.body.message).toBe(
        "Method POST not allowed on this route"
      );
    });
  
    it("should return 405 for POST request on userinfo route", async () => {
      const response = await request(app).post(`/api/quizzes/${123}`);
      expect(response.status).toBe(405);
      expect(response.body.message).toBe("Method POST not allowed on this route");
    });
  
    it("should return 405 for POST request on /:id/leaderboard route", async () => {
      const response = await request(app).post(`/api/quizzes/${123}/leaderboard`);
      expect(response.status).toBe(405);
      expect(response.body.message).toBe("Method POST not allowed on this route");
    });
  });
  
