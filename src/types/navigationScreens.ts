export enum NavigationScreens {
  Home = 'Home',
  Details = 'Details',
}

export type RootStackParamList = {
  [NavigationScreens.Home]: undefined;
  [NavigationScreens.Details]: undefined;
};
