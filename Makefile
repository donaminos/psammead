none:
	@ echo Please specify a target

install:
	npm --version; node --version;
	npm ci; npm run install:packages;

tests:
	npm test;
