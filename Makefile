install:
	npm install
publish:
	npm publish
start:
	npx babel-node -- src/bin/gendiff.js
lint:
	npx eslint .
build:
	rm -rf dist
	npm run build
test:
	npm test