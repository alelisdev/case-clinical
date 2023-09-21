import { FieldType } from '@ngx-formly/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Component, Input, SimpleChanges,OnInit,OnChanges} from '@angular/core'
import { Observable, Subscription, timer } from 'rxjs'


@Component({
  template: `
    <ui-weather-widget
      [city]="to.city"
      [toggle]="to.toggle"
      [simpleMode]="to.simpleMode"
    ></ui-weather-widget>
  `,
})
export class UiFormWeatherComponent extends FieldType {
  city?: string
  toggle?: boolean
  params!: Params
  paramshours!: ParamsHours
  weatherData!: Subscription
  weatherDataHours!: Subscription
  currentWeather: any
  loaded = false
  readonly Url: string = `https://api.openweathermap.org/data/2.5/weather`

  constructor(private http: HttpClient) {
    super()
  }

  OnInit(): void {
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

  OnChanges(changes: SimpleChanges): void {
    if (changes.city?.currentValue !== changes.city?.previousValue) {
      this.OnInit()
    }
  }
  public setHttpHeaders(): HttpHeaders {
    return new HttpHeaders({})
  }

  getWeatherUpdate(opts): void {
    const weatherData = this.http.get(this.Url, opts) as any
    this.weatherData = weatherData;
  }

  getDate(timestamp) {
    return new Date(timestamp*1000)
  }

  getWeatherhoursUpdate(opts): void {
    const weatherData = this.http.get('https://api.openweathermap.org/data/2.5/forecast', opts) as any
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


