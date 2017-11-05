#!/usr/bin/env node
/* eslint flowtype/require-valid-file-annotation: 0 */
'use strict'

// eslint-disable-next-line
if (process.env.NODE_ENV == null) {
  process.env.NODE_ENV = 'development'
}

require('../lib/cli').default()
