import { PluginInitializerContext } from '../../../src/core/server';
import { KibanaRouterTestPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new KibanaRouterTestPlugin(initializerContext);
}

export { KibanaRouterTestPluginSetup, KibanaRouterTestPluginStart } from './types';
