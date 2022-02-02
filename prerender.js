/**
 * 
 *  静态站点文件导出
 * 
 */

const path = require('path')
const fs = require('fs')
// html 模版
const template = fs.readFileSync('dist/client/index.html', 'utf-8')
// 服务端入口文件
const render = require('./dist/server/server-entry.js').render;


const routesToRender = fs.readdirSync('src/pages').map((file) => {
  // 得到需要渲染的路由名字
  return file.replace('.jsx', '').toLowerCase();
})

// TODO: 我没配置路由

for (const route of routesToRender) {
  const context = {};
  // 渲染出当前目录对于的 html 数据
  const html = render(route, context)
  const responseHTML = template.replace('<!-- APP_HTML -->', html)
  const filePath = `dist/static/${route}.html`

  fs.writeFileSync(filePath, responseHTML)
}



