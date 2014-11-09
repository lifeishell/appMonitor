define([
    'angular',
    'lodash'
], function(
    angular,
    _
) {
    'use strict';

    // Declare app level module which depends on filters, and services
    angular.module('appMonitor.config', [])
        .constant("DEBUG", false)
        .constant('MENU_GROUPS', [
            {
                name: "首页",
                subMenus: [
                    {
                        name: '首页',
                        id: 'main',
                        templateUrl: 'js/modules/app/templates/main.html'
                    },
                    {
                        name: '管理',
                        id: 'server-manager',
                        templateUrl: 'modules/manage/templates/manage.html'
                    }
                ]
            },
            {
                name: "应用系统监控",
                id: 'application-monitor',
                templateUrl: 'js/modules/monitor/templates/application.html'
            },
            {
                name: "服务监控",
                id: 'service-monitor',
                templateUrl: 'js/modules/monitor/templates/service.html'
            },
            {
                name: "服务器监控",
                id: 'server-monitor',
                templateUrl: 'js/modules/monitor/templates/server.html'
            },
            {
                name: "告警管理",
                subMenus: [
                    {
                        name: '当前告警',
                        id: 'current-warning',
                        templateUrl: 'js/modules/warning/templates/current.html'
                    },
                    {
                        name: '告警历史',
                        id: 'warning-history',
                        templateUrl: 'js/modules/warning/templates/history.html'
                    },
                    {
                        name: '告警通知',
                        id: 'warning-notice',
                        templateUrl: 'js/modules/warning/templates/notice.html'
                    }
                ]
            },
            {
                name: "系统管理",
                subMenus: [
                    {
                        name: '系统角色',
                        id: 'system-role',
                        templateUrl: 'js/modules/system/templates/role.html'
                    },
                    {
                        name: '系统用户',
                        id: 'system-user',
                        templateUrl: 'js/modules/system/templates/user.html'
                    },
                    {
                        name: '系统设置',
                        id: 'system-configure',
                        templateUrl: 'js/modules/system/configure.html'
                    },
                    {
                        name: '系统日志',
                        id: 'system-log',
                        templateUrl: 'js/modules/system/log.html'
                    }
                ]
            }
        ])
        .constant('API_HOST', '')
        .constant('API_URL', '')
        .constant('EDIT_SECTIONS', []);


});