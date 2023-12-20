'use strict';

/**
 * mood-entry service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mood-entry.mood-entry');
