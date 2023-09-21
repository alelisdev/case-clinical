import { Component } from '@angular/core';

@Component({
  selector: 'app-azure-storage',
  template: `
    <app-header></app-header>

    <hr />

    <app-container-list></app-container-list>

    <hr />

    <app-selected-container class="container">
      <app-input-file class="input-file"></app-input-file>

      <app-items-list class="items-list"></app-items-list>

      <div class="item-details">
        <app-items-uploaded class="items-uploaded"></app-items-uploaded>

        <app-items-downloaded class="items-downloaded"></app-items-downloaded>

        <app-items-deleted class="items-deleted"></app-items-deleted>
      </div>
    </app-selected-container>
  `
})
export class DemoStorageComponent {}
