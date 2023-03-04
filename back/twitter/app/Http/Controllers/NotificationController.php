<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Tweet;
// use Notification;
use Illuminate\Notifications\Notification;
use App\Notifications\OffersNotification;
use App\Http\Controllers\Api\FormatController;

use Illuminate\Support\Facades\Auth;
class NotificationController extends Controller
{
    public $formatter;
    public function __construct()
    {
        $this->middleware('auth');
        $this->formatter = new FormatController();
    }
  
    public function index()
    {
        return response()->json(['message' => 'Welcome to API Notification.']);
    }
    
    
    public function sendNotification()
    {
        $user = Auth::user();
        $notifications = $user->notifications;
        if ($notifications) {
            $notifications = $this->formatter->formatNotifications($notifications);
        } else {
            $notifications = [];
        }   
        return $notifications;
    }
}