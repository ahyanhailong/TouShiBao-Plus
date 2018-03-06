var validateConfig = {};

//http,ftp,ping,tcp,traceroute,dns
validateConfig.http = {
    task_name: {
        presence: {message: "^监控项目名称不能为空"}
    },
    group_id: {
        presence: {message: "^监测点分组不能为空"},
        numericality: {
            onlyInteger: true,
            notInteger:"^请选择监测点分组",
            notValid:"^请选择监测点分组",
            greaterThan: -1,
            notGreaterThan:"^请选择监测点分组"
        }
    },
    url: {
        presence: {message: "^监控的网址不能为空"},
        url: {
            message: "^必须为网址"
        }
    }
};

validateConfig.ftp = {
    task_name: {
        presence: {message: "^监控项目名称不能为空"}
    },
    group_id: {
        presence: {message: "^监测点分组不能为空"},
        numericality: {
            onlyInteger: true,
            notInteger:"^请选择监测点分组",
            notValid:"^请选择监测点分组",
            greaterThan: -1,
            notGreaterThan:"^请选择监测点分组"
        }
    },
    host: {
        presence: {message: "^主机不能为空"},
        domain: {
            message: "^主机格式不正确"
        }
    },
    ftp_port: {
        presence: {message: "^ftp端口不能为空"},
        numericality: {
            onlyInteger: true,
            notInteger:"^必须为整型",
            notValid:"^必须为整型",
            greaterThan: 0,
            notGreaterThan:"^必须大于0",
            lessThanOrEqualTo: 65535,
            notLessThanOrEqualTo: "^最大值不能大于65535"
        }
    }
};

validateConfig.ping =  {
    task_name: {
        presence: {message: "^监控项目名称不能为空"}
    },
    group_id: {
        presence: {message: "^监测点分组不能为空"},
        numericality: {
            onlyInteger: true,
            notInteger:"^请选择监测点分组",
            notValid:"^请选择监测点分组",
            greaterThan: -1,
            notGreaterThan:"^请选择监测点分组"
        }
    },
    host: {
        presence: {message: "主机不能为空"},
        domain: {
            message: "^主机格式不正确"
        }
    }
};

validateConfig.tcp = {
    task_name: {
        presence: {message: "^监控项目名称不能为空"}
    },
    group_id: {
        presence: {message: "^监测点分组不能为空"},
        numericality: {
            onlyInteger: true,

            notInteger:"^请选择监测点分组",
            notValid:"^请选择监测点分组",
            greaterThan: -1,
            notGreaterThan:"^请选择监测点分组"
        }
    },
    host: {
        presence: {message: "^主机不能为空"},
        domain: {
            message: "^主机格式不正确"
        }
    },
    tcp_port: {
        presence: {message: "^tcp端口不能为空"},
        numericality: {
            onlyInteger: true,
            notInteger:"^必须为整型",
            notValid:"^必须为整型",
            greaterThan: 0,
            notGreaterThan:"^必须大于0",
            lessThanOrEqualTo: 65535,
            notLessThanOrEqualTo: "^最大值不能大于65535"
        }
    }
};

validateConfig.traceroute = {
    task_name: {
        presence: {message: "^监控项目名称不能为空"}
    },
    group_id: {
        presence: {message: "^监测点分组不能为空"},
        numericality: {
            onlyInteger: true,
            notInteger:"^请选择监测点分组",
            notValid:"^请选择监测点分组",
            greaterThan: -1,
            notGreaterThan:"^请选择监测点分组"
        }
    },
    host: {
        presence: {message: "^主机不能为空"}
    }
};

validateConfig.dns = {
    task_name: {
        presence: {message: "^监控项目名称不能为空"}
    },
    group_id: {
        presence: {message: "^监测点分组不能为空"},
        numericality: {
            onlyInteger: true,
            notInteger:"^请选择监测点分组",
            notValid:"^请选择监测点分组",
            greaterThan: -1,
            notGreaterThan:"^请选择监测点分组"
        }
    },
    domain: {
        presence: {message: "^域名不能为空"},
        domain: {
            message: "^域名格式不正确"
        }
    }
};


validateConfig.udp = {
    task_name: {
        presence: {message: "^监控项目名称不能为空"}
    },
    request_str: {
        presence: {message: "^UDP请求内容不能为空"}
    },
    group_id: {
        presence: {message: "^监测点分组不能为空"},
        numericality: {
            onlyInteger: true,
            notInteger:"^请选择监测点分组",
            notValid:"^请选择监测点分组",
            greaterThan: -1,
            notGreaterThan:"^请选择监测点分组"
        }
    },
    host: {
        presence: {message: "^主机不能为空"},
        domain: {
            message: "^主机格式不正确"
        }
    },
    udp_port: {
        presence: {message: "^udp端口不能为空"},
        numericality: {
            onlyInteger: true,
            notInteger:"^必须为整型",
            notValid:"^必须为整型",
            greaterThan: 0,
            notGreaterThan:"^必须大于0",
            lessThanOrEqualTo: 65535,
            notLessThanOrEqualTo: "^最大值不能大于65535"
        }
    }
};
