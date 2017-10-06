(function(){
    var service = function($log) {

        var parseToDate = function(timestamp){
            function pad(s) { return (s<10) ? '0'+ s : s};
            var date = new Date(timestamp);
            return [pad(date.getDate()), pad(date.getMonth()+1), date.getFullYear()].join('/');
        }

        var formatDates4Employees = function(employees) {
            for(var i=0; i < employees.length; ++i) {
                employees[i] = formatDate4Employee(employees[i]);
            }
            return employees;
        }

        var formatDate4Employee = function(employee) {
            employee.dateOfBirthString = formatDateField(employee.dateOfBirth);
            employee.firstEmploymentDateString = formatDateField(employee.firstEmploymentDate);
            employee.lastEmploymentDateString = formatDateField(employee.lastEmploymentDate);
            return employee;
        }

        var formatDateField = function(timestamp) {

            if(timestamp > 0){
                return moment(timestamp).format('DD/MM/YYYY');
            } else {
                return 'NA';
            }
        }

        return {
            parseToDate : parseToDate,
            formatDateField : formatDateField,
            formatDate4Employee : formatDate4Employee,
            formatDates4Employees : formatDates4Employees
        };
    };

    var module = angular.module('spring-magento-commons');
    module.factory('dateService', ['$log', service]);
})();
