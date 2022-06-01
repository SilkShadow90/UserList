export enum NavigationScreens {
  Home = 'Home',
  Details = 'Details',
}

export type RootStackParamList = {
  [NavigationScreens.Home]: any;
  [NavigationScreens.Details]: any;
};
