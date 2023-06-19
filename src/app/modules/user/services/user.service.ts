import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';
import { Injectable } from '@angular/core';
import { GetAllService } from 'src/app/shared/services/get-all.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  originalUsers: any[] = [];

  public allUsersUrl = 'https://gorest.co.in/public/v2/users';
  public headers = this.getAllService.headers;

  constructor(
    private http: HttpClient,
    private getAllService: GetAllService,
  ) {}


  deleteThisUser(userId: number): Observable<any> {
    const deleteUrl = `${this.allUsersUrl}/${userId}`;
    return this.http.delete<any>(deleteUrl, { headers: this.headers });
  }
}
