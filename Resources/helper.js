obj2params = function() {
    return _.map(this, function(v, k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(v);
    }).join("&");
};