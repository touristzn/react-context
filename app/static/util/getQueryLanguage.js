export default function getQueryLanguage() {
  var search = location.search;
  var i = search.indexOf('?');
  var qs, qsArr, query={}, lang, index; 

  // no query
  if (i === -1) return null;

  // query lang
  qs = search.substr(i + 1);
  qsArr = qs.split('&');
  qsArr.forEach(function(str) {
    var arr = str.split('=');
    query[arr[0]] = decodeURIComponent(arr[1]);
  });
  
  return query['lang'];
}