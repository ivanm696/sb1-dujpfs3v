import { Redirect } from 'expo-router';

/**
 * Root index redirects to the tabs navigation
 */
export default function Index() {
  return <Redirect href="/(tabs)" />;
}