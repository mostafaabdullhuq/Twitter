<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Tweet;
use JWTAuth;
use App\Http\Requests\UpdateUserData;
use App\Http\Controllers\Api\FormatController;
use App\Models\Follow;
use App\Http\Controllers\FollowingController;


class UserController extends Controller
{
    public $formatter;
    public $following;

    public function __construct()
    {
        $this->middleware('auth:api');
        $this->formatter = new FormatController();
        $this->following = new FollowingController();
    }


    public function index()
    {
        $user = auth()->user();
        $user = $this->formatter->formatUser($user);
        $user->is_following = false;
        return $user;
    }

    public function update(UpdateUserData $request)
    {
        try {
            // get only required from request
            $data = $request->only([
                'first_name', 'last_name', 'username', 'bio', 'location', 'website', 'phone_number', 'date_of_birth', 'is_cover_removed'
            ]);
            // if any input not given, set it as null
            $data['first_name'] = $data['first_name'] ?? null;
            $data['last_name'] = $data['last_name'] ?? null;
            $data['username'] = $data['username'] ?? null;
            $data['bio'] = $data['bio'] ?? null;
            $data['location'] = $data['location'] ?? null;
            $data['website'] = $data['website'] ?? null;
            $data['phone_number'] = $data['phone_number'] ?? null;
            $data['date_of_birth'] = $data['date_of_birth'] ?? null;
            $userProfileImage = $request->file('profile_picture');
            $userCoverImage = $request->file('cover_picture');


            $user = auth()->user();
            if ($userProfileImage) {
                $userProfileImage = $userProfileImage->store('public/profile_pictures') ?? null;
                $userProfileImage = $userProfileImage ? explode('/', $userProfileImage)[2] : null;
                $data['profile_picture'] = $userProfileImage;
            }
            if ($userCoverImage) {
                $userCoverImage = $userCoverImage->store('public/cover_pictures') ?? null;
                $userCoverImage = $userCoverImage ? explode('/', $userCoverImage)[2] : null;
                $data['cover_picture'] = $userCoverImage;
            } else if (isset($data['is_cover_removed'])) {
                return $data['is_cover_removed'];
                $data['cover_picture'] = null;
            }
            $user->update($data);

            $user = $this->formatter->formatUser($user);
            return $user;
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        }
    }

    //getBookmarked Tweets
    public function bookmarks(Request $request)
    {
        $user = JWTAuth::user();
        $tweets = [];
        $bookmarks = $user->bookmarks;
        foreach ($bookmarks as $bookmark) {
            $tweets[] = $bookmark->tweet;
        }

        $tweets = $this->formatter->formatTweets($tweets);
        $user = $this->formatter->formatUser($user);
        return [
            'user' => $user,
            'tweets' => $tweets
        ];
    }

    //deleteBookmark
    // public function deleteBookmark($id)
    // {
    //     try {
    //         $bookmark = Bookmark::find($id);
    //         $bookmark->delete();
    //         return response()->json(['message' => 'Removed from bookmarks'], 200);
    //     } catch (\Exception $e) {
    //         return response()->json(['message' => 'not bookmarked'], 404);
    //     }
    // }
    //addTweetBookmark


    public function addBookmark(Request $request)
    {
        $request->validate([
            'tweet_id' => 'required'
        ]);

        $tweetID = $request->tweet_id;
        $user = JWTAuth::user();
        $tweet = Tweet::findOrFail($tweetID);
        if ($tweet) {
            $bookmark = $user->bookmarks()->where('tweet_id', $tweetID)->first();
            if ($bookmark) {
                $bookmark->delete();
            } else {
                $user->bookmarks()->create(
                    [
                        'tweet_id' => $tweetID,
                    ]
                );
            }
            $tweet = $this->formatter->formatTweet($tweet);
            return  $tweet;
        }
        return "Tweet not found";
    }


    public function get_all_users()
    {
        $usersList = [];
        $authUser = JWTAuth::user();
        $users = User::all();
        $authFollowing = $this->following->user_followings($authUser);
        $users = $this->formatter->formatUsers($users);

        $listOfFollowings = $authFollowing->getOriginalContent();
        if (count($listOfFollowings) == 0) {
            foreach ($users as $user) {
                if ($authUser->id != $user->id) {
                    $usersList[]= $user;
                }
            }
        } else {

            foreach ($users as $user) {
                if($user->id != $authUser->id){
                    $found = false;
                    foreach ($listOfFollowings as $value) {
                        if ($value->following_id === $user->id) {
                            $found = true;
                            break;
                        }
                    }
                    // && !in_array($user->id, $usersList
                    if (!$found) {
                        $usersList[] = $user;
                    }
                }
            }
        }   
        return $usersList;
    }

