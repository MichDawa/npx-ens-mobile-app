import { useRouter } from 'expo-router';

export const useHomeNavigation = () => {
  const router = useRouter();

  const navigateTo = (route) => {
    router.push(route);
    console.log(`Navigating to ${route}`);
  };


  return {
    navigateTo
  };
};