// Simple test to check environment variable loading
const fs = require('fs');

console.log("Testing environment variable loading...");
console.log("Current working directory:", process.cwd());

// Read env file manually
try {
  const envContent = fs.readFileSync('.env.local', 'utf8');
  console.log(".env.local content:", envContent);
  
  // Parse manually
  const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  const envVars = {};
  lines.forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      envVars[key.trim()] = valueParts.join('=').trim();
    }
  });
  
  console.log("Parsed env vars:", envVars);
  
} catch (error) {
  console.log("Error reading .env.local:", error.message);
}

console.log("System NEXT_PUBLIC_BACKEND_URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
console.log("All system NEXT_PUBLIC_ vars:", Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_')));