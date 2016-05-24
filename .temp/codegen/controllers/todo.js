'use strict';

const todoImplementation = require('../../../src/controllers/todo');

/**
 * Helper function to validate that various attributes of
 * the request state are valid.
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function validateSwaggerRequest(req, res) {
  // Validate arguments
  if (!req) {
    throw new Error('req (Request state) cannot be null');
  } else if (!res) {
    throw new Error('res (Response object) cannot be null');
  } else if (!(req.swagger)) {
    throw new Error('req.swagger (Swagger State) cannot be null');
  } else if (!(req.swagger.params)) {
    throw new Error('req.swagger.params (Incoming parameters array) cannot be null');
  }
}

/**
 * Resolve the implementation of this controller
 * @param {object} impl     - Implementation object
 * @param {object} req      - HTTP Request
 * @returns                 - Same object if object, calls function if function
 **/
function resolveImplementation(impl, req) {
  // Validate arguments
  if (!impl) {
    throw new Error('Cannot resolve implementation. require() returned null');
  }

  // If we've got a resolver, then use that.
  // LEGACY - This was the prebeta connect-ioc convention.
  if (req && req.resolver && typeof req.resolver === 'function') {
    return req.resolver(impl);
  }
  // Support for connect-ioc
  if (req.ioc && req.ioc.build && typeof req.ioc.build === 'function') {
    return req.ioc.build(impl);
  }

  // Call generator function, if required
  if (typeof impl === 'function') {
    // Determine if we are an ES6 class, if so, generate via new()
    if (/^\s*class\s+/.test(impl.toString())) {
      return new impl();
    }
    return impl();
  }

  // POJSO.
  return impl;
}


/**
 * Get All Items
 * @remarks Fetch all todo list items.
 * @param {object}    req     - Request object
 * @param {object}    res     - Response object
 **/
function getAllItems(req, res) {
  // Validate arguments
  validateSwaggerRequest(req, res);

  // Parse operation parameters.

  // Create responder: This will set the content type, status code and also
  // terminate the request. Note that you must set x-gulp-swagger-codegen-outcome
  // on operations in order to have a mapping here. Enforce typing of the
  // responses with swaggerValidator from swagger-tools.
  const responder = {
    res,
    // Handle status 200 [success]
    success: function endSuccess(result) {
      // Void result
      if (result) {
        throw new Error('Should not have any \'result\' for this operation outcome');
      }
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end();
    },
  };

  // Validate implementation presence
  const impl = resolveImplementation(todoImplementation, req);
  if (!impl) {
    throw new Error('Cannot resolve implementation of todo');
  } else if (!impl.getAllItems) {
    throw new Error('Implementation is missing operation getAllItems for todo');
  } else if (!(typeof impl.getAllItems === 'function')) {
    throw new Error('Implementation is not a function: getAllItems for todo');
  }

  // Execute, passing the parameters
  // (variable-list) - All extracted parameters in declaration order.
  // responder - The responder helper object.
  // req - The raw request object
  // res - The raw response object
  return impl.getAllItems(
    responder
  );
}

module.exports = {
  getAllItems,
};
