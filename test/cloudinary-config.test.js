import test from "node:test";
import assert from "node:assert/strict";
import dotenv from "dotenv";

dotenv.config();

test("cloudinary config should load credentials from environment", async () => {
  const cloudinary = (await import("../src/config/cloudinary.js")).default;
  const config = cloudinary.config();

  assert.equal(config.cloud_name, process.env.CLOUDINARY_CLOUD_NAME);
  assert.equal(config.api_key, process.env.CLOUDINARY_API_KEY);
  assert.equal(config.api_secret, process.env.CLOUDINARY_API_SECRET);
});
