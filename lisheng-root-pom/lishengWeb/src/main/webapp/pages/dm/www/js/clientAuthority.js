app.controller('clientAuthorityCtrl', function($scope, $rootScope, $http, getMenu, pin, loading) {
    getMenu.real(1);

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
            url: api + '/doorauth/queryUsersDoorAuth',
            method: 'POST',
            data: $.param({
                pageNum: skip,
                pageSize: 20,
                type: 2,
                enterPriseName: $scope.sdata.teamName,
                userName: $scope.sdata.employeeName,
                phoneNO: $scope.sdata.phoneNum
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {

            //order data
            $scope.clients = data.data.data;
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

});

app.controller('clientDetailCtrl', function($scope, $rootScope, $http, getMenu, pin, datepicker, $location, $filter) {
    getMenu.real(1);
    datepicker.real();
    $scope.userId = $location.search().id;
    $scope.priseId = $location.search().priseId;
    $scope.employeeId = $location.search().employeeId;

    // 获取对应employeeId的员工信息
    $scope.getInfo = function() {
        $http({
            url: api + '/doorauth/queryUsersDoorAuth',
            method: 'POST',
            data: $.param({
                employeeId: $scope.employeeId,
                type: 2
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then(function(data) {
            if (data.data.ret == 1) {
                $scope.infos = data.data.data;
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
    $scope.getInfo();


    // 获取详情信息
    $scope.getDetails = function() {
        $http({
            url: api + '/doorauth/queryDoorAuthDetailsByUserId',
            method: 'POST',
            data: $.param({
                userId: $scope.userId,
                enterPriseId: $scope.priseId
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then(function(data) {
            if (data.data.ret == 1) {
                $scope.details = data.data.data;
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
    $scope.getDetails();

    // 删除权限
    $scope.delete = function(id) {
        $scope.id = id;
        $("#delete").modal("show");
    };
    $scope.saveDelete = function() {
        $http({
            url: api + '/doorauth/cancleDoorAuthByAuthId',
            method: 'POST',
            data: $.param({
                doorAuthId: $scope.id
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then(function(data) {
            if (data.data.ret == 1) {
                $("#delete").modal("hide");
                $scope.live($scope.id);
                swal({
                    title: "权限已删除",
                    text: '',
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                    timer: 1600
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


    // 延5天
    $scope.delay = function(id) {
        $scope.changeId = id;
        $("#delay").modal("show");
    }
    $scope.saveDelay = function() {
        $http({
            url: api + '/doorauth/updateAuthTimeByFiveDays',
            method: 'POST',
            data: $.param({
                doorAuthId: $scope.changeId,
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {
            if (data.data.ret == 1) {
                $("#delay").modal("hide");
                $scope.live($scope.changeId);
                swal({
                    title: "延五天成功",
                    text: '',
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                    timer: 1600
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

    // 修改有效时间
    $scope.change = function(id, start, end) {
        $scope.changeId = id;
        $("#change").modal("show");
    };
    $scope.saveChange = function() {
        if (!$scope.sdata.startTime) {
            swal({
                title: '起始时间不能为空',
                text: '',
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "知道了",
                closeOnConfirm: false,
            });
            return;
        }
        if (!$scope.sdata.endTime) {
            swal({
                title: '结束时间不能为空',
                text: '',
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "知道了",
                closeOnConfirm: false,
            });
            return;
        }
        if ($scope.sdata.startTime > $scope.sdata.endTime) {
            swal({
                title: '截止时间必须大于起始时间',
                text: '',
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "知道了",
                closeOnConfirm: false,
            });
            return;
        }
        $http({
            url: api + '/doorauth/updateDoorAuthTimeByAuthId',
            method: 'POST',
            data: $.param({
                doorAuthId: $scope.changeId,
                startTime: $scope.sdata.startTime,
                endTime: $scope.sdata.endTime,
                remark: $scope.remark
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {
            if (data.data.ret == 1) {
                $("#change").modal("hide");
                $scope.live($scope.changeId);
                swal({
                    title: "有效时间已修改",
                    text: '',
                    type: "success",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                    timer: 1600
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

    // 删除权限过滤器判断null
    $scope.filter2 = function(input) {
        if (input !== null) {
            return true;
        } else {
            return;
        }
    };

    // 单独刷新一条数据
    $scope.live = function(id) {
        $http({
            url: api + '/doorauth/queryDoorAuthDetailsByUserId',
            method: 'POST',
            data: $.param({
                doorAuthId: id
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {
            $scope.data = data.data.data;
            angular.forEach($scope.data, function(a) {
                angular.forEach(a, function(b) {
                    $scope.data = b;
                });
            });
            angular.forEach($scope.details, function(a, indexA) {
                angular.forEach(a, function(b, indexB) {
                    if (b.doorAuthId == id) {
                        $scope.details[indexA][indexB] = $scope.data;
                    }
                });
            });
        });
    };
});