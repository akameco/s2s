#!/bin/bash
set -e

yarn build
yarn validate
lerna publish
