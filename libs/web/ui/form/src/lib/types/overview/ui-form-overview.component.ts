import { DataContextService } from './../../context-provider/data-context.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { FieldType } from '@ngx-formly/core'

@Component({
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `
  ],
  template: `
    <div [class]="'text-7xl sm:text-8xl font-bold tracking-tight leading-none'" [style]="summaryStyle">{{ to.summary }}</div>
      <div class="text-lg font-medium" [style]="titleStyle">{{ to.title }}</div>
      <div class="flex items-baseline justify-center w-full mt-5 text-secondary">
      <div *ngIf="to.subtitle" class="text-md font-medium truncate">{{ to.subtitle }}:</div>
      <div *ngIf="to.subsummary" class="ml-1.5 text-lg font-semibold">{{ to.subsummary }}</div>
    </div>
  `,
})
export class UiFormOverviewComponent extends FieldType implements OnInit {
  formControl!: FormControl

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dateContextService: DataContextService,
  ) {
    super()
  }

  ngOnInit(): void {
    console.log({ color: this.to.color})
  }

  public get summaryStyle() : string {
    return `color: ${this.to.color}`
  }

  public get titleStyle() : string {
    return `color: ${this.to.color}`
  }

}
