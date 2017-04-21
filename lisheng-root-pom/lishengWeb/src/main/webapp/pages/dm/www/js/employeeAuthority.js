app.controller('employeeAuthorityCtrl', function($scope, $rootScope, $http, getMenu, pin, loading, $location, $filter) {
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
            url: api + '/client/queryClientList',
            method: 'POST',
            data: $.param({
                pageNum: skip,
                pageSize: 20,
                type: 1,
                clientName: $scope.sdata.clientName,
                phoneNum: $scope.sdata.phoneNum,
                status: $scope.sdata.status,
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
    
   // 启用
    $scope.startUsing = function(id) {
    	console.log("!!");
        $("#startUsing").modal("show");
        $scope.status = 1;
        $scope.Id = id;
    };
    $scope.saveStartUsing = function() {
        $http({
            url: api + '/client/updateClientStatus',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
            	clientId: $scope.Id,
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
            url: api + '/client/updateClientStatus',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
            	clientId: $scope.Id,
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
    
    // 单独刷新一条数据
    $scope.live = function(id) {
        $http({
            url: api + '/client/queryClientList',
            method: 'POST',
            data: $.param({
                clientId: id
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {
        	 $scope.data = data.data.data[0];
             console.log($scope.data);
             for (var i = 0; i < $scope.clients.length; i++) {
                 if ($scope.clients[i].clientId == id) {
                     $scope.clients[i] = $scope.data;
                 };
             };
        });
    };
    
    // 编辑
    $scope.editClient = function(clientId,clientName,phoneNum) {
        $("#editClient h4").text("编辑客户");
        $("#editClient").modal("show");
        $scope.clientId = clientId;
        $scope.clientName = clientName;
        $scope.phoneNum = phoneNum;
    };
    
    $scope.saveClient = function() {
    	
    	
        if (!$scope.clientName) {
            swal({
                title: '客户名称不能为空',
                text: '',
                type: "error",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "知道了",
                closeOnConfirm: false
            });
            return;
        }
        
//        if (!$scope.phoneNum) {
//            swal({
//                title: '客户手机号不能为空',
//                text: '',
//                type: "error",
//                confirmButtonColor: "#DD6B55",
//                confirmButtonText: "知道了",
//                closeOnConfirm: false
//            });
//            return;
//        }
        $http({
            url: api + '/client/updateClient',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
                clientId: $scope.clientId,
                clientName: $scope.clientName,
                phoneNum:$scope.phoneNum
            })
        }).then(function(data) {
            if (data.data.ret == 1) {
                $("#editClient").modal("hide");
                if ($scope.clientId) {
                    $scope.live($scope.clientId);
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
    
});

app.controller('employeeDetailCtrl', function($scope, $rootScope, $http, getMenu, pin, $location, datepicker, $filter ,loading) {
    getMenu.real(1);
    datepicker.real();
    $scope.clientId = $location.search().clientId;
    

    if (!$scope.sdata) {
        $scope.sdata = [];
    }
    // 获取对应employeeId的员工信息
    $scope.getInfo = function() {
        $http({
            url: api + '/client/queryClientList',
            method: 'POST',
            data: $.param({
                clientId: $scope.clientId,
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


    // 获取订单详情
    $scope.getDetails = function(skip , sdata) {
    	
    	$scope.skip = skip;
    	
        $http({
            url: api + '/order/queryOrderList',
            method: 'POST',
            data: $.param({
                clientId: $scope.clientId,
                createTime : $scope.sdata.createTime , 
                status : $scope.sdata.status,
                pageNum: skip,
                pageSize: 20,
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }
        }).then(function(data) {
            if (data.data.ret == 1) {
                $scope.details = data.data.data;
                
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
                console.log(pageNum);
                loading.hide();
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
    $scope.getDetails(1);

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

    // 修改有效时间
    $scope.change = function(id, start, end) {
        $scope.changeId = id;
        $scope.sdata.startTime = $filter('date')(start, 'yyyy-MM-dd');
        $scope.sdata.endTime = $filter('date')(end, 'yyyy-MM-dd');
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

 
});

app.controller('editCtrl', function($scope, $rootScope, $http, getMenu, pin, $location, datepicker, getTown, $state) {
    getMenu.real(1);
    datepicker.real();
    // 获取id
    $scope.cilentId = $location.search().cilentId;

    // 获取对应社区下的门禁信息
    $scope.getClientInfo = function(id) {
        $http({
            url: api + '/client/queryClientList',
            method: 'POST',
            data: $.param({
            	cilentId: $scope.cilentId
            }),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8 ' }
        }).then(function(data) {
            if (data.data.ret == 1) {
                $scope.clientInfo = data.data.data;
                datepicker.real();
            } else {
                swal({
                    title: '查询',
                    text: '',
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
            }
        });
    };
    
    $scope.getClientInfo($scope.cilentId);

    $scope.data = [{}];

    $scope.add = function() {
        $scope.data.push({});
    };

    $scope.del = function(index) {
        $scope.data.splice(index, 1);
    };


    // 创建
    $scope.save = function() {
        $scope.saveClientList = [];
        
        angular.forEach($scope.data, function(a, index) {
            if (!a.cilentName) {
                swal({
                    title: "请输入客户姓名",
                    text: '',
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
                return;
            }

            if (!a.phoneNum) {
                swal({
                    title: "请输入设备编号",
                    text: '',
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
                return;
            }

            if (index == $scope.data.length - 1) {
                $http({
                    url: api + '/client/saveClient',
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
                    data: $.param({
                        data: angular.toJson($scope.data)
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
            }
        });
    }
});

app.controller('logCtrl', function($scope, $http, getMenu, getTown, datepicker, loading, pin, $location) {
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

        loading.show();
        $http({
            url: api + '/doorauth/queryDoorAuthLogs',
            method: 'POST',
            data: $.param({
                pageNum: skip,
                pageSize: 20,
                userId: $scope.id
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
            loading.hide();
        });
    };
    $scope.getlist("1");
});


app.controller('createClientCtrl', function($scope, $http, getMenu, getTown, datepicker, loading, pin, $location , $timeout , $state) {
	 getMenu.real(1);
	    datepicker.real();
	    $scope.data = [{}];

	    $scope.add = function() {
	        $scope.data.push({});
	    };

	    $scope.del = function(index) {
	        $scope.data.splice(index, 1);
	    };


	    // 创建
	    $scope.save = function() {
	        
	        angular.forEach($scope.data, function(a, index) {
	            if (!a.clientName) {
	                swal({
	                    title: "请输入客户姓名",
	                    text: '',
	                    type: "error",
	                    confirmButtonColor: "#DD6B55",
	                    confirmButtonText: "知道了",
	                    closeOnConfirm: false,
	                });
	                return;
	            }

	            if (!a.phoneNum) {
	                swal({
	                    title: "请输入客户",
	                    text: '',
	                    type: "error",
	                    confirmButtonColor: "#DD6B55",
	                    confirmButtonText: "知道了",
	                    closeOnConfirm: false,
	                });
	                return;
	            }

	            if (index == $scope.data.length - 1) {
	                $http({
	                    url: api + '/client/saveClient',
	                    method: 'POST',
	                    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
	                    data: $.param({
	                        data: angular.toJson($scope.data)
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
	                            $state.go('employeeAuthority');
	                        }, 1600);
	                    }
	                });
	            }
	        });
	    }
});

