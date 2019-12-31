module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.(ts|tsx)",
    "!src/**/*.stories.tsx",
    "!src/client/index.tsx",
    "!src/server/index.ts"
  ],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  testMatch: ["**/src/**/*.test.(ts|tsx)"]
};
