import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Blog } from "../models/Blog.model";

    
  
@Injectable({
    providedIn: 'root'
  })
export class BlogService {

    baseUrl: string = environment.baseUrl;

    constructor(private http:HttpClient) {

    }

    getArticles() {
        return this.http.get<Blog[]>(this.baseUrl);
    }

    getArticle(id:number) {
        return this.http.get<Blog>(this.baseUrl + "/"+id);
    }

    addArticle(article: Blog) {
        return this.http.post(this.baseUrl,article);
    }

    updateArticle(id:number, article:Blog) {
        return this.http.put(this.baseUrl + "/"+id, article);
    }

    deleteArticle(id:number) {
        return this.http.delete(this.baseUrl+"/"+id);
    }
}
