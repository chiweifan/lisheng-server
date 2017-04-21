app.service("getMenu", function($http, $rootScope, $location) {

    $rootScope.searchHide = false;

    this.real = function(type) {

        $rootScope.showMenu = true;


        if (!type) {
            swal({
                title: '菜单加载失败',
                text: '请重新登录',
                type: 'error',
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "知道了",
                closeOnConfirm: true,
            })
        }

        if (type == "1") {
            $rootScope.menus = [{
                id: 0,
                menuName: "订单",
                childrenMenuList: [{
                    menuId: 0,
                    menuName: "订单列表",
                    url: "#/compartment"
                }, {
                    menuId: 1,
                    menuName: "单位设置",
                    url: "#/setType",
                }]
            }, {
                id: 2,
                menuName: "客户管理",
                childrenMenuList: [{
                    menuId: 0,
                    menuName: "客户列表",
                    url: "#/employeeAuthority"
                }, 
//                {
//                    menuId: 1,
//                    menuName: "按入驻成员",
//                    url: "#/clientAuthority"
//                }
                ]
            }];
        }
        // //console.log($location.path());
        // $rootScope.url = "#" + $location.path();

        // $http({
        //     url: api + '/getUserMenuList',
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        //     data: $.param({
        //         url: $rootScope.url
        //     })
        // }).then(function(data) {
        //     $rootScope.menus = data.data.userObject[0].childrenMenuList;
        //     var locationPath = '#' + $location.url();
        //     angular.forEach($rootScope.menus, function(menu) {
        //         angular.forEach(menu.childrenMenuList, function(child) {
        //             if (child.url == locationPath) {
        //                 child.isActive = true;
        //                 console.log(child.isActive);
        //             };
        //         });
        //     });

        // });
        var locationPath = '#' + $location.url();
        angular.forEach($rootScope.menus, function(menu) {
            angular.forEach(menu.childrenMenuList, function(child) {
                if (child.url == locationPath) {
                    child.isActive = true;
                    console.log(child.isActive);
                };
            });
        });



    }
});

//pin title
app.service("pin", function($timeout) {
    this.real = function() {
        $(window).scroll(function() {
            var scroll = $("body").scrollTop();
            var test = $(".list-box").length;
            if (test == 0) {
                return;
            };
            var box = $(".list-box").offset().top;
            if (scroll > box) {
                $(".pin-title").addClass("table-fixed");
            } else {
                $(".pin-title").removeClass("table-fixed");
            };

        });
    }
});

//实时刷新数据
app.service("liveorder", function($http, $rootScope) {
    this.real = function(orderId, orderlist) {
        $rootScope.orderlist = orderlist;
        $http({
            url: api + '/order/queryMokaNeedLogistics',
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
                orderId: orderId
            })
        }).then(function(data) {
            $rootScope.liveorder = data.data[0];
            console.log($rootScope.orderlist);
            for (var i = 0; i < $rootScope.orderlist.length; i++) {
                //console.log($scope.orderlist[i]);
                if ($rootScope.orderlist[i].orderId == orderId) {
                    $rootScope.orderlist[i] = $rootScope.liveorder;
                };
            };
        });
    }
});

app.service("loading", function($rootScope, $timeout) {
    this.show = function() {
        $rootScope.showLoading = true;
    };
    this.hide = function() {
        $timeout(function() {
            $rootScope.showLoading = false;
        }, 300);
    }
});

app.service("datepicker", function($timeout) {

    this.real = function() {
        $timeout(function() {
            $(".datepicker").datetimepicker({
                format: "yyyy-mm",
                startView: 'year',
                minView: 'year'
            });
        }, 50)
        $.fn.datetimepicker.dates['en'] = {
            days: ["日", "一", "二", "三", "四", "五", "六", "日"],
            daysShort: ["日", "一", "二", "三", "四", "五", "六", "日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            meridiem: ["上午", "下午"],
            suffix: ["st", "nd", "rd", "th"],
            today: "今天"
        };
    }

});

//获取城市&社区
app.service("getTown", function($http, $rootScope) {

    this.getCitys = function() {
        $http({
            url: api + '/remote/getCityList',
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({

            })
        }).then(function(data) {
            if (data.data.ret == "1") {
                $rootScope.citys = data.data.data;
                $rootScope.communitys = [];
            } else {

                this.getCommunitys();

                swal({
                    title: data.data.mess,
                    text: '',
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false
                });
            };
        });
    };
    this.getCommunitys = function(cityId) {
        $http({
            url: api + '/remote/getCommunityByCity',
            method: "POST",
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
                cityId: cityId
            })
        }).then(function(data) {
            if (data.data.ret == "1") {
                $rootScope.communitys = data.data.data;
            } else {
                $rootScope.communitys = [];
                swal({
                    title: data.data.mess,
                    text: '',
                    type: "error",
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "知道了",
                    closeOnConfirm: false,
                });
            };
        });
    }
});

// 获取门禁子类型信息
app.service('setType', function($http, $rootScope) {
    this.getDoorTypes = function(skip) {
        $http({
            url: api + '/childdoortype/queryChildDoorTypes',
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: $.param({
                pageNum: skip,
                pageSize: 20
            })
        }).then(function(data) {
            $rootScope.doorTypeInfo = data.data.data;
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
        })
    }
});