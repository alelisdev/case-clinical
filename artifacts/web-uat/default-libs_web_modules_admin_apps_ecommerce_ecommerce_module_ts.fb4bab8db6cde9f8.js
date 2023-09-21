"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_modules_admin_apps_ecommerce_ecommerce_module_ts"],{

/***/ 283308:
/*!*******************************************************************!*\
  !*** ./libs/web/modules/admin/apps/ecommerce/ecommerce.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ECommerceModule": () => (/* binding */ ECommerceModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/paginator */ 498739);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/sort */ 796308);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/slide-toggle */ 690455);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var libs_web_modules_admin_apps_ecommerce_inventory_inventory_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! libs/web/modules/admin/apps/ecommerce/inventory/inventory.component */ 519582);
/* harmony import */ var libs_web_modules_admin_apps_ecommerce_inventory_list_inventory_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! libs/web/modules/admin/apps/ecommerce/inventory/list/inventory.component */ 257051);
/* harmony import */ var libs_web_modules_admin_apps_ecommerce_ecommerce_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/web/modules/admin/apps/ecommerce/ecommerce.routing */ 105557);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);




















class ECommerceModule {}
ECommerceModule.ɵfac = function ECommerceModule_Factory(t) {
  return new (t || ECommerceModule)();
};
ECommerceModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: ECommerceModule
});
ECommerceModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(libs_web_modules_admin_apps_ecommerce_ecommerce_routing__WEBPACK_IMPORTED_MODULE_2__.ecommerceRoutes), _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__.MatMenuModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__.MatPaginatorModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_10__.MatProgressBarModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatRippleModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSortModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelectModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_14__.MatSlideToggleModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__.MatTooltipModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_16__.SharedModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ECommerceModule, {
    declarations: [libs_web_modules_admin_apps_ecommerce_inventory_inventory_component__WEBPACK_IMPORTED_MODULE_17__.InventoryComponent, libs_web_modules_admin_apps_ecommerce_inventory_list_inventory_component__WEBPACK_IMPORTED_MODULE_18__.InventoryListComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__.MatMenuModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_9__.MatPaginatorModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_10__.MatProgressBarModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_11__.MatRippleModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_12__.MatSortModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelectModule, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_14__.MatSlideToggleModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__.MatTooltipModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_16__.SharedModule]
  });
})();

/***/ }),

/***/ 105557:
/*!********************************************************************!*\
  !*** ./libs/web/modules/admin/apps/ecommerce/ecommerce.routing.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ecommerceRoutes": () => (/* binding */ ecommerceRoutes)
/* harmony export */ });
/* harmony import */ var libs_web_modules_admin_apps_ecommerce_inventory_inventory_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! libs/web/modules/admin/apps/ecommerce/inventory/inventory.component */ 519582);
/* harmony import */ var libs_web_modules_admin_apps_ecommerce_inventory_list_inventory_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/ecommerce/inventory/list/inventory.component */ 257051);
/* harmony import */ var libs_web_modules_admin_apps_ecommerce_inventory_inventory_resolvers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! libs/web/modules/admin/apps/ecommerce/inventory/inventory.resolvers */ 422521);



const ecommerceRoutes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'inventory'
}, {
  path: 'inventory',
  component: libs_web_modules_admin_apps_ecommerce_inventory_inventory_component__WEBPACK_IMPORTED_MODULE_0__.InventoryComponent,
  children: [{
    path: '',
    component: libs_web_modules_admin_apps_ecommerce_inventory_list_inventory_component__WEBPACK_IMPORTED_MODULE_1__.InventoryListComponent,
    resolve: {
      brands: libs_web_modules_admin_apps_ecommerce_inventory_inventory_resolvers__WEBPACK_IMPORTED_MODULE_2__.InventoryBrandsResolver,
      categories: libs_web_modules_admin_apps_ecommerce_inventory_inventory_resolvers__WEBPACK_IMPORTED_MODULE_2__.InventoryCategoriesResolver,
      products: libs_web_modules_admin_apps_ecommerce_inventory_inventory_resolvers__WEBPACK_IMPORTED_MODULE_2__.InventoryProductsResolver,
      tags: libs_web_modules_admin_apps_ecommerce_inventory_inventory_resolvers__WEBPACK_IMPORTED_MODULE_2__.InventoryTagsResolver,
      vendors: libs_web_modules_admin_apps_ecommerce_inventory_inventory_resolvers__WEBPACK_IMPORTED_MODULE_2__.InventoryVendorsResolver
    }
  }]
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
}];

/***/ }),

/***/ 519582:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/ecommerce/inventory/inventory.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InventoryComponent": () => (/* binding */ InventoryComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);


class InventoryComponent {
  /**
   * Constructor
   */
  constructor() {}
}
InventoryComponent.ɵfac = function InventoryComponent_Factory(t) {
  return new (t || InventoryComponent)();
};
InventoryComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: InventoryComponent,
  selectors: [["inventory"]],
  decls: 1,
  vars: 0,
  template: function InventoryComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterOutlet],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 422521:
/*!********************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/ecommerce/inventory/inventory.resolvers.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InventoryBrandsResolver": () => (/* binding */ InventoryBrandsResolver),
/* harmony export */   "InventoryCategoriesResolver": () => (/* binding */ InventoryCategoriesResolver),
/* harmony export */   "InventoryProductResolver": () => (/* binding */ InventoryProductResolver),
/* harmony export */   "InventoryProductsResolver": () => (/* binding */ InventoryProductsResolver),
/* harmony export */   "InventoryTagsResolver": () => (/* binding */ InventoryTagsResolver),
/* harmony export */   "InventoryVendorsResolver": () => (/* binding */ InventoryVendorsResolver)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 670262);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var libs_web_modules_admin_apps_ecommerce_inventory_inventory_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! libs/web/modules/admin/apps/ecommerce/inventory/inventory.service */ 411423);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);






