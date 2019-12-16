module.exports = () => {
  /* eslint-disable */
  const withSass = require('@zeit/next-sass');
  const lessToJS = require('less-vars-to-js')
  const fs = require('fs')
  const path = require('path')

  const withNextAntdLess = require('./next-antd-less.config');

  // Where your antd-custom.less file lives
  const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './styles/antd-custom.less'), 'utf8')
  )

  // fix: prevents error when .less files are required by node
  if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => { }
  }

  return {
    ...withSass(withNextAntdLess({
      cssModules: true,
      cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: '[local]___[hash:base64:5]',
      },
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
      },
    })),
    // distDir: 'dist'
    assetPrefix: '/',
    publicRuntimeConfig: {
      staticFolder: `/static`,
    },
  };
};

