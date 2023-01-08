// module.exports = (api) => {
//   // api.cache(true);
//   return {
//     presets: ['@babel/preset-env', '@babel/preset-flow'],
//     plugins: [
//       '@babel/transform-runtime',
//       '@babel/plugin-syntax-dynamic-import',
//       '@babel/plugin-proposal-class-properties',
//       '@babel/plugin-proposal-export-default-from',
//       '@babel/plugin-proposal-export-namespace-from',
//       '@babel/plugin-proposal-object-rest-spread',
//     ],
//   };
// };

const jsConfig = require('./jsconfig.json');
const allPaths = jsConfig.compilerOptions.paths;

const devOption = Object.keys(allPaths).reduce((pV, cV) => {
  pV[cV.slice(0, -2)] = allPaths[cV][0].slice(0, -2);
  return pV;
}, {});

module.exports = {
  presets: [['@babel/preset-env', { targets: 'defaults' }], '@babel/preset-flow'],
  plugins: [
    '@babel/transform-runtime',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: devOption,
      },
    ],
  ],
  env: {
    dev: {
      presets: ['minify'],
    },
    prod: {
      presets: ['minify'],
      // plugins: ['transform-remove-console', 'minify-dead-code-elimination'],
    },
  },
};
