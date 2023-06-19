import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAllService } from 'src/app/shared/services/get-all.service';

@Injectable({
  providedIn: 'root',
})
export class PostFormService {
  header=this.getAllService.headers
  newPostUrl = ``;z

  constructor(private http: HttpClient, private getAllService: GetAllService) {}
  createPost(post: any): Observable<any> {
    return this.http.post(this.newPostUrl, post, { headers: this.header });
  }
}
