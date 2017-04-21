app.controller('setTypeCtrl', function($scope, $http, $rootScope, getMenu, $state, $timeout, pin, loading) {
    getMenu.real(1);
    // $scope.getList = function (skip) {
    //     setType.getDoorTypes(skip);
    // };
    // $scope.getList(1);
    $scope.showMenu = false;

    console.log($rootScope);

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
            url: api + '/unit/queryUnitsList',
            method: 'POST',
            data: $.param({
                pageNum: skip,
                pageSize: 20,
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {

            //order data
            $scope.unitInfo = data.data.data;
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

    // 启用
    $scope.startUsing = function(id) {
        $("#startUsing").modal("show");
        $scope.status = 1;
        $scope.Id = id;
    };
    $scope.saveStartUsing = function() {
        $http({
            url: api + '/unit/updateUnitStatus',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
            	unitId: $scope.Id,
                status: $scope.status
            })
        }).then(function(data) {
            if (data.data.ret === 1) {
                $("#startUsing").modal("hide");
                $scope.live($scope.Id);
                swal({
                    title: data.data.msg,
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
                    closeOnConfirm: false
                });
            }
        });
    };

    // 停用
    $scope.stopUsing = function(id) {
        $("#stopUsing").modal("show");
        $scope.Id = id;
        $scope.status = 2;
    };
    $scope.saveStopUsing = function() {
        $http({
            url: api + '/unit/updateUnitStatus',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
            	unitId: $scope.Id,
                status: $scope.status
            })
        }).then(function(data) {
            if (data.data.ret === 1) {
                $("#stopUsing").modal("hide");
                $scope.live($scope.Id);
                swal({
                    title: data.data.msg,
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
                    closeOnConfirm: false
                });
            }
        });
    };

    // 编辑
    $scope.editType = function(unitId,unitName) {
        $("#editType h4").text("编辑类型");
        $("#editType").modal("show");
        $scope.unitId = unitId;
        $scope.unitName = unitName;
    };
    $scope.saveEditType = function() {
        if (!$scope.unitName) {
            swal({
                title: '单位名称不能为空',
                text: '',
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "知道了",
                closeOnConfirm: false
            });
            return;
        }
        $http({
            url: api + '/unit/saveUnit',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
                unitId: $scope.unitId,
                unitName: $scope.unitName
            })
        }).then(function(data) {
            if (data.data.ret == 1) {
                $("#editType").modal("hide");
                if ($scope.unitId) {
                    $scope.live($scope.unitId);
                } else {
                    $scope.getlist(1);
                }
                swal({
                    title: '编辑成功',
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
                    closeOnConfirm: false
                });
            };
        })
    };

    // 创建
    $scope.createType = function() {
        $("#editType h4").text("创建类型");
        $("#editType").modal("show");
        $scope.unitId = '';
        $scope.unitName = '';
    };

    $scope.live = function(unitId) {
        $http({
            url: api + '/unit/queryUnitsList',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
            	unitId: unitId
            })
        }).then(function(data) {
            $scope.data = data.data.data[0];
            console.log($scope.data);
            for (var i = 0; i < $scope.unitInfo.length; i++) {
                if ($scope.unitInfo[i].unitId == unitId) {
                    $scope.unitInfo[i] = $scope.data;
                };
            };
        });
    };

});