class InventoryBrandsResolver {
  /**
   * Constructor
   */
  constructor(_inventoryService) {
    this._inventoryService = _inventoryService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._inventoryService.getBrands();
  }
}
InventoryBrandsResolver.ɵfac = function InventoryBrandsResolver_Factory(t) {
  return new (t || InventoryBrandsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_ecommerce_inventory_inventory_service__WEBPACK_IMPORTED_MODULE_1__.InventoryService));
};
InventoryBrandsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: InventoryBrandsResolver,
  factory: InventoryBrandsResolver.ɵfac,
  providedIn: 'root'
});
class InventoryCategoriesResolver {
  /**
   * Constructor
   */
  constructor(_inventoryService) {
    this._inventoryService = _inventoryService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._inventoryService.getCategories();
  }
}
InventoryCategoriesResolver.ɵfac = function InventoryCategoriesResolver_Factory(t) {
  return new (t || InventoryCategoriesResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_ecommerce_inventory_inventory_service__WEBPACK_IMPORTED_MODULE_1__.InventoryService));
};
InventoryCategoriesResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: InventoryCategoriesResolver,
  factory: InventoryCategoriesResolver.ɵfac,
  providedIn: 'root'
});
class InventoryProductResolver {
  /**
   * Constructor
   */
  constructor(_inventoryService, _router) {
    this._inventoryService = _inventoryService;
    this._router = _router;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._inventoryService.getProductById(route.paramMap.get('id')).pipe(
    // Error here means the requested product is not available
    (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(error => {
      // Log the error
      console.error(error);
      // Get the parent url
      const parentUrl = state.url.split('/').slice(0, -1).join('/');
      // Navigate to there
      this._router.navigateByUrl(parentUrl);
      // Throw an error
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.throwError)(error);
    }));
  }
}
InventoryProductResolver.ɵfac = function InventoryProductResolver_Factory(t) {
  return new (t || InventoryProductResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_ecommerce_inventory_inventory_service__WEBPACK_IMPORTED_MODULE_1__.InventoryService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router));
};
InventoryProductResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: InventoryProductResolver,
  factory: InventoryProductResolver.ɵfac,
  providedIn: 'root'
});
class InventoryProductsResolver {
  /**
   * Constructor
   */
  constructor(_inventoryService) {
    this._inventoryService = _inventoryService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._inventoryService.getProducts();
  }
}
InventoryProductsResolver.ɵfac = function InventoryProductsResolver_Factory(t) {
  return new (t || InventoryProductsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_ecommerce_inventory_inventory_service__WEBPACK_IMPORTED_MODULE_1__.InventoryService));
};
InventoryProductsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: InventoryProductsResolver,
  factory: InventoryProductsResolver.ɵfac,
  providedIn: 'root'
});
class InventoryTagsResolver {
  /**
   * Constructor
   */
  constructor(_inventoryService) {
    this._inventoryService = _inventoryService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._inventoryService.getTags();
  }
}
InventoryTagsResolver.ɵfac = function InventoryTagsResolver_Factory(t) {
  return new (t || InventoryTagsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_ecommerce_inventory_inventory_service__WEBPACK_IMPORTED_MODULE_1__.InventoryService));
};
InventoryTagsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: InventoryTagsResolver,
  factory: InventoryTagsResolver.ɵfac,
  providedIn: 'root'
});
class InventoryVendorsResolver {
  /**
   * Constructor
   */
  constructor(_inventoryService) {
    this._inventoryService = _inventoryService;
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route, state) {
    return this._inventoryService.getVendors();
  }
}
InventoryVendorsResolver.ɵfac = function InventoryVendorsResolver_Factory(t) {
  return new (t || InventoryVendorsResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](libs_web_modules_admin_apps_ecommerce_inventory_inventory_service__WEBPACK_IMPORTED_MODULE_1__.InventoryService));
};
InventoryVendorsResolver.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: InventoryVendorsResolver,
  factory: InventoryVendorsResolver.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 411423:
/*!******************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/ecommerce/inventory/inventory.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InventoryService": () => (/* binding */ InventoryService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 80529);




