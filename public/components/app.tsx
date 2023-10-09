import React, { useState } from 'react';
import { i18n } from '@kbn/i18n';
import { FormattedMessage, I18nProvider } from '@kbn/i18n-react';
import { BrowserRouter as Router } from 'react-router-dom';

import {
  EuiButton,
  EuiHorizontalRule,
  EuiPage,
  EuiPageBody,
  EuiPageContent_Deprecated as EuiPageContent,
  EuiPageContentBody_Deprecated as EuiPageContentBody,
  EuiPageContentHeader_Deprecated as EuiPageContentHeader,
  EuiPageHeader,
  EuiTitle,
  EuiText,
} from '@elastic/eui';

import { CoreStart } from '../../../../src/core/public';
import { NavigationPublicPluginStart } from '../../../../src/plugins/navigation/public';

import { PLUGIN_ID, PLUGIN_NAME } from '../../common';

interface KibanaRouterTestAppDeps {
  basename: string;
  notifications: CoreStart['notifications'];
  http: CoreStart['http'];
  navigation: NavigationPublicPluginStart;
}

export const KibanaRouterTestApp = ({
  basename,
  notifications,
  http,
  navigation,
}: KibanaRouterTestAppDeps) => {
  // Use React hooks to manage state.
  const [timestamp, setTimestamp] = useState<string[]>([]);

  const onClickHandler = () => {
    // Use the core http service to make a response to the server API.
    let promises = []
    for(let i = 0; i<10;i++){
      timestamp[i] = "start: "+ (new Date()).toISOString()
      let promise = http.get('/api/kibana_router_test/example').then((res) => {
        timestamp[i] += " stop:"+  (new Date()).toISOString();
        setTimestamp([...timestamp])
      })
      promises.push(promise);
    }
    setTimestamp([...timestamp])
    Promise.all(promises).then(()=>{
      notifications.toasts.addSuccess(
        i18n.translate('kibanaRouterTest.dataUpdated', {
          defaultMessage: 'All promises complete',
        })
      );
    })
  };

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router basename={basename}>
      <I18nProvider>
        <>
          <navigation.ui.TopNavMenu
            appName={PLUGIN_ID}
            showSearchBar={true}
            useDefaultBehaviors={true}
          />
          <EuiPage restrictWidth="1000px">
            <EuiPageBody>
              <EuiPageHeader>
                <EuiTitle size="l">
                  <h1>
                    <FormattedMessage
                      id="kibanaRouterTest.helloWorldText"
                      defaultMessage="{name}"
                      values={{ name: PLUGIN_NAME }}
                    />
                  </h1>
                </EuiTitle>
              </EuiPageHeader>
              <EuiPageContent>
                <EuiPageContentHeader>
                  <EuiTitle>
                    <h2>
                      <FormattedMessage
                        id="kibanaRouterTest.congratulationsTitle"
                        defaultMessage="This plugin creates 10 requests to the router. The backend is set to delay the response by 1 second"
                      />
                    </h2>
                  </EuiTitle>
                </EuiPageContentHeader>
                <EuiPageContentBody>
                  <EuiText>
                    <p>
                      <FormattedMessage
                        id="kibanaRouterTest.content"
                        defaultMessage="The expectation is that the requests would be handled simultaniously"
                      />
                    </p>
                    <EuiHorizontalRule />
   
                      {timestamp.map(t=>{
                          return <p><FormattedMessage
                          id="kibanaRouterTest.timestampText"
                          defaultMessage="Last timestamp: {time}"
                          values={{ time: t ? t : 'Unknown' }}
                        /></p>
                      })}

                   
                    <EuiButton type="primary" size="s" onClick={onClickHandler}>
                      <FormattedMessage
                        id="kibanaRouterTest.buttonText"
                        defaultMessage="Get data"
                      />
                    </EuiButton>
                  </EuiText>
                </EuiPageContentBody>
              </EuiPageContent>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
