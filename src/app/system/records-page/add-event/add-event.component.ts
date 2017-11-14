import {NgForm} from "@angular/forms";
import {Component, Input, OnInit} from '@angular/core';

import {Category} from "../../shared/models/category.model";
import {WFMEvent} from "../../shared/models/event.model";
import * as momemt from "moment";

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];
  types = [
      {type: 'income', label: 'Доход'},
      {type: 'outcome', label: 'Расход'}
  ]

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let {type, amount, description, category} = form.value;

    const event = new WFMEvent(type, amount, category, momemt().format('DD.MM.YYYY HH:mm:ss'), description);
  }

}
