import { useAuthenticator } from '@aws-amplify/ui-react';

//Import the welcome page and the user home page
import WelcomePage from './WelcomePage';
import UserHome from './UserHome';

/**
 * This component conditionally renders the home page based on if a user is
 * logged in or not.
 */
export default function ConditionalHome() {

  //Get the user
  const { user } = useAuthenticator((context) => [context.user]);

  /**
   * If there is a user (AKA if the user is logged in)
   * display the user homepage. Otherwise, display the 
   * generic welcome homepage.
   */
  return user ? <UserHome /> : <WelcomePage />;
}