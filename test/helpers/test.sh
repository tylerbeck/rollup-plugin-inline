#!/bin/bash
mocha   --require babel-core/register --require test/helpers/chai.js 'src/**/*.spec.js' 'test/**/*.spec.js'
