#!/bin/bash
echo 'start'
pwd

# Remove all top-level files except for our pacakge.json
find ./ -maxdepth 1 ! \(  -name 'package.json' \) -type f -exec rm -f {} +

# Move all our source files to the root.
cd ./src/components
echo 'into components'
pwd
mv * ../../

# Remove all top-level directories.
cd ../../
echo 'up 2'
pwd
find ./ -type d -exec rm -fr {} +
