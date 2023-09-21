import { Inject, Injectable } from "@angular/core";
import { TransferProgressEvent } from "@azure/core-http";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { BlockBlobClient } from "@azure/storage-blob";
import { from, Observable, Subscriber } from "rxjs";
import { distinctUntilChanged, scan, startWith } from "rxjs/operators";
import {
  BlobContainerRequest,
  BlobFileRequest,
  BlobStorageClientFactory,
  BlobStorageRequest
} from "../types/azure-storage";
import { BLOB_STORAGE_TOKEN } from "./token";

@Injectable({
  providedIn: "root"
})
export class BlobStorageService {
  constructor(
    @Inject(BLOB_STORAGE_TOKEN)
    private getBlobClient: BlobStorageClientFactory
  ) {}

  getContainers(request: BlobStorageRequest) {
    const blobServiceClient = this.buildClient(request);
    return this.asyncToObservable(blobServiceClient.listContainers());
  }

  listBlobsInContainer(request: BlobContainerRequest) {
    const containerClient = this.getContainerClient(request);
    return this.asyncToObservable(containerClient.listBlobsFlat());
  }

  downloadBlobItem(request: BlobFileRequest) {
    const blockBlobClient = this.getBlockBlobClient(request);
    return from(blockBlobClient.download());
  }

  deleteBlobItem(request: BlobFileRequest) {
    const blockBlobClient = this.getBlockBlobClient(request);
    return from(blockBlobClient.delete());
  }

  uploadToBlobStorage(file: File, request: BlobFileRequest) {
    const blockBlobClient = this.getBlockBlobClient(request);
    return this.uploadFile(blockBlobClient, file);
  }

  private getBlockBlobClient(request: BlobFileRequest) {
    const containerClient = this.getContainerClient(request);
    return containerClient.getBlockBlobClient(request.filename);
  }

  private getContainerClient(request: BlobContainerRequest) {
    const blobServiceClient = this.buildClient(request);
    return blobServiceClient.getContainerClient(request.containerName);
  }

  private buildClient(options: BlobStorageRequest) {
    return this.getBlobClient(options);
  }

  private uploadFile(blockBlobClient: BlockBlobClient, file: File) {
    return new Observable<number>(observer => {
      blockBlobClient
        .uploadData(file, {
          onProgress: this.onProgress(observer),
          blobHTTPHeaders: {
            blobContentType: file.type
          }
        })
        .then(
          this.onUploadComplete(observer, file),
          this.onUploadError(observer)
        );
    }).pipe(distinctUntilChanged());
  }

  private onUploadError(observer: Subscriber<number>) {
    return (error: any) => observer.error(error);
  }

  private onUploadComplete(observer: Subscriber<number>, file: File) {
    return () => {
      observer.next(file.size);
      observer.complete();
    };
  }

  private onProgress(observer: Subscriber<number>) {
    return (progress: TransferProgressEvent) =>
      observer.next(progress.loadedBytes);
  }

  private asyncToObservable<T, TService>(
    iterable: PagedAsyncIterableIterator<T, TService>
  ) {
    return new Observable<T>(
      observer =>
        void (async () => {
          try {
            for await (const item of iterable as AsyncIterable<T>) {
              if (observer.closed) return;
              observer.next(item);
            }
            observer.complete();
          } catch (e) {
            observer.error(e);
          }
        })()
    ).pipe(
      scan<T, T[]>((items, item) => [...items, item], []),
      startWith([] as T[])
    );
  }
}
