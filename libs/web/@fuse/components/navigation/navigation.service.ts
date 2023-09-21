import { Injectable } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseNavigationListStore } from '@case-clinical/core/navigation';

@Injectable({
    providedIn: 'root'
})
export class FuseNavigationService {
    /**
     * Constructor
     */
    constructor(private readonly store: FuseNavigationListStore)
    {
        this.store.menuItems$.subscribe()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register navigation component
     *
     * @param name
     * @param component
     */
    registerComponent(name: string, component: any): void
    {
        this.store.registerComponent(name, component)
    }

    /**
     * Deregister navigation component
     *
     * @param name
     */
    deregisterComponent(name: string): void
    {
        this.store.deregisterComponent(name);
    }

    /**
     * Get navigation component from the registry
     *
     * @param name
     */
    getComponent<T>(name: string): T
    {
        return  this.store.getComponent(name);
    }

    /**
     * Store the given navigation with the given key
     *
     * @param key
     * @param navigation
     */
    storeNavigation(key: string, navigation: FuseNavigationItem[]): void
    {
        // Add to the store
        this.store.storeNavigation(key, navigation);
    }

    /**
     * Get navigation from storage by key
     *
     * @param key
     */
    getNavigation(key: string): FuseNavigationItem[]
    {
        return this.store.getNavigation(key) ?? [];
    }

    /**
     * Delete the navigation from the storage
     *
     * @param key
     */
    deleteNavigation(key: string): void
    {
       this.store.deleteNavigation(key)
    }

    /**
     * Utility function that returns a flattened
     * version of the given navigation array
     *
     * @param navigation
     * @param flatNavigation
     */
    getFlatNavigation(navigation: FuseNavigationItem[], flatNavigation: FuseNavigationItem[] = []): FuseNavigationItem[]
    {
       return this.store.getFlatNavigation(navigation, flatNavigation)
    }

    /**
     * Utility function that returns the item
     * with the given id from given navigation
     *
     * @param id
     * @param navigation
     */
    getItem(id: string, navigation: FuseNavigationItem[]): FuseNavigationItem | null
    {
        console.log('getItem', navigation)
        return this.store.getItem(id, navigation)
    }

    /**
     * Utility function that returns the item's parent
     * with the given id from given navigation
     *
     * @param id
     * @param navigation
     * @param parent
     */
    getItemParent(
        id: string,
        navigation: FuseNavigationItem[],
        parent: FuseNavigationItem[] | FuseNavigationItem
    ): FuseNavigationItem[] | FuseNavigationItem | null
    {
        return this.store.getItemParent(id, navigation, parent)
    }
}
