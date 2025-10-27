/**
 * Simple API tests for the profile endpoints
 */

const http = require('http');

const BASE_URL = 'http://localhost:3000';
let server;

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(url, options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test runner
async function runTests() {
  console.log('Starting API tests...\n');
  let passed = 0;
  let failed = 0;

  // Start the server
  console.log('Starting server...');
  server = require('../index.js');
  
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    // Test 1: Health check
    console.log('Test 1: Health check endpoint');
    const healthResponse = await makeRequest('GET', '/health');
    if (healthResponse.status === 200 && healthResponse.data.status === 'OK') {
      console.log('✓ Health check passed\n');
      passed++;
    } else {
      console.log('✗ Health check failed\n');
      failed++;
    }

    // Test 2: Get all profiles
    console.log('Test 2: Get all profiles');
    const allProfilesResponse = await makeRequest('GET', '/api/profile');
    if (allProfilesResponse.status === 200 && Array.isArray(allProfilesResponse.data)) {
      console.log('✓ Get all profiles passed\n');
      passed++;
    } else {
      console.log('✗ Get all profiles failed\n');
      failed++;
    }

    // Test 3: Get profile by ID
    console.log('Test 3: Get profile by ID');
    const profileResponse = await makeRequest('GET', '/api/profile/1');
    if (profileResponse.status === 200 && profileResponse.data.id === '1') {
      console.log('✓ Get profile by ID passed\n');
      passed++;
    } else {
      console.log('✗ Get profile by ID failed\n');
      failed++;
    }

    // Test 4: Get non-existent profile
    console.log('Test 4: Get non-existent profile');
    const notFoundResponse = await makeRequest('GET', '/api/profile/999');
    if (notFoundResponse.status === 404) {
      console.log('✓ 404 for non-existent profile passed\n');
      passed++;
    } else {
      console.log('✗ 404 for non-existent profile failed\n');
      failed++;
    }

    // Test 5: Update profile
    console.log('Test 5: Update profile');
    const updateData = { firstName: 'Jane', lastName: 'Smith' };
    const updateResponse = await makeRequest('PUT', '/api/profile/1', updateData);
    if (updateResponse.status === 200 && updateResponse.data.firstName === 'Jane') {
      console.log('✓ Update profile passed\n');
      passed++;
    } else {
      console.log('✗ Update profile failed\n');
      failed++;
    }

    // Test 6: Create new profile
    console.log('Test 6: Create new profile');
    const newProfile = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      bio: 'Test bio'
    };
    const createResponse = await makeRequest('POST', '/api/profile', newProfile);
    if (createResponse.status === 201 && createResponse.data.email === 'test@example.com') {
      console.log('✓ Create profile passed\n');
      passed++;
    } else {
      console.log('✗ Create profile failed\n');
      failed++;
    }

    // Test 7: Create profile without email (should fail)
    console.log('Test 7: Create profile without email');
    const invalidProfile = { firstName: 'Invalid', lastName: 'User' };
    const invalidResponse = await makeRequest('POST', '/api/profile', invalidProfile);
    if (invalidResponse.status === 400) {
      console.log('✓ Validation for missing email passed\n');
      passed++;
    } else {
      console.log('✗ Validation for missing email failed\n');
      failed++;
    }

    // Test 8: Create profile with invalid email
    console.log('Test 8: Create profile with invalid email');
    const badEmailProfile = { firstName: 'Bad', lastName: 'Email', email: 'not-an-email' };
    const badEmailResponse = await makeRequest('POST', '/api/profile', badEmailProfile);
    if (badEmailResponse.status === 400) {
      console.log('✓ Validation for invalid email passed\n');
      passed++;
    } else {
      console.log('✗ Validation for invalid email failed\n');
      failed++;
    }

  } catch (error) {
    console.error('Error running tests:', error);
    failed++;
  }

  // Print summary
  console.log('='.repeat(50));
  console.log(`Tests completed: ${passed} passed, ${failed} failed`);
  console.log('='.repeat(50));

  // Exit
  process.exit(failed > 0 ? 1 : 0);
}

// Run tests
runTests();
