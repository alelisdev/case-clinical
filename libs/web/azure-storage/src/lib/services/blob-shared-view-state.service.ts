import { Injectable } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import {
  BehaviorSubject,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction
} from 'rxjs';

import {
  filter,
  finalize,
  map,
  scan,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

import { WebCoreDataAccessService } from '@case-clinical/web/core/data-access';

import {
  BlobContainerRequest,
  BlobItem,
  BlobStorageRequest,
  Dictionary
} from '../types/azure-storage';

import { BlobStorageService } from './blob-storage.service';

// import { SasGeneratorService } from './sas-generator.service';

@Injectable({
  providedIn: 'root'
})
export class BlobSharedViewStateService {

  private selectedContainerInner$ = new BehaviorSubject<string>(undefined);

  containers$ = this.getStorageOptions().pipe(
    switchMap(options => this.blobStorage.getContainers(options))
  );
  
  itemsInContainer$ = this.selectedContainer$.pipe(
    filter(containerName => !!containerName),
    switchMap(containerName =>
      this.getStorageOptions().pipe(
        switchMap(options =>
          this.blobStorage.listBlobsInContainer({
            ...options,
            containerName
          })
        )
      )
    )
  );

  get selectedContainer$() {
    return this.selectedContainerInner$.asObservable();
  }

  constructor(
    private azureDataService: WebCoreDataAccessService ,
    private blobStorage: BlobStorageService
  ) {}

  public getContainerItems(containerName: string): void {
    this.selectedContainerInner$.next(containerName);
  }

  finaliseBlobChange = <T>(
    containerName: string
  ): MonoTypeOperatorFunction<T> => source =>
    source.pipe(
      finalize(
        () =>
          this.selectedContainerInner$.value === containerName &&
          this.selectedContainerInner$.next(containerName)
      )
    );

  scanEntries = <T extends BlobItem>(): OperatorFunction<T, T[]> => source =>
    source.pipe(
      map(item => ({
        [`${item.containerName}-${item.filename}`]: item
      })),
      scan<Dictionary<T>>(
        (items, item) => ({...items,...item})
      ),
      map(items => Object.values(items))
    );

  getStorageOptionsWithContainer(): Observable<BlobContainerRequest> {
    return this.getStorageOptions().pipe(
      withLatestFrom(this.selectedContainer$),
      map(([options, containerName]) => ({ ...options, containerName }))
    );
  }

  private getStorageOptions(): Observable<BlobStorageRequest> {
    return this.azureDataService.getSasToken().pipe(
      tapResponse(
        (res: any) => res.result,
        (errors: any) => console.log
      )
    );
  }

  
}
