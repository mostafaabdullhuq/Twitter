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


## Screenshots
Screenshots are in dark mode and the <a href="https://drive.google.com/file/d/1i_RWNFFNxRbUe5soyjw46cM_kYVc_JN1/view?usp=share_link" >User Guide Video</a> is in light mode
<div>
<img src = "https://user-images.githubusercontent.com/117679026/223306023-1613b5fc-9b3b-467b-8fcd-37b472636677.jpeg" />
</div> 
<img src= "https://user-images.githubusercontent.com/117679026/223306622-bc9f7c20-3fe7-4a38-972d-b9ace3ab7208.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223306712-c1280698-e2f9-4541-b858-c23827aed833.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223306780-48470b04-c6c6-484a-8ae4-9c19dd23ec9e.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223306896-954f7a8a-296d-43ac-a5d5-8243ed56f0ae.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307001-9a20c664-3866-4a82-b42d-74860b5806d0.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307159-376a87a8-693f-4fb2-93af-39c035c99ccd.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307143-11bafb76-86eb-4dc6-a45d-f9c3131dbefb.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307260-eacbc80e-d2ef-4b33-8ec8-892faede7b81.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307522-66e2ac65-2fc4-43f8-ae24-92629ff5f032.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307603-ce3b2841-3508-4c5f-81a4-d17f7cce2f2c.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307695-47072aaf-fc32-4780-bde6-02643fc3f524.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307791-59b28521-a24c-46f5-b1c2-490629d60475.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307877-8fdeb1da-35e5-4a97-aed6-34b79824a74d.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307986-bbf2ebb5-500c-4ec4-8d80-defe4151ba4b.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223307963-d0100406-e2f3-4cdd-8329-d57e266c6c6b.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223308449-53775dab-e70e-4693-9020-67f01d641004.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223308570-0afec021-04e0-4bae-bec6-1645adfc9d82.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223308720-38c3bd75-9738-40a1-adbf-c341f99424b6.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223308815-77d1f9da-2fd3-4a5d-92bd-00d0aea82974.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223308923-0dc60956-e1ea-43f8-9a0e-627e72db7cc3.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223309035-f982a967-cf5a-4ef0-9078-c4fb9c6b36d2.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223309143-fd20b6c3-dae5-45d3-8b57-4fb1cd4c378b.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223309236-6b0baaa4-29e5-4ec4-a57d-ab7bfeff9e70.jpeg" />
<img src="https://user-images.githubusercontent.com/117679026/223309345-362a2fe5-4fc4-4b34-9e5f-b3fc805a9321.jpeg" />
