const { setupFirestore } = require('./setupFirestore.ts');

console.log('🔥 Starting Firestore setup...');
setupFirestore()
  .then(() => {
    console.log('✅ Setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }); 