export function objectToQueryString(params) {
  if (typeof params !== 'object' || params === null) {
    throw new Error('Input must be a non-null object');
  }

  const queryString = Object.keys(params)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    .join('&');

  return queryString;
}
