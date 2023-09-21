import { DataContextService } from './../../context-provider/data-context.service';
import { Component, OnDestroy, OnInit, AfterViewChecked, HostListener, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core'
import { FieldWrapper } from '@ngx-formly/core'
import { Subject, takeUntil } from 'rxjs';

@Component({
  templateUrl: './overview.header.component.html',
})
export class OverviewHeaderComponent extends FieldWrapper implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('overviewHeaderContent') overviewHeaderContent: ElementRef
  private _unsubscribeAll = new Subject();

  title = ""
  formName

  constructor(
    private contextService: DataContextService,
    private renderer: Renderer2
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.setHeight();
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.setHeight();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  public get UpdateFlag() : string {
    return `${this.to.feature}.Update`;
  }

  public get DeleteFlag() : string {
    return `${this.to.feature}.Delete`
  }

  ngOnInit(): void {
    this.formName = this.formState.formName;
    if(this.to.title) {
      this.title = this.to.title.split(':')[0];
      // this.contextService.parseStatementStream(this.to.title).pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      //   this.title = value;
      // })
    } else {
      this.title = 'Header Title'
    }
  }

  ngAfterViewChecked() {
    this.setHeight();
  }

  setHeight() {
    const rect = this.overviewHeaderContent.nativeElement.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;

    const newTop = rect.top + scrollTop;
    const marginBottom = 10;

    const targetHeight = window.innerHeight - newTop - marginBottom;
    this.renderer.setStyle(this.overviewHeaderContent.nativeElement, "height", `${targetHeight}px`);
  }

  deleteItem() {
    if (confirm('Are you sure?')) {
      if(this.to.submitAction) this.to.submitAction()
    }
  }
}
