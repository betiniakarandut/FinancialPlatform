import express from 'express';
import { 
    signUp,
    signIn,
    verify, 
    verifyOTP,
    sendOTPVerificationEmailAndSMS,
    deleteUser,
} from '../controllers/UserController.js';
import { facebookSignUp, githubSignUp } from '../controllers/GitHubFacebookIntegrationController.js';
import { middlewareAuth } from '../middlewares/UserAuth.js';


const userRoutes = express.Router();

userRoutes.post('/signup', signUp);
userRoutes.post('/signin', signIn);
userRoutes.post('/sendotpverificationsms', sendOTPVerificationEmailAndSMS);
userRoutes.post('/verifyotp', verifyOTP);
userRoutes.get('/verify/:userId/:uniquestring', verify);
userRoutes.post('/githubsignup', githubSignUp);
userRoutes.post('/facebooksignup', facebookSignUp);
userRoutes.delete('/:userId/delete', middlewareAuth, deleteUser);

export default userRoutes;