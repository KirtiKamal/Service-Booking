// Initialize Firebase Project
// This script helps you log in to Firebase CLI and initialize your project

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Check for existing Firebase configuration
const configPath = path.join(__dirname, 'src', 'services', 'firebase.js');

console.log('Firebase Project Initialization');
console.log('==============================\n');

// Function to run a command and return the output
const runCommand = (command) => {
  try {
    return execSync(command, { encoding: 'utf8' });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    console.error(error.message);
    return null;
  }
};

// Function to check if Firebase CLI is installed
const checkFirebaseCLI = () => {
  try {
    execSync('firebase --version', { encoding: 'utf8' });
    return true;
  } catch (error) {
    return false;
  }
};

// Main function
const main = async () => {
  // Check if Firebase CLI is installed
  if (!checkFirebaseCLI()) {
    console.log('Firebase CLI is not installed. Installing...');
    runCommand('npm install -g firebase-tools');
  }

  // Login to Firebase
  console.log('\nLogging in to Firebase...');
  console.log('A browser window will open. Please complete the login process.');
  runCommand('firebase login');

  // List Firebase projects
  console.log('\nFetching your Firebase projects...');
  const projects = runCommand('firebase projects:list');
  console.log('\nYour Firebase Projects:');
  console.log(projects || 'No projects found or error fetching projects');

  // Ask which project to use
  rl.question('\nEnter the project ID you want to use (or type "new" to create a new project): ', async (projectId) => {
    if (projectId.toLowerCase() === 'new') {
      console.log('\nCreating a new Firebase project...');
      runCommand('firebase projects:create');
      
      // Ask again for the project ID
      rl.question('\nEnter the project ID of the project you just created: ', (newProjectId) => {
        initializeProject(newProjectId);
      });
    } else {
      initializeProject(projectId);
    }
  });
};

// Initialize the project with the given project ID
const initializeProject = (projectId) => {
  // Use the project
  console.log(`\nSetting Firebase project to: ${projectId}`);
  runCommand(`firebase use ${projectId}`);
  
  // Initialize Firestore and Storage
  console.log('\nInitializing Firestore and Storage...');
  runCommand('firebase init firestore');
  runCommand('firebase init storage');
  
  // Deploy security rules
  console.log('\nDeploying security rules...');
  runCommand('firebase deploy --only firestore:rules,storage');
  
  // Enable Authentication methods
  console.log('\nPlease enable authentication methods in the Firebase console:');
  console.log(`https://console.firebase.google.com/project/${projectId}/authentication/providers`);
  
  console.log('\nFirebase setup complete! You can now use Firebase in your application.');
  console.log('\nTo resolve permission issues, make sure to:');
  console.log('1. Enable Email/Password authentication in the Firebase console');
  console.log('2. If using Google authentication, configure the OAuth consent screen');
  console.log('3. Check the FIREBASE_PERMISSIONS_GUIDE.md file for troubleshooting steps');
  
  rl.close();
};

// Start the process
main();
