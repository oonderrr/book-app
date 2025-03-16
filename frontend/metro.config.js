const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Monorepo yapısı kullanıyorsanız, root node_modules dizinini izleme listesine ekleyin:
config.watchFolders = [
  // Frontend projenizin dışında kalan root dizinini ekleyin:
  path.resolve(__dirname, '../node_modules'),
];

// "hono/client" modülünü özel bir yol üzerinden yönlendiriyoruz:
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === 'hono/client') {
    return {
      type: 'sourceFile',
      filePath: path.resolve(
        __dirname,
        '../node_modules/hono/dist/client/index.js',
      ),
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });
