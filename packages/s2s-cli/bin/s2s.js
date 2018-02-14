#!/usr/bin/env node
/* eslint flowtype/require-valid-file-annotation: 0 */
'use strict'

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

require('../lib/cli').default()
