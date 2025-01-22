'use client'
import { Provider } from 'react-redux'
import { redux } from './redux'

interface Props {
    children: React.ReactNode
}

function ReduxProvider({ children }: Props) {
  return (
    <Provider store={redux}>
      {children}
    </Provider>
  )
}

export default ReduxProvider