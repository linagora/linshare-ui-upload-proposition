# Angular UI - Linshare upload proposition

## Description

## Contributions

### Main gulp commands
```
gulp serve
gulp build
```

Note: Set environment variable NODE_ENV to 'production' in order to build or serve minified version

### Install npm package

```
npm install my_package --save-dev
```

### Check npm packages update

```
npm outdated --depth=0
```

### Update npm package

```
npm update [my_package] --save-dev
```

### Check bower packages update

```
bower list
```

### Synchronization between package.json and bower.json
Fields 'name', 'version', 'description', 'license', 'homepage' are synchronize from package.json to bower.json.
Bower.json is copy in dist folder in build task as about.json to trace version etc.
Do not modify them in bower.json or about.json, package.json rule them all.

### Update bower package

```
npm update my_package --save
```

## License
see [http://www.linshare.org/licenses/LinShare-License_AfferoGPL-v3_en.pdf](http://www.linshare.org/licenses/LinShare-License_AfferoGPL-v3_en.pdf)
