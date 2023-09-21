import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DemoStorageComponent } from './app.component';
import { ContainerListComponent } from './components/container-list.component';
import { InputFileComponent } from './components/input-file.component';
import { ItemsDeletedComponent } from './components/items-deleted.component';
import { ItemsDownloadedComponent } from './components/items-downloaded.component';
import { ItemsListComponent } from './components/items-list.component';
import { ItemsUploadedComponent } from './components/items-uploaded.component';
import { SelectedContainerComponent } from './components/selected-container.component';
import { HeaderComponent } from './layout/header.component';
import { BlobDeletesViewStateService } from './services/blob-deletes-view-state.service';
import { BlobDownloadsViewStateService } from './services/blob-downloads-view-state.service';
import { BlobSharedViewStateService } from './services/blob-shared-view-state.service';
import { azureBlobStorageFactory, BLOB_STORAGE_TOKEN } from './services/token';




@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [
    ContainerListComponent,
    ItemsListComponent,
    SelectedContainerComponent,
    InputFileComponent,
    ItemsDownloadedComponent,
    ItemsUploadedComponent,
    ItemsDeletedComponent,
    HeaderComponent,
    DemoStorageComponent
  ],
  providers: [
    BlobDeletesViewStateService,
    BlobDownloadsViewStateService,
    BlobSharedViewStateService,
    {
      provide: BLOB_STORAGE_TOKEN,
      useFactory: azureBlobStorageFactory
    }
  ],
  exports: [
    ContainerListComponent,
    ItemsListComponent,
    SelectedContainerComponent,
    InputFileComponent,
    ItemsDownloadedComponent,
    ItemsUploadedComponent,
    ItemsDeletedComponent,
    HeaderComponent,
    DemoStorageComponent
  ]
})
export class AzureStorageModule {}
