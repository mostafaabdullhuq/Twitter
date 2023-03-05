import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',

  styleUrls: ['./new-message.component.css'],

//   template: `
// `
})
export class NewMessageComponent  {

  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }

  // Follow = true;
  // toggleClick(){
  //   this.Follow = !this.Follow;
  // }


  // fromDialog!:string;

  // @ViewChild('dialogRef')
  // dialogRef!: TemplateRef<any>;

  // myFootList =['item1', 'item2', 'item3'];

  // constructor(public dialog: MatDialog){}

  // ngOnInit(): void {
  //   this.fromDialog = "I am a Dialog From ts file";
  // }
  // openTempDialog()
  // {
  //   const myCompDialog = this.dialog.open(this.dialogRef , {data:this.myFootList ,panelClass:'fullscreen-dialog' ,
  //   height:'100hv',
  //   width:'100%'
  // })
  // }

}
