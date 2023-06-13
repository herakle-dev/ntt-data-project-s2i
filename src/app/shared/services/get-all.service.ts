  import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable, Subject, throwError } from 'rxjs';
  import { TokenAuthServiceService } from 'src/app/core/shared/token-auth-service.service';
  import { catchError, takeUntil } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class GetAllService {
    private cancelSignal$ = new Subject<void>();
    private stopSignal$ = new Subject<void>();
    getRequestsComplete = false;
    allResponsesTogether: any[] = [];
    private cache: any[][] = [];

    public headers = new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getTokenFromLocalStorage()}`,
    });

    constructor(
      private http: HttpClient,
      private tokenService: TokenAuthServiceService
    ) {}

      getAllInApi(
        perPage: number,
        url: string
      ): Observable<any[][]> {


        return new Observable<any[][]>((observer) => {
          let currentPage = 1;
          const recursiveGet = () => {
            const apiUrl = `${url}?page=${currentPage}&per_page=${perPage}`;
            const response$ = this.http.get<any[]>(apiUrl, { headers: this.headers })
            .pipe(
              catchError((error: HttpErrorResponse) => {
                observer.error(error);
                return throwError(error);
              }),
              takeUntil(this.cancelSignal$),
              takeUntil(this.stopSignal$)
            );
            response$.subscribe(
              (responseArray: any[]) => {
                if (responseArray.length > 0) {
                  this.allResponsesTogether.push(...responseArray);
                  observer.next(responseArray);
                  const pages = this.splitArrayIntoPages(
                    this.allResponsesTogether,
                    perPage
                  );
                  observer.next(pages);
                  currentPage++;
                  recursiveGet();
                } else {
                  this.getRequestsComplete=true
                  observer.complete();

                }
              },
              (error: HttpErrorResponse) => {
                observer.error(error);
              }
            );
          };

          recursiveGet();
        });
      }

    cancelRequests() {
      this.cancelSignal$.next();
    }

     splitArrayIntoPages(array: any[], perPage?: number): any[][] {
      const totalPages = Math.ceil(array.length / perPage);
      const pages: any[][] = [];

      for (let i = 0; i < totalPages; i++) {
        const startIndex = i * perPage;
        const endIndex = startIndex + perPage;
        const page = array.slice(startIndex, endIndex);
        pages.push(page);
      }

      return pages;
    }

    flattenResponseInPages(pages: any[][]): any[] {
      return pages.reduce((result, page) => result.concat(page), []);
    }

    resetCache() {
      this.allResponsesTogether = [];
      this.cache = [];
    }
  }






