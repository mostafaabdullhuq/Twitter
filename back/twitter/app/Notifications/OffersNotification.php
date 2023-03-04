<?php
namespace App\Notifications;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Http\Controllers\Api\FormatController;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Tweet;
use App\Models\Follow;
class OffersNotification extends Notification
{
    use Queueable;
    protected $tweet;
    protected $type;
    public $formatter;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($model, $type)
    {
        $this->formatter = new FormatController();
        // $this->Tweet = $Tweet;
        $this->model = $model;
        $this->type = $type;
    
        if ($model instanceof Tweet) {
            $this->tweet = $model;
        } elseif ($model instanceof Follow) {
            $this->follow = $model;
        } else {
            throw new InvalidArgumentException('First argument must be an instance of Tweet or Follow.');
        }
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
//   
// public function toDatabase($notifiable)
// {

    // $title = '';
    // switch ($this->type) {
    //     case 'like':
    //         $title = 'Your tweet was liked by';
    //         break;
    //     case 'reply':
    //         $title = 'Your tweet was replied by';
    //         break;
    //     case 'retweet':
    //         $title = 'Your tweet was retweeted by';
    //         break;
    //     case 'mention':
    //         $title = 'You mentioned by';
    //         break;
    //     case 'follow':
    //         $title = 'You followed by';
    //         break;
    //     default:
    //         $title = 'New notification';
    // }

    // return [
    //     'id' => $this->tweet['id'],
    //     'title' => $title,
    //     'user' => Auth::user()->id,
    //     'type' => $this->type,
    // ];
// }
public function toDatabase($notifiable)
{
    $title = '';
    $userId = Auth::user()->id;

    switch ($this->type) {
        case 'like':
            $title = 'Your tweet was liked by';
            // $tweetId = $this->tweet['id'];
            $data = [
                'id' => $this->tweet['id'],
                'title' => $title,
                'user' => $userId,
                'type' => $this->type,
            ];
            break;
        case 'reply':
            $title = 'Your tweet was replied by';
            $data = [
                'id' => $this->tweet['id'],
                'title' => $title,
                'user' => $userId,
                'type' => $this->type,
            ];
            break;
        case 'likeReply':
            $title = 'Your reply liked by';
            $data = [
                'id' => $this->tweet['id'],
                'title' => $title,
                'user' => $userId,
                'type' => $this->type,
            ];
            break;
        case 'retweet':
            $title = 'Your tweet was retweeted by';
            $data = [
                'id' => $this->tweet['id'],
                'title' => $title,
                'user' => $userId,
                'type' => $this->type,
            ];
            break;
        case 'mention':
            $title = 'You mentioned by';  $data = [
                'id' => $this->tweet['id'],
                'title' => $title,
                'user' => $userId,
                'type' => $this->type,
            ];
             break;
        case 'follow':
            $title = 'You followed by';
            $data = [
                'id' => null,
                'title' => $title,
                'user' => $userId,
                'type' => $this->type,
            ];
            break;
        default:
            $title = 'New notification';
            $data = [
                'id' => null,
                'title' => $title,
                'user' => $userId,
                'type' => $this->type,
            ];
    }

    return $data;
}

}
