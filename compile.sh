#!/bin/sh

start=$(date +'%H:%M:%S')
echo "Compilation started at ${start}"

rm -rf dist
rm -rf demo/dist

tsc

npm link

echo "ML2D Compilation: complete"

./compile-demo.sh

echo "Demo Compilation: complete"

end=$(date +'%H:%M:%S')

echo "Compilation ended at ${end}"