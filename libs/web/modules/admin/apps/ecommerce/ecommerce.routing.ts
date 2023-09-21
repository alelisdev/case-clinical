import { Route } from '@angular/router';
import { InventoryComponent } from 'libs/web/modules/admin/apps/ecommerce/inventory/inventory.component';
import { InventoryListComponent } from 'libs/web/modules/admin/apps/ecommerce/inventory/list/inventory.component';
import { InventoryBrandsResolver, InventoryCategoriesResolver, InventoryProductsResolver, InventoryTagsResolver, InventoryVendorsResolver } from 'libs/web/modules/admin/apps/ecommerce/inventory/inventory.resolvers';

export const ecommerceRoutes: Route[] = [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'inventory'
    },
    {
        path     : 'inventory',
        component: InventoryComponent,
        children : [
            {
                path     : '',
                component: InventoryListComponent,
                resolve  : {
                    brands    : InventoryBrandsResolver,
                    categories: InventoryCategoriesResolver,
                    products  : InventoryProductsResolver,
                    tags      : InventoryTagsResolver,
                    vendors   : InventoryVendorsResolver
                }
            }
        ]
        /*children : [
            {
                path     : '',
                component: ContactsListComponent,
                resolve  : {
                    tasks    : ContactsResolver,
                    countries: ContactsCountriesResolver
                },
                children : [
                    {
                        path         : ':id',
                        component    : ContactsDetailsComponent,
                        resolve      : {
                            task     : ContactsContactResolver,
                            countries: ContactsCountriesResolver
                        },
                        canDeactivate: [CanDeactivateContactsDetails]
                    }
                ]
            }
        ]*/
    }
];
