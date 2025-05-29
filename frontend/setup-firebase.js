// Initialize Firebase Security Rules
// Run this script with: node setup-firebase.js

const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('Firebase Security Rules Setup');
console.log('=============================');
console.log('This script will deploy security rules to allow your app to access Firestore and Storage.');
console.log('Make sure you have already installed firebase-tools and are logged in.');
console.log();

rl.question('Are you logged in to Firebase? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'n') {
    console.log('Please log in to Firebase first:');
    console.log('Run: firebase login');
    rl.close();
    return;
  }

  console.log('\nDeploying Firebase Security Rules...');
  
  exec('firebase deploy --only firestore:rules,storage', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error deploying rules: ${error.message}`);
      console.log('\nIf you\'re not logged in, please run:');
      console.log('firebase login');
      console.log('\nThen try again.');
      rl.close();
      return;
    }
    
    console.log(stdout);
    console.log('Firebase security rules have been deployed successfully!');
    console.log('\nYou can now use the Firestore database and Storage in your app.');
    console.log('If you encounter any issues, please check:');
    console.log('1. Firebase Console > Firestore Database > Rules');
    console.log('2. Firebase Console > Storage > Rules');
    
    rl.close();
  });
});
