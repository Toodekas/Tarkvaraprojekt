import axios from 'axios'

const isBrowser = typeof window !== `undefined`

const getToken = () =>
  window.localStorage.authToken
    ? JSON.parse(window.localStorage.authToken)
    : {}

const setToken = token => (window.localStorage.authToken = JSON.stringify(token))

const getBaseUrl = () => {
  
  const host = window.location.hostname;
  const baseurl = host === "localhost" ? "http://localhost" : "https://andmebaas.naisteabi.ee"
}

export const handleLogin = ({ username, password }) => {
  if (!isBrowser) return false

  const user = username || "asdf"
  const pass = password || "asdf"

  const auth = btoa(user + ":" + pass

  axios({
      method: 'get', 
      url: getBaseUrl() + '/api/get_token.php', 
      headers: {
          'Auth': auth,
          'Auth-timestamp': '400000',
      }
  })
  .then( res => {
      console.log("success: ", res)
      setToken(res.data)
  })
  .catch ( err => {
      console.log("error: ", err)
  })
  
      
//   if (username === `gatsby` && password === `demo`) {
//     console.log(`Credentials match! Setting the active user.`)
//     return setUser({
//       name: `Jim`,
//       legalName: `James K. User`,
//       email: `jim@example.org`,
//     })
//   }

  return false
}

export const isLoggedIn = () => {
  if (!isBrowser) return false

  const token = getToken()

  return !!token
}

export const getCurrentToken = () => isBrowser && getToken()

export const logout = callback => {
  if (!isBrowser) return

  console.log(`Logging out`)
  setToken("")
  callback()
}