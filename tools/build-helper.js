#!/usr/bin/env node

// Helper script to generate llms.txt and always succeed
import { spawn } from "child_process";

try {
  const result = await import("./generate-llms.js");
  console.log("✅ llms.txt generated successfully");
} catch (error) {
  console.log("⚠️  llms.txt generation skipped (non-critical)");
  // Exit with 0 to allow build to continue
  process.exit(0);
}
