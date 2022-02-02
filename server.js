/** 
 * 
 *  开发环境运行 ssr 产出文件
 * 
 */


const express = require('express');
const fs = require('fs');

const app = express();


const { createServer: createViteServer } = require('vite')


// 利用vite 提供的 server
createViteServer({
  server: {
    // 传入模式
    // 这样就是普通的 vite dev server spa服务器, 只是没有logo等服务
    // middlewareMode: 'html',
    middlewareMode: 'ssr'

  }
}).then((vite) => {
  app.use(vite.middlewares)


  // ssr 模式下 请求路由需要我们自己完成
  app.get('*', async (req, res) => {
    let template = fs.readFileSync('index.html', 'utf-8')

    template = await vite.transformIndexHtml(req.url, template)

    const { render } = await vite.ssrLoadModule('/src/server-entry.jsx')
    const html = await render(req.url, )
    const responseHTML = template.replace('<!-- APP_HTML -->', html)
    
    res.set('content-type', 'text/html')
    res.send(responseHTML)
  })

  app.listen(4000)
})