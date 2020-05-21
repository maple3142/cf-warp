file=cli.js

echo "Building to dist/ ..."
./node_modules/pkg/lib-es5/bin.js $file --out-path ./dist/

buildfile="$(echo "$file" | cut -d '.' -f 1)"
mv ./dist/$buildfile-win* ./dist/cf-warp-win
mv ./dist/$buildfile-linux* ./dist/cf-warp-linux
mv ./dist/$buildfile-mac* ./dist/cf-warp-mac

echo "Done..."
