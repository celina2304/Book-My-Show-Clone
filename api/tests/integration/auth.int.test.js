// import request from "supertest";
// import app from "../../src/server.js";
// import mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";

// let mongod;

// beforeAll(async () => {
//   mongod = await MongoMemoryServer.create();
//   await mongoose.connect(mongod.getUri());
// });

// afterAll(async () => {
//   await mongoose.disconnect();
//   await mongod.stop();
// });

// test("POST /send-otp works", async () => {
//   const res = await request(app)
//     .post("/api/auth/send-otp")
//     .send({ email: "test@gmail.com" });

//   expect(res.status).toBe(200);
// });
