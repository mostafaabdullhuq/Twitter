<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
class verify extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'verify {use}';

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
        User::find($this->argument('user'));
    }
}
