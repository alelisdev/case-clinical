

import { Component,NgZone, ChangeDetectorRef, TemplateRef, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { DialogService } from '@ngneat/dialog'
import { FieldType } from '@ngx-formly/core'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

@Component({
  templateUrl: `./case-pre-procedure-select.component.html`,
})
export class CasePreProcedureSelectComponent extends FieldType implements OnInit {

  private ngUnsubscribe: Subject<boolean> = new Subject<boolean>()
  public items: any[] = []
  public value: string = null
  private lastInput: string = null
  private sub: Observable<any>
  private timeout: any
  formControl!: FormControl
  loading = false;

  constructor(private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private readonly dialog: DialogService
  ) {
    super()
  }

  public ngOnInit() {
    this.to.disabled && this.formControl.disable()

    if (this.formControl?.value) {
      this.value = this.formControl.value
    }

    this.formControl.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe((x) => {
      this.to.changed && this.to.changed(x)
      if (x) {
        this.value = x
        this.refreshItems()
        this.ref.markForCheck()
        this.ref.detectChanges()
      }
    })
    this.changed(null)
  }

  refreshItems() {
    this.to.source('').subscribe(console.log)
  }

  changed(e: any) {
    if (e && !e.name) {
      this.formControl.setValue(null)
      if (this.to.source) {
        this.timeout && clearTimeout(this.timeout)
        if (e.term != this.lastInput) {
          this.timeout = setTimeout(() => {
            this.loading = true
            this.to.source(e.term).subscribe((result: any) => {
              this.items = result
              this.loading = false
              this.lastInput = e.term
              this.ref.markForCheck()
              this.ref.detectChanges()

            })
            this.formControl.markAsDirty()

          }, 300)
        }
      }
    } else if (e && e.name) {
      this.value = e
      this.formControl.setValue(e)
    } else if (!e) {
      this.timeout && clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.formControl.setValue(null)
        this.loading = true
        this.to.source('').subscribe((result: any) => {
          this.items = result
          this.loading = false
          this.ref.markForCheck()
          this.ref.detectChanges()
        })
      }, this.to.debounceTime || 0)
    }


  }

  clicked(e: any) {
    if (e) {
      this.formControl.setValue(e)
      this.value = e
    }
  }

  displayFn(e: any): string {
    return e ? e.name : null
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next(true)
    this.ngUnsubscribe.unsubscribe()
  }

  openDialog<T>(
    tpl: TemplateRef<any>,
    {
      casePreProcedure,
    }: { casePreProcedure ?: T },
  ) {
    this.dialog.open(tpl, { data: { casePreProcedure }, closeButton: false })
  }

}



