import { Component } from '@angular/core';
import { SocketService } from '../socket-service/socket.service';
import User from '../models/User';
import { FormControl, FormGroup } from '@angular/forms';
import Message from '../models/Message';
import { MatDialog } from '@angular/material/dialog';
import { DialogUsersComponent } from '../dialog-users/dialog-users.component';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  logNotifyMessages: string[] = [];
  usersLogged: string[] = [];
  usersOffline: string[] = [];
  username: string = "";
  formMessageToForum: FormGroup = new FormGroup({});
  forumMessages: Message[] = [];
  private socketService: SocketService | undefined;
  dataLogDrawer: boolean = false;
  dataSettingsDrawer: boolean = false;
  androidView: boolean = false;
  hasBackdrop: boolean = false;
  mode: MatDrawerMode = "side";

  constructor(private dialog: MatDialog, observer: BreakpointObserver){

    observer.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.setConfigForAndroidView();
      }
    });

    if(!localStorage.getItem("username")){
      location.replace("/login");
      return;
    }

    this.username = String(localStorage.getItem("username"));

    this.formMessageToForum = new FormGroup({
      from: new FormControl(this.username),
      to: new FormControl("forum"),
      message: new FormControl("")
    })

    this.socketService = new SocketService();
    this.username = String(localStorage.getItem("username"));
    this.observer();
  }

  private observer(){
    this.socketService?.getObserver().subscribe(
      data => {

        if(data.type == "log"){
          this.logNotifyMessages.push(data.data);
        };
        if(data.type == "usersLogged"){
          this.usersLogged = this.filterUsersLogged(data.data);
        };
        if(data.type == "usersOffline"){
          this.usersOffline = this.filterUsersLogged(data.data);
        }
        if(data.type == "forumAllMessages"){
          this.forumMessages = data.data;
        }
        if(data.type == "forumMessage"){
          this.forumMessages.push(data.data);
        }
      }
    )
  }

  sendMessage(){
    this.formMessageToForum.patchValue({from: this.username});
    this.formMessageToForum.patchValue({to: "forum"});
    
    console.log(this.formMessageToForum.value);
    this.socketService?.send(this.formMessageToForum.value);
    this.formMessageToForum.reset(this.formMessageToForum);
  }

  logout(){
    localStorage.clear();
    location.replace("/login");
  }

  private filterUsersLogged(data: string[]){
    let filtered = [];

    for(let user of data){
      if(user != this.username){
        filtered.push(user);
      }
    }
    return filtered;
  }

  alterFrom(from: string){
    if(from == this.username){
      return "Você";
    }
    return from;
  }
  openLogDrawer(drawer: any){
    drawer.toggle();

    this.dataSettingsDrawer = false;
    this.dataLogDrawer = true;
  }
  openSettingsDrawer(drawer: any){
    drawer.toggle();
    
    this.dataLogDrawer = false;
    this.dataSettingsDrawer = true;
  }

  openDialogUsersAndroidView(){
    this.dialog.open(DialogUsersComponent, {
      data: {usersLogged: this.usersLogged, usersOffline: this.usersOffline}
    })
  }

  setConfigForAndroidView(){
    this.hasBackdrop = true;
    this.mode = "over";
    console.log("isAndroid");
  }
}
