import './index.scss';

import { KibanaRouterTestPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new KibanaRouterTestPlugin();
}
export { KibanaRouterTestPluginSetup, KibanaRouterTestPluginStart } from './types';
