import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../shared/models/category.model";
import {CategoryService} from "../../shared/services/category.service";

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent  {
  @Output()
  onExportCategory = new EventEmitter<Category>();

  constructor(
      private categoryService: CategoryService
  ) { }

  onSubmit(form: NgForm) {

    let {name, capacity} = form.value;
    const category = new Category(name,capacity);
    this.categoryService.addNewCategory(category)
        .subscribe((category: Category) => {
          this.onExportCategory.emit(category);
          form.reset();
          form.form.patchValue({capacity: 1});
        });

  }

}
