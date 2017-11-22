import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BaseApi} from "../../../shared/core/base-api";
import {Category} from "../models/category.model";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CategoryService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    addNewCategory(catergory: Category): Observable<Category> {
        return this.post('categories', catergory);
    }

    getCategories(): Observable<Category[]> {
        return this.get('categories');
    }

    updateCategory(category: Category): Observable<Category> {
        return this.put(`categories/${category.id}`, category);
    }

    getCategoryById(id: number): Observable<Category> {
        return this.get(`categories/${id}`);
    }

}