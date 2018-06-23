import { Injectable } from '@angular/core';

import * as io from 'socket.io-client'

import {Cookie}  from 'ng2-cookies/ng2-cookies'

import {HttpClient , HttpHeaders} from '@angular/common/http'
import {HttpErrorResponse , HttpParams}  from '@angular/common/http'
import {Observable }  from 'rxjs'
import {catchError , tap }  from 'rxjs/operators'
 

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url ='https://chatapi.edwisor.com';
  
  private socket;

  constructor(public http:HttpClient) { 
    this.socket = io(this.url)
  }

  public verifyUserEvent =()=>{
    return Observable.create((observer)=>{

      this.socket.on('verifyUser', (data)=>{
        observer.next(data);
      })
    })
  }


  public OnlineUserList=()=>{
    return Observable.create((observer)=>{
      this.socket.on('online-user-list',(userlist)=>{
         observer.next(userlist)
      })
    })
  }

    public diconnectedevent =()=>{
      return Observable.create((observer)=>{
        this.socket.on('disconnect', () =>{
          observer.next();
        })
       
      })
    }

    public setUserEvent=(authToken)=>{
      this.socket.emit('set-user', authToken);
    }

    public chatByUserId =(userId)=>{
         return Observable.create((observer)=>{
           this.socket.on('userId', (data)=>{
             observer.next(data)
           })
         })
    }

    public sendChatMessage =( msgobject)=>{
      this.socket.emit('chat-msg', msgobject)

    }

    public markChatAsSeen = (userDetails) => {

      this.socket.emit('mark-chat-as-seen', userDetails);
  
    } //

    public getChat(senderId, receiverId, skip): Observable<any> {

      return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authtoken')}`)
        
  
    }

    private handleError =(err:HttpErrorResponse)=>{
      let errorMessage =''

      if(err.error instanceof Error)
      {
        errorMessage =`An  error occured ${err.error.message}`
      }
      else{
        errorMessage =`server retuned code ${err.status} error message is ${err.message}`
      }

      console.log(errorMessage)

      return Observable.throw(errorMessage)
      
    }
}
