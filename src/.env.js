let API_ROUTE 

process.env.NODE_ENV == 'development'
  ? API_ROUTE = 'http://127.0.0.1:8888'
  : API_ROUTE = 'https://sam.com'

export default API_ROUTE