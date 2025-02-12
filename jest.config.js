export default {
    testEnvironment: 'node', 
    verbose: true, 
    clearMocks: true, 
    collectCoverage: false, 
    coverageProvider: 'v8', 
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], 
    coveragePathIgnorePatterns: [
      '/node_modules/',
      '/tests/',
      '/coverage/',
      '/src/infra/database/migrations/',
      '/src/infra/database/seeders/',
    ], 
    transform: {},    
  };