import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CubejsClient } from '@cubejs-client/ngx';
import { of, Observable } from 'rxjs';

export class CubeSeries {
  key: string
  title: string
  series: {
    category: any,
    x: any,
    value: any
  }[]
}

@Injectable({ providedIn: 'root' })
export class CubeService {
  constructor(private cubejs: CubejsClient) { }

  public runCubeQuery(query: any): Observable<[CubeSeries]> {
    return this.cubejs.load(query).pipe(
      switchMap(resultSet => {
        console.log(resultSet)
        return of(resultSet? resultSet.series() as [CubeSeries] : null)
      }),
    );
  }
}
