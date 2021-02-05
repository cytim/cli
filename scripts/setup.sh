#!/bin/bash

SCRIPT_DIR=$(dirname $0)

pushd ${SCRIPT_DIR}/.. > /dev/null
package_dirs=( $(find . -name package.json -not -path "*/node_modules/*" -maxdepth 3 -print0 | xargs -0 -n1 dirname) )

for dir in "${package_dirs[@]}"; do
  echo "Installing Node.js packages in [$dir]..."
  npm --prefix "$dir" ci --only production
done

popd > /dev/null

