#!/bin/bash
mocha --require test/helpers/babel.js --require test/helpers/chai.js 'src/**/*.spec.js' 'test/**/*.spec.js'
