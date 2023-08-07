import { defineConfig } from 'cypress'

export default defineConfig({
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    },
    viewportWidth: 1200,
    viewportHeight: 800
  }
})
