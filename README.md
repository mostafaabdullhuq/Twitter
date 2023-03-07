<p align="center">
 <h1>Twitter Clone Web Application With PHP Laravel 9 & Angular 15
 </h1>
</p>

Live Demo: https://twiter.tech/ </br>
User Guide Video: https://drive.google.com/file/d/1i_RWNFFNxRbUe5soyjw46cM_kYVc_JN1/view?usp=share_link

## Introduction
Twitter-inspired social media platform designed for users to connect and share their thoughts with the world.</br> Users can create profiles, follow other users, and post tweets, photos, and videos for their followers to see.</br> The project also includes features like hashtags, mentions and trending topics making it easy for users to </br>  discover new content and connect with others in real-time. 
Bulding the website we used Tailwind CSS  and </br> designed the website according to the user's broweser default,considering wether it was light or dark mode.</br>

You can read more about the list of services and the database structure through out the<a href="https://github.com/mostafaabdullhuq/Twitter/blob/main/Twitter%20Clone%20Documentation.pdf"> Official Documentation</a>


## Get Started
Clone the project
 ```
 git clone https://github.com/mostafaabdullhuq/Twitter
 ``` 
 ### For Client-side 
 
Install all project packages
```
npm install
```
Run the project 
```
ng serve -o
```

### For server-side

Install all project packages
```
composer install
```

Generate a new application key for your Laravel application
```
php artisan key:generate
```

Generate a new secret key for your JSON Web Tokens (JWTs)
```
php artisan jwt:secret
```

Create a database in phpMyAdmin with any name you like, but remember to name it the same in your laravel .env file and then write
```
php artisan migrate:fresh --seed
```

Create a symbolic link between the public directory in your Laravel application and the storage/app/public directory in your application's file system.
```
php artisan storage:link
```

Then run your server
```
php artisan serve
```


## Features
### User can
<ul>
 <li>	Create an account or remove it.</li>
 <li>Reset his account password or totally change it.</li>
<li>	Update his/her account, upload profile and cover images.</li>
<li> Share tweets with media.</li>
<li>	Retweet a tweet.</li>
<li>	Reply to a tweet.</li>
<li>	Like or bookmark a tweet and vice versa.</li>
<li> Search for a tweet, user or hashtags. </li>
<li>	Follow others or block them.</li>
</ul>

## Technologies and Tools 
<ul>
  <li> Laravel 9.</li>
  <li> Angular 15.</li>
  <li> Tailwind CSS.</li>
  <li>	MySQL.</li>
  <li>	JWT Package.</li>
  <li>	Laravel-tags (spatie).</li>
</ul>





