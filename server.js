var config = require('./config');
var AV = require('leanengine');

AV.initialize(config.LC_APP_ID, config.LC_APP_KEY, config.LC_APP_MASTER_KEY);
// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();


if (config.isDevelopment) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}


require('babel-core/register')
require('./server/server');
