import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: 'auto-completion.component.html',
  styleUrls: ['auto-completion.component.css'],
})
export class AutocompleteComponent implements OnInit {
  @Input() formControl: FormControl;
  @Input() dataSource: any[];
  @Input() regroupBy: string;
  @Input() valueKey: string = '';
  @Input() textKey: string = '';

  private dataSubject = new BehaviorSubject<any[]>([]);
  filteredData$: Observable<any[]>;
  showDropdownFlag = false;

  @ViewChild('inputRef') inputRef: ElementRef;

  constructor() {
    this.filteredData$ = this.dataSubject
      .asObservable()
      .pipe(map((data) => this.groupData(data, this.regroupBy)));
  }
  ngOnInit(): void {}

  filterData(searchTerm: string): void {
    if (!this.dataSource) {
      return;
    }

    const filteredItems = this.dataSource.filter((item) => {
      // Filter based on the specified text key, modify this condition to fit your needs
      return item[this.textKey]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });

    this.dataSubject.next(filteredItems);
  }

  showDropdown(): void {
    this.filteredData$
      .pipe(map((filteredData) => filteredData.length > 0))
      .subscribe((flag) => (this.showDropdownFlag = flag));
  }

  selectItem(item: any): void {
    this.formControl.setValue(item);
    this.showDropdownFlag = false;
  }

  private groupData(data: any[], key: string): any[] {
    const groupedData = [];
    const groups = new Map();

    for (const item of data) {
      const groupKey = item[key];
      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey).push(item);
    }

    groups.forEach((items, groupKey) => {
      groupedData.push({ key: groupKey, items });
    });

    return groupedData;
  }
}
