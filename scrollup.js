function Main($scope) {
    $scope.items = [];

    var counter = 0;
    $scope.loadMore = function() {
        for (var i = 0; i < 5; i++) {
            $scope.items.unshift({
                id: counter
            });
            counter -= 10;
        }
    };

    $scope.loadMore();
}

angular.module('scroll', []).directive('whenScrolled', ['$timeout',
    function($timeout) {
        return function(scope, elm, attr) {
            var raw = elm[0];

            $timeout(function() {
                raw.scrollTop = raw.scrollHeight;
            });

            elm.bind('scroll', function() {
                if (raw.scrollTop <= 0) {
                    var sh = raw.scrollHeight;
                    scope.$apply(attr.whenScrolled);
                    raw.scrollTop = raw.scrollHeight - sh;
                }
            });
        };
    }
]);
