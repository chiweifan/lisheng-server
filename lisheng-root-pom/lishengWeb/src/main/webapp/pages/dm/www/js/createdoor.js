app.controller('createOrderCtrl', function($scope, $http, $rootScope, getMenu, setType, getTown, $state, $timeout) {
    getMenu.real(1);
    // setType.getDoorTypes(1);
    $rootScope.showMenu = true;
    $scope.showMenu = true;
    
    $scope.units = [];
    
    $scope.orderInfo = {};
    
    $scope.sdata = {};

    $scope.getUnit = function() {
    	
    	$http({
            url: api + '/unit/queryUnitsList',
            method: 'POST',
            data: $.param({
                status : 1
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then(function(data) {
            if (data.data.ret === 1) {
                $scope.units = data.data.data;
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
    	
    }
    
    $scope.getUnit();
    
    
    // 保存
    $scope.save = function() {

        if (!$scope.orderInfo) {
            swal({
                title: "参数错误",
                text: '',
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "知道了",
                closeOnConfirm: false,
            });
            return;
        };

        if (!$scope.orderInfo.clientName) {
            swal({
                title: "请选择客户",
                text: '',
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "知道了",
                closeOnConfirm: false,
            });
            return;
        }

        if (!$scope.orderInfo.unitPrice) {
            swal({
                title: "请输入订单单价",
                text: '',
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "知道了",
                closeOnConfirm: false,
            });
            return;
        };

            if (!$scope.orderInfo.count) {
                swal({
                    title: "请输入订单数量",
                    text: '',
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
                return;
            }

            if (!$scope.orderInfo.unitName) {
                swal({
                    title: "请选择产品单位",
                    text: '',
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
                return;
            }

            if (!$scope.orderInfo.spec) {
                swal({
                    title: "请选择产品规格",
                    text: '',
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
                return;
            }

                $http({
                    url: api + '/order/saveOrder',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                    data: $.param({
                        clientId : $scope.clientId , 
                        unitName : $scope.orderInfo.unitName,
                        count : $scope.orderInfo.count , 
                        spec : $scope.orderInfo.spec , 
                        unitPrice : $scope.orderInfo.unitPrice
                    })
                }).then(function(data) {
                    if (data.data.ret == 1) {
                        swal({
                            title: "创建成功",
                            text: '',
                            type: "success",
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "知道了",
                            closeOnConfirm: false,
                            timer: 1600
                        });
                        $timeout(function() {
                            $state.go('compartment');
                        }, 1600);
                    }
                });


        // if ($scope.sdata.doorTypeId == 1 && !$scope.sdata.stationTypeId && !$scope.sdata.boardRoomTypeId) {
        //     $http({
        //         url: api + '/door/addDoorInfo',
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        //         data: $.param({
        //             doorTypeId: $scope.sdata.doorTypeId,
        //             ip_address: $scope.sdata.IP_address,
        //             doorIndentity: $scope.sdata.doorIndentity,
        //             doorName: "",
        //             roomType: 3,
        //             roomId: $scope.sdata.stationId || $scope.sdata.boardRoomId,
        //             communityId: $scope.sdata.communityId,
        //             communityName: $scope.sdata.communityName,
        //             childDoorTypeId: $scope.sdata.childDoorTypeId,
        //             communityName: $scope.sdata.communityName
        //         })
        //     }).then(function(data) {
        //         if (data.data.ret == 1) {
        //             swal({
        //                 title: "创建成功",
        //                 text: '',
        //                 type: "success",
        //                 confirmButtonColor: "#DD6B55",
        //                 confirmButtonText: "知道了",
        //                 closeOnConfirm: false,
        //                 timer: 1600
        //             });
        //             $timeout(function() {
        //                 $state.go('compartment');
        //             }, 1600);
        //         }
        //         console.log(data);
        //     });
        // } else if ($scope.sdata.doorTypeId == 2 && $scope.sdata.childDoorTypeId == 3) {
        //     $http({
        //         url: api + '/door/addDoorInfo',
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        //         data: $.param({
        //             doorTypeId: $scope.sdata.doorTypeId,
        //             ip_address: $scope.sdata.IP_address,
        //             doorIndentity: $scope.sdata.doorIndentity,
        //             doorName: "",
        //             roomType: 1,
        //             roomId: $scope.sdata.stationId || $scope.sdata.boardRoomId,
        //             communityId: $scope.sdata.communityId,
        //             communityName: $scope.sdata.communityName,
        //             childDoorTypeId: $scope.sdata.childDoorTypeId
        //         })
        //     }).then(function(data) {
        //         if (data.data.ret == 1) {
        //             swal({
        //                 title: "创建成功",
        //                 text: '',
        //                 type: "success",
        //                 confirmButtonColor: "#DD6B55",
        //                 confirmButtonText: "知道了",
        //                 closeOnConfirm: false,
        //                 timer: 1600
        //             });
        //             $timeout(function() {
        //                 $state.go('compartment');
        //             }, 1600);
        //         }
        //         console.log(data);
        //     });
        // } else if ($scope.sdata.doorTypeId == 2 && $scope.sdata.childDoorTypeId == 4) {
        //     $http({
        //         url: api + '/door/addDoorInfo',
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        //         data: $.param({
        //             doorTypeId: $scope.sdata.doorTypeId,
        //             ip_address: $scope.sdata.IP_address,
        //             doorIndentity: $scope.sdata.doorIndentity,
        //             doorName: "",
        //             roomType: 2,
        //             roomId: $scope.sdata.stationId || $scope.sdata.boardRoomId,
        //             communityId: $scope.sdata.communityId,
        //             communityName: $scope.sdata.communityName,
        //             childDoorTypeId: $scope.sdata.childDoorTypeId
        //         })
        //     }).then(function(data) {
        //         if (data.data.ret == 1) {
        //             swal({
        //                 title: "创建成功",
        //                 text: '',
        //                 type: "success",
        //                 confirmButtonColor: "#DD6B55",
        //                 confirmButtonText: "知道了",
        //                 closeOnConfirm: false,
        //                 timer: 1600
        //             });
        //             $timeout(function() {
        //                 $state.go('compartment');
        //             }, 1600);
        //         }
        //         console.log(data);
        //     });
        // }
    };
    
    $scope.selectCilent = function() {
        $("#selectClient").modal("show");
    };
    
    $scope.clients = [];
    
    $scope.searchClient = function(clientName , phoneNum) {
    	$http({
            url: api + '/client/queryClientList',
            method: 'POST',
            data: $.param({
                clientName : $scope.sdata.clientName , 
                phoneNum : $scope.sdata.phoneNum , 
                status : 1
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then(function(data) {
            if (data.data.ret === 1) {
                $scope.clients = data.data.data;
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
    }
    
    $scope.saveSelectClient = function () {
    	
    	console.log($scope.clientId);
    	
    	angular.forEach($scope.clients, function(a) {
    		if (a.clientId == $scope.clientId) {
    			$scope.orderInfo.clientName = a.clientName
    		}
    	});
    	
    	$("#selectClient").modal("hide");
    	
    }
    

});