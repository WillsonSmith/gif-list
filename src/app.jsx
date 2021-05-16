import '@willson/gif-player';
import {List} from './components/List';
import {registerSW} from 'virtual:pwa-register';
import { useEffect } from 'preact/hooks';

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('refresh')
  },
  onOfflineReady() {
    console.log('offline ready')
  }
})

export function App(props) {
  useEffect(() => {
    updateSW()
  }, [])
  return (
    <>
      <List />
    </>
  )
}
