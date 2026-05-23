import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB7Ywo8Wp0dzvgd7pT_WoEw1fKR6TwuMG4",
  authDomain: "aceprep-ai-205ef.firebaseapp.com",
  projectId: "aceprep-ai-205ef",
  storageBucket: "aceprep-ai-205ef.firebasestorage.app",
  messagingSenderId: "355829695378",
  appId: "1:355829695378:web:80ecedd017e86099f4b74b"
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

export default app