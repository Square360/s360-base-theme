/**
 * Sets a cookie with the specified name, value, expiry, and path.
 *
 * @param {string} cookieName - The name of the cookie to set
 * @param {string} cookieValue - The value to store in the cookie
 * @param {number} expiryDays - Number of days until the cookie expires
 * @param {string} [cookiePath='/'] - The path where the cookie is accessible (defaults to '/')
 */
export const setCookie = (cookieName, cookieValue, expiryDays, cookiePath='/') => {
  const date = new Date();

  date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));

  let expires = `expires=${ date.toUTCString() }`;

  document.cookie = `${ cookieName }=${ cookieValue };${ expires };path=${ cookiePath };`;
}

/**
 * Retrieves the value of a cookie by its name.
 *
 * @param {string} name - The name of the cookie to retrieve
 * @returns {string} The cookie value if found, empty string if not found
 */
export const getCookie = (name) => {
  let cookieName = `${ name }=`;
  let cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];

    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }

    if (cookie.indexOf(cookieName) == 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  return '';
}

/**
 * Deletes a cookie by setting its expiry date to the past.
 *
 * @param {string} cookieName - The name of the cookie to delete
 * @param {string} [cookiePath='/'] - The path where the cookie was set (defaults to '/')
 */
export const deleteCookie = (cookieName, cookiePath = '/') => {
  document.cookie = `${ cookieName }=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=${ cookiePath };`;
}
