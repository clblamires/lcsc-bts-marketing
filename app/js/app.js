var app = angular.module("theApp", [] );

app.controller('priceCtrl', function($scope){

    // defaults
    $scope.otherLoaded = false;


    $scope.aas = {
        name: 'Associate\'s (A.A.S)' ,
        price: 3060 ,
        semesters: 4 ,
        expenses: 2650 ,
        total: function(){
            return (this.price * this.semesters) + (this.expenses * (this.semesters/2))
        }
    }

    $scope.bas = {
        name: 'Bachelor\'s (B.A.S)' ,
        price: 3060 ,
        semesters: 8 ,
        expenses: 2650 ,
        total: function(){
            return (this.price * this.semesters) + (this.expenses * (this.semesters/2))
        }
    }

    $scope.others = [{
        name: 'Boise State University' ,
        cost: 5368
    },
    {
        name: 'University of Idaho' ,
        cost: 5534     
    },
    {
        name: 'UCLA' ,
        cost: 5686     
    },
    {
        name: 'Harvard University' ,
        cost: 25474     
    },
    {
        name: 'Stanford University' ,
        cost: 26047 
    }
    ];

    $scope.loadOther = function(){
       // $scope.otherLoaded = true;
        console.log("Working?");
    }
});


app.controller( 'socialCtrl', function($scope){
    $scope.facebook = 'https://www.facebook.com/lcscbts/'
    $scope.twitter = 'https://twitter.com/lcsc_bts'
    $scope.instagram = 'https://www.instagram.com/lcsc_bts/'
    $scope.email = 'bts@lcsc.edu'
})