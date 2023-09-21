  import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component, Input, SimpleChanges } from '@angular/core'
import { Observable, Subscription, timer } from 'rxjs'

@Component({
  selector: 'ui-weather-widget',
  template: `
    <div class="" *ngIf="weatherData | async as res">
      <div class="w-full max-w-full px-6 pt-4">
        <div class="flex items-center justify-between">
          <div class="items-center weatherMain">
            <div class="afterBorderLine">

              <span class="text-8xl font-extrabold dark:text-white text-slate-800 flex ">
                {{ (res.main.temp).toFixed() | number: '0.0-0' }}<b class="text-lg top-0">°C</b></span>
            </div>
            <div class="dark:text-white text-slate-900 text-base">
              <span class="block">{{ getDate(res.dt) | date: 'EEEE ,d' }} <br /> {{ getDate(res.dt) | date: 'MMMM' }}</span>
              <span class="font-normal mt-2 dark:text-gray-100  text-slate-800 flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
</svg> {{ res.name }}</span>
            </div>
          </div>
          <div>
          <img class="h-24 w-24 fill-current text-yellow-400" [src]="'http://openweathermap.org/img/wn/'+res.weather[0].icon+'@2x.png'">
          <span class="font-normal text-base dark:text-white text-slate-900 capitalize block text-center">{{ res.weather[0].description }}</span>
</div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center bg-white dark:bg-gray-800">
        <div [class]="(toggle ? '' : 'hidden') + ' w-full border border-t-0 border-b-0 px-6'">
          <div class="flex justify-between my-8" *ngIf="weatherDataHours | async as resHrs">
            <div
              class="flex flex-col items-center gap-3"
              *ngFor="let item of resHrs?.list.slice(1,5)"
            >
              <span class="font-semibold text-base flex">{{ (item.main.temp) | number: '0.0-0' }}<sub class="mt-1">°C</sub></span>
              <img class="h-10 w-10 fill-current dark:text-yellow-400 text-slate-700" [src]="'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png'">
              <span class="font-semibold mt-1 text-sm">{{ item.dt_txt | date: 'shortTime' }} </span>
            </div>
          </div>

          <div class="dark:bg-gray-700">
            <div
              class="flex dark:text-gray-100  items-center mb-6"
              *ngFor="let item of resHrs?.list.slice(1,5)"
            >
              <span class="font-semibold text-sm w-40">{{ item.dt_txt | date: 'mediumDate' }}</span>
              <div class="flex items-center justify-end"></div>
              <img class="h-10 w-10 fill-current text-yellow-400" [src]="'http://openweathermap.org/img/wn/'+item.weather[0].icon+'@2x.png'">
              <span class="font-semibold text-lg text-right w-40">{{ ((item.main.temp_min)) | number: '0.1-1' }}° / {{ ((item.main.temp_max)) | number: '0.1-1' }}°</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="!simpleMode" class="flex justify-center bgBlue1 rounded-b-3xl " (click)="toggleUI()">
      <svg xmlns="http://www.w3.org/2000/svg" [class]="' h-6 w-6 dark: text-white text-slate-00 cursor-pointer'" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
</svg>
    </div>
  `,
})
export class WebUiWeatherWidgetComponent {
  @Input() city?: string
  @Input() toggle?: boolean
  @Input() simpleMode?: boolean
  params!: Params
  paramshours!: ParamsHours
  weatherData!: Subscription
  weatherDataHours!: Subscription
  currentWeather: any
  loaded = false
  readonly Url: string = `https://api.openweathermap.org/data/2.5/weather`

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (this.toggle === undefined || this.toggle === null) {
      this.toggle = false
    }

    const params = {
      q: this.city,
      appid:'99bebb0d7be8231eb26c4495ceb8761f',
      units:'metric'
    }

    const options = { params: params, headers: this.setHttpHeaders() }
    this.getWeatherUpdate(options)

    const paramsHours = {
      q: this.city,
      appid:'99bebb0d7be8231eb26c4495ceb8761f',
      units:'metric'
    }

    const optionshours = { params: paramsHours, headers: this.setHttpHeaders() }
    this.getWeatherhoursUpdate(optionshours)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.city?.currentValue !== changes.city?.previousValue) {
      this.ngOnInit()
    }
  }
  public setHttpHeaders(): HttpHeaders {
    return new HttpHeaders({})
  }

  getWeatherUpdate(opts): void {
    const weatherData = this.http.get(this.Url, opts) as any
    weatherData.subscribe((data) => {
      //console.log("Weather Data:",data);
    })
    this.weatherData = weatherData;
  }

  getDate(timestamp) {
    return new Date(timestamp*1000)
  }

  getWeatherhoursUpdate(opts): void {
    const weatherData = this.http.get('https://api.openweathermap.org/data/2.5/forecast', opts) as any
    weatherData.subscribe((data) => {
      //console.log("Weather-Forecast Data:",data);
    })
    this.weatherDataHours = weatherData;
  }

  toggleUI() {
    this.toggle = !this.toggle
  }
}
interface Params {
  aggregateHours: string
  location: string
  contentType: string
  unitGroup: string
  shortColumnNames: string
}
interface ParamsHours {
  aggregateHours: string
  location: string
  contentType: string
  unitGroup: string
  shortColumnNames: string
}
