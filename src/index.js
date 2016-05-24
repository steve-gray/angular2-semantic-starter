'use strict';

const compression = require('compression');
const mount = require('connect-mount');
const serveStatic = require('serve-static');
const skeleton = require('swagger-service-skeleton');

const generator = () => {
  const instance = skeleton({
    ioc: {
      autoRegister: { pattern: './services/*.js', 
                      rootDirectory: __dirname },
    },
    codegen: {
      templateSettings: {
        implementationPath: '../../../src/controllers',
      },
      temporaryDirectory: './.temp/codegen',
    },
    customMiddleware: {
      beforeSwagger: [
        compression(),
        mount('/', serveStatic('./public/static/', { index: [ 'index.html' ] })),
        mount('/deps/angular', serveStatic('./node_modules/ame/dist')),
        mount('/deps/jquery', serveStatic('./node_modules/jquery/dist')),
        mount('/deps/semantic', serveStatic('./public/thirdparty/semantic/dist')),
      ],
    },
    service: {
      swagger: './contracts/rest-api.yaml',
    }
  });
  return instance;
};

module.exports = generator;
