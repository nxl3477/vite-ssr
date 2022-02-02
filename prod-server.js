/** 
 * 
 *  生产环境运行 ssr 产出文件
 * 
 */
const express = require('express');
const fs = require('fs');

const app = express();

// html 模版
const template = fs.readFileSync('dist/client/index.html', 'utf-8')
// TODO: 需要只处理 jscss等资源
app.use(express.static('dist/client'))


app.get('*', async (req, res) => {
  // 服务端入口文件
  const render = require('./dist/server/server-entry.js').render;
  let _template = template
  // 渲染出html

  const context = {};
  const html = await render(req.url, context);

  // ssr 告诉我们应该跳转到页面， 省的先csr渲染出来然后又跳转
  if( context.url ) {
    res.redirect(301, context.url)
    return 
  }

  const responseHTML =  _template.replace('<!-- APP_HTML -->', html)

      
  res.set('content-type', 'text/html')
  res.send(responseHTML)

})


app.listen(4000)