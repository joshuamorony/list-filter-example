import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ListService } from '../services/list.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit, OnDestroy {
  public filterForm: FormGroup;
  private labelFilterSubscription: Subscription;
  private valueChangesSubscription: Subscription;

  constructor(private fb: FormBuilder, private listService: ListService) {
    this.filterForm = this.fb.group({
      feat: [true],
      bug: [true],
      chore: [true],
      docs: [true],
    });
  }

  ngOnInit() {
    // React to any changes in the filter state
    this.labelFilterSubscription = this.listService
      .getLabelFilter()
      .subscribe((labels: string[]) => {
        for (const key of Object.keys(this.filterForm.controls)) {
          this.filterForm.controls[key].setValue(
            labels.includes(key) ? true : false,
            { emitEvent: false }
          );
        }
      });

    // Update filter to reflect new state when user changes it
    this.valueChangesSubscription = this.filterForm.valueChanges.subscribe(
      (value) => {
        const newFilterLabels = [];

        // Push key into array if its value is true
        for (const entry of Object.entries(value)) {
          if (entry[1]) {
            newFilterLabels.push(entry[0]);
          }
        }
        this.listService.setLabelFilter(newFilterLabels);
      }
    );
  }

  ngOnDestroy() {
    this.valueChangesSubscription.unsubscribe();
    this.labelFilterSubscription.unsubscribe();
  }
}
