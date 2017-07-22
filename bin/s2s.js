#!/usr/bin/env node
'use strict'

// eslint-disable-next-line
if (process.env.NODE_ENV == null) {
  process.env.NODE_ENV = 'development'
}

require('../dest/cli').run()
