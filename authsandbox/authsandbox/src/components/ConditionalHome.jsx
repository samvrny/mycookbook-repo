import { useAuthenticator } from '@aws-amplify/ui-react';

import WelcomePage from './WelcomePage';
import UserHome from './UserHome';

/**
 * This component conditionally renders the home page based on if a user is
 * logged in or not.
 */
export default function ConditionalHome() {
  const { user } = useAuthenticator((context) => [context.user]);

  return user ? <UserHome /> : <WelcomePage />;
}
