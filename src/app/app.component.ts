import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { products } from './products';

import { TooltipDirective } from '@progress/kendo-angular-tooltip';

@Component({
  selector: 'my-app',
  template: `
        <ng-template #template let-anchor>
            <span>{{ anchor.nativeElement.innerText }}</span>
        </ng-template>
        <div>
            <button class="button btn-sm btn-success ms-2" kendoTooltip title="View">
                <span class="k-icon k-i-eye"></span>
            </button>
        </div>
      
        <div kendoTooltip
            showOn="none"
            [tooltipTemplate]="template"
            filter=".k-grid td"
            (mouseover)="showTooltip($event)"
        >
            <kendo-grid
                [kendoGridBinding]="gridData"
                [skip]="21"
                [pageSize]="7"
                [pageable]="true"
                [resizable]="true"
            >
                <kendo-grid-column field="ProductID" title="ID" [width]="40"> </kendo-grid-column>
                <kendo-grid-column field="Category.Description" title="Description" [width]="100"> </kendo-grid-column>
                <kendo-grid-column field="ProductName" title="Name" [width]="150"> </kendo-grid-column>
                <kendo-grid-column field="QuantityPerUnit" title="Quantity" [width]="100"> </kendo-grid-column>
                <kendo-grid-column field="UnitsInStock" title="In stock"> </kendo-grid-column>
                <kendo-grid-column field="Category.CategoryName" title="Category"> </kendo-grid-column>
            </kendo-grid>
        </div>
    `,
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
            .k-grid .k-grid-content td {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        `,
  ],
})
export class AppComponent {
  @ViewChild(TooltipDirective) public tooltipDir: TooltipDirective;
  public gridData: any[] = products;

  public showTooltip(e: MouseEvent): void {
    const element = e.target as HTMLElement;
    if (
      (element.nodeName === 'TD' || element.nodeName === 'TH') &&
      element.offsetWidth < element.scrollWidth
    ) {
      this.tooltipDir.toggle(element);
    } else {
      this.tooltipDir.hide();
    }
  }
}
