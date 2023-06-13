import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllService } from 'src/app/shared/services/get-all.service';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {
public newUserUrl='https://gorest.co.in/public/v2/users'



  constructor(
    private http:HttpClient,
    private headerFromService:GetAllService
    ) { }

    private header= this.headerFromService.headers
  createUser(user: any): Observable<any> {
    return this.http.post(this.newUserUrl, user,{headers:this.header})
  }

}
