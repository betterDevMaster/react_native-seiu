import NavigationService from './NavigationService';
import {ScreenNames} from './NavigationConstants';

export function navigateToLogin(params = {}) {
  NavigationService.navigate(ScreenNames.LOGIN, params);
}

export function navigateToSplashScreen(params = {}) {
  NavigationService.navigate(ScreenNames.SPLASH, params);
}

export function navigateToOnboarding(params = {}) {
  NavigationService.navigate(ScreenNames.ONBOARDING, params);
}

export function navigateToSignup(params = {}) {
  NavigationService.navigate(ScreenNames.SIGNUP, params);
}

export function navigateToMain(params = {}) {
  NavigationService.navigate(ScreenNames.MAIN, params);
}

export function navigateToUnion(params = {}) {
  NavigationService.navigate(ScreenNames.UNION, params);
}
