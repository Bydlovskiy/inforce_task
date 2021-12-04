import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICommentRequest, ICommentResponse } from '../interfaces/IComment-interface';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private url = environment.BACKEND_URL;
  private api = { comments: `${this.url}/comments` };


  constructor( private http: HttpClient) { }

  getAll(): Observable<ICommentResponse[]> {
    return this.http.get<ICommentResponse[]>(this.api.comments);
  }

  create(comments: ICommentRequest): Observable<void> {
    return this.http.post<void>(this.api.comments, comments);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.comments}/${id}`);
  }

}
