import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-users',
  templateUrl: './dialog-users.component.html',
  styleUrls: ['./dialog-users.component.scss']
})
export class DialogUsersComponent {

  usersLogged: string[] = [];
  usersOffline: string[] = [];
  username: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {usersLogged: string[], usersOffline: string[]} ,
    private dialogRef: MatDialogRef<DialogUsersComponent>){

      this.usersLogged = data.usersLogged;
      this.usersOffline = data.usersOffline;
      this.username = String(localStorage.getItem("username"));
    }
}
