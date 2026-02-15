import { sendOtp, resendOtp, verifyOtp } from "../../../src/controllers/otp.controller.js";
import {
  sendOtpService,
  resendOtpService,
  verifyOtpService,
} from "../../../src/services/otp.service.js";

jest.mock("../../../src/services/otp.service.js");

// send otp
describe("UNIT - Controller - sendOtp", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if email is missing", async () => {
    req.body = {}; // no email

    await sendOtp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Email is required" });
  });

  test("should call service and return success response", async () => {
    req.body = { email: "test@gmail.com" };

    sendOtpService.mockResolvedValue({
      status: 200,
      message: "OTP sent successfully",
    });

    await sendOtp(req, res);

    expect(sendOtpService).toHaveBeenCalledWith("test@gmail.com");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "OTP sent successfully" });
  });

  test("should return service error response", async () => {
    req.body = { email: "test@gmail.com" };

    sendOtpService.mockResolvedValue({
      status: 400,
      message: "User already verified",
    });

    await sendOtp(req, res);

    expect(sendOtpService).toHaveBeenCalledWith("test@gmail.com");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "User already verified" });
  });

  test("should handle server error", async () => {
    req.body = { email: "test@gmail.com" };

    sendOtpService.mockRejectedValue(new Error("DB fail"));

    await sendOtp(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error",
      error: "DB fail",
    });
  });
});

// resend otp
describe("UNIT - Controller - resendOtp", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if email is missing", async () => {
    req.body = {}; // no email

    await resendOtp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Email is required" });
  });

  test("should call service and return success response", async () => {
    req.body = { email: "test@gmail.com" };

    resendOtpService.mockResolvedValue({
      status: 200,
      message: "OTP sent successfully",
    });

    await resendOtp(req, res);

    expect(resendOtpService).toHaveBeenCalledWith("test@gmail.com");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "OTP sent successfully" });
  });

  test("should return service error response", async () => {
    req.body = { email: "test@gmail.com" };

    resendOtpService.mockResolvedValue({
      status: 400,
      message: "User already verified",
    });

    await resendOtp(req, res);

    expect(resendOtpService).toHaveBeenCalledWith("test@gmail.com");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "User already verified" });
  });

  test("should handle server error", async () => {
    req.body = { email: "test@gmail.com" };

    resendOtpService.mockRejectedValue(new Error("DB fail"));

    await resendOtp(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error",
      error: "DB fail",
    });
  });
});

// verify otp
describe("UNIT - Controller - verifyOtp", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return 400 if email/otp is missing", async () => {
    req.body = {}; // no email/otp

    await verifyOtp(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email and OTP are required",
    });
  });

  test("should return service error response - User not found", async () => {
    req.body = { email: "test@gmail.com", otp: "123456" };

    verifyOtpService.mockResolvedValue({
      status: 404,
      message: "User not found",
    });

    await verifyOtp(req, res);

    expect(verifyOtpService).toHaveBeenCalledWith("test@gmail.com", "123456");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
  });

  test("should return service error response - User already verified", async () => {
    req.body = { email: "test@gmail.com", otp: "123456" };

    verifyOtpService.mockResolvedValue({
      status: 400,
      message: "User already verified",
    });

    await verifyOtp(req, res);

    expect(verifyOtpService).toHaveBeenCalledWith("test@gmail.com", "123456");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "User already verified" });
  });

  test("should return service error response - Invalid OTP", async () => {
    req.body = { email: "test@gmail.com", otp: "123456" };

    verifyOtpService.mockResolvedValue({
      status: 401,
      message: "Invalid OTP",
    });

    await verifyOtp(req, res);

    expect(verifyOtpService).toHaveBeenCalledWith("test@gmail.com", "123456");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid OTP" });
  });

  test("should return service error response - OTP Expired", async () => {
    req.body = { email: "test@gmail.com", otp: "123456" };

    verifyOtpService.mockResolvedValue({
      status: 400,
      message: "OTP Expired",
    });

    await verifyOtp(req, res);

    expect(verifyOtpService).toHaveBeenCalledWith("test@gmail.com", "123456");
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "OTP Expired" });
  });

  test("should call service and return success response", async () => {
    req.body = { email: "test@gmail.com", otp: "123456" };

    verifyOtpService.mockResolvedValue({
      status: 200,
      message: "OTP verified successfully",
    });

    await verifyOtp(req, res);

    expect(verifyOtpService).toHaveBeenCalledWith("test@gmail.com", "123456");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "OTP verified successfully",
    });
  });

  test("should handle server error", async () => {
    req.body = { email: "test@gmail.com", otp: "123456" };

    verifyOtpService.mockRejectedValue(new Error("DB fail"));

    await verifyOtp(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Server error",
      error: "DB fail",
    });
  });
});
