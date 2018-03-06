<?php
namespace App\models\VO\Request;

use App\models\VO\Common;

class UserRegister extends Common
{
    public $register_id;

    public $user_email;

    public $user_name;

    public $user_mobile;

    public $company_name;

    public $company_industry;

    public $company_url;

    public $register_time;

    public $register_status;

    public $relationship_user;

    public $channel;
}
