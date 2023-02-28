import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  showModal = false;
  toggleModal(){
    this.showModal = !this.showModal;
  }
<<<<<<< HEAD
  Follow = true;
  toggleClick(){
    this.Follow = !this.Follow;
  }
=======

>>>>>>> 3355563e9e169b38b219406b9050009e67ab24c3
}
