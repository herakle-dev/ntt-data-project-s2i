import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private usersDataSubject: Subject<any[]> = new Subject<any[]>();
  public usersData$: Observable<any[]> = this.usersDataSubject.asObservable();
    private originalUsers: any[] = [];
  private allPostsFull: any[] = [];

  setOriginalUsers(users: any[]) {
    this.originalUsers = users;
    this.usersDataSubject.next(this.originalUsers);

  }

  getOriginalUsers(): any[] {
    return this.originalUsers;
  }

  setAllPostsFull(posts: any[]) {
    this.allPostsFull = posts;
  }

  getAllPostsFull(): any[] {
    return this.allPostsFull;
  }
}
