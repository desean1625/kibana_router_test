import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface KibanaRouterTestPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface KibanaRouterTestPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
