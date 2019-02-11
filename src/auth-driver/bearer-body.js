module.exports = {
  request: function (req, token) {
    token = token.split(';')

    // Refresh Token need to be set in body for JWTRefreshTokenBundle
    if (req.url.search('token-refresh') !== -1) {
      var refreshToken = token[1]
      req.data = {
        refresh_token: refreshToken
      }
    } else {
      var bearerToken = token[0]
      this.options.http._setHeaders.call(this, req, {
        Authorization: 'Bearer ' + bearerToken
      })
    }
  },

  response: function (res) {
    var tokens = (res.data || {})
    if (tokens.token && tokens.refresh_token) {
      return tokens.token + ';' + tokens.refresh_token
    }
    return (res.data || {}).token
  }
}
