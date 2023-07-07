module.exports = {
  devServer: {
    proxy: {
      '/api': { // api 주소로 연결되면 target url로 우회해라
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  }
}