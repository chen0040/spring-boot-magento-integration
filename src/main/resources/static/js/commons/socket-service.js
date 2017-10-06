(function(){
    var service = function($log, $http, $location, $interval, $timeout) {

        var stompClient = null;
        var socket = null;
        var connected = false;
        var thisUserId = -1;
        var thisCallback = null;
        var thisIntervalHandler = null;

        function stompConnect() {
            $log.debug('STOMP: Attempting connection');
            stompClient = null;
            connect(thisUserId, thisCallback);
        }

        var connectToHost = function() {
            var url = "/spring-magento";

            socket = new SockJS(url);
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function(frame) {
                connected = true;

                if(thisCallback) thisCallback('connect', connected);

                stompClient.subscribe('/topics/events-' + thisUserId, function(message){
                    $log.debug('event message result!');
                    //$log.debug(message.body);
                    if(thisCallback) thisCallback('events', message.body);
                });

                stompClient.subscribe('/topics/ping', function(message) {
                    $log.debug('ping!');
                    if(thisCallback) thisCallback('ping', message.body);
                });


            }, function (error) {
               $log.debug('STOMP: ' + error);
               setTimeout(stompConnect, 5000);
               $log.debug('STOMP: Reconecting in 5 seconds');
            });
        };

        var connect = function(userId, callback) {
            thisUserId = userId;
            thisCallback = callback;
            var host = $location.host();
            $log.debug('detect host: ' + host);

            if(host.indexOf('azureedge.net') > -1){

                if(thisIntervalHandler == null) {
                    thisIntervalHandler = $interval(function(){
                        $http.get('/web-socket/message/' + thisUserId)
                        .then(function(response){
                            var msg = response.data;

                            if(!msg.valid) {
                                return;
                            }

                            $timeout((function(message){
                                return function() {
                                    var msgTopic = message.topic;

                                    $log.debug(message);
                                    if(msgTopic == 'events'){
                                        $log.debug('event message result!');
                                        //$log.debug(message.body);
                                        if(thisCallback) thisCallback('events', message.body);
                                    }
                                };
                            })(msg), 100);


                        }, function(error){
                        });
                    }, 500);
                }
            } else if(stompClient == null) {
                connectToHost();
            }
        };

        var disconnect = function() {
            if (stompClient != null) {
                stompClient.disconnect();
            }
            if (thisIntervalHandler != null) {
                thisIntervalHandler.cancel();
                thisIntervalHandler = null;
            }
            connected = false;
            $log.debug("Disconnected");
        };

        var send = function(topic, obj) {
            if(stompClient != null){
                stompClient.send(topic, {}, JSON.stringify(obj));
            }
        };

        return {
            connect : connect,
            disconnect : disconnect,
            send : send
        };
    };

	var module = angular.module('spring-magento-commons');
	module.factory('socketService', ['$log', '$http', '$location',  '$interval', '$timeout', service]);
})();
