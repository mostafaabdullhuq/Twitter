<?php
namespace App\Notifications;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Tweet;
class OffersNotification extends Notification
{
    use Queueable;
    protected $Tweet;
    protected $type;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    // public function __construct(Tweet $Tweet)
    // {
    //     $this->Tweet = $Tweet;
    // }
    public function __construct(Tweet $Tweet, $type)
    {
        $this->Tweet = $Tweet;
        $this->type = $type;
    }
    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }
 
    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */

    // public function toDatabase($notifiable)
    // {
    //     return[
    //        'id' => $this->Tweet['id'],
    //        'title'=>'Your Tweet liked by:', 
    //        'user'=>Auth::user()->first_name,
    //     //    'user_id'=>Auth::user()->id,
    //     ];
    // }
//   
public function toDatabase($notifiable)
{
    $title = '';
    switch ($this->type) {
        case 'like':
            $title = 'Your tweet was liked by:';
            break;
        case 'reply':
            $title = 'Your tweet was replied by:';
            break;
        case 'retweet':
            $title = 'Your tweet was retweeted by:';
            break;
        default:
            $title = 'New notification:';
    }

    return [
        'id' => $this->Tweet['id'],
        'title' => $title,
        'user' => Auth::user()->first_name,
    ];
}

}