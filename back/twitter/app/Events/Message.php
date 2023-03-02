<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class Message implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public function __construct(public string $username , public string $message)
    {
    }
    //for the channel name
    public function broadcastOn()
    {
        return ['TwittyChat'];
        // return new PrivateChannel('TwittyChat');
    }
    //for the message name
    public function broadcastAs()
    {
        return 'message';
    }
}
