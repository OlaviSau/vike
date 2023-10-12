import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'

export default {
  plugins: [react(), vike()],
  vitePluginImportBuild: {
    _disableAutoImporter: true
  }
}