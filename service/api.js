// const { deepReplaceVal } = require('srcPath/utils/object');
const appConfig = require('rootPath/config/host.json');
const apiData = require('./config/api.json');

//release环境的uri
var prodUri = appConfig.prodUri;

const apiPath = deepReplaceVal({
  obj: apiData,
  cb (apiUrl) {
    if (/^(http|\/\/)/.test(apiUrl)) {
      return apiUrl;
    }

    return `${prodUri}${apiUrl}`;
  }
});

module.exports = {
  apiPath
}
