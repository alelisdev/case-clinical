import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { Subject, take, takeUntil } from 'rxjs'
import { FuseNavigationItem, FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation'
import { MailFilter, MailFolder, MailLabelNew } from '../mailbox.types'
import { MailboxService } from '../mailbox.service'
import { ActivatedRoute } from '@angular/router'
import { ApiRelateTo } from '../mailbox.constants'
import { WebUiMailComposeComponent } from '../mail-compose/mail-compose.component'

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mailbox-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MailboxSidebarComponent implements OnInit, OnDestroy {
  filters: MailFilter[]
  folders: MailFolder[]
  labels: MailLabelNew[]
  menuData: FuseNavigationItem[] = []
  defaultRoute = '/apps'
  private _foldersMenuData: FuseNavigationItem[] = []
  private _labelsMenuData: FuseNavigationItem[] = []
  private _otherMenuData: FuseNavigationItem[] = []
  private _unsubscribeAll: Subject<any> = new Subject<any>()

  /**
   * Constructor
   */
  constructor(
    private _mailboxService: MailboxService,
    private _matDialog: MatDialog,
    private _fuseNavigationService: FuseNavigationService,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Folders
    this._mailboxService.folders$.pipe(takeUntil(this._unsubscribeAll)).subscribe((folders: MailFolder[]) => {
      this.folders = folders

      // Generate menu links
      this._generateFoldersMenuLinks()

      // Update navigation badge
      this._updateNavigationBadge(folders)
    })

    // Labels
    this._mailboxService.labels$.pipe(takeUntil(this._unsubscribeAll)).subscribe((labels: MailLabelNew[]) => {
      this.labels = labels

      // Generate menu links
      this._generateLabelsMenuLinks()
    })

    // Generate other menu links
    this._generateOtherMenuLinks()
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null)
    this._unsubscribeAll.complete()
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Open compose dialog
   */
  openComposeDialog(): void {
    // Open the dialog
    const dialogRef = this._matDialog.open(WebUiMailComposeComponent, { data: { token: this._mailboxService.token } })
    dialogRef.componentInstance.isClose$.subscribe((res) => {
      if (res){
        dialogRef.close();
        if(!res.cancel) this.getAndUpdateDraftListing(res.relatedTo);
      }
    })
    dialogRef.backdropClick().subscribe(async () => {
      await dialogRef.componentInstance.saveDraftAndClose();
    })
  }

  getAndUpdateDraftListing(relatedTo='') {
    const location = window.location;
    const [folder, page] = location.href?.split('mailbox/')[1]?.split('/');
    if (folder && folder === 'draft' && relatedTo === ApiRelateTo.draft) {
      this._mailboxService.getMailsByFolder('draft', page).pipe(take(1)).subscribe();
    }else if(folder && ( folder === 'sent' || folder=== 'all' ) && relatedTo === ApiRelateTo.sent){
      this._mailboxService.getMailsByFolder(folder, page).pipe(take(1)).subscribe();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Generate menus for folders
   *
   * @private
   */
  private _generateFoldersMenuLinks(): void {
    // Reset the folders menu data
    this._foldersMenuData = []

    // Iterate through the folders
    this.folders.forEach((folder) => {
      // Generate menu item for the folder
      const menuItem: FuseNavigationItem = {
        id: folder.id,
        title: folder.title,
        type: 'basic',
        icon: folder.icon,

        link: this.defaultRoute + '/mailbox/' + folder.slug,
      }

      // If the count is available and is bigger than zero...
      if (folder.count && folder.count > 0) {
        // Add the count as a badge
        menuItem['badge'] = {
          title: folder.count + '',
        }
      }

      // Push the menu item to the folders menu data
      this._foldersMenuData.push(menuItem)
    })

    // Update the menu data
    this._updateMenuData()
  }

  /**
   * Generate menus for labels
   *
   * @private
   */
  private _generateLabelsMenuLinks(): void {
    // Reset the labels menu
    this._labelsMenuData = []

    // Iterate through the labels
    this.labels.forEach((label) => {
      // Generate menu item for the label
      this._labelsMenuData.push({
        id: label.id,
        title: label.display_name,
        type: 'basic',
        icon: 'heroicons_outline:tag',
        link: this.defaultRoute + '/mailbox/label/' + label.id,
      })
    })

    // Update the menu data
    this._updateMenuData()
  }

  /**
   * Generate other menus
   *
   * @private
   */
  private _generateOtherMenuLinks(): void {
    // Settings menu
    this._otherMenuData.push({
      title: 'Settings',
      type: 'basic',
      icon: 'heroicons_outline:cog',
      link: this.defaultRoute + '/mailbox/settings',
    })

    // Update the menu data
    this._updateMenuData()
  }

  /**
   * Update the menu data
   *
   * @private
   */
  private _updateMenuData(): void {
    this.menuData = [
      {
        title: 'MAILBOXES',
        type: 'group',
        children: [...this._foldersMenuData],
      },
      {
        title: 'LABELS',
        type: 'group',
        children: [...this._labelsMenuData],
      },
      {
        type: 'spacer',
      },
      ...this._otherMenuData,
    ]
  }

  /**
   * Update the navigation badge using the
   * unread count of the inbox folder
   *
   * @param folders
   * @private
   */
  private _updateNavigationBadge(folders: MailFolder[]): void {
    // Get the inbox folder
    const inboxFolder = this.folders.find((folder) => folder.slug === 'inbox')

    // Get the component -> navigation data -> item
    const mainNavigationComponent =
      this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation')

    // If the main navigation component exists...
    if (mainNavigationComponent) {
      const mainNavigation = mainNavigationComponent.navigation
      const menuItem = this._fuseNavigationService.getItem('apps.mailbox', mainNavigation)

      // Update the badge title of the item
      if (menuItem && menuItem.badge && menuItem.badge.title) {
        menuItem.badge.title = inboxFolder.count + ''
      }

      // Refresh the navigation
      mainNavigationComponent.refresh()
    }
  }
}
