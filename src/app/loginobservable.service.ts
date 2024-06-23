import { Injectable} from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })

export class loginobservable {
    public comunicator$: Subject<boolean> = new Subject();
    pid: any;

    loggedIn(){
        if(this.pid){
            clearTimeout(this.pid);
        }
        this.comunicator$.next(true);
        this.pid = setTimeout(()=>{
            this.loggedOut();
        },10*60*1000);
    }

    loggedOut(){
        clearTimeout(this.pid);
        this.comunicator$.next(false);
        console.log("logged out");
    }
    
}