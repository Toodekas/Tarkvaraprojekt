import axios from 'axios';
import { navigate } from 'gatsby';

const getToken = () =>
  window.localStorage.authToken || ""


export const isBrowser = typeof window !== `undefined`;


export const setToken = token => {
  token = token.includes('"') ? '' : token;
  window.localStorage.authToken = token;
};

export const getBaseUrl = () => {
  if (!isBrowser) return false
  const host = window.location.hostname;
  const baseurl = host === "localhost" ? "http://localhost" : "https://andmebaas.naistetugi.ee"
  return baseurl
}

export function handleLogin({ username, password }) {
  if (!isBrowser) return false

  const user = username
  const pass = password

  const auth = btoa(user) + ':' + btoa(pass);

  return axios({
      method: 'get', 
      url: getBaseUrl() + '/api/get_token.php', 
      headers: {
          'Auth': auth,
      }
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
  return token !== '' && !token.includes('"');
}

export const isAdmin = () => {
  if (!isBrowser) {
    return false;
  }
  const adminString = getToken().split(':')[2];
  return adminString === "1"
}

export const getName = () => {
  if (!isBrowser) return false;
  const nameString = getToken().split(':')[0];
  console.log('name: ', nameString);
  console.log('atob: ', atob(nameString));

  return atob(nameString);
};

export const getCurrentToken = () => isBrowser && getToken()

export const logout = () => {
  if (!isBrowser) return

  console.log(`Logging out`)
  setToken('');
  navigate('/');
}