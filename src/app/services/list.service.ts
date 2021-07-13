import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { Items, Label } from '../interfaces/items';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private items$ = new BehaviorSubject<Items[]>([
    {
      title: 'Item 1',
      label: 'feat',
    },
    {
      title: 'Item 2',
      label: 'feat',
    },
    {
      title: 'Item 3',
      label: 'bug',
    },
    {
      title: 'Item 4',
      label: 'docs',
    },
    {
      title: 'Item 5',
      label: 'chore',
    },
    {
      title: 'Item 6',
      label: 'chore',
    },
    {
      title: 'Item 7',
      label: 'docs',
    },
  ]);

  private labelFilter$ = new BehaviorSubject<Label[]>([
    'feat',
    'bug',
    'chore',
    'docs',
  ]);

  constructor() {}

  getItems(): Observable<Items[]> {
    return this.items$;
  }

  getLabelFilter(): Observable<Label[]> {
    return this.labelFilter$;
  }

  getLabelFilterValues(): Label[] {
    return this.labelFilter$.value;
  }

  addLabelFilter(label: Label): void {
    // Get the current filter values
    const currentLabels = this.labelFilter$.value;

    // Add the new filter in
    // To ensure duplicates are not added, we create a Set which can only contain
    // unique values, and then we spread that into a new array
    this.labelFilter$.next([...new Set([...currentLabels, label])]);
  }

  removeLabelFilter(label: Label): void {
    // Get the current filter values
    const currentLabels = this.labelFilter$.value;

    this.labelFilter$.next(
      currentLabels.filter((labelToCheck) => labelToCheck !== label)
    );
  }

  setLabelFilter(labels: Label[]): void {
    // Set labels to the set of labels supplied
    this.labelFilter$.next(labels);
  }
}
