import "@testing-library/jest-dom/vitest"; // Extends Vitest's expect with DOM matchers
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Runs a cleanup after each test case (e.g., clearing jsdom)
afterEach(() => {
  cleanup();
});
