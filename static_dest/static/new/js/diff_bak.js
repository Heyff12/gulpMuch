//余额首页----------------------------------------------------------------------------------------------------------------------------------------------------
$('.js_crash_index').get(0) && (~ function() {
    $(document).ready(function() {
        //获取账户余额--todo
        get_diffcrash('.js_diff_nump');
    });
}());
//余额提现操作页-----------------------------------------------------------------------------------------------------------------------------------------------
$('.js_diff_index').get(0) && (~ function() {
    $(document).ready(function() {
        //弹框高度定位--无效
        //alert_top('#pass_input');
        //alert_top('#tips_alert');
        //默认光标显示在tixianjine--可以不用
        //$('.js_diff_crash').focus();
        //获取账户余额--todo
        get_diffcrash('.js_diff_nump_withdraw');
        //获取体现页面信息--todo
        get_withdraw();
    });
    $(window).resize(function() {
        alert_top('#pass_input');
        alert_top('#tips_alert');
    });
    //全部提现
    $('.js_crash_all').on('click', function() {
        var crash_all = $('.js_diff_nump_withdraw').text() - 0;
        var crash_max = $('.js_price_max').text() - 0;
        var crash_min = $('.js_price_min').text() - 0;
        var crash_all_big;
        if (crash_all > crash_max) {
            $('.js_dd_red_emax').show().siblings('dd.errordd_tip').hide();
            $('.js_diff_fail_draw').hide();
            $('.js_diff_sub_draw').show().css('display', 'inline-block');
            crash_all_big = crash_max;
        } else if (crash_all >= crash_min) {
            $('.js_dd_grey').show().siblings('dd.errordd_tip').hide();
            $('.js_diff_fail_draw').hide();
            $('.js_diff_sub_draw').show().css('display', 'inline-block');
            crash_all_big = crash_all;
        } else {
            $('.js_dd_red_emin').show().siblings('dd.errordd_tip').hide();
            $('.js_diff_fail_draw').show();
            $('.js_diff_sub_draw').hide();
            crash_all_big = crash_all;
        }
        $('.js_diff_crash').val(crash_all_big);
    });
    var carsh_bef = $('.js_diff_crash').val(); //保留上一次的值   
    //输入提现金额keyup事件
    //$('.js_diff_crash').on('keyup',function(){
    $('.js_diff_crash').on('input', function() {
        // console.log(carsh_bef);
        var crash_now_str = $(this).val();
        //如果输入为空展示全部提现
        if (crash_now_str.length == 0) {
            $(this).val('');
            $('.js_dd_grey').show().siblings('dd.errordd_tip').hide();
            $('.js_diff_sub_draw').hide();
            $('.js_diff_fail_draw').show();
            return false;
        }
        //字符长的时候减小字号
        if (crash_now_str.length <= 10) {
            $(this).css('font-size', '1.1rem');
        } else {
            $(this).css('font-size', '0.8rem');
        }
        //将非.和数字的字符替换为空
        var crash_now_strend = crash_now_str.replace(/[^\.\d]/g, '');
        //整数部分最长12位start
        var crash_end_z = crash_now_strend.split('.')[0];
        //如果整数部分首位为0，则截取后买的 
        var crash_end_z_first = crash_end_z.substr(0, 1);
        if (crash_end_z_first == '0') {
            crash_end_z = crash_end_z.substr(1);
        }
        if (crash_end_z.length > 12) {
            crash_end_z = crash_end_z.substr(0, 12);
        }
        if (crash_now_strend.split('.').length > 1) {
            var crash_end_l = crash_now_strend.split('.')[1].substr(0, 2);
            crash_now_strend = (crash_end_z - 0) + '.' + crash_end_l;
        } else {
            crash_now_strend = crash_end_z - 0;
        }
        //整数部分最长12位end
        //控制输入长度后赋值并将该值转化为字符串格式
        $(this).val(crash_now_strend);
        crash_now_strend = crash_now_strend.toString();
        //如果输输入第二个.,则截取前面的整数部分
        // if(crash_now_strend.split('.').length>=3){
        //   $(this).val(crash_now_strend.split('.')[0]+'.'+crash_now_strend.split('.')[1]);
        //   return false;
        // }
        // if(carsh_bef.indexOf('.')!='-1' && crash_now_strend.indexOf('.')!='-1'){
        //   //有小数点
        //   var crash_now_z=crash_now_strend.split('.')[0];
        //   var crash_now_f=crash_now_strend.split('.')[1];
        //   if(crash_now_f.length>2){
        //     $(this).val(carsh_bef);
        //   }else{
        //     carsh_bef=crash_now_strend;
        //   }    
        // }else{
        //   carsh_bef=crash_now_strend;
        // }

        var crash_all = $('.js_diff_nump_withdraw').text() - 0;
        var crash_max = $('.js_price_max').text() - 0;
        var crash_min = $('.js_price_min').text() - 0;
        var crash_b_max = (crash_max > crash_all) ? crash_all : crash_max;
        var crash_now = $(this).val() - 0;
        if (crash_all < crash_min) {
            $('.js_dd_redall_emin').show().siblings('dd.errordd_tip').hide();
            $('.js_diff_sub_draw').hide();
            $('.js_diff_fail_draw').show();
            //$(this).val('0.00');
            return false;
        }
        if (crash_now_strend > crash_b_max) {
            if (crash_max > crash_all) {
                $('.js_dd_red_error').show().siblings('dd.errordd_tip').hide();
            } else {
                $('.js_dd_red_emax').show().siblings('dd.errordd_tip').hide();
            }
            //$(this).attr('disabled','disabled');     
            $('.js_diff_fail_draw').show();
            $('.js_diff_sub_draw').hide();
            //$(this).val(crash_b_max);
        } else if (crash_now_strend >= crash_min) {
            $('.js_dd_grey').show().siblings('dd.errordd_tip').hide();
            $('.js_diff_fail_draw').hide();
            $('.js_diff_sub_draw').show().css('display', 'inline-block');
            //$(this).removeAttr('disabled'); 
        } else {
            $('.js_dd_red_emin').show().siblings('dd.errordd_tip').hide();
            $('.js_diff_sub_draw').hide();
            $('.js_diff_fail_draw').show();
            //$(this).removeAttr('disabled'); 
        }
    });
    //输入提现金额blur事件
    // $('.js_diff_crash').on('blur',function(){
    //   var crash_now=$(this).val()-0;
    //   var crash_now_end=crash_now.toFixed(2);
    //   $(this).val(crash_now_end);    
    // });
    //点击提现
    $('.js_diff_sub_draw').on('click', function() {
        //弹框提现金额赋值
        var diff_crash = $('.js_diff_crash').val() - 0;
        $('.js_diff_alert_crash').text(diff_crash.toFixed(2));
        $('.js_fee_str_end').text($('.js_fee_str_change').text());
        //清空密码
        $('.js_alert_crashpass').val('');
        $('#pass_input').show();
        //弹框高度定位，需要在弹框显示之后
        alert_top('#pass_input');
        $('.zheceng').show();
    });
    //输入密码点击确定
    $('.js_draw_pass').on('click', function() {
        pass_draw('.js_alert_crashpass');
        var red_num = $('.border_red').length;
        if (red_num > 0) {
            return false;
        }
        sub_draw();
    });
    //关闭密码错误弹框--取消
    $('.js_both_button_fail').on('click', function() {
        $('#passerror_alert').hide();
        $('#passerror_alert .alert_con_t').html('');
        $('.zheceng').hide();
    });
    //关闭密码错误弹框--重试
    $('.js_both_button_right').on('click', function() {
        $('#passerror_alert').hide();
        $('#passerror_alert .alert_con_t').html('');
        //弹框提现金额赋值
        $('.js_diff_alert_crash').text($('.js_diff_crash').val());
        $('.js_fee_str_end').text($('.js_fee_str_change').text());
        //清空密码
        $('.js_alert_crashpass').val('');
        $('#pass_input').show();
        //弹框高度定位，需要在弹框显示之后
        alert_top('#pass_input');
        $('.zheceng').show();
    });
}());
//余额提现结果页---------------------------------------------------------------------------------------------------------------------------------------------
$('.js_section_detail').get(0) && (~ function() {
    $(document).ready(function() {
        //获取余额提现详情首页--todo
        get_withdraw()
        get_diffdetail();
    });
    //点击完成
    $('.js_detail_diff_finish').on('click', function() {
        //toto返回首页
        window.location.href = '/wallet/v1/page/index.html';
    });
}());
//余额提现列表页-----------------------------------------------------------------------------------------------------------------------------------------------
$('.js_history').get(0) && (~ function() {
    $(document).ready(function() {
        //获取余额列表页详情--todo
        get_history();
        // 初始化插件内容
        var opt_data = {
            preset: 'date', //日期格式 date（日期）|datetime（日期加时间）
            theme: 'jqm', //皮肤样式
            display: 'modal', //显示方式
            mode: 'clickpick', //日期选择模式
            dateFormat: 'yy-mm', // 日期格式
            setText: '确定', //确认按钮名称
            cancelText: '取消', //取消按钮名籍我
            dateOrder: 'yymmdd', //面板中日期排列格式
            dayText: '日',
            monthText: '月',
            yearText: '年', //面板中年月日文字
            yearText: '年',
            monthText: '月',
            dayText: '日', //面板中年月日文字
            endYear: 2020, //结束年份
            showNow: true,
            nowText: '今天',
            hourText: '小时',
            minuteText: '分'
        };
        // 使用定义插件
        $("#f_companydate").mobiscroll(opt_data);
    });
    //根据日期查询
    $('.js_date_history').on('click', function() {
        $('.js_diff_get').html('');
        get_history();
    });
    //向上滑动加载信息
    // refresher.init({
    //     id: "js_diff_get",
    //     pullUpAction: Load
    // });
    // var generatedCount = 0;
    // function Load() {
    //   setTimeout(function () {
    //     get_history_touch();
    //     js_diff_get.refresh();
    //   }, 1000);
    // }
    //点击查看更多
    $('.js_click_more').on('click', function() {
        get_history_touch();
    });
}());
//提现详情----------------------------------------------------------------------------------------------------
$('.js_section_detailn').get(0) && (~ function() {
    $(document).ready(function() {
        //获取余额提现详情首页--todo
        get_withdraw_detail();
    });
}());
//页面所需公共函数----------------------------------------------------------------------------------------------------------------------------------------------
//获取余额提现详情首页--新
function get_withdraw_detail() {
    var url_now = location.href.split('=');
    var uri = url_now[1];
    $.ajax({
        url: '/wallet/v1/api/withdraws/' + uri,
        type: 'GET',
        dataType: 'json',
        data: {
            biz_sn: uri,
        },
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng1').show();
        },
        success: function(data) {
            if (data.respcd != '0000') {
                $('.alert_con').show();
                if (!data['respmsg']) {
                    $('.alert_con .alert_con_br').html(data['resperr']);
                } else {
                    $('.alert_con .alert_con_br').html(data['respmsg']);
                }
                $('.zheceng1').show();
            } else {
                $('.zheceng1').hide();
                var return_data = data.data;
                var diff_all = (return_data.txamt / 100).toFixed(2);
                var diff_fee = (return_data.procedure_fee / 100).toFixed(2);
                var diff_true = return_data.txamt - return_data.procedure_fee;
                var diff_true_end = (diff_true / 100).toFixed(2);
                var diff_status = return_data.status;
                var diff_status_str = return_data.status_str;
                if (diff_status == '1') {
                    $('.js_money_tips').addClass('orange');
                } else if (diff_status == '3') {
                    $('.js_money_tips').addClass('green');
                } else if (diff_status == '4') {
                    $('.js_money_tips').addClass('red');
                } else {
                    $('.js_money_tips').addClass('orange');
                }
                $('.js_money_tips').text(diff_status_str);
                //$('.js_detail_time').text(return_data.eta_str/60);
                $('.js_detail_bank_name').text(return_data.card_issuing_bank);
                $('.js_detail_banknum').text(return_data.card_number);
                $('.js_detail_time').text(return_data.create_sysdtm);
                $('.js_detail_order').text(return_data.biz_sn);
                $('.js_detail_money').text(diff_all);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('.alert_con').show();
            $('.zheceng1').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('.alert_con .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng1').hide();
        }
    });
}
//获取余额提现详情首页
function get_diffdetail() {
    var url_now = location.href;
    var uri = url_now.split('=')[1];
    $.ajax({
        url: '/wallet/v1/api/withdraws/' + uri,
        type: 'GET',
        dataType: 'json',
        data: {},
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng1').show();
        },
        success: function(data) {
            if (data.respcd != '0000') {
                $('.alert_con').show();
                if (!data['respmsg']) {
                    $('.alert_con .alert_con_br').html(data['resperr']);
                } else {
                    $('.alert_con .alert_con_br').html(data['respmsg']);
                }
                $('.zheceng1').show();
            } else {
                $('.zheceng1').hide();
                var return_data = data.data;
                var diff_all = (return_data.txamt / 100).toFixed(2);
                var diff_fee = (return_data.procedure_fee / 100).toFixed(2);
                var diff_true = return_data.txamt - return_data.procedure_fee;
                var diff_true_end = (diff_true / 100).toFixed(2);
                //$('.js_detail_time').text(return_data.eta_str/60);
                $('.js_detail_bank_name').text(return_data.card_issuing_bank);
                $('.js_detail_bank_foot').text(return_data.card_tail_number);
                $('.js_detail_diff_crash').text(diff_all);
                $('.js_detail_diff_fee').text(diff_fee);
                $('.js_detail_crashtrue').text(diff_true_end);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('.alert_con').show();
            $('.zheceng1').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('.alert_con .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng1').hide();
        }
    });
}
//获取余额提列表页详情
function get_history() {
    var first_date_history;
    if ($('#f_companydate').val().length <= 0) {
        var a_date = now_date();
        var first_date = a_date.substr(0, 4) + '-' + a_date.substr(5, 2);
        $('#f_companydate').val(first_date);
        first_date_history = $('#f_companydate').val().replace(/\-/, '');
    } else {
        first_date_history = $('#f_companydate').val().replace(/\-/, '');
    }
    $.ajax({
        url: '/wallet/v1/api/withdraws',
        type: 'GET',
        dataType: 'json',
        data: {
            'pos': $('.js_diff_get li').length,
            'count': 10,
            'date': first_date_history,
        },
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng').show();
        },
        success: function(data) {
            if (data.respcd != '0000') {
                $('#alert_con').show();
                if (!data['respmsg']) {
                    $('#alert_con .alert_con_br').html(data['resperr']);
                } else {
                    $('#alert_con .alert_con_br').html(data['respmsg']);
                }
                $('.zheceng').show();
            } else {
                $('.zheceng').hide();
                var return_data = data.data;
                if (return_data.length <= 0) {
                    $('.js_li_none').show();
                    $('.js_section_list').hide();
                    $('body').removeClass('bg_white');
                } else {
                    $('.js_li_none').hide();
                    $('.js_section_list').show();
                    $('body').addClass('bg_white');
                    $(return_data).each(function(i, item) {
                        var tx_fee = (return_data[i].procedure_fee / 100).toFixed(2);
                        var tx_txamt = (return_data[i].txamt / 100).toFixed(2);
                        var tx_time = return_data[i].create_sysdtm;
                        var tx_status = return_data[i].status_str;
                        var tx_bis = return_data[i].biz_sn;
                        var li_detail = '';
                        if (return_data[i].procedure_fee == '0') {
                            if (return_data[i].status == '4') {
                                li_detail = '<li class="grey" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt onClick="tan_error()"><span>-' + tx_txamt + '</span><br/><span class="red"><i class="ic_err"></i>' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                            } else if (return_data[i].status == '3') {
                                li_detail = '<li class="success" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt><span>-' + tx_txamt + '</span><br/><span class="normal">' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                            } else {
                                li_detail = '<li class="other" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt><span>-' + tx_txamt + '</span><br/><span class="grey">' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                            }
                        } else {
                            if (return_data[i].status == '4') {
                                li_detail = '<li class="grey" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt onClick="tan_error()"><span>-' + tx_fee + '</span><br/><span class="red"><i class="ic_err"></i>' + tx_status + '</span></dt><dd>提现手续费</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><dl><dt onClick="tan_error()"><span>-' + tx_txamt + '</span><br/><span class="red"><i class="ic_err"></i>' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                            } else if (return_data[i].status == '3') {
                                li_detail = '<li class="success" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt><span>-' + tx_fee + '</span><br/><span class="normal">' + tx_status + '</span></dt><dd>提现手续费</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><dl><dt><span>-' + tx_txamt + '</span><br/><span class="normal">' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                            } else {
                                li_detail = '<li class="other" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt><span>-' + tx_fee + '</span><br/><span class="grey">' + tx_status + '</span></dt><dd>提现手续费</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><dl><dt><span>-' + tx_txamt + '</span><br/><span class="grey">' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                            }
                        }
                        $(".js_diff_get").append(li_detail);
                    });
                    if (return_data.length < 10) {
                        //$('.pullUpLabel').hide();
                        $('.js_click_more').hide();
                    } else {
                        $('.js_click_more').show();
                    }
                }

            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#alert_con').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_con .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng').hide();
        }
    });
}
//调转到详情页
function goto_detail(id) {
    var bis = $(id).attr('data-biz');
    location.href = '/wallet/v1/page/withdraw/detail.html?biz_sn=' + bis;
}
//弹出提示框
function tan_error(e) {
    console.log(e);
    $('#alert_error').show();
    $('.zheceng').show();
    e = e || window.event;
    if (e.stopPropagation) { //W3C阻止冒泡方法  
        e.stopPropagation();
    } else {
        e.cancelBubble = true; //IE阻止冒泡方法  
    }
}
//获取余额提列表页详情-向上滑动刷新
function get_history_touch() {
    $.ajax({
        url: '/wallet/v1/api/withdraws',
        type: 'GET',
        dataType: 'json',
        data: {
            'pos': $('.js_diff_get li').length,
            'count': 10,
            'date': $('#f_companydate').val().replace(/\-/, ''),
        },
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng').show();
        },
        success: function(data) {
            if (data.respcd != '0000') {
                $('#alert_con').show();
                if (!data['respmsg']) {
                    $('#alert_con .alert_con_br').html(data['resperr']);
                } else {
                    $('#alert_con .alert_con_br').html(data['respmsg']);
                }
                $('.zheceng').show();
            } else {
                $('.zheceng').hide();
                var return_data = data.data;
                $(return_data).each(function(i, item) {
                    var tx_fee = (return_data[i].procedure_fee / 100).toFixed(2);
                    var tx_txamt = (return_data[i].txamt / 100).toFixed(2);
                    var tx_time = return_data[i].create_sysdtm;
                    var tx_status = return_data[i].status_str;
                    var tx_bis = return_data[i].biz_sn;
                    var li_detail = '';
                    if (return_data[i].procedure_fee == '0') {
                        if (return_data[i].status == '4') {
                            li_detail = '<li class="grey" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt onClick="tan_error()"><span>-' + tx_txamt + '</span><br/><span class="red"><i class="ic_err"></i>' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                        } else if (return_data[i].status == '3') {
                            li_detail = '<li class="success" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt><span>-' + tx_txamt + '</span><br/><span class="normal">' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                        } else {
                            li_detail = '<li class="other" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt><span>-' + tx_txamt + '</span><br/><span class="grey">' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                        }
                    } else {
                        if (return_data[i].status == '4') {
                            li_detail = '<li class="grey" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt onClick="tan_error()"><span>-' + tx_fee + '</span><br/><span class="red"><i class="ic_err"></i>' + tx_status + '</span></dt><dd>提现手续费</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><dl><dt onClick="tan_error()"><span>-' + tx_txamt + '</span><br/><span class="red"><i class="ic_err"></i>' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                        } else if (return_data[i].status == '3') {
                            li_detail = '<li class="success" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt><span>-' + tx_fee + '</span><br/><span class="normal">' + tx_status + '</span></dt><dd>提现手续费</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><dl><dt><span>-' + tx_txamt + '</span><br/><span class="normal">' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                        } else {
                            li_detail = '<li class="other" data-biz="' + tx_bis + '" onClick="goto_detail(this)"><dl><dt><span>-' + tx_fee + '</span><br/><span class="grey">' + tx_status + '</span></dt><dd>提现手续费</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl><dl><dt><span>-' + tx_txamt + '</span><br/><span class="grey">' + tx_status + '</span></dt><dd>提现</dd><dd class="grey">' + tx_time + '</dd><div class="clearfix"></div></dl></li>';
                        }
                    }
                    $(".js_diff_get").append(li_detail);
                });
                if (return_data.length < 10) {
                    $('#alert_con').show();
                    $('#alert_con .alert_con_br').html('数据已加载完毕');
                    $('.zheceng').show();
                    //$('.pullUpLabel').hide();
                    $('.js_click_more').hide();
                } else {
                    $('.js_click_more').show();
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#alert_con').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#alert_con .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng').hide();
        }
    });
}
//提交密码并获取提现授权码及提现金额
function sub_draw() {
    var draw_pass = $('.js_alert_crashpass').val();
    $.ajax({
        url: '/wallet/v1/api/auth',
        type: 'POST',
        dataType: 'json',
        //async:false,
        data: { "password": draw_pass, },
        beforeSend: function() {
            $('#pass_input').hide();
            $('#loading').show();
            $('.zheceng').show().css('z-index', 13);
        },
        success: function(data) {
            if (data.respcd != '0000') {
                //$('#pass_input').hide();
                $('#loading').hide();
                if (!data['respmsg']) {
                    $('#passerror_alert .alert_con_t').html(data['resperr']);
                } else {
                    $('#passerror_alert .alert_con_t').html(data['respmsg']);
                }
                $('#passerror_alert').show();
                $('.zheceng').show().css('z-index', 10);
            } else {
                //$('.zheceng').hide();
                var return_data = data.data;
                $('#auth_code').text(return_data.auth_code);
                sub_draw_diff();
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('.alert_con').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('.alert_con .alert_con_br').html('网络超时!');
        },
        complete: function() {
            //$('#loading').hide();
            //$('.zheceng').hide();
        }
    });
}
//提交提现授并请求提现金额
function sub_draw_diff() {
    var auth_code = $('#auth_code').text();
    var diff_crash = $('.js_diff_alert_crash').text() - 0;
    var now_date_val = now_date();
    $.ajax({
        url: '/wallet/v1/api/withdraws',
        type: 'POST',
        dataType: 'json',
        //async:false,
        data: {
            "txamt": (diff_crash * 100).toFixed(0), // 提现金额, 单位: 分
            "clidtm": now_date_val, // 客户端提现时间
            "auth_code": auth_code, // 提现授权码
        },
        beforeSend: function() {
            $('#pass_input').hide();
            $('#loading').show();
            $('.zheceng').show().css('z-index', 13);
        },
        success: function(data) {
            if (data.respcd != '0000') {
                $('#pass_input').hide();
                $('#tips_alert').show();
                if (!data['respmsg']) {
                    $('#tips_alert .alert_con_br').html(data['resperr']);
                } else {
                    $('#tips_alert .alert_con_br').html(data['respmsg']);
                }
                $('.zheceng').show().css('z-index', 10);
            } else {
                $('.zheceng').hide().css('z-index', 10);
                var detail_biz_sn = data.data.biz_sn;
                //toto调到详情页
                window.location.href = '/wallet/v1/page/withdraw/result.html?biz_sn=' + detail_biz_sn;
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#pass_input').hide();
            $('#tips_alert').show();
            $('.zheceng').show().css('z-index', 10);
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#tips_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng').hide();
            $('#pass_input').hide().css('display', 'none');
        }
    });
}
//获取提现页面信息
function get_withdraw() {
    $.ajax({
        url: '/wallet/v1/api/withdraw/info',
        type: 'GET',
        dataType: 'json',
        data: {},
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng').show();
        },
        success: function(data) {
            if (data.respcd != '0000') {
                $('#tips_alert').show();
                if (!data['respmsg']) {
                    $('#tips_alert .alert_con_br').html(data['resperr']);
                } else {
                    $('#tips_alert .alert_con_br').html(data['respmsg']);
                }
                $('.zheceng').show();
            } else {
                $('.zheceng').hide();
                var return_data = data.data;
                var return_fee = (return_data.procedure_fee / 100).toFixed(2);
                var return_fee_max = (return_data.txamt_max / 100).toFixed(2);
                var return_fee_min = (return_data.txamt_min / 100).toFixed(2);
                var return_feeday_min = (return_data.txamt_allow / 100).toFixed(2);
                $('.js_bank_name').text(return_data.card_issuing_bank);
                $('.js_bank_foot').text(return_data.card_tail_number);
                $('.js_fee_str').text(return_fee);
                $('.js_eta_str').text(return_data.eta / 60);
                $('.js_date_str').text(return_data.eta_point); //到账时间
                $('.js_fee_str_change').text(return_fee);
                $('.js_price_min').text(return_fee_min);
                $('.js_price_max').text(return_fee_max);
                $('.js_priceday_min').text(return_feeday_min);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#tips_alert').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#tips_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng').hide();
        }
    });
}
//获取账户余额
function get_diffcrash(id) {
    $.ajax({
        url: '/wallet/v1/api/balance',
        type: 'GET',
        dataType: 'json',
        data: {},
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng1').show();
        },
        success: function(data) {
            if (data.respcd != '0000') {
                $('#tips_alert').show();
                if (!data['respmsg']) {
                    $('#tips_alert .alert_con_br').html(data['resperr']);
                } else {
                    $('#tips_alert .alert_con_br').html(data['respmsg']);
                }
                $('.zheceng1').show();
            } else {
                $('.zheceng1').hide();
                var return_data = data.data;
                var diff_all = (return_data.txamt / 100).toFixed(2);
                $(id).text(diff_all);
                //控制体现按钮是可以可以点击--判断是否正字提现进行中
                if_difftime(diff_all);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#tips_alert').show();
            $('.zheceng1').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#tips_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng1').hide();
        }
    });
}
//判断是否符合提现时间
function if_difftime(diff_val) {
    $.ajax({
        url: '/wallet/v1/api/withdraw/info',
        type: 'GET',
        dataType: 'json',
        data: {},
        beforeSend: function() {
            $('#loading').show();
            $('.zheceng').show();
        },
        success: function(data) {
            if (data.respcd != '0000') {
                $('#tips_alert').show();
                if (!data['respmsg']) {
                    $('#tips_alert .alert_con_br').html(data['resperr']);
                } else {
                    $('#tips_alert .alert_con_br').html(data['respmsg']);
                }
                $('.zheceng').show();
            } else {
                $('.zheceng').hide();
                var return_data = data.data;
                var diff_iftime = return_data.withdraw_range;
                var diff_time_s = return_data.withdraw_st;
                var diff_time_e = return_data.withdraw_et;
                $('.js_time_s').text(diff_time_s);
                $('.js_time_e').text(diff_time_e);
                //判断是否正在提现进行中
                var diff_ing = return_data.is_last_withdrawing;
                if (diff_ing) {
                    $('.js_diff_ing').show();
                    $('.js_diffindex_sub').hide();
                } else {
                    //没有进行中，显示提现按钮
                    $('.js_diff_ing').hide();
                    $('.js_diffindex_sub').show();
                }
                //判断是否有时间提示
                // if (diff_iftime == '1') {
                //     //符合时间
                //     //控制体现按钮是可以可以点击--根据余额值
                //     if (diff_val <= 0) {
                //         $('.js_diffindex_sub').addClass('diff_sub0');
                //     } else {
                //         $('.js_diffindex_sub').removeClass('diff_sub0');
                //     }
                // } else {
                //     //超出时间--按钮不能点击--取消时间提示框
                //     $('.js_diffindex_sub').addClass('diff_sub0');
                //     $('#time_tips').show();
                //     $('.zheceng1').show();
                // }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $('#tips_alert').show();
            $('.zheceng').show();
            //$('.alert_con .alert_con_br').html('XMLHttpRequest.readyState:'+XMLHttpRequest.readyState+',XMLHttpRequest.status:'+XMLHttpRequest.status+',textStatus:'+textStatus+'!');
            $('#tips_alert .alert_con_br').html('网络超时!');
        },
        complete: function() {
            $('#loading').hide();
            //$('.zheceng').hide();
        }
    });
}
//获取当前时间
function now_date() {
    var n_date = new Date();
    var n_date_year = n_date.getFullYear();
    var n_date_mon = tow_num(n_date.getMonth() + 1);
    var n_date_day = tow_num(n_date.getDate());
    var n_date_h = tow_num(n_date.getHours());
    var n_date_m = tow_num(n_date.getMinutes());
    var n_date_mm = tow_num(n_date.getSeconds());
    var n_date_end = n_date_year + "-" + n_date_mon + "-" + n_date_day + " " + n_date_h + ":" + n_date_m + ":" + n_date_mm;
    return n_date_end;
}
//如果小于10，则十位显示0
function tow_num(arm) {
    var arm_num = "0" + arm;
    var arm_num_end = arm_num.substr(-2, 2);
    return arm_num_end;
}
//验证输入密码
function pass_draw(id) {
    var id_val = $(id).val();
    var id_val_l = id_val.length;
    if (id_val_l < 6 || id_val_l > 20) {
        $(id).addClass('border_red');
    } else {
        $(id).removeClass('border_red');
    }
}
//弹框高度定位
function alert_top(id) {
    var alert_height = $(id).height();
    var mar_t = alert_height / 2;
    $(id).css('marginTop', -mar_t + 'px');
}
//关闭弹框
$('.js_alert_con_close').on('click', function() {
    $('.alert_con').hide();
    $('.alert_con .alert_con_br').html();
    $('.zheceng').hide();
    $('.zheceng1').hide();
});
$('.js_alert_con_close1').on('click', function() {
    $('.alert_con').hide();
    $('.js_alert_crashpass').val('');
    $('.zheceng').hide();
    $('.zheceng1').hide();
});
