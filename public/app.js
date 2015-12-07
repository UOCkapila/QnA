/**
 * Created by kapila on 12/7/15.
 */

var scotchQuestion = angular.module('scotchQuestion', []);

function mainController($scope , $http) {
    $scope.formData = {};

    $http.get('/api/question')
        .success(function(data){
            $scope.question = data ;
            //console.log(data);
        })
        .error(function(data){
            console.log('log '+data);
        });

    $scope.createQuestion = function(){
        $http.post('/api/question', $scope.formData)
            .success(function(data){
                $scope.formData = {};
                $scope.question = data;
                $scope.answer1 = data;
                $scope.answer2 = data;
                $scope.answer3 = data;
                $scope.answer4 = data
            })
            .error(function(data){
                console.log("error "+data);
            });
    }
}
