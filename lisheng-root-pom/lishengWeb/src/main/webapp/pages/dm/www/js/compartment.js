app.controller("compartmentCtrl", function($scope, $http, getMenu, getTown, datepicker, loading, pin, $location) {
    datepicker.real();
    getMenu.real(1);
    // 获取城市 & 联动社区
//    getTown.getCitys();
//    $scope.getCommunitys = function(cityId) {
//        getTown.getCommunitys(cityId);
//    };

    if (window.location.host.indexOf('localhost') >= 0 || window.location.host.indexOf("10.228.18.230") >= 0) {
        $scope.download = 'http://10.100.100.204:8280/doorManagement';
    } else {
        $scope.download = 'http://' + window.location.host + '/doorManagement';
    };

    $scope.getlist = function(skip, sdata) {


        //激活页码
        $scope.skip = skip;
        if (sdata) {
            $scope.sdata = sdata;
        } else {
            $scope.sdata = [];
            // $scope.sdata.status = "0";
        };

        console.log($scope.sdata);

        //status
        // $scope.status = $location.search().status;
        // if ($scope.status) {
        //     $scope.isShow = true;
        // } else {
        //     $scope.isShow = false;
        //     $scope.status = $scope.sdata.status;
        // };

        loading.show();
        $http({
            url: api + '/order/queryOrderList',
            method: 'POST',
            data: $.param({
                pageNum: skip,
                pageSize: 20,
                clientId : $scope.sdata.clientId,
                status: $scope.sdata.status,
                createTime:$scope.sdata.createTime
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {

            //order data
            $scope.orderList = data.data.data;
            //分页
            var pageNum = data.data.count / 20;
            var re = /^[0-9]*[1-9][0-9]*$/;
            if (re.test(pageNum)) {
                pageNum = parseInt(pageNum);
            } else {
                pageNum = parseInt(pageNum) + 1;
            };
            var pageskip = [];
            for (var i = pageNum - 1; i >= 0; i--) {
                pageskip.push(i);
            };
            $scope.pageSkip = pageskip;
            $scope.maxPageSkip = pageNum;

            pin.real();
            // console.log(pageNum);
            loading.hide();
        });
    };
    $scope.getlist("1");


    // 获取客户列表
    $scope.getCilent = function() {
        $scope.cilents = [];
        
            $http({
                url: api + '/client/queryClientList',
                method: 'POST',
                data: $.param({
                    pageNum: 1,
                    pageSize: 500
                }),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
            }).then(function(data) {
                if (data.data.ret === 1) {
                    $scope.cilents = data.data.data;
                } else {
                    swal({
                        title: data.data.msg,
                        text: '',
                        type: "error",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "知道了",
                        closeOnConfirm: false,
                    });
                }
            });

    };
    
    $scope.getCilent();

    // 作废门禁
    $scope.cancle = function(orderId) {
        $scope.orderId = orderId;
        $("#cancleDoor").modal("show");
    };
    $scope.saveCancleOrder = function() {
    	alert();
        $http({
            url: api + '/order/updateOrderStatus',
            method: 'POST',
            data: $.param({
            	orderId: $scope.orderId,
                status : 3
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then(function(data) {
            $("#cancleDoor").modal("hide");
            if (data.data.ret === 1) {
                $scope.live($scope.orderId);
                swal({
                    title: "订单已作废",
                    text: '',
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
            }
        });
    };

    // 停用门禁
    $scope.stopOrder = function(orderId) {
        $scope.orderId = orderId;
        $("#stopOrder").modal("show");
    };
    $scope.saveStopOrder = function() {
        $http({
            url: api + '/order/updateOrderStatus',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            data: $.param({
            	orderId: $scope.orderId,
                status: 2
            })
        }).then(function(data) {
            $("#stopOrder").modal("hide");
            $scope.live($scope.orderId);
            if (data.data.ret === 1) {
                swal({
                    title: "订单已标记为出货",
                    text: '',
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
            }
        });
    };

    // 恢复门禁
    $scope.reUseOrder = function(orderId) {
        $scope.orderId = orderId;
        $("#reUseDoor").modal("show");
    };
    $scope.saveReUseOrder = function() {
        $http({
            url: api + '/order/updateOrderStatus',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
            data: $.param({
            	orderId: $scope.orderId,
                status: 1
            })
        }).then(function(data) {
            $("#reUseDoor").modal("hide");
            if (data.data.ret === 1) {
                $scope.live($scope.orderId);
                swal({
                    title: "订单已恢复",
                    text: '',
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
            } else {
                swal({
                    title: data.data.msg,
                    text: '',
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
            }
        });
    };

    // 刷新当前一条数据
    $scope.live = function(orderId) {
        $http({
            url: api + '/order/queryOrderList',
            method: 'POST',
            data: $.param({
            	orderId: orderId
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {
            $scope.data = data.data.data[0];
            console.log($scope.data);
            for (var i = 0; i < $scope.orderList.length; i++) {
                if ($scope.orderList[i].orderId == orderId) {
                    $scope.orderList[i] = $scope.data;
                };
            };
        });
    };

});

app.controller('openLogCtrl', function($scope, $http, getMenu, getTown, datepicker, loading, pin, $location) {
    datepicker.real();
    getMenu.real(1);

    // 获取当前门禁id
    $scope.id = $location.search().id;

    // 获取当前id的门禁信息
    $scope.getInfo = function() {
        $http({
            url: api + '/door/queryDoorInfoList',
            method: 'POST',
            data: $.param({
                doorId: $scope.id
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {
            if (data.data.ret == 1) {
                $scope.doorList = data.data.data;
            }
        });
    };
    $scope.getInfo();

    // 查询门禁开门记录
    $scope.getOpenLog = function(skip, sdata) {
        //激活页码
        $scope.skip = skip;
        if (sdata) {
            $scope.sdata = sdata;
        } else {
            $scope.sdata = [];
            // $scope.sdata.status = "0";
        };


        loading.show();
        $http({
            url: api + '/door/queryDoorLogs',
            method: 'POST',
            data: $.param({
                pageNum: skip,
                pageSize: 20,
                userName: $scope.sdata.userName,
                enterPriseName: $scope.sdata.enterPriseName,
                phoneNum: $scope.sdata.phoneNum,
                startTime: $scope.sdata.startTime,
                endTime: $scope.sdata.endTime,
                result: $scope.sdata.result,
                doorId: $scope.id
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {

            //order data
            $scope.logs = data.data.data;
            //分页
            var pageNum = data.data.count / 20;
            var re = /^[0-9]*[1-9][0-9]*$/;
            if (re.test(pageNum)) {
                pageNum = parseInt(pageNum);
            } else {
                pageNum = parseInt(pageNum) + 1;
            };
            var pageskip = [];
            for (var i = pageNum - 1; i >= 0; i--) {
                pageskip.push(i);
            };
            $scope.pageSkip = pageskip;
            $scope.maxPageSkip = pageNum;

            pin.real();
            // console.log(pageNum);
            loading.hide();
        });
    };
    $scope.getOpenLog(1);
});

app.controller('operateLogCtrl', function($scope, $http, getMenu, getTown, datepicker, loading, pin, $location) {
    getMenu.real(1);
    $scope.id = $location.search().id;

    $scope.getlist = function(skip, sdata) {


        //激活页码
        $scope.skip = skip;
        if (sdata) {
            $scope.sdata = sdata;
        } else {
            $scope.sdata = [];
            // $scope.sdata.status = "0";
        };

        console.log($scope.sdata);

        //status
        // $scope.status = $location.search().status;
        // if ($scope.status) {
        //     $scope.isShow = true;
        // } else {
        //     $scope.isShow = false;
        //     $scope.status = $scope.sdata.status;
        // };

        // loading.show();
        $http({
            url: api + '/door/queryDoorOperateLogs',
            method: 'POST',
            data: $.param({
                pageNum: skip,
                pageSize: 20,
                doorId: $scope.id
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {

            //order data
            $scope.operateLogs = data.data.data;
            //分页
            var pageNum = data.data.count / 20;
            var re = /^[0-9]*[1-9][0-9]*$/;
            if (re.test(pageNum)) {
                pageNum = parseInt(pageNum);
            } else {
                pageNum = parseInt(pageNum) + 1;
            };
            var pageskip = [];
            for (var i = pageNum - 1; i >= 0; i--) {
                pageskip.push(i);
            };
            $scope.pageSkip = pageskip;
            $scope.maxPageSkip = pageNum;

            pin.real();
            // console.log(pageNum);
            // loading.hide();
        });
    };
    $scope.getlist("1");
});