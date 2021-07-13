import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Items, Label } from '../interfaces/items';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // A new filtered stream created by combining the items and labels streams
  public filteredItems$: Observable<Items[]>;

  // Streams of our current items and currently active labels
  private items$: Observable<Items[]>;
  private labelFilter$: Observable<Label[]>;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.items$ = this.listService.getItems();
    this.labelFilter$ = this.listService.getLabelFilter();

    // Combine the two streams
    this.filteredItems$ = combineLatest([this.items$, this.labelFilter$]).pipe(
      // Get the latest values from both streams
      map(([items, filter]) =>
        // Return the latest items with the filter applied
        items.filter((item) => filter.includes(item.label))
      )
    );
  }
}
