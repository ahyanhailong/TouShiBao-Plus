MyApp.directive("codeTree", function () {
    return {
        restrict: 'AE',
        scope: {
            data: '=data',
            option: '=option',
            depth: '=depth'
        },
        controller: function ($scope) {

        },
        templateUrl: './public/components/allgroup/code_tree/codeTree.html',
        link: function (scope, elem, attrs) {
            var T = {
                isEmptyObject: function (obj) {
                    var t = 0;
                    for (var i in obj) {
                        t++;
                    }

                    return t == 0;
                }
            };
            var option = {
                maxOpen: 6,
                dataType: 'java',
            };
            var dataMaps = {}
            var childDeep = 0
            var tolTree = {}
            var monolayerTree = {}
            var active_pop;

            //java数据处理
            var processMapMethod = function (maps) {
                $.each(maps, function (index, item) {
                    if (item['mn'] != undefined) {
                        item['mn_short'] = filterPath(item['mn']);
                        maps[index] = item;
                    }
                });

                return maps;
            }

            //java路径的处理
            var filterPath = function (path) {
                var _path = path.replace(/(\(.*?\))$/, ''), // 去掉java结尾处的参数
                    _paths = _path.split('/'),
                    isdot = true;

                if (_paths.length > 1) { // 斜杠分割
                    var bugs = _paths[_paths.length - 1].split('.'); // java结尾处可能存在 “类.方法”
                    if (bugs.length > 1) {
                        _paths = _paths.concat(bugs);
                    } else {
                        isdot = false;
                    }
                } else {    // 点分割
                    _paths = _path.split('.');
                }
                var len = _paths.length;

                return (_paths[len - 2] ? (_paths[len - 2] + (isdot ? '.' : '/')) : '') + _paths[len - 1];
            }

            //获取最长时间
            var findLongestTime = function (dom) {
                dom = dom ? dom : '';
                if (dom) {
                    var domStr = '#' + dom + ' #test-table .code-index-item';
                    var domNodeStr = '#' + dom + ' .code-node-item';
                } else {
                    var domStr = '#test-table .code-index-item';
                    var domNodeStr = '.code-node-item';
                }
                var max = 0;
                var index = -1;
                $.each($(domStr), function () {
                    var tmp_index = $(this).index();
                    var value = parseFloat($(this).data('value'));
                    if ($(domNodeStr).eq(tmp_index).data('length') == 0 && value > max) {
                        index = tmp_index;
                        max = value;
                    }
                });
                var length = 0;
                if (index != -1) {
                    $(domStr).eq(index).addClass('active');
                    $(domNodeStr).eq(index).addClass('active');
                    $(domNodeStr).eq(index).addClass('open');
                    while (index) {
                        index--;
                        length++;
                        if ($(domNodeStr).eq(index).data('length') >= length) {
                            $(domNodeStr).eq(index).addClass('open');
                            mkStatus(index, dom);
                        }
                    }
                }
            }

            var domStr = '#origin .snap_track .code-node-item'
            var tableItem = '#origin .snap_track #test-table .code-index-item'
            //依据图标状态更新折叠
            var mkStatus = function (index, dom) {
                // dom = dom ? dom : '';
                // if(dom){
                //     var domStr = '#'+dom+' .code-node-item';
                // }else{
                //     var domStr = '.code-node-item';
                // }
                //列表长度
                var length = $(domStr).eq(index).data('length');
                //当前级
                var level = $(domStr).eq(index).data('level');
                //下级
                var next_level = $(domStr).eq(index + 1).data('level');
                //打开还是关闭
                var open = $(domStr).eq(index).hasClass('open');
                var tmpEle;
                var tmpTable;
                for (var i = 1; i <= length; i++) {
                    tmpEle = $(domStr).eq(index + i);
                    if (dom) {
                        tmpTable = $(tableItem).eq(index + i);
                    } else {
                        tmpTable = $(tableItem).eq(index + i);
                    }

                    //如果是下一级,直接打开,如果本级含有下级,则递归处理
                    if (open) {
                        if (tmpEle.data('level') == next_level) {
                            tmpEle.show();
                            tmpTable.show();
                        }
                        if (tmpEle.find('.code-node-img')) {
                            mkStatus(index + i, dom);
                            i += tmpEle.data('length');
                        }
                        //如果关闭则全部关闭
                    } else {
                        tmpEle.hide();
                        tmpTable.hide();
                    }
                }
            }

            var setEvent = function (dom) {
                dom = dom ? dom : '';
                $('#snap_modal').scroll(function (e) {
                    if ($('.popover').length) {
                        $('.popover').remove();
                        $('.popover_content').popover('hide');
                    }
                });
                $(document).on('click', function (e) {
                    e.stopPropagation();
                    var elem = $(e.target);
                    if ((elem.parent().hasClass('popover_content') || elem.hasClass('popover_content') || elem.parent().hasClass('popover'))) {
                        return;
                    } else {
                        $('.popover').remove();
                        $('.popover_content').popover('hide');
                    }
                })
                //附加信息 图标点击
                /*$('.popover_content').on('show.bs.popover', function () {
                 $('.popover').remove();
                 $('.popover_content').popover('hide');
                 })*/

                //绑定折叠事件
                $(document).off('click', '.title')
                $(document).on('click', '.title', function () {
                    if ($(this).next('ul').length == 0) {
                        var level = $(this).data('level');
                        option.maxOpen = level + 1;
                        var nid = $(this).data('nid');
                        var tree = childTree[level + '_' + nid]
                        if (tree != undefined) {
                            var ul = mkNode(tree[nid], level, dataMaps);
                            var Tabletr = mkTable(tree[nid], level, dataMaps);
                            $('#test-table').find('.title[data-nid=' + nid + ']').after(Tabletr)
                            $(this).after(ul);
                        }

                    }
                    var nid = $(this).data('nid');
                    if ($(this).parents('table').attr('id') == 'test-table') {

                    } else {
                        $(this).parent().toggleClass('open');
                        $('#' + dom + ' #test-table').find('.title[data-nid=' + nid + ']').parent().toggleClass('open');
                        if ($(this).parent().hasClass('open')) {
                            $(this).next('ul').removeClass('hidden');

                        } else {
                            $(this).next('ul').addClass('hidden');

                        }
                        if ($('#' + dom + ' #test-table').find('.title[data-nid=' + nid + ']').parent().hasClass('open')) {
                            $('#' + dom + ' #test-table').find('.title[data-nid=' + nid + ']').next('ul').removeClass('hidden');
                        } else {
                            $('#' + dom + ' #test-table').find('.title[data-nid=' + nid + ']').next('ul').addClass('hidden');
                        }
                    }


                })
                $('#' + dom + ' .code-open').unbind('click')
                $('#' + dom + ' .code-open').click(function () {
                    option.maxOpen = childDeep;
                    var ul = mkNode(tolTree, 0, dataMaps)
                    var Tabletr = mkTable(tolTree, 0, dataMaps);

                    $('#' + dom + ' #test-tree .table_stack').html(ul)
                    $('#' + dom + ' #test-table').html(Tabletr)
                });

                $('#' + dom + ' .code-collapse').unbind('click')

                $('#' + dom + ' .code-collapse').click(function () {
                    $('#' + dom + ' #test-tree .table_stack ul li').removeClass('open')
                    $('#' + dom + ' #test-tree .table_stack ul li ul').addClass('hidden')
                    $('#' + dom + ' #test-table ul li').removeClass('open')
                    $('#' + dom + ' #test-table ul li ul').addClass('hidden')
                });
                //发现最慢元素
                $('#' + dom + ' .code-slowest').unbind('click')
                $('#' + dom + ' .code-slowest').click(function (e) {
                    e.preventDefault();
                    // findLongestTime(dom);
                    option.maxOpen = childDeep;
                    if (option.maxOpen != tolTree) {
                        var ul = mkNode(tolTree, 0, dataMaps)
                        var Tabletr = mkTable(tolTree, 0, dataMaps);

                        $('#' + dom + ' #test-tree .table_stack').html(ul)
                        $('#' + dom + ' #test-table').html(Tabletr)
                        $('.popover_content').popover();
                    }
                    var slowestId = monolayerTree.slowest.nid
                    var tmList = $('#' + dom + ' #test-table .title[id=' + slowestId + ']').css('background-color', 'pink')
                    $('#' + dom + ' #test-tree .title[data-nid=' + slowestId + ']').css('background-color', 'pink')
                    $(this).attr('href', '#' + slowestId)


                });

                //$('.ext_modal').click(function(){
                //    $('#myModal .modal-body').html($(this).data('msg'));
                //    $('#myModal #myModalLabel').html($(this).data('mn'));
                //    $('#myModal').modal();
                //});
            }
            var childTree = {};


            var mkNode = function (tree, level, maps) {
                var str = '';
                level += 1;
                $.each(tree, function (index, obj) {
                    if (level > option.maxOpen) {
                        return false;
                    }
                    var tmp = '';
                    if (typeof tree[index] == 'object' && Object.prototype.toString.call(tree[index]).toLowerCase() == "[object object]" && !tree[index].length) {
                        if (level == option.maxOpen) {

                            var index_node = level + '_' + index;
                            childTree[index_node] = tree;

                            if (maps[index] != undefined) {
                                if (maps[index]['mn_short'] == undefined) {
                                    maps[index]['mn_short'] = maps[index]['mn'];

                                }
                                str += '<li class="item" style="list-style: none">';
                                str += '<div class="title " data-level="' + level + '"  data-nid="' + index + '" style="padding-left: ' + level * 15 + 'px;height: 30px;line-height: 31px;border-bottom: 1px solid #ccc;border-left: 1px solid #ccc;"><span class="code-img" style="padding-left: 16px">' + maps[index]['mn_short'] + '</span></div>';

                            }
                        } else {
                            if (maps[index] != undefined) {
                                if (maps[index]['mn_short'] == undefined) {
                                    maps[index]['mn_short'] = maps[index]['mn'];
                                }
                                str += '<li class="item open" style="list-style: none">';
                                str += '<div class="title" data-level="' + level + '"  data-nid="' + index + '" style="padding-left: ' + level * 15 + 'px;height: 30px;line-height: 31px;border-bottom: 1px solid #ccc;border-left: 1px solid #ccc;"><span class="code-img" style="padding-left: 16px">' + maps[index]['mn_short'] + '</span></div>';

                            }

                        }
                        tmp = mkNode(obj, level, maps);

                    } else {
                        if (maps[index] != undefined) {
                            if (maps[index]['mn_short'] == undefined) {
                                maps[index]['mn_short'] = maps[index]['mn'];
                            }
                            str += '<li class="item" style="list-style: none">';

                            str += '<div class="title"  data-level="' + level + '" data-nid="' + index + '" style="padding-left: ' + level * 15 + 'px;height: 30px;line-height: 31px;border-bottom: 1px solid #ccc;border-left: 1px solid #ccc;"><span class="" style="padding-left: 16px">' + maps[index]['mn_short'] + '</span></div>';

                        }

                    }
                    str += tmp;
                    str += '</li>';
                });

                if (str.length > 0) {
                    return '<ul class="list" style="padding: 0;margin: 0">' + str + '</ul>';
                } else {
                    return str;
                }
            }


            var mkTable = function (tree, level, maps) {
                var str = '';
                var Td = '';
                level += 1;
                $.each(tree, function (index, obj) {
                    if (level > option.maxOpen) {
                        return false;
                    }
                    var tmp = '';
                    if (maps[index] != undefined) {
                        // if(maps[index]['wt'] > max){
                        //     max = maps[index]['wt'];
                        // }
                        maps[index]['cpu'] = (maps[index]['cpu'] == undefined ? '-' : maps[index]['cpu']);
                        maps[index]['mu'] = (maps[index]['mu'] == undefined ? '-' : maps[index]['mu']);
                        maps[index]['wt'] = (maps[index]['wt'] == undefined ? '-' : maps[index]['wt']);
                        maps[index]['rate'] = (maps[index]['rate'] == undefined ? '-' : maps[index]['rate']);
                        var ext_content = '';
                        var class_prefix = 'java';
                        if (option.dataType == 'php') {
                            class_prefix = 'php';
                        }
                        if (option.dataType == 'php') {
                            if (maps[index]['ext_status'] == 1) {

                                ext_content += '<span style="width:18%;" class="' + class_prefix + '_2 cursor"><a  tabindex="0" role="button" data-toggle="popover" class="popover_content"  data-mn="' + maps[index]['mn'] + '" data-msg="' + maps[index]['ext_msg'] + '" class="cursor ext_modal" style="text-align: left;display:block;" data-container="body" data-toggle="popover"' +
                                    ' data-placement="left" data-content="' + maps[index]['ext_msg'] + '"><img src="./public/components/allgroup/code_tree/img/' + maps[index]['ext_img'] + '" style="width: 15px;height: 15px;"></a></span>';
                            } else {
                                ext_content += '<span style="width:18%;" class="' + class_prefix + '_2">&nbsp;</span>';
                            }
                        } else {
                            if (maps[index]['ext_status'] == 1) {

                                ext_content += '<span style="width:23%;" class="' + class_prefix + '_2 cursor"><a  tabindex="0" role="button" data-toggle="popover" class="popover_content"  data-mn="' + maps[index]['mn'] + '" data-msg="' + maps[index]['ext_msg'] + '" class="cursor ext_modal" style="text-align: left;display:block;" data-container="body" data-toggle="popover" data-placement="left" data-content="' + maps[index]['ext_msg'] + '"><img src="./public/components/allgroup/code_tree/img/' + maps[index]['ext_img'] + '" style="width: 15px;height: 15px;"></a></span>';
                            } else {
                                ext_content += '<span style="width:23%;" class="' + class_prefix + '_2">&nbsp;</span>';
                            }
                        }

                        if (option.dataType == 'php') {
                            Td = '<span  style="width:16%;" class="' + class_prefix + '_1" title="' + maps[index]['cpu'] + '">' + maps[index]['cpu'] + '</span><span style="width:18%;" class="' + class_prefix + '_2" title="' + maps[index]['wt'] + '">' + maps[index]['wt'] + '</span><span style="width:17%;" class="' + class_prefix + '_2" title="' + maps[index]['rate'] + '">' + maps[index]['rate'] + '</span><span style="width:16%;" class="' + class_prefix + '_2" title="' + maps[index]['ct'] + '">' + maps[index]['ct'] + '</span><span style="width:15%;" class="' + class_prefix + '_2" title="' + maps[index]['mu'] + '">' + maps[index]['mu'] + '</span>' + ext_content;
                        } else {
                            Td = '<span style="width:30%;" class="' + class_prefix + '_1" title="' + maps[index]['wt'] + '">' + maps[index]['wt'] + '</span><span style="width:24%;" class="' + class_prefix + '_2" title="' + maps[index]['rate'] + '">' + maps[index]['rate'] + '</span><span style="width:23%;" class="' + class_prefix + '_2" title="' + maps[index]['ct'] + '">' + maps[index]['ct'] + '</span>' + ext_content;
                        }

                        if (typeof tree[index] == 'object' && Object.prototype.toString.call(tree[index]).toLowerCase() == "[object object]" && !tree[index].length) {
                            if (level == option.maxOpen) {
                                var index_node = level + '_' + index;
                                childTree[index_node] = tree;
                                str += '<li class="item" style="list-style: none">';
                                str += '<div class="title " data-level="' + level + '" id="' + index + '"  data-tm="' + maps[index]['wt'] + '" data-nid="' + index + '" style="height: 30px;line-height: 31px;border-bottom: 1px solid #ccc;border-left: 1px solid #ccc;">' + Td + '</div>';
                            } else {
                                str += '<li class="item open" style="list-style: none">';
                                str += '<div class="title" data-level="' + level + '" id="' + index + '"    data-tm="' + maps[index]['wt'] + '" data-nid="' + index + '" style="height: 30px;line-height: 31px;border-bottom: 1px solid #ccc;border-left: 1px solid #ccc;">' + Td + '</div>';
                            }
                            tmp = mkTable(obj, level, maps);

                        } else {
                            str += '<li class="item open" style="list-style: none">';

                            str += '<div class="title"  data-level="' + level + '" id="' + index + '"   data-tm="' + maps[index]['wt'] + '" data-nid="' + index + '" style="height: 30px;line-height: 31px;border-bottom: 1px solid #ccc;border-left: 1px solid #ccc;">' + Td + '</div>';
                        }
                        str += tmp;
                        str += '</li>';

                    }

                });

                if (str.length > 0) {
                    return '<ul class="list" style="padding: 0;margin: 0">' + str + '</ul>';
                } else {
                    return str;
                }

            }

            //画表
            var drawStackTree = function (data, opt, dom, layerNum) {
                var dom = dom ? dom : '';
                var Data = data.monolayerTree
                if (typeof layerNum == 'number') {
                    option.maxOpen = layerNum
                }
                sessionStorage.setItem("newTree", JSON.stringify(Data))
                if (data.maps != undefined && data.maps['{start}'] != undefined && data.maps['{start}']['cip'] != undefined) {
                    $('#cip').html(data.maps['{start}']['cip']);
                }
                if (T.isEmptyObject(data.tree)) {
                    if (dom) {
                        $('#' + dom + ' #test-tree').closest('.row').addClass('nodata');
                    } else {
                        $('#test-tree').closest('.row').addClass('nodata');
                    }

                    return;
                }
                if (opt) {
                    option = $.extend({}, option, opt);
                }
                if (option.offset == undefined) {
                    option.offset = getOffset(data.child_deep);
                }
                //响应时间最大值
                var max = 0;
                //画左侧堆栈
                var count = 0
                dataMaps = processMapMethod(data.maps);
                childDeep = data.child_deep
                tolTree = data.tree
                monolayerTree = data.monolayerTree


                var maps = data.maps;
                var tree = data.tree;
                if (option.dataType != 'php') {
                    maps = processMapMethod(maps);

                }
                var tree_content = mkNode(tree, 0, maps);


                if (dom) {
                    $('#' + dom + ' #test-tree .table_stack').html('<div style="display: table-row-group;">' + tree_content + '</div>');

                } else {
                    $('#test-tree .table_stack').html('<div style="display: table-row-group;">' + tree_content + '</div>');

                }


                var table_content = mkTable(tree, 0, maps);

                if (dom) {
                    $('#' + dom + ' #test-table').html('<div style="display: table-row-group;">' + table_content + '</div>');
                } else {
                    $('#test-table').html('<div style="display: table-row-group;">' + table_content + '</div>');
                }

                // mkStatus(0,dom);
                $('.popover_content').popover();
                $('.popover_content').click(function (e) {
                    e.preventDefault();
                    return false;
                });
                /*
                 $('.popover_content').eq(0).trigger('click');*/
                setEvent(dom);
            }

            var getOffset = function (child_deep) {
                var width = parseInt(parseInt($('.panel-default').css('width')) / 12 * 7);
                var padding = parseInt(width / child_deep);
                if (padding < 10) {
                    padding = 10;
                }
                if (padding >= 20) {
                    padding = 20;
                }
                return padding;
            };


            scope.$watch('data', function (newValue) {
                if (newValue && !T.isEmptyObject(newValue)) {
                    drawStackTree(scope.data, scope.option, 'code-track', scope.depth || 6);
                }
            });
            //module.exports = {
            //    drawStackTree: drawStackTree,
            //    findLongestTime: findLongestTime,
            //    mkStatus: mkStatus,
            //};
        }
    };
})