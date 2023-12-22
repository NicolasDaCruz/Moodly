'use strict';

/**
 * mood-report service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mood-report.mood-report');
