


import { Component,EventEmitter, Input, Output, TemplateRef } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { FavoriteProvider } from '@case-clinical/web/core/data-access'
import { DialogService } from '@ngneat/dialog'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-favorite-provider-table-view',
  templateUrl: './web-favorite-provider-table-view.component.html'
 })
export class WebFavoriteProviderTableViewComponent
    {
  @Input() favoriteProviders: FavoriteProvider[] = []
  @Output() send = new EventEmitter()
  

  constructor(
    private readonly dialog: DialogService,
  ) {}

  createFavoriteProvider($event) {
      if($event) {
        this.favoriteProviders.push($event)
      }
      this.send.emit($event)
  }

  openDialog(
    tpl: TemplateRef<any>,
    {
      favoriteProvider,
    }: { favoriteProvider?: FavoriteProvider },
  ) {
    this.dialog.open(tpl, { data: { favoriteProvider }, closeButton: false })
  }

}
