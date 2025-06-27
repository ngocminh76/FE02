import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dns from 'dns'
import tsconfigPaths from 'vite-tsconfig-paths'



dns.setDefaultResultOrder('verbatim')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000, // 👈 override mặc định
  },

  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       api: 'modern-compiler' // or "modern"
  //     }
  //   }
  // }
})
