// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function handler(event) {
  const request = event.request
  const uri = request.uri
  if (uri.endsWith('/')) {
    request.uri += 'index.html'
  } else if (!uri.includes('.')) {
    request.uri += '/index.html'
  }
  return request
}
