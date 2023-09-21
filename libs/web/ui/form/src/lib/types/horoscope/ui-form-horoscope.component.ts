import { FieldType } from '@ngx-formly/core'
import { Component, OnInit, OnDestroy} from '@angular/core'
import { of, switchMap } from "rxjs";
import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { DataContextService } from '../../context-provider/data-context.service';
import { FormService } from '../../form.service';

@Component({
  template: `
    <div *ngIf="horoscopeData$ | async as horoscope">
      <div class='flex flex-row items-center gap-2 p-3'>
        <div class='flex flex-col gap-2 w-auto items-center'>
          <img
            class="object-cover w-26 h-26 rounded-full"
            [src]="imageUrl"
          />
          <p class='text-2xl uppercase text-white font-bold'>{{ signOption }}</p>
          <!-- <div class='flex sm:justify-start flex-col gap-1'>
            <div class='flex flex-row gap-2'>
              <ui-la-icon (click)="decrementSignIndex()" icon="las angle-left" size="2x" class="bg-primary rounded-full cursor-pointer z-99999 hover:shadow-md p-1"></ui-la-icon>
              <ui-la-icon (click)="incrementSignIndex()" icon="las angle-right" size="2x" class="bg-primary rounded-full cursor-pointer z-99999 hover:shadow-md p-1"></ui-la-icon>
            </div>
            <p class='text-xl text-white font-bold'>{{ horoscope.today }}</p>
          </div> -->
        </div>
        <div class='flex-col gap-3 flex-1'>
          <p class='text-xl text-white'>
            <b>Your</b> Horoscope
          </p>
          <p class='text-md text-white'>
            {{ horoscope.content }}
          </p>
        </div>
      </div>
    </div>
  `,
})



export class UiFormHoroscopeComponent extends FieldType implements OnInit, OnDestroy {
  signOption?: string
  date?: string
  url?:string = ''
  horoscopeData$;
  subscriber

  signIndex = 0;
  signOptions = [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces',
  ]

  constructor(private data: WebCoreDataAccessService, private formService: FormService, private contextService: DataContextService) {
    super()
  }

  ngOnDestroy(): void {
    this.subscriber?.unsubscribe();
  }


  public get imageUrl() : string {
    return `assets/images/horoscope/${this.signOption}.png`;
  }


  ngOnInit(): void {
    // this.signOption = this.to.signOptions ?? 'aries'
    this.signIndex = 0;
    this.signOption = this.signOptions[this.signIndex];

    const useDataKey = this.to.useKey;
    if(useDataKey === 1) {
      const dateKey = this.to.dateKey;
      this.subscriber = this.contextService.getDataStream().subscribe((data) => {
        const newDate = this.formService.getValueForKey(dateKey, data);
        if(newDate !== 'undefined') {
          if(newDate !== this.date)  {
            this.date = newDate;
            this.loadHoroscopeDetails();
          }
        }
      })
    } else {
      this.date = this.to.date ?? '2023-04-22'
      this.loadHoroscopeDetails();
    }
  }

  incrementSignIndex() {
    if(this.signIndex < this.signOptions.length-1) this.signIndex += 1;
    else return;

    this.updateHoroScope();
  }

  decrementSignIndex() {
    if(this.signIndex > 0) this.signIndex -= 1;
    else return;

    this.updateHoroScope();
  }

  updateHoroScope() {
    this.signOption = this.signOptions[this.signIndex];
    this.loadHoroscopeDetails();
  }

  loadHoroscopeDetails() {
    this.horoscopeData$ = this.data.publicHoroscope({ input: { date: this.date, sign: this.signOption } }).pipe(
      switchMap((res) => {
        console.log(res, { date: this.date, sign: this.signOption });
        const contentSplits = res.data.horoscope.content?.split('-');
        return of({
          ...res.data.horoscope,
          today: contentSplits?.at(0)?.trim() ?? '',
          content: contentSplits?.at(1)?.trim() ?? '',
        })
      })
    )
  }
}
