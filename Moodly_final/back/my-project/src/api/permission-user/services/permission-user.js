'use strict';

/**
 * permission-user service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::permission-user.permission-user');
