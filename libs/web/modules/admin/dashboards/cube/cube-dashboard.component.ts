import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { CubeService } from './cube-service.service';
import { zip } from "rxjs";
import { CubejsClient } from '@cubejs-client/ngx';
import { AccidentType, Attorney, Firm, WebCoreDataAccessService } from '@case-clinical/web/core/data-access';
import { FetchQuery } from '@case-clinical/web/ui/form';

@Component({
  selector: 'cube-dashboard',
  templateUrl: './cube-dashboard.component.html',
  styleUrls: ["./cube-dashboard.component.scss"]
})
export class CubeDashboardComponent {

  formData = {
    legalCaseStatsSource: this.legalCaseStatsSource.bind(this),
    accidentTypes: this.loadAccidentTypes(),
    firms: this.loadFirms(),
    attorneys: this.loadAttorneys()
  }

  constructor(private data: WebCoreDataAccessService, private cubeService: CubeService, private cubejs: CubejsClient) {
  }

  submit(data) {
    alert(JSON.stringify(data))
  }

  getCubeFilters(cubeName: string, query: FetchQuery) {
    const filterExpressions = query.serialize().filterExpressions;
    if (filterExpressions.length > 0) {
      const filters = filterExpressions.map((el) => {
        return {
          "member": `${cubeName}.${el.key}`,
          "operator": "equals",
          "values": el.value
        }
      });
      return filters;
    } else {
      return [];
    }
  }

  loadAccidentTypes(): Observable<AccidentType[]> {
    return this.data.userAccidentTypes({ input: {} }).pipe(
      switchMap(result => {
        console.log(result.data.items)
        return of(result.data.items);
      })
    )
  }

  loadFirms(): Observable<Firm[]> {
    return this.data.userFirms({ input: {} }).pipe(
      switchMap(result => of(result.data.items))
    )
  }

  loadAttorneys(): Observable<Attorney[]> {
    return this.data.userAttorneys({ input: {}}).pipe(
      switchMap(result => of(result.data.items))
    )
  }

  legalCaseStatsSource(query: FetchQuery): Observable<Record<string, any>> {
    return new Observable(observer => {
      zip([this.loadLegalCasesByAttorney(query), this.loadLegalCasesByFirm(query), this.loadCaseStatsByMonth(query)]).subscribe(([statsByAttorney, statsByFirm, statsByMonth]) => {
        observer.next({
          legalCasesByAttorney: statsByAttorney,
          legalCasesByFirm: statsByFirm,
          loadCaseStatsByMonth: statsByMonth
        });
        observer.complete();
      })
    })
  }

  loadMonthlyCaseStatsOfLastYear(filters: any[]): Observable<any> {
    const cubeQuery = {
      "measures": [
        "LegalCase.count"
      ],
      "limit": 5000,
      "timeDimensions": [
        {
          "dimension": "LegalCase.createdat",
          "granularity": "month",
          "dateRange": "Last year"
        }
      ],
      "order": {
        "LegalCase.createdat": "asc"
      }
    }

    if(filters.length > 0) {
      cubeQuery['filters'] = filters;
    }
    return new Observable(observer => {
      this.cubeService.runCubeQuery(cubeQuery).subscribe(result => {
        console.log('result = ', result)
        observer.next((result && result.length > 0) ? result[0].series : [])
        observer.complete();
      })
    })
  }

  loadMonthlyCaseStatsOfThisYear(filters: any[]): Observable<any> {
    const cubeQuery = {
      "measures": [
        "LegalCase.count"
      ],
      "limit": 5000,
      "timeDimensions": [
        {
          "dimension": "LegalCase.createdat",
          "granularity": "month",
          "dateRange": "This year"
        }
      ],
      "order": {
        "LegalCase.createdat": "asc"
      }
    };
    if(filters.length > 0) {
      cubeQuery['filters'] = filters;
    }
    return new Observable(observer => {
      this.cubeService.runCubeQuery(cubeQuery).subscribe(result => {
        observer.next(result.length > 0 ? result[0].series : [])
        observer.complete();
      })
    })
  }

  loadCaseStatsByMonth(query: FetchQuery) {
    const cubeFilters = this.getCubeFilters('LegalCase', query);

    return new Observable(observer => {
      zip(this.loadMonthlyCaseStatsOfLastYear(cubeFilters), this.loadMonthlyCaseStatsOfThisYear(cubeFilters)).subscribe(([statsOfLastYear, statsOfThisYear]) => {
        statsOfLastYear = statsOfLastYear.map(el => {
          return {
            ...el,
            category: new Date(el.category).setFullYear(2000)
          }
        });

        statsOfThisYear = statsOfThisYear.map(el => {
          return {
            ...el,
            category: new Date(el.category).setFullYear(2000)
          }
        });

        observer.next([
          statsOfLastYear,
          statsOfThisYear
        ])
        observer.complete();
      })
    })
  }

  loadLegalCasesByAttorney(query: FetchQuery) {
    const cubeQuery = {
      "measures": [
        "LegalCase.count"
      ],
      "limit": 5000,
      "dimensions": [
        "Attorney.name"
      ],
      "order": {
        "LegalCase.count": "desc"
      }
    };
    const cubeFilters = this.getCubeFilters('LegalCase', query);
    if(cubeFilters.length > 0) {
      cubeQuery['filters'] = cubeFilters;
    }
    return new Observable(observer => {
      this.cubeService.runCubeQuery(cubeQuery).subscribe((result: any) => {
        console.log(result.length > 0 ? result[0].series: [])
        observer.next(result[0].series)
        observer.complete();
      })
    })
  }

  loadLegalCasesByFirm(query: FetchQuery) {
    const cubeQuery = {
      "measures": [
        "LegalCase.count"
      ],
      "limit": 5000,
      "dimensions": [
        "Firm.name"
      ],
      "order": [
        [
          "Firm.name",
          "asc"
        ]
      ]
    }
    const cubeFilters = this.getCubeFilters('LegalCase', query);
    if (cubeFilters.length > 0) {
      cubeQuery['filters'] = cubeFilters;
    }
    return new Observable(observer => {
      this.cubeService.runCubeQuery(cubeQuery).subscribe((result: any) => {
        observer.next(result.length > 0 ? result[0].series : [])
        observer.complete();
      })
    })
  }
}
