import axios from 'axios'

const HTTP = axios.create({
  baseURL: 'http://redmine.tech.rightstep.ru',
  headers: {
    'Content-Type': 'application/json',
    'X-Redmine-API-Key': 'f428a2ad4b358f169c8d205f34dc0f42d4eda98b'
  }
  /* proxy: {
    host: '37.221.213.88',
    port: 8080,
    auth: {
      username: 'pyksik',
      password: 'otncaf'
    }
  } */
})
// const key = { key: 'f428a2ad4b358f169c8d205f34dc0f42d4eda98b' }
let lib = {
  getIssues () {
    return HTTP.get('/issues.json')
      .then(resp => {
        return resp
      })
      .catch(error => console.log(error))
  }
}

export default {
  install (Vue, options) {
    Vue.prototype.$qs = lib
  }
}
