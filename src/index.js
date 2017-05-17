import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { ConnectedRouter } from 'react-router-redux'
import MarkdownSlides from 'config/slides.md'
import { parse } from 'utils/markdown'
import { history, createMainStore } from './store'
import App from './containers/AppContainer'

const initialStoreState = {
  slide: {
    all: parse(MarkdownSlides)
  }
}
const store = createMainStore(initialStoreState)

const tree = (Component, Router) => (
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>
  </AppContainer>
)

const render = (Component, Router) => {
  ReactDOM.render(tree(Component, Router), document.getElementById('root'))
}

render(App, BrowserRouter)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App, BrowserRouter)
  })
}
