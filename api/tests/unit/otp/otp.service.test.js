import {
  sendOtpService,
  resendOtpService,
  verifyOtpService,
} from "../../../src/services/otp.service.js";
import { sendEmail } from "../../../src/services/email.service.js";
import User from "../../../src/models/user.model.js";

// Mock DB and email
jest.mock("../../../src/models/user.model.js");
jest.mock("../../../src/services/email.service.js");

// send otp service
describe("UNIT - Services - sendOtpService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create new user and send email", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      email: "test@gmail.com",
      otp: "123456",
      otpExpires: new Date(),
      isVerified: false,
      name: "Test User",
    });
    sendEmail.mockResolvedValue(true);

    const result = await sendOtpService("test@gmail.com");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(User.create).toHaveBeenCalled();
    expect(sendEmail).toHaveBeenCalledWith("test@gmail.com", "Test User", expect.any(String));
    expect(result.status).toBe(200);
    expect(result.message).toBe("OTP sent successfully");
  });

  test("should update non verified user and send email", async () => {
    User.findOne.mockResolvedValue({
      email: "test@gmail.com",
      name: "Test User",
      isVerified: false,
      save: jest.fn().mockResolvedValue(true),
    });
    sendEmail.mockResolvedValue(true);

    const result = await sendOtpService("test@gmail.com");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(sendEmail).toHaveBeenCalledWith("test@gmail.com", "Test User", expect.any(String));
    expect(result.status).toBe(200);
    expect(result.message).toBe("OTP sent successfully");
  });

  test("should return error if user already verified", async () => {
    User.findOne.mockResolvedValue({
      email: "test@gmail.com",
      isVerified: true,
    });

    const result = await sendOtpService("test@gmail.com");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(result.status).toBe(400);
    expect(result.message).toBe("User already verified");
  });
});

// resend otp service
describe("UNIT - Services - resendOtpService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should update non verified user and send email", async () => {
    User.findOne.mockResolvedValue({
      email: "test@gmail.com",
      name: "Test User",
      isVerified: false,
      save: jest.fn().mockResolvedValue(true),
    });
    sendEmail.mockResolvedValue(true);

    const result = await resendOtpService("test@gmail.com");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(sendEmail).toHaveBeenCalledWith("test@gmail.com", "Test User", expect.any(String));
    expect(result.status).toBe(200);
    expect(result.message).toBe("OTP sent successfully");
  });

  test("should return error if user already verified", async () => {
    User.findOne.mockResolvedValue({
      email: "test@gmail.com",
      isVerified: true,
    });

    const result = await resendOtpService("test@gmail.com");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(result.status).toBe(400);
    expect(result.message).toBe("User already verified");
  });
});

// verify otp service
describe("UNIT - Services - verifyOtpService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return error if user not found", async () => {
    User.findOne.mockResolvedValue(null);

    const result = await verifyOtpService("test@gmail.com", "123456");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(result.status).toBe(404);
    expect(result.message).toBe("User not found");
  });

  test("should return error if user already verified", async () => {
    User.findOne.mockResolvedValue({
      email: "test@gmail.com",
      isVerified: true,
    });

    const result = await verifyOtpService("test@gmail.com", "123456");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(result.status).toBe(400);
    expect(result.message).toBe("User already verified");
  });

  test("should return error if invalid otp", async () => {
    User.findOne.mockResolvedValue({
      email: "test@gmail.com",
      isVerified: false,
      otp: "123456",
    });

    const result = await verifyOtpService("test@gmail.com", "000001");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(result.status).toBe(401);
    expect(result.message).toBe("Invalid OTP");
  });

  test("should return error if expired otp", async () => {
    User.findOne.mockResolvedValue({
      email: "test@gmail.com",
      isVerified: false,
      otp: "123456",
      otpExpires: Date.now() - 10000,
    });

    const result = await verifyOtpService("test@gmail.com", "123456");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(result.status).toBe(400);
    expect(result.message).toBe("OTP expired");
  });

  test("should convert to verified user", async () => {
    User.findOne.mockResolvedValue({
      email: "test@gmail.com",
      name: "Test User",
      isVerified: false,
      otp: "123456",
      otpExpires: Date.now() + 10000,
      convertToVerifiedUser: jest.fn().mockResolvedValue(true),
    });

    const result = await verifyOtpService("test@gmail.com", "123456");

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
    expect(result.status).toBe(200);
    expect(result.message).toBe("OTP verified successfully");
  });
});
