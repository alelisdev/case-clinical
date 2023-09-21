import { Injectable } from '@angular/core'
import { FuseNavigationItem } from '@fuse/components/navigation'
import { WebCoreDataAccessService, CorePaging, Navigation } from '@case-clinical/web/core/data-access'
import { ComponentStore, tapResponse } from '@ngrx/component-store'
import { debounce } from 'lodash'
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators'

export interface NavigationListState {
  headerTitle?: string
  errors?: any
  searchFocused: boolean
  searchQuery?: string
  paging?: CorePaging
  loading?: boolean
  data?: Navigation[]
  menuItems?: FuseNavigationItem[]
}

@Injectable({providedIn: 'root'})
export class FuseNavigationListStore extends ComponentStore<NavigationListState> {
  constructor(private readonly data: WebCoreDataAccessService) {
    super({
      headerTitle: 'Navigations',
      searchFocused: false,
      searchQuery: '',
      paging: {
        limit: 1000,
        skip: 0,
      },

    })
  }

  readonly setSkip = this.updater((state, skip: number) => ({
    ...state,
    paging: { ...state.paging, skip },
  }))

  readonly setSearchQuery = this.updater((state, searchQuery: string) => ({
    ...state,
    searchQuery,
  }))

  readonly setSearchBarInFocus = this.updater((state, searchFocused: boolean) => ({
    ...state,
    searchFocused,
  }))

  private _componentRegistry: Map<string, any> = new Map<string, any>();
  private _navigationStore: Map<string, FuseNavigationItem[]> = new Map<string, any>();

  readonly headerTitle$ = this.select((s) => s.headerTitle)
  readonly errors$ = this.select((s) => s.errors)
  readonly loading$ = this.select((s) => s.loading)
  readonly paging$ = this.select((s) => s.paging)
  readonly searchFocused$ = this.select((s) => s.searchFocused)
  readonly searchQuery$ = this.select((s) => s.searchQuery)
  readonly data$ = this.select((s) => s.data)
  readonly menuItems$ = this.select(this.data$, this.mapDataToItems)

  readonly input$ = this.select(this.paging$, this.searchQuery$, (paging, searchQuery) => ({
    limit: paging.limit,
    skip: paging.skip,
    name: searchQuery,
  }))

  readonly vm$ = this.select(
    this.paging$,
    this.errors$,
    this.loading$,
    this.searchFocused$,
    this.searchQuery$,
    this.data$,
    this.menuItems$,
    (paging, errors, loading, searchFocused, searchQuery, data, menuItems) => ({
      paging,
      errors,
      loading,
      searchFocused,
      searchQuery,
      data,
      menuItems
    }), { debounce: true }
  )

  private mapDataToItems(data: Navigation[]): FuseNavigationItem[] {
    return (data || []).map(
      ({ type, id, icon, link, children, title, subtitle }) =>
        ({
         id,
         title,
         subtitle,
         type,
         icon,
         children,
         link
        } as FuseNavigationItem),
    )
  }

  readonly loadNavigationsEffect = this.effect(($) =>
    $.pipe(
      tap(() => this.patchState({ loading: true })),
      withLatestFrom(this.input$),
      switchMap(([_, input]) =>
        this.data.userNavigations({ input }).pipe(
          tapResponse(
            (res) =>
              this.patchState({
                data: res?.data?.items || [],
                errors: res.errors,
                loading: false,
              }),
            (errors: any) =>
              this.patchState({
                loading: false,
                errors: errors.graphQLErrors ? errors.graphQLErrors : errors,
              }),
          ),
        ),
      ),
    ),
  )

  public  getComponent<T>(name: string): T
  {
      return this._componentRegistry.get(name);
  }

  public  registerComponent(name: string, component: any): void
  {
      this._componentRegistry.set(name, component);
  }

  public  deregisterComponent(name: string): void
  {
      this._componentRegistry.delete(name);
  }

  public  getNavigation(key: string): FuseNavigationItem[]
  {
      return this._navigationStore.get(key) ?? [];
  }

  /**
   * Delete the navigation from the storage
   *
   * @param key
   */
   public  deleteNavigation(key: string): void
  {
      // Check if the navigation exists
      if ( !this._navigationStore.has(key) )
      {
          console.warn(`Navigation with the key '${key}' does not exist in the store.`);
      }

      // Delete from the storage
      this._navigationStore.delete(key);
  }



  /**
   * Store the given navigation with the given key
   *
   * @param key
   * @param navigation
   */
   public  storeNavigation(key: string, navigation: FuseNavigationItem[]): void
  {
      // Add to the store
      this._navigationStore.set(key, navigation);
  }

      /**
     * Utility function that returns a flattened
     * version of the given navigation array
     *
     * @param navigation
     * @param flatNavigation
     */
       public    getFlatNavigation(navigation: FuseNavigationItem[], flatNavigation: FuseNavigationItem[] = []): FuseNavigationItem[]
       {
           for ( const item of navigation )
           {
               if ( item.type === 'basic' )
               {
                   flatNavigation.push(item);
                   continue;
               }

               if ( item.type === 'aside' || item.type === 'collapsable' || item.type === 'group' )
               {
                   if ( item.children )
                   {
                       this.getFlatNavigation(item.children, flatNavigation);
                   }
               }
           }

           return flatNavigation;
       }

       /**
        * Utility function that returns the item
        * with the given id from given navigation
        *
        * @param id
        * @param navigation
        */
        public    getItem(id: string, navigation: FuseNavigationItem[]): FuseNavigationItem | null
       {
           for ( const item of navigation )
           {
               if ( item.id === id )
               {
                   return item;
               }

               if ( item.children )
               {
                   const childItem = this.getItem(id, item.children);

                   if ( childItem )
                   {
                       return childItem;
                   }
               }
           }

           return null;
       }

       /**
        * Utility function that returns the item's parent
        * with the given id from given navigation
        *
        * @param id
        * @param navigation
        * @param parent
        */
     public  getItemParent(
           id: string,
           navigation: FuseNavigationItem[],
           parent: FuseNavigationItem[] | FuseNavigationItem
       ): FuseNavigationItem[] | FuseNavigationItem | null
       {
           for ( const item of navigation )
           {
               if ( item.id === id )
               {
                   return parent;
               }

               if ( item.children )
               {
                   const childItem = this.getItemParent(id, item.children, item);

                   if ( childItem )
                   {
                       return childItem;
                   }
               }
           }

           return null;
       }

}
