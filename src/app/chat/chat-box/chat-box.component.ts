import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SocketService } from '../../socket.service'
import { AppserviceService } from '../../appservice.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router'
import { Cookie } from 'ng2-cookies/ng2-cookies'
import { from } from 'rxjs';

import { Observable } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'




@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: [SocketService]
})
export class ChatBoxComponent implements OnInit {

  @ViewChild('scrollMe', { read: ElementRef }) 
  
  public scrollMe: ElementRef;

  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public authToken: any;
  public userList: any = [];
  public disconnected: boolean;

  public scrollTochatTop: boolean = false;

  public messageText;
  public messageList = [];
  public pageValue = 0;
  public loadingPreviousChat: boolean = false;
  public previousChat = [];


  constructor(public apps: AppserviceService, public router: Router, public socket: SocketService, public toastr: ToastrService) {
    this.receiverId = Cookie.get('receiverId')
    this.receiverName = Cookie.get('receiverName')


  }




  ngOnInit() {

    this.authToken = Cookie.get('authToken')
    this.userInfo = this.apps.getUserInfoFromLocalStorage();
    this.checkStatus();
    this.verifyUserConfermation();
    this.getonlineUserList();
    if (this.receiverId != undefined && this.receiverId != '' || this.receiverId != null) {
      this.userSelectedToChat(this.receiverId, this.receiverName)
    }
    this.getMessageFromUser()


  }

  public getMessageFromUser = () => {

    this.socket.chatByUserId(this.userInfo.userId).subscribe(
      (data) => {
        (this.receiverId = data.userId) ? this.messageList.push(data) : ''
        this.toastr.success(`${data.senderName}  says ${data.senderMessage}`)
        this.scrollTochatTop = false;
      }
    )
  }

  public sendMessage = () => {

    if (this.messageText) {
      let messageData = {
        senderName: this.userInfo.firstName + " " + this.userInfo.lastName,
        senderId: this.userInfo.userId,
        receiverName: Cookie.get('receiverName'),
        receiverId: Cookie.get('receiverId'),
        message: this.messageText,
        createdOn: new Date()
      }
      this.socket.sendChatMessage(messageData)
      this.pushToChatWindow(messageData)
    }
    else {
      this.toastr.warning('text message can not be empty')
    }
  }

  public pushToChatWindow=(data)=>{
    this.messageText ='';
    this.messageList.push(data)
    this.scrollTochatTop= false;

  }

  public sendMessageUsingKeyPress =(event:any)=>{
           if(event.keyCode==13)
           this.sendMessage();
  }

  public  getPreviousChatWithUser=()=>{

    let previousdata = (this.messageList.length>0?this.messageList.slice:[])
  
    this.socket.getChat(this.userInfo.userId, this.receiverId, this.pageValue*10).subscribe(
      (apiResponse)=>{
        if(apiResponse.status==200)
        {
        this.messageList =   apiResponse.data.concat(previousdata)
        }
        else{
  
           this.messageList == previousdata;
          this.toastr.warning('no messaeg available')
        }
  
        this.loadingPreviousChat= false;
  
      },
  
      (err)=>{
        this.toastr.error('some error occured')
      }
    )
  
    }


  public loadEarlierPageOfChat=()=>{
    this.loadingPreviousChat = true;

    this.pageValue++;
    this.scrollTochatTop = true;
    this.getPreviousChatWithUser();
  }
  

  public  userSelectedToChat =( id,name )=>{
        this.userList.map((user)=>{
          if(user.userId== id)
          {
            user.chatting == true;
          }

          else{
            user.chatting= false;
          }
        })

         Cookie.set('receiverId', id)
         Cookie.set('receiverName', name)

         this.receiverId= id;
         this.receiverName= name;

         this.messageList=[];

         this.pageValue =0;

         let chatDetails ={
           userId:this.userInfo.userId,
           senderId :id
         }

         this.socket.markChatAsSeen(chatDetails);
         this.getPreviousChatWithUser();


  }

  




  public checkStatus = () => {
    if (Cookie.get('authToken') == undefined || Cookie.get('authToken') == null || Cookie.get('authToken') == '') {
      this.router.navigate(['/'])
    }

    else {
      return true;
    }
  }

  public verifyUserConfermation = () => {

    this.socket.verifyUserEvent().subscribe(
      (data) => {
        this.disconnected = false;
        this.socket.setUserEvent(this.authToken)
        this.getonlineUserList();
      }
    )
  }

  public getonlineUserList = () => {

    this.socket.OnlineUserList()
      .subscribe((userList) => {
        this.userList = [];
        for (let x in userList) {
          let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false }
          this.userList.push(temp)

          console.log(this.userList)
        }
      }

      )
  }


   public  logOutFunCtion =()=>{

    this.apps.logOut(this.userInfo.userId).subscribe(
          (apiResponse)=>{
            if(apiResponse.status == 200)
            {
                Cookie.delete('authToken')
                Cookie.delete('receiverName')
                Cookie.delete('receiverId')
                 this.router.navigate(['/'])
            }

            else {
              this.toastr.warning(apiResponse.message)
            }
          },

          (err)=>{
           this.toastr.warning('some error occured')
          }
    )
   }



}
