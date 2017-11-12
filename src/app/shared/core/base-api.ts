import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http"
import {Observable} from "rxjs";

@Injectable()
export class BaseApi {

    private baseUrl: string = 'http://localhost:3000/';

    constructor(
      public http: Http
    ){}


    getUrl(url: string){
          return this.baseUrl + url;
    }

    get(url: string): Observable<any> {
        return this.http.get(this.getUrl(url))
            .map((response: Response) => response.json());
    }

    post(url: string, data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data)
            .map((response: Response) => response.json());
    }

    put(url: string, data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data)
            .map((response: Response) => response.json());
    }

}