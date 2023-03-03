<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Tweet;
// use Notification;
use Illuminate\Notifications\Notification;
use App\Notifications\OffersNotification;
use Illuminate\Support\Facades\Auth;
class NotificationController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
  
    public function index()
    {
        return response()->json(['message' => 'Welcome to the product API.']);
    }
    
    
    public function sendOfferNotification()
    {
        $user = Auth::user();
  
        // $Tweet = [
        //     'name' => 'BOGO',
        //     'body' => 'You received an offer.',
        //     'thanks' => 'Thank you',
        //     'offerText' => 'Check out the offer',
        //     'offerUrl' => url('/'),
        //     'offer_id' => 007
        // ];
        $Tweet = new Tweet(['id' => 1, 'text' => 'This is a tweet']);
        // $notification = new OffersNotification($tweet);

  
        $user->notify(new OffersNotification($Tweet));
   
        return response()->json(['message' => 'notification sent.']);
    }
}