// import { Component, OnInit } from '@angular/core';
// import Pusher from 'pusher-js';

// @Component({
//   selector: 'app-messages',
//   templateUrl: './messages.component.html',
//   styleUrls: ['./messages.component.css']
// })
// export class MessagesComponent implements OnInit  {

//   username = 'username';
//   messages = [];
//   message = '';
//   // da:any;
//   ngOnInit(): void {
//     Pusher.logToConsole = true;

//     const pusher = new Pusher('9f43a032ae749ed0870b', {
//       cluster: 'mt1'
//     });

//     const channel = pusher.subscribe('Twitty');
//     channel.bind('message',(data: any) =>{
//       this.messages.push(data);
//     });
//   }

//   submit(){

//   }
// }
