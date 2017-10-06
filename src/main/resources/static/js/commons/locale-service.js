(function(){
    var service = function($log, $http) {

        var vocabulary = {};

        var locale;

        var getText = function(text) {
            if(text in vocabulary) {
                var t = vocabulary[text];
                if(locale != 'en') {
                    var r = /\\u([\d\w]{4})/gi;
                    x = t.replace(r, function (match, grp) {
                        return String.fromCharCode(parseInt(grp, 16)); } );
                    x = unescape(x);
                    return x;
                } else {
                    return t;
                }
            }
            return text + '_' + locale;
        };

        var loadVocabulary = function() {
            $http.get('locales/get-locale').then(function(response){
                locale = response.data.locale;
                $log.debug(locale);
                vocabulary = response.data;
                $log.debug(vocabulary);
            });
        }



        return {
            getText : getText,
            loadVocabulary : loadVocabulary

        };
    };

    var module = angular.module('spring-magento-commons');
    module.factory('localeService', ['$log', '$http', service]);
})();
