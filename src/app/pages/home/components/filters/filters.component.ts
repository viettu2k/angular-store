import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCategory = new EventEmitter<string>();

  categoriesSubscription: Subscription | undefined;

  categories = ['shoes', 'sports'];

  constructor(private storeService: StoreService) {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe(
        (_categories: Array<string>) => (this.categories = _categories)
      );
  }

  ngOnInit(): void {}

  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }

  ngOnDestroy(): void {
    if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe();
  }
}
