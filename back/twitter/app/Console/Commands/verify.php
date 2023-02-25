<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Verified_user;
class verify extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'verify {user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // $user = User::find($this->argument('user'));
        $user =$this->argument('user');
        $Verified_user = Verified_user::where('user_id',$user);
        if(!$Verified_user){
            $Verified_user = new Verified_user();
            $Verified_user->user_id = $user;
        }
    }
}
