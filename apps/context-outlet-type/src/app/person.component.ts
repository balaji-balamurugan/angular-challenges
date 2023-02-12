import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

interface Person {
  name: string;
  age: number;
}
interface PersonContext {
  $implicit: string;
  age: number;
}

import { Directive } from '@angular/core';

@Directive({ selector: 'ng-template[person-list]', standalone: true })
export class PersonListDirective {
  static ngTemplateContextGuard(
    dir: PersonListDirective,
    ctx: unknown
  ): ctx is PersonContext {
    return true;
  }
}

@Component({
  standalone: true,
  imports: [NgTemplateOutlet],
  selector: 'person',
  template: `
    <ng-container
      *ngTemplateOutlet="
        personTemplateRef || emptyRef;
        context: { $implicit: person.name, age: person.age }
      "></ng-container>

    <ng-template #emptyRef> No Template </ng-template>
  `,
})
export class PersonComponent {
  @Input() person!: Person;

  @ContentChild(PersonListDirective, { read: TemplateRef })
  personTemplateRef!: TemplateRef<unknown>;
}
