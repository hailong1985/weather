api = 'https://api.openweathermap.org/data/2.5/weather?q=hanoi&appid=0d4a71f1de19551547149d4f7ac189fd&units=metric'

var weatherApp = angular.module('weatherApp', []);

weatherApp.controller('WeatherCtrl', function ($scope, $http) {
    $scope.CurrentDate = new Date();
    $scope.searchWeather = function (){
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${$scope.search}&appid=0d4a71f1de19551547149d4f7ac189fd&units=metric`;
        $scope.getApi(api);
    }

    $scope.getApi = function (api){
        $http.get(api).success(function (data) {
            if (data) {
                $scope.name = data.name;
                $scope.country =data.sys.country;
                $scope.current = data.main.temp;
                $scope.temp_min = data.main.temp_min;
                $scope.temp_max = data.main.temp_max;
                $scope.wind_speed = data.wind.speed;
                $scope.clouds = data.clouds ? data.clouds.all : undefined;

                //Lay anh thoi tiet
                var baseUrl = 'https://ssl.gstatic.com/onebox/weather/128/';
                if ($scope.clouds < 20) {
                    $scope.img_url = baseUrl + 'sunny.png';
                } else if ($scope.clouds < 90) {
                    $scope.img_url = baseUrl + 'partly_cloudy.png';
                } else {
                    $scope.img_url = baseUrl + 'cloudy.png';
                }
            }
        })
            .error(function (data, status) {
                console.log(data);
            });
    }
    $scope.getApi(api)


});