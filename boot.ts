import {
  registerBulk
} from '@bitbeat/core';
import {
  WebServer,
  WebServerConfig,
  Documentation
} from '@bitbeat/web';
import fastifyStatic from 'fastify-static';
import { join } from 'path';

export default async () => {
  const webConfig = new WebServerConfig();
  const webServer = new WebServer();

  (webConfig.default as any).fastifyHelmet = {
      contentSecurityPolicy: false,
  };
  webConfig.default.host = '0.0.0.0';
  webConfig.default.port = 3000;
  (webConfig.default as any).static = {
      root: join(__dirname, 'public'),
  };
  (webServer as any).postRegister = (runtime: any, config: WebServerConfig | undefined): void => {
      runtime.register(fastifyStatic, config?.value.static);
      webServer.debug(`Registered fastify static.`);
  };

  await registerBulk(
    new Set([{
        instance: webConfig,
      },
      {
        instance: webServer,
      },
      {
        instance: Documentation,
        createInstance: true,
      }
    ])
  );
};