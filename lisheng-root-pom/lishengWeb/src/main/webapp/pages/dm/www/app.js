var app = angular.module("myapp", ['ui.router']);

//api 增加本地调试地址

if (window.location.host.indexOf('localhost') >= 0 || window.location.host.indexOf("10.228.18.230") >= 0) {
    //api = 'http://180.173.26.57:81/backend';
    //api="http://10.218.13.92:8100/backend"
    // api = 'http://10.218.13.94:8280/doorManagement';
    api = 'http://localhost:8080/lishengWeb';
    // api = 'http://10.218.19.227:8080/doorManagement';
    //api = 'http://10.218.14.90:8080/backgroundManagement';
} else {
    api = 'http://' + window.location.host + '/doorManagement';
};

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/compartment");

    /*$urlRouterProvider.otherwise(function(){

        window.location.href = window.location.origin + "/backend/goIndex";
    });*/
    $stateProvider

    // 包间
        .state('compartment', {
        url: '/compartment',
        templateUrl: 'template/compartment/index.html',
        controller: 'compartmentCtrl'
    })

    // 创建客户
    .state('employeeAuthority/createClient', {
        url: '/employeeAuthority/createClient',
        templateUrl: 'template/employeeAuthority/createClient.html',
        controller: 'createClientCtrl'
    })
    
    // 创建订单
    .state('compartment/createOrder', {
        url: '/compartment/createOrder',
        templateUrl: 'template/createdoor/index.html',
        controller: 'createOrderCtrl'
    })

    // 开门记录
    .state('compartment/logs', {
        url: '/compartment/logs?id',
        templateUrl: 'template/compartment/logs.html',
        controller: 'openLogCtrl'
    })

    // 操作记录
    .state('/compartment/operateLog', {
        url: '/compartment/operateLog?id',
        templateUrl: 'template/compartment/operateLog.html',
        controller: 'operateLogCtrl'
    })

    // 类型设置
    .state('setType', {
        url: '/setType',
        templateUrl: 'template/setType/index.html',
        controller: 'setTypeCtrl'
    })

    // 创建/编辑类型
    .state('/setType/editType', {
        url: '/setType/editType',
        templateUrl: 'template/setType/editType.html',
        controller: 'setTypeCtrl'
    })

    // 方糖员工权限
    .state('employeeAuthority', {
        url: '/employeeAuthority',
        templateUrl: 'template/employeeAuthority/index.html',
        controller: 'employeeAuthorityCtrl'
    })

    // 员工门禁权限详情
    .state('employeeAuthority/details', {
        url: '/employeeAuthority/details?userId?enterPriseId?employeeId',
        templateUrl: 'template/employeeAuthority/details.html',
        controller: 'employeeDetailCtrl'
    })

    // 编辑/添加门禁权限
    .state('employeeAuthority/editClient', {
        url: '/employeeAuthority/editClient?cilentId',
        templateUrl: 'template/employeeAuthority/edit.html',
        controller: 'editCtrl'
    })

    .state('employeeAuthority/details/logs', {
        url: '/employeeAuthority/details/logs?id',
        templateUrl: 'template/employeeAuthority/logs.html',
        controller: 'logCtrl'
    })

    // 入住团队权限
    .state('clientAuthority', {
        url: '/clientAuthority',
        templateUrl: 'template/clientAuthority/index.html',
        controller: 'clientAuthorityCtrl'
    })

    // 入住团队门禁权限详情
    .state('clientAuthority/details', {
        url: '/clientAuthority/details?',
        templateUrl: 'template/clientAuthority/details.html',
        controller: 'clientDetailCtrl'
    })
});

// 数组逗号分隔
app.filter('format', function() {
    return function(input) {
        return input.join(',');
    }
});
app.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});

// 过滤产品编号
app.filter('proNoMatch', function() {
    return function(input, search) {
        if (input) {
            for (var i = 0; i < input.length; i++) {
                console.log(input[i].boardRoomNO)
                console.log(typeof input[i].boardRoomNO)
                input[i].boardRoomNO.match(search);
            }
        }
    };
});