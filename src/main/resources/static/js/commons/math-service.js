(function(){
    var service = function($log) {

        var round = function(value){
            return Math.round(value * 10.0) / 10.0;
        };

        var mean = function(data) {
            var sum = 0;
            for(var i=0; i < data.length; ++i) {
                sum += data[i];
            }
            if(data.length > 0) {
                sum = sum / data.length;
            }
            return sum;
        };

        var roundCompanyBook = function(cbook) {
            cbook.saudiPercentage = round(cbook.saudiPercentage);
            cbook.saudiFemalePercentage = round(cbook.saudiFemalePercentage);
            cbook.saudiSalaryAvg = round(cbook.saudiSalaryAvg);
            cbook.saudiEmploymentPeriodAvg = round(cbook.saudiEmploymentPeriodAvg);
            cbook.topPaidSaudiEmployeePercentage = round(cbook.topPaidSaudiEmployeePercentage);
            cbook.totalPoints = round(cbook.totalPoints);
            return cbook;
        };

        var roundCompanyRank = function(crank) {
            crank.value = round(crank.value);
            return crank;
        };

        var roundCompanyBooks = function(books) {
            for(var i=0; i < books.length; ++i) {
                books[i] = roundCompanyBook(books[i]);
            }
            return books;
        };

        var roundCompanyRanks = function(ranks) {
            for(var i=0; i < ranks.length; ++i) {
                ranks[i] = roundCompanyRank(ranks[i]);
            }
            return ranks;
        };

        return {
            round : round,
            mean : mean,
            roundCompanyBook : roundCompanyBook,
            roundCompanyBooks : roundCompanyBooks,
            roundCompanyRank : roundCompanyRank,
            roundCompanyRanks : roundCompanyRanks
        };
    };

    var module = angular.module('spring-magento-commons');
    module.factory('mathService', ['$log', service]);
})();
