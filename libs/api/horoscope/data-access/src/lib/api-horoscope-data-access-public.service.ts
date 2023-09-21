import { Injectable } from '@nestjs/common'
import { HoroscopeInput } from './dto/hroscope.input'
import { HttpService } from '@nestjs/axios'
import * as moment from 'moment'
import { of, switchMap } from 'rxjs';

@Injectable()
export class ApiHoroscopeDataAccessPublicService {
  constructor(private readonly http: HttpService) {}

  async publicHoroscope(input?: HoroscopeInput) {
    const date = moment(input?.date ?? new Date()).format('YYYY-MM-DD');
    const result = this.http.get(`https://newastro.vercel.app/${input?.sign ?? 'aries'}?date=${date}&lang=${input?.lang ?? 'en'}`).pipe(
      switchMap((res) => {
        const { horoscope, icon } = res.data;
        return of({
          icon,
          content: horoscope,
        });
      })
    )
    return result;
  }
}
