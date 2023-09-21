import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CubejsClient } from '@cubejs-client/ngx';
import { of, Observable } from 'rxjs';
import { CubeSeries } from './chart-field-type.component';

@Injectable({ providedIn: 'root' })
export class CubeService {
  constructor(private cubejs: CubejsClient) { }

  public runCubeQuery(query: any): Observable<[CubeSeries]> {
    return this.cubejs.load(query).pipe(
      switchMap(resultSet => {
        return of(resultSet.series() as [CubeSeries])
      }),
    );
  }
}
