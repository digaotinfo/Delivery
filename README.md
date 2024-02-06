## Install
```
npm i nativewind@2.0.11
npm i tailwindcss@3.3.2 --save-dev
```

## Inicializar tailwind 
```
npx tailwindcss init
```


## Config
### tailwind.config.js
```
content: [
    "./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"
  ],
```


### babel.config.js
```
plugins: ['nativewind/babel']
```