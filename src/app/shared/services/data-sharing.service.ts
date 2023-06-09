import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }
    private originalUsers: any[] = [];
  private allPostsFull: any[] = [];

  setOriginalUsers(users: any[]) {
    this.originalUsers = users;
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