class InventoryService {
  /**
   * Constructor
   */
  constructor(_httpClient) {
    this._httpClient = _httpClient;
    // Private
    this._brands = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._categories = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._pagination = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._product = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._products = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._tags = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._vendors = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Getter for brands
   */
  get brands$() {
    return this._brands.asObservable();
  }
  /**
   * Getter for categories
   */
  get categories$() {
    return this._categories.asObservable();
  }
  /**
   * Getter for pagination
   */
  get pagination$() {
    return this._pagination.asObservable();
  }
  /**
   * Getter for product
   */
  get product$() {
    return this._product.asObservable();
  }
  /**
   * Getter for products
   */
  get products$() {
    return this._products.asObservable();
  }
  /**
   * Getter for tags
   */
  get tags$() {
    return this._tags.asObservable();
  }
  /**
   * Getter for vendors
   */
  get vendors$() {
    return this._vendors.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get brands
   */
  getBrands() {
    return this._httpClient.get('api/apps/ecommerce/inventory/brands').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(brands => {
      this._brands.next(brands);
    }));
  }
  /**
   * Get categories
   */
  getCategories() {
    return this._httpClient.get('api/apps/ecommerce/inventory/categories').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(categories => {
      this._categories.next(categories);
    }));
  }
  /**
   * Get products
   *
   *
   * @param page
   * @param size
   * @param sort
   * @param order
   * @param search
   */
  getProducts(page = 0, size = 10, sort = 'name', order = 'asc', search = '') {
    return this._httpClient.get('api/apps/ecommerce/inventory/products', {
      params: {
        page: '' + page,
        size: '' + size,
        sort,
        order,
        search
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._pagination.next(response.pagination);
      this._products.next(response.products);
    }));
  }
  /**
   * Get product by id
   */
  getProductById(id) {
    return this._products.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(products => {
      // Find the product
      const product = products.find(item => item.id === id) || null;
      // Update the product
      this._product.next(product);
      // Return the product
      return product;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(product => {
      if (!product) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.throwError)('Could not found product with id of ' + id + '!');
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(product);
    }));
  }
  /**
   * Create product
   */
  createProduct() {
    return this.products$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(products => this._httpClient.post('api/apps/ecommerce/inventory/product', {}).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(newProduct => {
      // Update the products with the new product
      this._products.next([newProduct, ...products]);
      // Return the new product
      return newProduct;
    }))));
  }
  /**
   * Update product
   *
   * @param id
   * @param product
   */
  updateProduct(id, product) {
    return this.products$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(products => this._httpClient.patch('api/apps/ecommerce/inventory/product', {
      id,
      product
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(updatedProduct => {
      // Find the index of the updated product
      const index = products.findIndex(item => item.id === id);
      // Update the product
      products[index] = updatedProduct;
      // Update the products
      this._products.next(products);
      // Return the updated product
      return updatedProduct;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(updatedProduct => this.product$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(item => item && item.id === id), (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      // Update the product if it's selected
      this._product.next(updatedProduct);
      // Return the updated product
      return updatedProduct;
    }))))));
  }
  /**
   * Delete the product
   *
   * @param id
   */
  deleteProduct(id) {
    return this.products$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(products => this._httpClient.delete('api/apps/ecommerce/inventory/product', {
      params: {
        id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(isDeleted => {
      // Find the index of the deleted product
      const index = products.findIndex(item => item.id === id);
      // Delete the product
      products.splice(index, 1);
      // Update the products
      this._products.next(products);
      // Return the deleted status
      return isDeleted;
    }))));
  }
  /**
   * Get tags
   */
  getTags() {
    return this._httpClient.get('api/apps/ecommerce/inventory/tags').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(tags => {
      this._tags.next(tags);
    }));
  }
  /**
   * Create tag
   *
   * @param tag
   */
  createTag(tag) {
    return this.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(tags => this._httpClient.post('api/apps/ecommerce/inventory/tag', {
      tag
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(newTag => {
      // Update the tags with the new tag
      this._tags.next([...tags, newTag]);
      // Return new tag from observable
      return newTag;
    }))));
  }
  /**
   * Update the tag
   *
   * @param id
   * @param tag
   */
  updateTag(id, tag) {
    return this.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(tags => this._httpClient.patch('api/apps/ecommerce/inventory/tag', {
      id,
      tag
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(updatedTag => {
      // Find the index of the updated tag
      const index = tags.findIndex(item => item.id === id);
      // Update the tag
      tags[index] = updatedTag;
      // Update the tags
      this._tags.next(tags);
      // Return the updated tag
      return updatedTag;
    }))));
  }
  /**
   * Delete the tag
   *
   * @param id
   */
  deleteTag(id) {
    return this.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(tags => this._httpClient.delete('api/apps/ecommerce/inventory/tag', {
      params: {
        id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(isDeleted => {
      // Find the index of the deleted tag
      const index = tags.findIndex(item => item.id === id);
      // Delete the tag
      tags.splice(index, 1);
      // Update the tags
      this._tags.next(tags);
      // Return the deleted status
      return isDeleted;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(isDeleted => isDeleted), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.switchMap)(isDeleted => this.products$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.map)(products => {
      // Iterate through the contacts
      products.forEach(product => {
        const tagIndex = product.tags.findIndex(tag => tag === id);
        // If the contact has the tag, remove it
        if (tagIndex > -1) {
          product.tags.splice(tagIndex, 1);
        }
      });
      // Return the deleted status
      return isDeleted;
    }))))));
  }
  /**
   * Get vendors
   */
  getVendors() {
    return this._httpClient.get('api/apps/ecommerce/inventory/vendors').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(vendors => {
      this._vendors.next(vendors);
    }));
  }
}
InventoryService.ɵfac = function InventoryService_Factory(t) {
  return new (t || InventoryService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient));
};
InventoryService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: InventoryService,
  factory: InventoryService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 257051:
/*!*************************************************************************************!*\
  !*** ./libs/web/modules/admin/apps/ecommerce/inventory/list/inventory.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InventoryListComponent": () => (/* binding */ InventoryListComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/paginator */ 498739);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sort */ 796308);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 178372);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 56451);
/* harmony import */ var _fuse_animations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @fuse/animations */ 662235);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/services/confirmation */ 50253);
/* harmony import */ var libs_web_modules_admin_apps_ecommerce_inventory_inventory_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! libs/web/modules/admin/apps/ecommerce/inventory/inventory.service */ 411423);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/core */ 447873);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/select */ 584385);
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/slide-toggle */ 690455);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 836895);
























function InventoryListComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-progress-bar", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", "indeterminate");
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_img_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 43);
  }
  if (rf & 2) {
    const product_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("alt", "Product thumbnail image")("src", product_r11.thumbnail, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " NO THUMB ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_div_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_ng_container_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check");
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:x");
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_ng_container_26_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
const _c0 = function (a0) {
  return {
    $implicit: a0
  };
};
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_ng_container_26_ng_container_1_Template, 1, 0, "ng-container", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const product_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r2)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c0, product_r11));
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 28)(2, "div", 29)(3, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_img_4_Template, 1, 2, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_div_5_Template, 2, 0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](12, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 35)(14, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_div_16_Template, 2, 0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_div_17_Template, 2, 0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_div_18_Template, 2, 0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_ng_container_20_Template, 2, 1, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_ng_container_21_Template, 2, 1, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div")(23, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_Template_button_click_23_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r24);
      const product_r11 = restoredCtx.$implicit;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r23.toggleDetails(product_r11.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_ng_container_26_Template, 2, 4, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const product_r11 = ctx.$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", product_r11.thumbnail);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !product_r11.thumbnail);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", product_r11.sku, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", product_r11.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind4"](12, 13, product_r11.price, "USD", "symbol", "1.2-2"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](product_r11.stock);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", product_r11.stock < 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", product_r11.stock >= 20 && product_r11.stock < 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", product_r11.stock >= 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", product_r11.active);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !product_r11.active);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", (ctx_r10.selectedProduct == null ? null : ctx_r10.selectedProduct.id) === product_r11.id ? "heroicons_solid:chevron-up" : "heroicons_solid:chevron-down");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r10.selectedProduct == null ? null : ctx_r10.selectedProduct.id) === product_r11.id);
  }
}
function InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_ng_container_1_Template, 27, 18, "ng-container", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const products_r9 = ctx.ngIf;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", products_r9)("ngForTrackBy", ctx_r8.trackByFn);
  }
}
const _c1 = function (a0) {
  return {
    "pointer-events-none": a0
  };
};
const _c2 = function () {
  return [5, 10, 25, 100];
};
function InventoryListComponent_ng_container_15_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 19)(2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " SKU ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Price ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, " Stock ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, " Active ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Details");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, InventoryListComponent_ng_container_15_ng_container_1_ng_container_16_Template, 2, 2, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](17, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "mat-paginator", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-sort-header", "sku");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-sort-header", "name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-sort-header", "price");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-sort-header", "stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mat-sort-header", "active");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](17, 12, ctx_r7.products$));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](14, _c1, ctx_r7.isLoading))("length", ctx_r7.pagination.length)("pageIndex", ctx_r7.pagination.page)("pageSize", ctx_r7.pagination.size)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](16, _c2))("showFirstLastButtons", true);
  }
}
function InventoryListComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, InventoryListComponent_ng_container_15_ng_container_1_Template, 19, 17, "ng-container", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const products_r6 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", products_r6.length > 0)("ngIfElse", _r4);
  }
}
function InventoryListComponent_ng_template_17_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r26.selectedProductForm.get("images").value[ctx_r26.selectedProductForm.get("currentImageIndex").value], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function InventoryListComponent_ng_template_17_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "NO IMAGE");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function InventoryListComponent_ng_template_17_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 97)(1, "button", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InventoryListComponent_ng_template_17_div_10_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r41);
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r40.cycleImages(false));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InventoryListComponent_ng_template_17_div_10_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r41);
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r42.cycleImages(true));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-left");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](" ", ctx_r29.selectedProductForm.get("currentImageIndex").value + 1, " of ", ctx_r29.selectedProductForm.get("images").value.length, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:arrow-narrow-right");
  }
}
function InventoryListComponent_ng_template_17_ng_container_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-option", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const category_r43 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", category_r43.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", category_r43.name, " ");
  }
}
function InventoryListComponent_ng_template_17_ng_container_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-option", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const brand_r44 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", brand_r44.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", brand_r44.name, " ");
  }
}
function InventoryListComponent_ng_template_17_ng_container_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-option", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const vendor_r45 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", vendor_r45.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", vendor_r45.name, " ");
  }
}
function InventoryListComponent_ng_template_17_mat_icon_97_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 42);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:pencil-alt");
  }
}
function InventoryListComponent_ng_template_17_mat_icon_98_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-icon", 42);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:check");
  }
}
function InventoryListComponent_ng_template_17_ng_container_100_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-checkbox", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function InventoryListComponent_ng_template_17_ng_container_100_ng_container_1_Template_mat_checkbox_change_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r49);
      const tag_r47 = restoredCtx.$implicit;
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r48.toggleProductTag(tag_r47, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tag_r47 = ctx.$implicit;
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary")("checked", ctx_r46.selectedProduct.tags.includes(tag_r47.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", tag_r47.title, " ");
  }
}
function InventoryListComponent_ng_template_17_ng_container_100_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, InventoryListComponent_ng_template_17_ng_container_100_ng_container_1_Template, 3, 3, "ng-container", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r36.filteredTags)("ngForTrackBy", ctx_r36.trackByFn);
  }
}
function InventoryListComponent_ng_template_17_ng_container_101_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-form-field", 103)(2, "input", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function InventoryListComponent_ng_template_17_ng_container_101_ng_container_2_Template_input_input_2_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r53);
      const tag_r51 = restoredCtx.$implicit;
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r52.updateTagTitle(tag_r51, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InventoryListComponent_ng_template_17_ng_container_101_ng_container_2_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r53);
      const tag_r51 = restoredCtx.$implicit;
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r54.deleteTag(tag_r51));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const tag_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", tag_r51.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:trash");
  }
}
function InventoryListComponent_ng_template_17_ng_container_101_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, InventoryListComponent_ng_template_17_ng_container_101_ng_container_2_Template, 5, 2, "ng-container", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r37.filteredTags)("ngForTrackBy", ctx_r37.trackByFn);
  }
}
function InventoryListComponent_ng_template_17_div_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InventoryListComponent_ng_template_17_div_102_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r56);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](95);
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      ctx_r55.createTag(_r33.value);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](_r33.value = "");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Create \"");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "b");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\"");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](95);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:plus-circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_r33.value);
  }
}
function InventoryListComponent_ng_template_17_div_107_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Product updated");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:check");
  }
}
function InventoryListComponent_ng_template_17_div_107_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "An error occurred, try again!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
  }
}
function InventoryListComponent_ng_template_17_div_107_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, InventoryListComponent_ng_template_17_div_107_ng_container_1_Template, 4, 1, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, InventoryListComponent_ng_template_17_div_107_ng_container_2_Template, 4, 1, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r39.flashMessage === "success");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r39.flashMessage === "error");
  }
}
function InventoryListComponent_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 54)(1, "div", 55)(2, "form", 56)(3, "div", 57)(4, "div", 58)(5, "div", 59)(6, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, InventoryListComponent_ng_template_17_ng_container_7_Template, 2, 1, "ng-container", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, InventoryListComponent_ng_template_17_ng_template_8_Template, 2, 0, "ng-template", null, 61, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, InventoryListComponent_ng_template_17_div_10_Template, 7, 4, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 63)(12, "span", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Product status");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-slide-toggle", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 66)(17, "div", 67)(18, "mat-form-field", 68)(19, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 70)(23, "mat-form-field", 71)(24, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "SKU");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "mat-form-field", 72)(28, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "Barcode");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](30, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "div", 70)(32, "mat-form-field", 71)(33, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Category");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "mat-select", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](36, InventoryListComponent_ng_template_17_ng_container_36_Template, 3, 2, "ng-container", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "mat-form-field", 75)(38, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "Brand");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "mat-select", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](41, InventoryListComponent_ng_template_17_ng_container_41_Template, 3, 2, "ng-container", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "mat-form-field", 76)(43, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](44, "Vendor");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "mat-select", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](46, InventoryListComponent_ng_template_17_ng_container_46_Template, 3, 2, "ng-container", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 70)(48, "mat-form-field", 71)(49, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](51, "input", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "mat-form-field", 76)(53, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "Reserved");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](55, "input", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 78)(57, "mat-form-field", 68)(58, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Cost");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](62, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](63, "mat-form-field", 68)(64, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Base Price");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "span", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "mat-form-field", 68)(70, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "Tax");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](74, "input", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "mat-form-field", 68)(76, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "Price");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "$");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](80, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "div", 78)(82, "mat-form-field", 68)(83, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "Weight");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](86, "lbs.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](87, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "Tags");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "div", 82)(91, "div", 83)(92, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](93, "mat-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "input", 85, 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function InventoryListComponent_ng_template_17_Template_input_input_94_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r60);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r59.filterTags($event));
    })("keydown", function InventoryListComponent_ng_template_17_Template_input_keydown_94_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r60);
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r61.filterTagsInputKeyDown($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "button", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InventoryListComponent_ng_template_17_Template_button_click_96_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r60);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r62.toggleTagsEditMode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](97, InventoryListComponent_ng_template_17_mat_icon_97_Template, 1, 1, "mat-icon", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](98, InventoryListComponent_ng_template_17_mat_icon_98_Template, 1, 1, "mat-icon", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](100, InventoryListComponent_ng_template_17_ng_container_100_Template, 2, 2, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](101, InventoryListComponent_ng_template_17_ng_container_101_Template, 3, 2, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](102, InventoryListComponent_ng_template_17_div_102_Template, 7, 2, "div", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "div", 91)(104, "button", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InventoryListComponent_ng_template_17_Template_button_click_104_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r60);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r63.deleteSelectedProduct());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](105, " Delete ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](107, InventoryListComponent_ng_template_17_div_107_Template, 3, 2, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "button", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InventoryListComponent_ng_template_17_Template_button_click_108_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r60);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r64.updateSelectedProduct());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](109, " Update ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](9);
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](95);
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r3.selectedProductForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.selectedProductForm.get("images").value.length)("ngIfElse", _r27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.selectedProductForm.get("images").value.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "active")("color", "primary");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r3.selectedProductForm.get("active").value === true ? "Active" : "Disabled", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "name");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "sku");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "barcode");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "category");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.categories);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "brand");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.brands);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "vendor");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.vendors);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "reserved");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "cost");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "basePrice");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "taxPercent");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "price");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControlName", "weight");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:search");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("maxLength", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r3.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r3.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.tagsEditMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.shouldShowCreateTagButton(_r33.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "warn");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r3.flashMessage);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
  }
}
function InventoryListComponent_ng_template_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "There are no products!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
class InventoryListComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _fuseConfirmationService, _formBuilder, _inventoryService) {
    this._changeDetectorRef = _changeDetectorRef;
    this._fuseConfirmationService = _fuseConfirmationService;
    this._formBuilder = _formBuilder;
    this._inventoryService = _inventoryService;
    this.flashMessage = null;
    this.isLoading = false;
    this.searchInputControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControl();
    this.selectedProduct = null;
    this.tagsEditMode = false;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Create the selected product form
    this.selectedProductForm = this._formBuilder.group({
      id: [''],
      category: [''],
      name: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__.Validators.required]],
      description: [''],
      tags: [[]],
      sku: [''],
      barcode: [''],
      brand: [''],
      vendor: [''],
      stock: [''],
      reserved: [''],
      cost: [''],
      basePrice: [''],
      taxPercent: [''],
      price: [''],
      weight: [''],
      thumbnail: [''],
      images: [[]],
      currentImageIndex: [0],
      active: [false]
    });
    // Get the brands
    this._inventoryService.brands$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(brands => {
      // Update the brands
      this.brands = brands;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the categories
    this._inventoryService.categories$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(categories => {
      // Update the categories
      this.categories = categories;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the pagination
    this._inventoryService.pagination$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(pagination => {
      // Update the pagination
      this.pagination = pagination;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the products
    this.products$ = this._inventoryService.products$;
    // Get the tags
    this._inventoryService.tags$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(tags => {
      // Update the tags
      this.tags = tags;
      this.filteredTags = tags;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Get the vendors
    this._inventoryService.vendors$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(vendors => {
      // Update the vendors
      this.vendors = vendors;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.debounceTime)(300), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(query => {
      this.closeDetails();
      this.isLoading = true;
      return this._inventoryService.getProducts(0, 10, 'name', 'asc', query);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => {
      this.isLoading = false;
    })).subscribe();
  }
  /**
   * After view init
   */
  ngAfterViewInit() {
    if (this._sort && this._paginator) {
      // Set the initial sort
      this._sort.sort({
        id: 'name',
        start: 'asc',
        disableClear: true
      });
      // Mark for check
      this._changeDetectorRef.markForCheck();
      // If the user changes the sort order...
      this._sort.sortChange.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._unsubscribeAll)).subscribe(() => {
        // Reset back to the first page
        this._paginator.pageIndex = 0;
        // Close the details
        this.closeDetails();
      });
      // Get products if sort or page changes
      (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.merge)(this._sort.sortChange, this._paginator.page).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMap)(() => {
        this.closeDetails();
        this.isLoading = true;
        return this._inventoryService.getProducts(this._paginator.pageIndex, this._paginator.pageSize, this._sort.active, this._sort.direction);
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(() => {
        this.isLoading = false;
      })).subscribe();
    }
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Toggle product details
   *
   * @param productId
   */
  toggleDetails(productId) {
    // If the product is already selected...
    if (this.selectedProduct && this.selectedProduct.id === productId) {
      // Close the details
      this.closeDetails();
      return;
    }
    // Get the product by id
    this._inventoryService.getProductById(productId).subscribe(product => {
      // Set the selected product
      this.selectedProduct = product;
      // Fill the form
      this.selectedProductForm.patchValue(product);
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * Close the details
   */
  closeDetails() {
    this.selectedProduct = null;
  }
  /**
   * Cycle through images of selected product
   */
  cycleImages(forward = true) {
    // Get the image count and current image index
    const count = this.selectedProductForm.get('images').value.length;
    const currentIndex = this.selectedProductForm.get('currentImageIndex').value;
    // Calculate the next and previous index
    const nextIndex = currentIndex + 1 === count ? 0 : currentIndex + 1;
    const prevIndex = currentIndex - 1 < 0 ? count - 1 : currentIndex - 1;
    // If cycling forward...
    if (forward) {
      this.selectedProductForm.get('currentImageIndex').setValue(nextIndex);
    }
    // If cycling backwards...
    else {
      this.selectedProductForm.get('currentImageIndex').setValue(prevIndex);
    }
  }
  /**
   * Toggle the tags edit mode
   */
  toggleTagsEditMode() {
    this.tagsEditMode = !this.tagsEditMode;
  }
  /**
   * Filter tags
   *
   * @param event
   */
  filterTags(event) {
    // Get the value
    const value = event.target.value.toLowerCase();
    // Filter the tags
    this.filteredTags = this.tags.filter(tag => tag.title.toLowerCase().includes(value));
  }
  /**
   * Filter tags input key down event
   *
   * @param event
   */
  filterTagsInputKeyDown(event) {
    // Return if the pressed key is not 'Enter'
    if (event.key !== 'Enter') {
      return;
    }
    // If there is no tag available...
    if (this.filteredTags.length === 0) {
      // Create the tag
      this.createTag(event.target.value);
      // Clear the input
      event.target.value = '';
      // Return
      return;
    }
    // If there is a tag...
    const tag = this.filteredTags[0];
    const isTagApplied = this.selectedProduct.tags.find(id => id === tag.id);
    // If the found tag is already applied to the product...
    if (isTagApplied) {
      // Remove the tag from the product
      this.removeTagFromProduct(tag);
    } else {
      // Otherwise add the tag to the product
      this.addTagToProduct(tag);
    }
  }
  /**
   * Create a new tag
   *
   * @param title
   */
  createTag(title) {
    const tag = {
      title
    };
    // Create tag on the server
    this._inventoryService.createTag(tag).subscribe(response => {
      // Add the tag to the product
      this.addTagToProduct(response);
    });
  }
  /**
   * Update the tag title
   *
   * @param tag
   * @param event
   */
  updateTagTitle(tag, event) {
    // Update the title on the tag
    tag.title = event.target.value;
    // Update the tag on the server
    this._inventoryService.updateTag(tag.id, tag).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.debounceTime)(300)).subscribe();
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Delete the tag
   *
   * @param tag
   */
  deleteTag(tag) {
    // Delete the tag from the server
    this._inventoryService.deleteTag(tag.id).subscribe();
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Add tag to the product
   *
   * @param tag
   */
  addTagToProduct(tag) {
    // Add the tag
    this.selectedProduct.tags.unshift(tag.id);
    // Update the selected product form
    this.selectedProductForm.get('tags').patchValue(this.selectedProduct.tags);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Remove tag from the product
   *
   * @param tag
   */
  removeTagFromProduct(tag) {
    // Remove the tag
    this.selectedProduct.tags.splice(this.selectedProduct.tags.findIndex(item => item === tag.id), 1);
    // Update the selected product form
    this.selectedProductForm.get('tags').patchValue(this.selectedProduct.tags);
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Toggle product tag
   *
   * @param tag
   * @param change
   */
  toggleProductTag(tag, change) {
    if (change.checked) {
      this.addTagToProduct(tag);
    } else {
      this.removeTagFromProduct(tag);
    }
  }
  /**
   * Should the create tag button be visible
   *
   * @param inputValue
   */
  shouldShowCreateTagButton(inputValue) {
    return !!!(inputValue === '' || this.tags.findIndex(tag => tag.title.toLowerCase() === inputValue.toLowerCase()) > -1);
  }
  /**
   * Create product
   */
  createProduct() {
    // Create the product
    this._inventoryService.createProduct().subscribe(newProduct => {
      // Go to new product
      this.selectedProduct = newProduct;
      // Fill the form
      this.selectedProductForm.patchValue(newProduct);
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  /**
   * Update the selected product using the form data
   */
  updateSelectedProduct() {
    // Get the product object
    const product = this.selectedProductForm.getRawValue();
    // Remove the currentImageIndex field
    delete product.currentImageIndex;
    // Update the product on the server
    this._inventoryService.updateProduct(product.id, product).subscribe(() => {
      // Show a success message
      this.showFlashMessage('success');
    });
  }
  /**
   * Delete the selected product using the form data
   */
  deleteSelectedProduct() {
    // Open the confirmation dialog
    const confirmation = this._fuseConfirmationService.open({
      title: 'Delete product',
      message: 'Are you sure you want to remove this product? This action cannot be undone!',
      actions: {
        confirm: {
          label: 'Delete'
        }
      }
    });
    // Subscribe to the confirmation dialog closed action
    confirmation.afterClosed().subscribe(result => {
      // If the confirm button pressed...
      if (result === 'confirmed') {
        // Get the product object
        const product = this.selectedProductForm.getRawValue();
        // Delete the product on the server
        this._inventoryService.deleteProduct(product.id).subscribe(() => {
          // Close the details
          this.closeDetails();
        });
      }
    });
  }
  /**
   * Show flash message
   */
  showFlashMessage(type) {
    // Show the message
    this.flashMessage = type;
    // Mark for check
    this._changeDetectorRef.markForCheck();
    // Hide it after 3 seconds
    setTimeout(() => {
      this.flashMessage = null;
      // Mark for check
      this._changeDetectorRef.markForCheck();
    }, 3000);
  }
  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
}
InventoryListComponent.ɵfac = function InventoryListComponent_Factory(t) {
  return new (t || InventoryListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_fuse_services_confirmation__WEBPACK_IMPORTED_MODULE_8__.FuseConfirmationService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](libs_web_modules_admin_apps_ecommerce_inventory_inventory_service__WEBPACK_IMPORTED_MODULE_9__.InventoryService));
};
InventoryListComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: InventoryListComponent,
  selectors: [["inventory-list"]],
  viewQuery: function InventoryListComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_10__.MatPaginator, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_11__.MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._paginator = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._sort = _t.first);
    }
  },
  decls: 21,
  vars: 10,
  consts: [[1, "sm:absolute", "sm:inset-0", "flex", "flex-col", "flex-auto", "min-w-0", "sm:overflow-hidden", "bg-card", "dark:bg-transparent"], [1, "relative", "flex", "flex-col", "sm:flex-row", "flex-0", "sm:items-center", "sm:justify-between", "py-8", "px-6", "md:px-8", "border-b"], ["class", "absolute inset-x-0 bottom-0", 4, "ngIf"], [1, "text-4xl", "font-extrabold", "tracking-tight"], [1, "flex", "shrink-0", "items-center", "mt-6", "sm:mt-0", "sm:ml-4"], [1, "fuse-mat-dense", "fuse-mat-no-subscript", "fuse-mat-rounded", "min-w-64"], ["matPrefix", "", 1, "icon-size-5", 3, "svgIcon"], ["matInput", "", 3, "formControl", "autocomplete", "placeholder"], ["mat-flat-button", "", 1, "ml-4", 3, "color", "click"], [3, "svgIcon"], [1, "ml-2", "mr-1"], [1, "flex", "flex-auto", "overflow-hidden"], [1, "flex", "flex-col", "flex-auto", "sm:mb-18", "overflow-hidden", "sm:overflow-y-auto"], [4, "ngIf"], ["rowDetailsTemplate", ""], ["noProducts", ""], [1, "absolute", "inset-x-0", "bottom-0"], [3, "mode"], [4, "ngIf", "ngIfElse"], [1, "grid"], ["matSort", "", "matSortDisableClear", "", 1, "inventory-grid", "z-10", "sticky", "top-0", "grid", "gap-4", "py-4", "px-6", "md:px-8", "shadow", "text-md", "font-semibold", "text-secondary", "bg-gray-50", "dark:bg-black", "dark:bg-opacity-5"], [1, "hidden", "md:block", 3, "mat-sort-header"], [3, "mat-sort-header"], [1, "hidden", "sm:block", 3, "mat-sort-header"], [1, "hidden", "lg:block", 3, "mat-sort-header"], [1, "hidden", "sm:block"], [1, "sm:absolute", "sm:inset-x-0", "sm:bottom-0", "border-b", "sm:border-t", "sm:border-b-0", "z-10", "bg-gray-50", "dark:bg-transparent", 3, "ngClass", "length", "pageIndex", "pageSize", "pageSizeOptions", "showFirstLastButtons"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "inventory-grid", "grid", "items-center", "gap-4", "py-3", "px-6", "md:px-8", "border-b"], [1, "flex", "items-center"], [1, "relative", "flex", "flex-0", "items-center", "justify-center", "w-12", "h-12", "mr-6", "rounded", "overflow-hidden", "border"], ["class", "w-8", 3, "alt", "src", 4, "ngIf"], ["class", "flex items-center justify-center w-full h-full text-xs font-semibold leading-none text-center uppercase", 4, "ngIf"], [1, "hidden", "md:block", "truncate"], [1, "truncate"], [1, "hidden", "lg:flex", "items-center"], [1, "min-w-4"], ["class", "flex items-end ml-2 w-1 h-4 bg-red-200 rounded overflow-hidden", 4, "ngIf"], ["class", "flex items-end ml-2 w-1 h-4 bg-orange-200 rounded overflow-hidden", 4, "ngIf"], ["class", "flex items-end ml-2 w-1 h-4 bg-green-100 rounded overflow-hidden", 4, "ngIf"], [1, "hidden", "lg:block"], ["mat-stroked-button", "", 1, "min-w-10", "min-h-7", "h-7", "px-2", "leading-6", 3, "click"], [1, "icon-size-5", 3, "svgIcon"], [1, "w-8", 3, "alt", "src"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "text-xs", "font-semibold", "leading-none", "text-center", "uppercase"], [1, "flex", "items-end", "ml-2", "w-1", "h-4", "bg-red-200", "rounded", "overflow-hidden"], [1, "flex", "w-full", "h-1/3", "bg-red-600"], [1, "flex", "items-end", "ml-2", "w-1", "h-4", "bg-orange-200", "rounded", "overflow-hidden"], [1, "flex", "w-full", "h-2/4", "bg-orange-400"], [1, "flex", "items-end", "ml-2", "w-1", "h-4", "bg-green-100", "rounded", "overflow-hidden"], [1, "flex", "w-full", "h-full", "bg-green-400"], [1, "text-green-400", "icon-size-5", 3, "svgIcon"], [1, "text-gray-400", "icon-size-5", 3, "svgIcon"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "shadow-lg", "overflow-hidden"], [1, "flex", "border-b"], [1, "flex", "flex-col", "w-full", 3, "formGroup"], [1, "flex", "flex-col", "sm:flex-row", "p-8"], [1, "flex", "flex-col", "items-center", "sm:items-start", "mb-8", "sm:mb-0"], [1, "flex", "flex-col", "items-center"], [1, "w-32", "h-44", "border", "rounded", "overflow-hidden"], ["noImage", ""], ["class", "flex items-center mt-2 whitespace-nowrap", 4, "ngIf"], [1, "flex", "flex-col", "mt-8"], [1, "font-semibold", "mb-2"], [3, "formControlName", "color"], [1, "flex", "flex-auto", "flex-wrap"], [1, "flex", "flex-col", "w-full", "lg:w-2/4", "sm:pl-8"], [1, "w-full"], ["matInput", "", 3, "formControlName"], [1, "flex"], [1, "w-1/3", "pr-2"], [1, "w-2/3", "pl-2"], [3, "formControlName"], [4, "ngFor", "ngForOf"], [1, "w-1/3", "px-2"], [1, "w-1/3", "pl-2"], ["type", "number", "matInput", "", 3, "formControlName"], [1, "flex", "flex-col", "w-full", "lg:w-1/4", "sm:pl-8"], ["matPrefix", ""], ["matSuffix", ""], [1, "mb-px", "font-medium", "leading-tight"], [1, "mt-1.5", "rounded-md", "border", "border-gray-300", "dark:border-gray-500", "shadow-sm", "overflow-hidden"], [1, "flex", "items-center", "-my-px", "py-2", "px-3"], [1, "flex", "items-center", "flex-auto", "min-w-0"], ["type", "text", "placeholder", "Enter tag name", 1, "min-w-0", "ml-2", "py-1", "border-0", 3, "maxLength", "input", "keydown"], ["newTagInput", ""], ["mat-icon-button", "", 1, "ml-3", "w-8", "h-8", "min-h-8", 3, "click"], ["class", "icon-size-5", 3, "svgIcon", 4, "ngIf"], [1, "h-44", "leading-none", "overflow-y-auto", "border-t", "border-gray-300", "dark:border-gray-500"], ["class", "flex items-center h-10 min-h-10 -ml-0.5 pl-4 pr-3 leading-none cursor-pointer border-t hover:bg-gray-50 dark:hover:bg-hover", "matRipple", "", 3, "click", 4, "ngIf"], [1, "flex", "items-center", "justify-between", "w-full", "border-t", "px-8", "py-4"], ["mat-button", "", 1, "-ml-4", 3, "color", "click"], ["class", "flex items-center mr-4", 4, "ngIf"], ["mat-flat-button", "", 3, "color", "click"], [1, "w-full", "h-full", "object-cover", 3, "src"], [1, "flex", "items-center", "min-h-20", "text-lg", "font-semibold"], [1, "flex", "items-center", "mt-2", "whitespace-nowrap"], ["mat-icon-button", "", 3, "click"], [1, "font-sm", "mx-2"], [3, "value"], [1, "flex", "items-center", "h-10", "min-h-10", "px-4", 3, "color", "checked", "change"], [1, "p-4", "space-y-2"], [1, "fuse-mat-dense", "fuse-mat-no-subscript", "w-full"], ["matInput", "", 3, "value", "input"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], ["matRipple", "", 1, "flex", "items-center", "h-10", "min-h-10", "-ml-0.5", "pl-4", "pr-3", "leading-none", "cursor-pointer", "border-t", "hover:bg-gray-50", "dark:hover:bg-hover", 3, "click"], [1, "mr-2", "icon-size-5", 3, "svgIcon"], [1, "break-all"], [1, "flex", "items-center", "mr-4"], [1, "text-green-500", 3, "svgIcon"], [1, "ml-2"], [1, "text-red-500", 3, "svgIcon"], [1, "p-8", "sm:p-16", "border-t", "text-4xl", "font-semibold", "tracking-tight", "text-center"]],
  template: function InventoryListComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, InventoryListComponent_div_2_Template, 2, 1, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Inventory");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4)(6, "mat-form-field", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "mat-icon", 6)(8, "input", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function InventoryListComponent_Template_button_click_9_listener() {
        return ctx.createProduct();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "mat-icon", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Add");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11)(14, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, InventoryListComponent_ng_container_15_Template, 2, 2, "ng-container", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](16, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, InventoryListComponent_ng_template_17_Template, 110, 33, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, InventoryListComponent_ng_template_19_Template, 2, 0, "ng-template", null, 15, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isLoading);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:search");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formControl", ctx.searchInputControl)("autocomplete", "off")("placeholder", "Search products");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](16, 8, ctx.products$));
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatIconButton, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_13__.MatCheckbox, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatSuffix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInput, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_10__.MatPaginator, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_17__.MatProgressBar, _angular_material_core__WEBPACK_IMPORTED_MODULE_18__.MatRipple, _angular_material_sort__WEBPACK_IMPORTED_MODULE_11__.MatSort, _angular_material_sort__WEBPACK_IMPORTED_MODULE_11__.MatSortHeader, _angular_material_select__WEBPACK_IMPORTED_MODULE_19__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_18__.MatOption, _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_20__.MatSlideToggle, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgTemplateOutlet, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_1__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_21__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_21__.CurrencyPipe],
  styles: [".inventory-grid {\n  grid-template-columns: 48px auto 40px;\n}\n@media (min-width: 600px) {\n  .inventory-grid {\n    grid-template-columns: 48px auto 112px 72px;\n  }\n}\n@media (min-width: 960px) {\n  .inventory-grid {\n    grid-template-columns: 48px 112px auto 112px 72px;\n  }\n}\n@media (min-width: 1280px) {\n  .inventory-grid {\n    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;\n  }\n}"],
  encapsulation: 2,
  data: {
    animation: _fuse_animations__WEBPACK_IMPORTED_MODULE_22__.fuseAnimations
  },
  changeDetection: 0
});

/***/ })

}]);