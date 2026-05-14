module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      startServerCommand: "npm run start",
      startServerReadyPattern: "ready",
      startServerReadyTimeout: 30000,
      url: [
        "http://localhost:3000/",
        "http://localhost:3000/about",
        "http://localhost:3000/projects",
      ],
      settings: {
        preset: "desktop",
        chromeFlags: "--no-sandbox --headless",
      },
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.05 }],
        "total-blocking-time": ["error", { maxNumericValue: 200 }],
        "speed-index": ["warn", { maxNumericValue: 2500 }],
      },
      includePassedAssertions: false,
      budgetsFile: "budgets.json",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
