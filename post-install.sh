#!/bin/bash

# Remove all top-level files except for our pacakge.json
find . -maxdepth 1 ! \(  -name 'package.json' \) -type f -exec rm -f {} +

# Move all our source files to the root.
cd ./src/components
mv * ../../

# Remove all top-level directories.
cd ../../
find . -type d -exec rm -fr {} +