    public function get_all_followings()
    {  
        $usersList =[];
        $authUser = JWTAuth::user();
        $users = User::all();
        $authFollowing = $this->following->user_followings($authUser);
        $users = $this->formatter->formatUsers($users);

        $listOfFollowings = $authFollowing->getOriginalContent();
        if(count($listOfFollowings)!==0){
            // foreach ($users as $user) {
            //     if ($authUser->id != $user->id) {
            //         $usersList[]= $user;
            //     }
            // }

            foreach ($users as $user) {
                if($user->id != $authUser->id){
                    $found = true;
                    foreach ($listOfFollowings as $value) {
                        if ($value->following_id === $user->id) {
                            $found = false;
                            break;
                        }
                    }
                    // && !in_array($user->id, $usersList
                    if (!$found) {
                        $usersList[] = $user;
                    }
                }
            }
        }   
        return $usersList;
    }    
    // public function get_a_followings(Request $Request)
    // {  
    //     $Request->validate([
    //         'fid' => 'required',
    //     ]);


    //     $usersList =[];
    //     // $authUser = JWTAuth::user();
    //     $users = User::all();
    //     $users = $this->formatter->formatUsers($users);

    //     $obj= array("id"=>$Request->fid);
    //     $object = json_decode(json_encode($obj), FALSE);
    //     $authFollowing = $this->following->user_followings($object);
    //     $listOfFollowings = $authFollowing->getOriginalContent();

    //     if(count($listOfFollowings)!==0){

    //         foreach ($users as $user) {
    //                 $found = true;
    //                 foreach ($listOfFollowings as $value) {
    //                     if ($value->following_id === $user->id) {
    //                         $found = false;
    //                         break;
    //                     }
    //                 }
    //                 // && !in_array($user->id, $usersList
    //                 if (!$found) {
    //                     $usersList[] = $user;
    //                 }
                
    //         }
    //     }   
    //     return $usersList;
    // }   
    
    public function get_a_followings($username)
    { 
        $usersList =[];
        // $authUser = JWTAuth::user();
        
        $user = User::where('username', $username)->first();
        
        $follow = $user->followings()->get();
        
        $followingUsers = $this->formatter->formatUsers($follow);
        // foreach ($follow as $value) {
            
        // }
            // return $follow;

            return response(
                ['followList' =>$followingUsers,
                        "user" => $user],
                200
            );

    } 

    public function get_a_followers($username)
    {  
        // $usersList =[];
        // $authUser = JWTAuth::user();
        
        $user = User::where('username', $username)->first();
        
        $follow = $user->followers()->get();
        
        $userFollowers = $this->formatter->formatUsers($follow);
        // foreach ($follow as $value) {
            
        // }
            // return $follow;

            return response(
                ['followList' =>$userFollowers,
                        "user" => $user],
                200
            );
    } 
    
      public function get_all_followers()
    {  
        $usersList =[];
        $authUser = JWTAuth::user();
        $users = User::all();
        $authFollowing = $this->following->user_followers($authUser);
        $users = $this->formatter->formatUsers($users);

        $listOfFollowings = $authFollowing->getOriginalContent();
        if(count($listOfFollowings)!=0){
            // foreach ($users as $user) {
            //     if ($authUser->id != $user->id) {
            //         $usersList[]= $user;
            //     }
            // }

            foreach ($users as $user) {
                if($user->id != $authUser->id){
                    $found = true;
                    foreach ($listOfFollowings as $value) {
                        if ($value->follower_id === $user->id) {
                            $found = false;
                            break;
                        }
                    }
                    // && !in_array($user->id, $usersList
                    if (!$found) {
                        $usersList[] = $user;
                    }
                }
            }
        }   
        return $usersList;
    }
    // public function get_all_users()
    // {
    //     $users = User::all();
    //     if (auth()->check()) {
    //         $authUser = auth()->user();
    //         $authUser->followers_count = $authUser->followers()->count();
    //         $authUser->followings_count = $authUser->followings()->count();
    //     }
    //     foreach ($users as $user) {
    //         $user->followers_count = $user->followers()->count();
    //         $user->followings_count = $user->followings()->count();
    //         $user->followers = $user->followers()->get()->pluck('id')->toArray();
    //     }
    //     return $users;
    // }



    public function destroy(Request $request)
    {
        $request->user()->delete();
        return response()->json(['message' => 'user permanently deleted '], 500);
    }
}
