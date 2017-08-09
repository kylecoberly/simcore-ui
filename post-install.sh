#!/bin/bash

# Remove all top-level files except for our pacakge.json
find ./ -maxdepth 1 ! \(  -name 'package.json' \) -type f -exec rm -f {} +

# Move all our source files to the root.
cd ./src/components
mv * ../../

# Remove all top-level directories.
cd ../../
echo 'remove directories'
pwd
find -mindepth 1 -maxdepth 1 -type d -exec rm -r {} \;
