
const { REACT_APP_GMAPS_API_KEY, REACT_APP_HASURA_API_URL } = process.env;

const ENV = {
      GMAPS_API_KEY: REACT_APP_GMAPS_API_KEY || '',
      HASURA_API_URL: REACT_APP_HASURA_API_URL || ''

}

export { ENV };