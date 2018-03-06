<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 17/10/30
 * Time: 下午5:20
 */

namespace App\library\Service;

use cloudwise\tsb\datasource\base\LogService;
use Swift_SmtpTransport;
use Swift_Mailer;
use Swift_Message;

class MailService extends BaseService
{
    public static $mailer;

    /**
     * @var MailService
     */
    private static $self = null;

    public static function instance()
    {
        if (self::$self == null) {
            self::$self = new self();
        }

        return self::$self;
    }

    public function __construct()
    {
        $aMailConfig = ConfigService::instance()->getConfig('mail');
        $transport   = (new Swift_SmtpTransport($aMailConfig['host'], $aMailConfig['port']))->setUsername(
            $aMailConfig['user_name'])->setPassword($aMailConfig['password']);

        self::$mailer = new Swift_Mailer($transport);
    }

    /**
     * 主题
     *
     * @param $subject
     * 收件人列表
     * @param $toList
     * 内容
     * @param $content
     *
     * @return int
     */
    public function sendMail($subject, $toList, $content)
    {
        try {
            $from = ConfigService::instance()->getConfig('mail.from');;
            // Create a message
            $message = (new Swift_Message($subject))->setFrom([$from['email'] => $from['name']])->setTo($toList)->setBody($content, 'text/html', 'utf-8');

            $result = self::$mailer->send($message);

            return $result;
        } catch (\Exception $e) {
            LogService::logException($e);

            return [
                'msg'  => $e->getMessage(),
                'code' => $e->getCode(),
            ];
        }
    }
}