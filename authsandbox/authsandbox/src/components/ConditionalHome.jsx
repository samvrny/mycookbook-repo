import { useAuthenticator } from '@aws-amplify/ui-react';

import WelcomePage from './WelcomePage';
import UserHome from './UserHome';

export default function ConditionalHome() {
  const { user } = useAuthenticator((context) => [context.user]);

  return user ? <UserHome /> : <WelcomePage />;
}
