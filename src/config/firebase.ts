const firebaseConfig = {
	apiKey: process.env.APP_FIREBASE_API_KEY || "",
	authDomain: process.env.APP_FIREBASE_AUTH_DOMAIN || "",
	projectId: process.env.APP_FIREBASE_PROJECT_ID || "",
	storageBucket: process.env.APP_FIREBASE_STORAGE_BUCKET || "",
	messagingSenderId: process.env.APP_FIREBASE_MESSAGING_SENDER_ID || "",
	appId: process.env.APP_FIREBASE_APP_ID || "",
	databaseURL: process.env.APP_FIREBASE_DATABASE_URL || "",
}

export default firebaseConfig
