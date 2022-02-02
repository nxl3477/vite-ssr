import ReactDomServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

console.log('ReactDomServer', StaticRouter)


export function render (url, context) {
  return ReactDomServer.renderToString(
    <StaticRouter location={url} context={context} >
      <App />
    </StaticRouter>
  )
}