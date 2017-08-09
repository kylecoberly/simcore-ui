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
<<<<<<< HEAD
find -mindepth 1 -maxdepth 1 -type d -exec rm -r {} \;
=======
find -type d -exec rm -fr {} +
>>>>>>> db7a16a86b868596cd6e5a4e3db15415c5cf58f5
