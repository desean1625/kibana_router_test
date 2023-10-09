import { IRouter } from '../../../../src/core/server';

export function defineRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/kibana_router_test/example',
      validate: false,
    },
    async (context, request, response) => {
      await new Promise(r=>setTimeout(r,1000))//wait 1 second to return the results
      return response.ok({
        body: {
          time: new Date().toISOString(),
        },
      });
    }
  );
}
