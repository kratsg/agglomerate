//Extends objects with a Object.toParams() method
// which returns a key-value string of the parameters of the object
obj2params = function(){
  return _.map(this, function(v,k){return encodeURIComponent(k)+'='+encodeURIComponent(v);}).join('&');
};
