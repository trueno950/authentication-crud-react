import '@/style/main.scss'

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { setupStore } from '@/store'

import { App } from './App'

const container = document.getElementById('root')
const root = createRoot(container as HTMLDivElement)

root.render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
)
