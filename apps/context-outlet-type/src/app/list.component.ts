import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
} from '@angular/core';

import { Directive } from '@angular/core';

interface ItemContext<T> {
  $implicit: T;
  index: number;
}

@Directive({
  selector: 'ng-template[items]',
  standalone: true,
})
export class ItemsDirective<T> {
  @Input('items') list!: T[];

  static ngTemplateContextGuard<TContext>(
    dir: ItemsDirective<TContext>,
    ctx: unknown
  ): ctx is ItemContext<TContext> {
    return true;
  }
}
@Component({
  selector: 'list',
  standalone: true,
  imports: [CommonModule, ItemsDirective],
  template: `
    <div *ngFor="let item of list; let index = index">
      <ng-container
        *ngTemplateOutlet="
          itemsDirective;
          context: { $implicit: item, index }
        "></ng-container>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class ListComponent<TItem extends object> {
  @Input() list!: TItem[];

  @ContentChild(ItemsDirective, { read: TemplateRef })
  itemsDirective!: TemplateRef<TItem>;
}
