/**
 *  Author: harry.lang
 *  Date: 2017/11/28
 *  Description: Created by harrylang on 2017/11/28.
 */
MyApp.directive('pageList', function () {
    /* 分页*/
    return {
        // A 是单词 attribute 首字母，将指令当属性来用
        // E 是单词 element   首字母，将指令当标签来用
        // C 是单词 class     首字母，将指令当类来用
        // M 是单词 mark      首字母，将指令将注释来用
        restrict: 'EA',
        scope: {
            page_no: '@pageNo',           // 当前页
            total_row: '=totalRow',       //总行数
            sum_per_page: '@sumPerPage',  // 每页显示的行数
            change: '&change'
        },
        controller: function ($scope) {
            $scope.page_no = parseInt($scope.page_no)
            $scope.$watch('total_row', function () {
                init();
            });

            function init() {
                $scope.total_row = $scope.total_row ? $scope.total_row : 0;
                $scope.totalPage = Math.ceil($scope.total_row / $scope.sum_per_page);
                $scope.sum_per_page = $scope.sum_per_page ? $scope.sum_per_page : 5;
                $scope.page_no = $scope.page_no ? $scope.page_no : 0;
                $scope.pageRange = 5;
                $scope.pageStart = parseInt(($scope.page_no - 1) / $scope.pageRange) * $scope.pageRange + 1;
                $scope.pageBool = ($scope.page_no > $scope.pageRange);
                $scope.pageUpBool = (($scope.pageStart + $scope.pageRange) <= $scope.totalPage);

                $scope.pages = [];
                for (i = 0; i < ($scope.totalPage > $scope.pageRange ? $scope.pageRange : $scope.totalPage); i++) {
                    if ($scope.pageStart + i > $scope.totalPage) {
                        break;
                    }
                    $scope.pages[i] = $scope.pageStart + i;
                }
            }

            $scope.change({currentPage: $scope.page_no, perPage: $scope.sum_per_page});
            $scope.$watchGroup(["page_no", "sum_per_page"], function (newVal, oldVal) {
                if (+newVal[0] != +oldVal[0] || +newVal[1] != +oldVal[1]) {
                    $scope.change({currentPage: newVal[0], perPage: newVal[1]});
                }

                init();
            });

            $scope.changePage = function (pageNo) {
                $scope.page_no = pageNo;
            }
            $scope.prevPage = function (pageNo) {
                if (pageNo) {
                    $scope.page_no = pageNo;
                } else {
                    $scope.page_no = 1
                }

            };
            $scope.nextPage = function (pageNo) {
                //console.log(111)
                pageNo = parseInt(pageNo) + 1
                if (pageNo <= $scope.totalPage) {
                    $scope.page_no = pageNo;
                }

            };

            $scope.changeNums = function () {
                if ($scope.total_row > 0) {
                    $scope.page_no = 1;
                }
            };
        },
        link: function ($scope, ele, attrs) {
        },
        templateUrl: "./public/components/allgroup/pageList.html"
    };
});