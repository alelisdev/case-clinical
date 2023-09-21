"use strict";
(self["webpackChunkweb"] = self["webpackChunkweb"] || []).push([["default-libs_web_chat_feature_src_index_ts"],{

/***/ 140894:
/*!********************************************!*\
  !*** ./libs/web/chat/feature/src/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatModule": () => (/* reexport safe */ _lib_chat_module__WEBPACK_IMPORTED_MODULE_0__.ChatModule)
/* harmony export */ });
/* harmony import */ var _lib_chat_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/chat.module */ 904345);


/***/ }),

/***/ 164955:
/*!*********************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/chat.component.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatComponent": () => (/* binding */ ChatComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _chat_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat.store */ 327566);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 836895);








function ChatComponent_div_0_mat_progress_bar_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 4);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", "indeterminate");
  }
}
function ChatComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ChatComponent_div_0_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", vm_r1.loading);
  }
}
class ChatComponent {
  /**
   * Constructor
   */
  constructor(store, route) {
    this.store = store;
    this.route = route;
    this.vm$ = this.store.vm$;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  ngOnInit() {
    this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(params => {
      // console.log("params", params)
      if (params['legalCaseId']) {
        this.store.setInsideLegalCase(true);
      } else {
        this.store.setInsideLegalCase(false);
      }
    });
    // this.store.matrixLogin().subscribe()
    // this.store.startClient()
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    // this.store.stopClient()
  }
}

ChatComponent.ɵfac = function ChatComponent_Factory(t) {
  return new (t || ChatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_store__WEBPACK_IMPORTED_MODULE_3__.ChatStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute));
};
ChatComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ChatComponent,
  selectors: [["chat"]],
  decls: 2,
  vars: 3,
  consts: [["class", "absolute inset-0 flex flex-col min-w-0 overflow-hidden", 4, "ngIf"], [1, "absolute", "inset-0", "flex", "flex-col", "min-w-0", "overflow-hidden"], [1, "flex", "flex-auto", "overflow-hidden"], ["class", "absolute inset-x-0 bottom-0 h-0.5", 3, "mode", 4, "ngIf"], [1, "absolute", "inset-x-0", "bottom-0", "h-0.5", 3, "mode"]],
  template: function ChatComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ChatComponent_div_0_Template, 4, 1, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterOutlet, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_5__.MatProgressBar, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 904345:
/*!******************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/chat.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatModule": () => (/* binding */ ChatModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! libs/shared/shared.module */ 423387);
/* harmony import */ var _chat_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./chat.component */ 164955);
/* harmony import */ var _chat_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chat.routing */ 193854);
/* harmony import */ var _chats_chats_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./chats/chats.component */ 157971);
/* harmony import */ var _contact_info_contact_info_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./contact-info/contact-info.component */ 471577);
/* harmony import */ var _conversation_conversation_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./conversation/conversation.component */ 732980);
/* harmony import */ var _new_chat_new_chat_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./new-chat/new-chat.component */ 650516);
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./profile/profile.component */ 290414);
/* harmony import */ var libs_web_ui_form_src_lib_types_file_upload_chat_input_file_upload_chat_input_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! libs/web/ui/form/src/lib/types/file-upload-chat-input/file-upload-chat-input.module */ 851199);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var libs_web_ui_file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! libs/web/ui/file-preview/web-ui-file-preview.module */ 442875);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _no_conversation_no_conversation_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./no-conversation/no-conversation.component */ 79081);
/* harmony import */ var _group_info_group_info_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./group-info/group-info.component */ 50439);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);


























class ChatModule {}
ChatModule.ɵfac = function ChatModule_Factory(t) {
  return new (t || ChatModule)();
};
ChatModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: ChatModule
});
ChatModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule.forChild(_chat_routing__WEBPACK_IMPORTED_MODULE_2__.chatRoutes), _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__.MatMenuModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__.MatSidenavModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__.MatTooltipModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__.MatProgressBarModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_12__.SharedModule, libs_web_ui_form_src_lib_types_file_upload_chat_input_file_upload_chat_input_module__WEBPACK_IMPORTED_MODULE_13__.FileUploadChatInputModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule, libs_web_ui_file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_15__.WebUiFilePreviewModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HttpClientModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ChatModule, {
    declarations: [_chat_component__WEBPACK_IMPORTED_MODULE_17__.ChatComponent, _chats_chats_component__WEBPACK_IMPORTED_MODULE_18__.ChatsComponent, _contact_info_contact_info_component__WEBPACK_IMPORTED_MODULE_19__.ContactInfoComponent, _group_info_group_info_component__WEBPACK_IMPORTED_MODULE_20__.GroupInfoComponent, _conversation_conversation_component__WEBPACK_IMPORTED_MODULE_21__.ConversationComponent, _new_chat_new_chat_component__WEBPACK_IMPORTED_MODULE_22__.NewChatComponent, _profile_profile_component__WEBPACK_IMPORTED_MODULE_23__.ProfileComponent, _no_conversation_no_conversation_component__WEBPACK_IMPORTED_MODULE_24__.NoConversationComponent],
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__.RouterModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__.MatMenuModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_9__.MatSidenavModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_10__.MatTooltipModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_11__.MatProgressBarModule, libs_shared_shared_module__WEBPACK_IMPORTED_MODULE_12__.SharedModule, libs_web_ui_form_src_lib_types_file_upload_chat_input_file_upload_chat_input_module__WEBPACK_IMPORTED_MODULE_13__.FileUploadChatInputModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule, libs_web_ui_file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_15__.WebUiFilePreviewModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_16__.HttpClientModule]
  });
})();

/***/ }),

/***/ 193854:
/*!*******************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/chat.routing.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chatRoutes": () => (/* binding */ chatRoutes)
/* harmony export */ });
/* harmony import */ var _chat_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chat.component */ 164955);
/* harmony import */ var _chats_chats_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chats/chats.component */ 157971);
/* harmony import */ var _conversation_conversation_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conversation/conversation.component */ 732980);
/* harmony import */ var _no_conversation_no_conversation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./no-conversation/no-conversation.component */ 79081);




const chatRoutes = [{
  path: '',
  component: _chat_component__WEBPACK_IMPORTED_MODULE_0__.ChatComponent,
  // resolve  : {
  //     chats   : ChatChatsResolver,
  //     contacts: ChatContactsResolver,
  //     profile : ChatProfileResolver
  // },
  children: [{
    path: '',
    component: _chats_chats_component__WEBPACK_IMPORTED_MODULE_1__.ChatsComponent,
    children: [{
      path: ':id',
      component: _conversation_conversation_component__WEBPACK_IMPORTED_MODULE_2__.ConversationComponent
      // resolve: {
      //     room: RoomResolver
      // }
    }, {
      path: '',
      component: _no_conversation_no_conversation_component__WEBPACK_IMPORTED_MODULE_3__.NoConversationComponent
    }]
  }]
}];

/***/ }),

/***/ 760665:
/*!*******************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/chat.service.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatService": () => (/* binding */ ChatService)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 318505);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 654004);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 763900);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 862843);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 895698);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 439300);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 80529);




class ChatService {
  /**
   * Constructor
   */
  constructor(_httpClient) {
    this._httpClient = _httpClient;
    this._chat = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._chats = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._contact = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._contacts = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
    this._profile = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(null);
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  /**
   * Getter for chat
   */
  get chat$() {
    return this._chat.asObservable();
  }
  /**
   * Getter for chats
   */
  get chats$() {
    return this._chats.asObservable();
  }
  /**
   * Getter for contact
   */
  get contact$() {
    return this._contact.asObservable();
  }
  /**
   * Getter for contacts
   */
  get contacts$() {
    return this._contacts.asObservable();
  }
  /**
   * Getter for profile
   */
  get profile$() {
    return this._profile.asObservable();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Get chats
   */
  getChats() {
    return this._httpClient.get('api/apps/chat/chats').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._chats.next(response);
    }));
  }
  /**
   * Get contact
   *
   * @param id
   */
  getContact(id) {
    return this._httpClient.get('api/apps/chat/contacts', {
      params: {
        id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._contact.next(response);
    }));
  }
  /**
   * Get contacts
   */
  getContacts() {
    return this._httpClient.get('api/apps/chat/contacts').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._contacts.next(response);
    }));
  }
  /**
   * Get profile
   */
  getProfile() {
    return this._httpClient.get('api/apps/chat/profile').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(response => {
      this._profile.next(response);
    }));
  }
  /**
   * Get chat
   *
   * @param id
   */
  getChatById(id) {
    return this._httpClient.get('api/apps/chat/chat', {
      params: {
        id
      }
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(chat => {
      // Update the chat
      this._chat.next(chat);
      // Return the chat
      return chat;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(chat => {
      if (!chat) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)('Could not found chat with id of ' + id + '!');
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)(chat);
    }));
  }
  /**
   * Update chat
   *
   * @param id
   * @param chat
   */
  updateChat(id, chat) {
    return this.chats$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(chats => this._httpClient.patch('api/apps/chat/chat', {
      id,
      chat
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.map)(updatedChat => {
      // Find the index of the updated chat
      const index = chats.findIndex(item => item.id === id);
      // Update the chat
      chats[index] = updatedChat;
      // Update the chats
      this._chats.next(chats);
      // Return the updated contact
      return updatedChat;
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.switchMap)(updatedChat => this.chat$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.filter)(item => item && item.id === id), (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)(() => {
      // Update the chat if it's selected
      this._chat.next(updatedChat);
      // Return the updated chat
      return updatedChat;
    }))))));
  }
  /**
   * Reset the selected chat
   */
  resetChat() {
    this._chat.next(null);
  }
}
ChatService.ɵfac = function ChatService_Factory(t) {
  return new (t || ChatService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient));
};
ChatService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: ChatService,
  factory: ChatService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 157971:
/*!****************************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/chats/chats.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChatsComponent": () => (/* binding */ ChatsComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chat.service */ 760665);
/* harmony import */ var _chat_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../chat.store */ 327566);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _new_chat_new_chat_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../new-chat/new-chat.component */ 650516);
/* harmony import */ var _profile_profile_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../profile/profile.component */ 290414);





















function ChatsComponent_div_0_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "chat-new-chat", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("drawer", _r2);
  }
}
function ChatsComponent_div_0_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "chat-profile", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("drawer", _r2);
  }
}
function ChatsComponent_div_0_ng_container_7_mat_progress_bar_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 15);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", "indeterminate");
  }
}
function ChatsComponent_div_0_ng_container_7_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16)(1, "div", 17)(2, "div", 18)(3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChatsComponent_div_0_ng_container_7_div_3_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r12.openNewChat());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "mat-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 24)(12, "mat-form-field", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "mat-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "input", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function ChatsComponent_div_0_ng_container_7_div_3_Template_input_input_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r13);
      const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r14.filterRooms(_r11.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r7.profile.name == null ? null : ctx_r7.profile.name.charAt(0), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r7.profile == null ? null : ctx_r7.profile.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:plus-circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("floatLabel", "always");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:search");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autocomplete", "off")("placeholder", "Search or start new chat");
  }
}
function ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
  }
}
function ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "typing...");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
function ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const chat_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("text-primary", chat_r16.unreadMessagesCount > 0)("dark:text-primary-500", chat_r16.unreadMessagesCount > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", chat_r16.lastMessage, " ");
  }
}
function ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const chat_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 1, chat_r16.lastMessageAt, "HH:mm"), " ");
  }
}
function ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const chat_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](2, 1, chat_r16.lastMessageAt, "MM/dd/yyyy"), " ");
  }
}
function ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const chat_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", chat_r16.unreadMessagesCount, " ");
  }
}
const _c0 = function (a0, a1) {
  return {
    "hover:bg-gray-100 dark:hover:bg-hover": a0,
    "bg-primary-50 dark:bg-hover": a1
  };
};
function ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r30);
      const chat_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r28.openConversation(chat_r16));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_ng_container_2_Template, 1, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 33)(7, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_div_9_Template, 2, 0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_div_10_Template, 2, 5, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_div_12_Template, 3, 4, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](14, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_div_15_Template, 3, 4, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](16, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](17, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_ng_container_18_Template, 3, 1, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const chat_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](21, _c0, !ctx_r17.activeRoomId || chat_r16.roomId !== ctx_r17.activeRoomId, ctx_r17.activeRoomId && chat_r16.roomId === ctx_r17.activeRoomId));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", chat_r16.unreadMessagesCount > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", chat_r16 == null ? null : chat_r16.name.charAt(0), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](chat_r16 == null ? null : chat_r16.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", chat_r16.typingMembers.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", chat_r16.typingMembers.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", chat_r16.lastMessageTimeStamp > 0 && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](13, 9, ctx_r17.currentDate, "MM/dd/yyyy") === _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](14, 12, chat_r16.lastMessageAt, "MM/dd/yyyy"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", chat_r16.lastMessageTimeStamp > 0 && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](16, 15, ctx_r17.currentDate, "MM/dd/yyyy") !== _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](17, 18, chat_r16.lastMessageAt, "MM/dd/yyyy"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", chat_r16.unreadMessagesCount > 0);
  }
}
function ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_div_1_Template, 19, 24, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const chat_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", chat_r16.roomType === "direct");
  }
}
function ChatsComponent_div_0_ng_container_7_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ChatsComponent_div_0_ng_container_7_ng_container_5_ng_container_1_Template, 2, 1, "ng-container", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r8.filteredRooms)("ngForTrackBy", ctx_r8.trackByFn);
  }
}
function ChatsComponent_div_0_ng_container_7_ng_template_6_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "No chats");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "iconsmind:speach_bubble");
  }
}
function ChatsComponent_div_0_ng_container_7_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ChatsComponent_div_0_ng_container_7_ng_template_6_div_0_Template, 4, 1, "div", 43);
  }
  if (rf & 2) {
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !vm_r1.loading || vm_r1.loadingRooms);
  }
}
function ChatsComponent_div_0_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ChatsComponent_div_0_ng_container_7_mat_progress_bar_2_Template, 1, 1, "mat-progress-bar", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ChatsComponent_div_0_ng_container_7_div_3_Template, 16, 7, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ChatsComponent_div_0_ng_container_7_ng_container_5_Template, 2, 2, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ChatsComponent_div_0_ng_container_7_ng_template_6_Template, 1, 1, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7);
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().ngIf;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", vm_r1.loadingRooms);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !vm_r1.loadingRooms);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx_r5.filteredRooms == null ? null : ctx_r5.filteredRooms.length) > 0)("ngIfElse", _r9);
  }
}
function ChatsComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1)(1, "mat-drawer-container", 2)(2, "mat-drawer", 3, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("openedChange", function ChatsComponent_div_0_Template_mat_drawer_openedChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r36);
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r35.drawerOpened = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ChatsComponent_div_0_ng_container_4_Template, 2, 1, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, ChatsComponent_div_0_ng_container_5_Template, 2, 1, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-drawer-content", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ChatsComponent_div_0_ng_container_7_Template, 8, 4, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "router-outlet");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("hasBackdrop", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("autoFocus", false)("opened", ctx_r0.drawerOpened);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.drawerComponent === "new-chat");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.drawerComponent === "profile");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.isChatListVisible);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", "z-20 absolute inset-0 lg:static lg:inset-auto flex");
  }
}
class ChatsComponent {
  /**
   * Constructor
   */
  constructor(_chatService, _changeDetectorRef, store, route, router, http) {
    this._chatService = _chatService;
    this._changeDetectorRef = _changeDetectorRef;
    this.store = store;
    this.route = route;
    this.router = router;
    this.http = http;
    this.drawerOpened = false;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.currentDate = new Date();
    this.isChatListVisible = true;
    this.vm$ = this.store.vm$;
    this.rooms$ = this.store.rooms$;
    this.rooms = [];
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    this.store.getRooms();
    // to hide the chatlist when inside the legal-case
    this.route.data.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(data => {
      this.isChatListVisible = !(data === null || data === void 0 ? void 0 : data.insideLegalCase);
    });
    // this.route.params.pipe(takeUntil(this._unsubscribeAll)).subscribe((params) => {
    //   // console.log("windowa", window.location)
    //     this.activeRoomId = params['id']
    //     // console.log("activeRoomId", this.activeRoomId)
    //     this._changeDetectorRef.markForCheck()
    //     this._changeDetectorRef.detectChanges()
    // })
    // rooms
    this.vm$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(vm => {
      // console.log('vm', vm)
      this.activeRoomId = vm.activeRoomId;
      this.profile = vm.me;
      this.rooms = this.filteredRooms = vm.rooms;
      // console.log('component rooms', vm.rooms)
      this._changeDetectorRef.markForCheck();
      this._changeDetectorRef.detectChanges();
    });
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
   * Filter the chats
   *
   * @param query
   */
  filterChats(query) {
    // Reset the filter
    if (!query) {
      this.filteredChats = this.chats;
      return;
    }
    this.filteredChats = this.chats.filter(chat => {
      var _a;
      return (_a = chat.contact) === null || _a === void 0 ? void 0 : _a.name.toLowerCase().includes(query.toLowerCase());
    });
    // console.log('filtered', this.filteredChats)
  }

  filterRooms(query) {
    // Reset the filter
    if (!query) {
      this.filteredRooms = this.rooms;
      return;
    }
    this.filteredRooms = this.rooms.filter(room => room === null || room === void 0 ? void 0 : room.name.toLowerCase().includes(query.toLowerCase()));
    // console.log('filtered', this.filteredRooms)
  }
  /**
   * Open the new chat sidebar
   */
  openNewChat() {
    this.drawerComponent = 'new-chat';
    this.drawerOpened = true;
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Open the profile sidebar
   */
  openProfile() {
    this.drawerComponent = 'profile';
    this.drawerOpened = true;
    // Mark for check
    this._changeDetectorRef.markForCheck();
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
  openConversation(chat) {
    // const headers = { Authorization: 'Bearer syt_cGNo_ZQCYDCajaeNbVxiMPXCc_41EXS1' }
    // this.http
    //   .post(
    //     `https://matrix-uat.caseclinical.com/_matrix/client/v3/rooms/${chat.roomId}/read_markers `,
    //     {
    //       'm.read': chat.lastEventId,
    //       'm.read.private': chat.lastEventId
    //     },
    //     { headers },
    //   )
    //   .subscribe((res) => {
    //     // console.log('read_marker', res)
    //   })
    this.router.navigate([chat.roomId], {
      relativeTo: this.route
    });
  }
}
ChatsComponent.ɵfac = function ChatsComponent_Factory(t) {
  return new (t || ChatsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_service__WEBPACK_IMPORTED_MODULE_3__.ChatService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_store__WEBPACK_IMPORTED_MODULE_4__.ChatStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpClient));
};
ChatsComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ChatsComponent,
  selectors: [["chat-chats"]],
  decls: 2,
  vars: 3,
  consts: [["class", "relative flex flex-auto w-full bg-card dark:bg-transparent", 4, "ngIf"], [1, "relative", "flex", "flex-auto", "w-full", "bg-card", "dark:bg-transparent"], [1, "flex-auto", "h-full", 3, "hasBackdrop"], [1, "w-full", "sm:w-100", "lg:border-r", "lg:shadow-none", "dark:bg-gray-900", 3, "autoFocus", "opened", "openedChange"], ["drawer", ""], [4, "ngIf"], [1, "flex", "overflow-hidden"], [1, "flex-auto", "border-l", 3, "ngClass"], [3, "drawer"], [1, "relative", "flex", "flex-auto", "flex-col", "w-full", "min-w-0", "lg:min-w-100", "lg:max-w-100", "bg-card", "dark:bg-transparent"], ["class", "absolute inset-x-0 top-0 h-0.5", 3, "mode", 4, "ngIf"], ["class", "flex flex-col flex-0 py-4 px-8 border-b bg-gray-50 dark:bg-transparent", 4, "ngIf"], [1, "flex-auto", "overflow-y-auto"], [4, "ngIf", "ngIfElse"], ["noChats", ""], [1, "absolute", "inset-x-0", "top-0", "h-0.5", 3, "mode"], [1, "flex", "flex-col", "flex-0", "py-4", "px-8", "border-b", "bg-gray-50", "dark:bg-transparent"], [1, "flex", "items-center"], [1, "flex", "items-center", "mr-1"], [1, "w-10", "h-10"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-lg", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], [1, "ml-4", "font-medium", "truncate"], ["mat-icon-button", "", 1, "ml-auto", 3, "click"], [3, "svgIcon"], [1, "mt-4"], [1, "fuse-mat-no-subscript", "fuse-mat-rounded", "fuse-mat-dense", "w-full", 3, "floatLabel"], ["matPrefix", "", 1, "icon-size-5", 3, "svgIcon"], ["matInput", "", 3, "autocomplete", "placeholder", "input"], ["searchField", ""], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "z-20 flex items-center py-5 px-8 cursor-pointer border-b", 3, "ngClass", "click", 4, "ngIf"], [1, "z-20", "flex", "items-center", "py-5", "px-8", "cursor-pointer", "border-b", 3, "ngClass", "click"], [1, "relative", "flex", "flex-0", "items-center", "justify-center", "w-10", "h-10"], [1, "min-w-0", "ml-4"], [1, "font-medium", "leading-5", "truncate"], ["class", "text-primary", 4, "ngIf"], ["class", "leading-5 truncate text-secondary", 3, "text-primary", "dark:text-primary-500", 4, "ngIf"], [1, "flex", "flex-col", "items-end", "self-start", "ml-auto", "pl-2"], ["class", "text-sm leading-5 text-secondary", 4, "ngIf"], [1, "text-primary"], [1, "leading-5", "truncate", "text-secondary"], [1, "text-sm", "leading-5", "text-secondary"], [1, "flex", "justify-center", "items-center", "p-2", "h-5", "bg-pink-600", "text-xs", "text-white", "font-semibold", "rounded-full"], ["class", "flex flex-auto flex-col items-center justify-center h-full", 4, "ngIf"], [1, "flex", "flex-auto", "flex-col", "items-center", "justify-center", "h-full"], [1, "icon-size-24", 3, "svgIcon"], [1, "mt-4", "text-2xl", "font-semibold", "tracking-tight", "text-secondary"]],
  template: function ChatsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ChatsComponent_div_0_Template, 11, 7, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterOutlet, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatPrefix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatDrawerContent, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_12__.MatProgressBar, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _new_chat_new_chat_component__WEBPACK_IMPORTED_MODULE_14__.NewChatComponent, _profile_profile_component__WEBPACK_IMPORTED_MODULE_15__.ProfileComponent, _angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_13__.DatePipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 471577:
/*!******************************************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/contact-info/contact-info.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactInfoComponent": () => (/* binding */ ContactInfoComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _chat_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chat.store */ 327566);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 836895);







function ContactInfoComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.room.contact == null ? null : ctx_r0.room.contact.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", "Contact avatar");
  }
}
function ContactInfoComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.room == null ? null : ctx_r1.room.currentState == null ? null : ctx_r1.room.currentState.members[ctx_r1.myUserId] == null ? null : ctx_r1.room.currentState.members[ctx_r1.myUserId].name.charAt(0), " ");
  }
}
function ContactInfoComponent_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const media_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", media_r9, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
  }
}
function ContactInfoComponent_ng_container_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div")(2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r3.room.contact.details.emails[0].email);
  }
}
function ContactInfoComponent_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div")(2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Phone number");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r4.room.contact.details.phoneNumbers[0].phoneNumber);
  }
}
function ContactInfoComponent_ng_container_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div")(2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Title");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r5.room.contact.details.title);
  }
}
function ContactInfoComponent_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div")(2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Company");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r6.room.contact.details.company);
  }
}
function ContactInfoComponent_ng_container_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div")(2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Birthday");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r7.room.contact.details.birthday);
  }
}
function ContactInfoComponent_ng_container_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div")(2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r8.room.contact.details.address);
  }
}
class ContactInfoComponent {
  /**
   * Constructor
   */
  constructor(store) {
    this.store = store;
  }
}
ContactInfoComponent.ɵfac = function ContactInfoComponent_Factory(t) {
  return new (t || ContactInfoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_store__WEBPACK_IMPORTED_MODULE_1__.ChatStore));
};
ContactInfoComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ContactInfoComponent,
  selectors: [["chat-contact-info"]],
  inputs: {
    room: "room",
    drawer: "drawer"
  },
  decls: 29,
  vars: 12,
  consts: [[1, "flex", "flex-col", "flex-auto", "h-full", "bg-card", "dark:bg-default"], [1, "flex", "flex-0", "items-center", "h-18", "px-4", "border-b", "bg-gray-50", "dark:bg-transparent"], ["mat-icon-button", "", 3, "click"], [3, "svgIcon"], [1, "ml-2", "text-lg", "font-medium"], [1, "overflow-y-auto"], [1, "flex", "flex-col", "items-center", "mt-8"], [1, "w-40", "h-40", "rounded-full"], [4, "ngIf"], [1, "mt-4", "text-lg", "font-medium"], [1, "mt-0.5", "text-md", "text-secondary"], [1, "py-10", "px-7"], [1, "text-lg", "font-medium"], [1, "grid", "grid-cols-4", "gap-1", "mt-4"], [4, "ngFor", "ngForOf"], [1, "mt-10", "space-y-4"], [1, "text-lg", "font-medium", "mb-3"], [1, "w-full", "h-full", "rounded-full", "object-cover", 3, "src", "alt"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-8xl", "font-semibold", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], [1, "h-20", "rounded", "object-cover", 3, "src"], [1, "font-medium", "text-secondary"], [1, ""]],
  template: function ContactInfoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ContactInfoComponent_Template_button_click_2_listener() {
        return ctx.drawer.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Contact info");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5)(7, "div", 6)(8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ContactInfoComponent_ng_container_9_Template, 2, 2, "ng-container", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, ContactInfoComponent_ng_container_10_Template, 3, 1, "ng-container", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 11)(16, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Media");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, ContactInfoComponent_ng_container_19_Template, 2, 1, "ng-container", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 15)(21, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Details");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, ContactInfoComponent_ng_container_23_Template, 6, 1, "ng-container", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, ContactInfoComponent_ng_container_24_Template, 6, 1, "ng-container", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, ContactInfoComponent_ng_container_25_Template, 6, 1, "ng-container", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, ContactInfoComponent_ng_container_26_Template, 6, 1, "ng-container", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, ContactInfoComponent_ng_container_27_Template, 6, 1, "ng-container", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, ContactInfoComponent_ng_container_28_Template, 6, 1, "ng-container", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.room.contact == null ? null : ctx.room.contact.avatar);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !(ctx.room.contact == null ? null : ctx.room.contact.avatar));
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.room == null ? null : ctx.room.currentState == null ? null : ctx.room.currentState.members[ctx.myUserId] == null ? null : ctx.room.currentState.members[ctx.myUserId].name);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.room.contact.about);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.room.contact.attachments.media);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.room.contact.details.emails.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.room.contact.details.phoneNumbers.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.room.contact.details.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.room.contact.details.company);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.room.contact.details.birthday);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.room.contact.details.address);
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_2__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_3__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgIf],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 732980:
/*!******************************************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/conversation/conversation.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ConversationComponent": () => (/* binding */ ConversationComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ 815439);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @case-clinical/web/core/feature */ 984165);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../chat.service */ 760665);
/* harmony import */ var _fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @fuse/services/media-watcher */ 772327);
/* harmony import */ var _chat_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../chat.store */ 327566);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 80529);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/menu */ 228255);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/sidenav */ 523267);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _ui_form_src_lib_types_file_upload_chat_input_file_upload_chat_input_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../../../../../ui/form/src/lib/types/file-upload-chat-input/file-upload-chat-input.component */ 804123);
/* harmony import */ var _ui_file_preview_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../../../ui/file-preview/web-ui-file-preview.component */ 5551);
/* harmony import */ var _group_info_group_info_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../group-info/group-info.component */ 50439);
































const _c0 = ["messageInput"];
const _c1 = ["conversationContainer"];
const _c2 = ["filePreview"];
function ConversationComponent_div_0_ng_container_1_mat_progress_bar_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-progress-bar", 29);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("mode", "indeterminate");
  }
}
function ConversationComponent_div_0_ng_container_1_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-menu", null, 31)(4, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConversationComponent_div_0_ng_container_1_button_18_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r24);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r23.openGroupInfo());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, " Group info ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matMenuTriggerFor", _r22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:dots-vertical");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:user-circle");
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", "Today", " ");
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_1_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 1, message_r26.createdAt, "longDate"), " ");
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_1_div_3_Template, 2, 1, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](4, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](5, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_1_div_6_Template, 3, 4, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](7, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](4, 2, message_r26.createdAt, "shortDate") === _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](5, 5, ctx_r30.currentDate, "shortDate"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](7, 8, message_r26.createdAt, "shortDate") !== _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](8, 11, ctx_r30.currentDate, "shortDate"));
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_4_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", message_r26.message, " ");
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_4_div_2_Template, 2, 1, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.message);
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", message_r26.sender.name, " ");
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_5_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](0);
  }
}
const _c3 = function (a0, a1) {
  return {
    "text-blue-500 -right-1 -mr-px mb-px": a0,
    "text-gray-500 -left-1 -ml-px mb-px -scale-x-1": a1
  };
};
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_5_ng_container_2_Template, 1, 0, "ng-container", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](32);
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](2, _c3, message_r26.sender.userId === ctx_r41.myMatrixUserId, message_r26.sender.userId !== ctx_r41.myMatrixUserId));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngTemplateOutlet", _r18);
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 52);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerHTML", "Message has been deleted", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeHtml"]);
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "div", 53);
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("innerText", message_r26 == null ? null : message_r26.message);
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 54)(1, "a", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("href", message_r26 == null ? null : message_r26.message, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](message_r26 == null ? null : message_r26.message);
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_a_9_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 1, message_r26.file.size / 1000, "1.0-2"), " KB ");
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_a_9_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 1, message_r26.file.size / (1000 * 1000), "1.0-2"), " MB ");
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_a_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 56, 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_a_9_Template_a_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r61);
      const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r59.openDocument(message_r26 == null ? null : message_r26.file));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 58)(3, "div", 59)(4, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 61)(7, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_a_9_div_9_Template, 3, 4, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_a_9_div_10_Template, 3, 4, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("download", message_r26 == null ? null : message_r26.file == null ? null : message_r26.file.name)("matTooltip", message_r26 == null ? null : message_r26.file == null ? null : message_r26.file.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", message_r26.file.extension && message_r26.file.name.split(".").at(-1).toUpperCase() || "FILE", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", message_r26.file.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.file.size / 1000 < 1024);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.file.size / 1000 >= 1024);
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](3, 1, message_r26.createdAt, "HH:mm"), " ");
  }
}
const _c4 = function (a0, a1) {
  return {
    "mr-3": a0,
    "ml-3": a1
  };
};
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Sending... ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](1, _c4, message_r26.sender.userId === ctx_r47.myMatrixUserId, message_r26.sender.userId !== ctx_r47.myMatrixUserId));
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Queued ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).$implicit;
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](1, _c4, message_r26.sender.userId === ctx_r48.myMatrixUserId, message_r26.sender.userId !== ctx_r48.myMatrixUserId));
  }
}
const _c5 = function (a0, a1, a2, a3) {
  return {
    "items-end": a0,
    "items-start": a1,
    "mt-0.5": a2,
    "mt-3": a3
  };
};
const _c6 = function (a0, a1) {
  return {
    "bg-blue-500 text-blue-50": a0,
    "bg-gray-500 text-gray-50": a1
  };
};
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_1_Template, 3, 1, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_5_Template, 3, 5, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_div_6_Template, 1, 1, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_div_7_Template, 1, 1, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_div_8_Template, 3, 2, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_a_9_Template, 11, 6, "a", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_10_Template, 4, 4, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](11, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_13_Template, 3, 4, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_ng_container_14_Template, 3, 4, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    const message_r26 = ctx_r66.$implicit;
    const i_r27 = ctx_r66.index;
    const last_r29 = ctx_r66.last;
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction4"](23, _c5, message_r26.sender.userId === ctx_r32.myMatrixUserId, message_r26.sender.userId !== ctx_r32.myMatrixUserId, i_r27 > 0 && ctx_r32.messages[i_r27 - 1].sender.userId === message_r26.sender.userId, i_r27 > 0 && ctx_r32.messages[i_r27 - 1].sender.userId !== message_r26.sender.userId));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r32.roomType !== "direct" && (message_r26 == null ? null : message_r26.sender.userId) !== ctx_r32.myMatrixUserId && ((ctx_r32.messages[i_r27 - 1] == null ? null : ctx_r32.messages[i_r27 - 1].sender.userId) !== message_r26.sender.userId || (ctx_r32.messages[i_r27 - 1] == null ? null : ctx_r32.messages[i_r27 - 1].type) === "m.room.member" || _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 11, ctx_r32.messages[i_r27 - 1].createdAt, "MM/dd/yyyy") !== _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](3, 14, message_r26.createdAt, "MM/dd/yyyy")));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](28, _c6, message_r26.sender.userId === ctx_r32.myMatrixUserId, message_r26.sender.userId !== ctx_r32.myMatrixUserId));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", last_r29 || ctx_r32.messages[i_r27 + 1].sender.userId !== message_r26.sender.userId);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !message_r26.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.type === "m.text");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.type === "m.link");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (message_r26 == null ? null : message_r26.type) === "m.file");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.status == null && (last_r29 || ctx_r32.messages[i_r27 + 1].status !== null || ctx_r32.messages[i_r27 + 1].sender.userId !== message_r26.sender.userId || _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](11, 17, ctx_r32.messages[i_r27 + 1].createdAt, "MM/dd/yyyy HH:mm") !== _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](12, 20, message_r26.createdAt, "MM/dd/yyyy HH:mm")));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.status === "sending");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.status === "queued");
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_1_Template, 10, 14, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_ng_container_4_Template, 3, 1, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_div_5_Template, 15, 31, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const message_r26 = ctx.$implicit;
    const i_r27 = ctx.index;
    const first_r28 = ctx.first;
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", first_r28 || _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 3, ctx_r25.messages[i_r27 - 1].createdAt, "d") !== _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](3, 6, message_r26.createdAt, "d"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.type === "m.room.member");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", message_r26.type !== "m.room.member");
  }
}
function ConversationComponent_div_0_ng_container_1_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ConversationComponent_div_0_ng_container_1_div_21_ng_container_1_Template, 6, 9, "ng-container", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r8.messages)("ngForTrackBy", ctx_r8.trackByFn);
  }
}
function ConversationComponent_div_0_ng_container_1_ng_template_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "No conversation");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "iconsmind:speach_bubble");
  }
}
function ConversationComponent_div_0_ng_container_1_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r11.typingMembers.join(","), " are typing...");
  }
}
function ConversationComponent_div_0_ng_container_1_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r12.typingMembers.join(","), " is typing...");
  }
}
function ConversationComponent_div_0_ng_container_1_div_26_mat_form_field_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r72 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-form-field", 78)(1, "textarea", 79, 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function ConversationComponent_div_0_ng_container_1_div_26_mat_form_field_3_Template_textarea_ngModelChange_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r72);
      const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r71.messageInputValue = $event);
    })("focus", function ConversationComponent_div_0_ng_container_1_div_26_mat_form_field_3_Template_textarea_focus_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r72);
      const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r73.onFocus());
    })("blur", function ConversationComponent_div_0_ng_container_1_div_26_mat_form_field_3_Template_textarea_blur_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r72);
      const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r74.onBlur());
    })("keydown", function ConversationComponent_div_0_ng_container_1_div_26_mat_form_field_3_Template_textarea_keydown_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r72);
      const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r75.onKeyDown($event));
    })("keydown.enter", function ConversationComponent_div_0_ng_container_1_div_26_mat_form_field_3_Template_textarea_keydown_enter_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r72);
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r76.sendMessage($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "                            ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rows", 1)("maxLength", 5000)("ngModel", ctx_r67.messageInputValue);
  }
}
function ConversationComponent_div_0_ng_container_1_div_26_ng_template_4_div_3__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r84 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "svg", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConversationComponent_div_0_ng_container_1_div_26_ng_template_4_div_3__svg_svg_5_Template__svg_svg_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r84);
      const ctx_r85 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      const file_r79 = ctx_r85.$implicit;
      const i_r80 = ctx_r85.index;
      const ctx_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](!ctx_r83.formControl.disabled ? ctx_r83.fileDeleted(file_r79, i_r80) : null);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "path", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function ConversationComponent_div_0_ng_container_1_div_26_ng_template_4_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r87 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 84)(1, "div", 85)(2, "a", 86, 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConversationComponent_div_0_ng_container_1_div_26_ng_template_4_div_3_Template_a_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r87);
      const file_r79 = restoredCtx.$implicit;
      const ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](5);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r86.openDocument(file_r79));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, ConversationComponent_div_0_ng_container_1_div_26_ng_template_4_div_3__svg_svg_5_Template, 2, 0, "svg", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const file_r79 = ctx.$implicit;
    const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("download", file_r79 == null ? null : file_r79.name)("formControl", ctx_r78.formControl)("formlyAttributes", ctx_r78.field)("matTooltip", file_r79 == null ? null : file_r79.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r78.getAbbrName(file_r79 == null ? null : file_r79.name), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r78.formControl.disabled);
  }
}
function ConversationComponent_div_0_ng_container_1_div_26_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 81)(1, "div", 82, 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ConversationComponent_div_0_ng_container_1_div_26_ng_template_4_div_3_Template, 6, 6, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const selectedFiles_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2).ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", selectedFiles_r3);
  }
}
function ConversationComponent_div_0_ng_container_1_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r90 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 70)(1, "div", 71)(2, "file-upload-chat-input", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("fChanged", function ConversationComponent_div_0_ng_container_1_div_26_Template_file_upload_chat_input_fChanged_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r90);
      const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r89.fChanged($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, ConversationComponent_div_0_ng_container_1_div_26_mat_form_field_3_Template, 4, 3, "mat-form-field", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, ConversationComponent_div_0_ng_container_1_div_26_ng_template_4_Template, 4, 1, "ng-template", null, 74, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 75)(7, "button", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConversationComponent_div_0_ng_container_1_div_26_Template_button_click_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r90);
      const ctx_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r91.sendMessage($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "mat-icon", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](5);
    const selectedFiles_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().ngIf;
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().ngIf;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx_r13.formControl)("multiple", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", selectedFiles_r3.length == 0)("ngIfElse", _r68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", vm_r1.loading || !(ctx_r13.messageInputValue.trim() || selectedFiles_r3.length > 0));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:paper-airplane");
  }
}
function ConversationComponent_div_0_ng_container_1_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 90)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "You cannot send messages because you are no longer part of this conversation");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function ConversationComponent_div_0_ng_container_1_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 90)(1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Please accept the invite before you can start sending messages");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function ConversationComponent_div_0_ng_container_1_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-icon", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Select a conversation or start a new chat");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "iconsmind:speach_bubble");
  }
}
function ConversationComponent_div_0_ng_container_1_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "svg", 92)(1, "g", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "path", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
const _c7 = function () {
  return ["./"];
};
function ConversationComponent_div_0_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r95 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0)(1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-drawer-container", 3)(3, "mat-drawer", 4, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("openedChange", function ConversationComponent_div_0_ng_container_1_Template_mat_drawer_openedChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r95);
      const ctx_r94 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r94.drawerOpened = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "chat-group-info", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-drawer-content", 7)(7, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, ConversationComponent_div_0_ng_container_1_mat_progress_bar_8_Template, 1, 1, "mat-progress-bar", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function ConversationComponent_div_0_ng_container_1_Template_a_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r95);
      const ctx_r96 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r96.resetChat());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "mat-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 12)(12, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, ConversationComponent_div_0_ng_container_1_button_18_Template, 7, 3, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 17, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("scroll", function ConversationComponent_div_0_ng_container_1_Template_div_scroll_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r95);
      const ctx_r97 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r97.scrollHandler());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, ConversationComponent_div_0_ng_container_1_div_21_Template, 2, 2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, ConversationComponent_div_0_ng_container_1_ng_template_22_Template, 4, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, ConversationComponent_div_0_ng_container_1_div_24_Template, 2, 1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, ConversationComponent_div_0_ng_container_1_div_25_Template, 2, 1, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](26, ConversationComponent_div_0_ng_container_1_div_26_Template, 9, 6, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, ConversationComponent_div_0_ng_container_1_div_27_Template, 3, 0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, ConversationComponent_div_0_ng_container_1_div_28_Template, 3, 0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](29, ConversationComponent_div_0_ng_container_1_ng_template_29_Template, 4, 1, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, ConversationComponent_div_0_ng_container_1_ng_template_31_Template, 3, 0, "ng-template", null, 25, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](33, null, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](35, "ui-file-preview", 27, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]()();
  }
  if (rf & 2) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](4);
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](23);
    const vm_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().ngIf;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("hasBackdrop", false);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("autoFocus", false)("mode", ctx_r2.drawerMode)("position", "end")("opened", ctx_r2.drawerOpened);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("drawer", _r4)("room", ctx_r2.room);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", vm_r1.loadingRoom);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction0"](21, _c7));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.room == null ? null : ctx_r2.room.name == null ? null : ctx_r2.room.name.charAt(0), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.room == null ? null : ctx_r2.room.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.roomType !== "direct");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r2.messages == null ? null : ctx_r2.messages.length) > 0)("ngIfElse", _r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.typingMembers.length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.typingMembers.length === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r2.room == null ? null : ctx_r2.room.selfMembership) !== "leave" && (ctx_r2.room == null ? null : ctx_r2.room.selfMembership) !== "invite");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r2.room == null ? null : ctx_r2.room.selfMembership) === "leave");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", (ctx_r2.room == null ? null : ctx_r2.room.selfMembership) === "invite");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("isDownloadable", true);
  }
}
function ConversationComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, ConversationComponent_div_0_ng_container_1_Template, 37, 22, "ng-container", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, ctx_r0.selectedFiles$));
  }
}
class ConversationComponent {
  /**
   * Constructor
   */
  constructor(_changeDetectorRef, _chatService, _fuseMediaWatcherService, _ngZone, store, route, http, toast) {
    this._changeDetectorRef = _changeDetectorRef;
    this._chatService = _chatService;
    this._fuseMediaWatcherService = _fuseMediaWatcherService;
    this._ngZone = _ngZone;
    this.store = store;
    this.route = route;
    this.http = http;
    this.toast = toast;
    this.vm$ = this.store.vm$;
    this.room$ = this.store.room$;
    this.room = {};
    this.messages = [];
    this.anotherUsers = [];
    this.drawerMode = 'side';
    this.drawerOpened = false;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this.currentDate = new Date();
    this.formControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControl('');
    this.selectedFiles$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.BehaviorSubject([]);
    this.messageInputValue = '';
    this.insideLegalCase = false;
    this.roomId = undefined;
    this.typingIndicator = {
      timer: undefined,
      value: false,
      typingStartTime: undefined
    };
    this.typingMembers = [];
    // console.log('conversation loaded')
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Decorated methods
  // -----------------------------------------------------------------------------------------------------
  /**
   * Resize on 'input' and 'ngModelChange' events
   *
   * @private
   */
  _resizeMessageInput() {
    // This doesn't need to trigger Angular's change detection by itself
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Set the height to 'auto' so we can correctly read the scrollHeight
        this.messageInput.nativeElement.style.height = 'auto';
        // Detect the changes so the height is applied
        this._changeDetectorRef.detectChanges();
        // Get the scrollHeight and subtract the vertical padding
        this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;
        // Detect the changes one more time to apply the final height
        this._changeDetectorRef.detectChanges();
      });
    });
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // to check if we are inside the legal-case
    this.route.data.subscribe(data => {
      // console.log('conversation route data', data)
      this.insideLegalCase = data === null || data === void 0 ? void 0 : data.insideLegalCase;
    });
    // to load the room
    this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._unsubscribeAll)).subscribe(params => {
      var _a, _b;
      // console.log('params', params)
      this.roomId = params['id'];
      this.store.getRoom(this.roomId);
      (_b = (_a = this.messageInput) === null || _a === void 0 ? void 0 : _a.nativeElement) === null || _b === void 0 ? void 0 : _b.focus();
    });
    // to load the room once client gets ready
    // replacement of this is implemented inside syncClient method when state==='PREPARED' in chat.store
    // this.store.isClientReady$.pipe(takeUntil(this._unsubscribeAll)).subscribe((_) => {
    //   this.store.getRoom(this.roomId)
    // })
    this.store.newMessageIndicator$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._unsubscribeAll)).subscribe(_ => {
      if (_ != undefined && this.conversationContainer.nativeElement.scrollTop < -40) {
        // console.log("indicator val changed", _)
        this.toast.success('New message');
      }
    });
    this.vm$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._unsubscribeAll)).subscribe(vm => {
      // console.log('userID', vm)
      this.myMatrixUserId = vm.myMatrixUserId;
      // console.log('room data changed')
      this.room = vm.room;
      if (this.room) {
        this.convertRoomData(this.room);
      }
      this._changeDetectorRef.markForCheck();
      this._changeDetectorRef.detectChanges();
    });
    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.takeUntil)(this._unsubscribeAll)).subscribe(({
      matchingAliases
    }) => {
      // Set the drawerMode if the given breakpoint is active
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side';
      } else {
        this.drawerMode = 'over';
      }
      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }
  ngAfterViewInit() {
    this.messageInput.nativeElement.focus();
  }
  convertRoomData(room) {
    var _a, _b, _c, _d, _e, _f, _g;
    this.roomType = (_e = (_d = (_c = (_b = (_a = room.currentState.events.get('m.room.topic')) === null || _a === void 0 ? void 0 : _a.get('')) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.topic) !== null && _e !== void 0 ? _e : 'direct';
    this.typingMembers = Object.values(room.currentState.members).filter(member => {
      return member.typing === true && member.userId !== this.myMatrixUserId;
    }).map(member => member.name);
    // this.typingMembers.length && console.log('typing members', this.typingMembers, room.roomId)
    let filteredEvents = room.timeline.filter(event => {
      return (event.event.type === 'm.room.message' || event.event.type === 'm.room.member') && event.error == null;
    });
    let messages = [];
    filteredEvents.forEach(event => {
      var _a, _b, _c;
      if (event.event.type.trim() === 'm.room.message') {
        if (event.event.content.msgtype === 'm.text') {
          messages.push({
            message: event.event.content.body,
            createdAt: new Date(event.localTimestamp),
            type: event.event.content.msgtype,
            sender: event.sender,
            eventId: event.event.event_id,
            status: event.status
          });
        } else {
          let fileArray = (_c = (_b = (_a = event.event.content) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b.map(file => {
            return {
              file: file,
              createdAt: new Date(event.localTimestamp),
              type: event.event.content.msgtype,
              sender: event.sender,
              eventId: event.event.event_id,
              status: event.status
            };
          })) !== null && _c !== void 0 ? _c : [];
          messages.push(...fileArray);
        }
      } else if (event.event.type === 'm.room.member' && this.roomType !== 'direct') {
        let message;
        if (event.event.content.membership === 'join') {
          message = event.sender.userId === this.myMatrixUserId ? 'You are added to the conversation' : event.event.content.displayname + ' is added to the conversation';
        } else if (event.event.content.membership === 'leave') {
          message = event.sender.userId === this.myMatrixUserId ? 'You have been removed from the conversation' : event.event.content.displayname + ' has been removed from the conversation';
        }
        messages.push({
          message: message,
          type: event.event.type,
          membership: event.event.content.membership,
          user: event.event.content.displayname,
          eventId: event.event.event_id,
          createdAt: new Date(event.localTimestamp),
          sender: event.sender,
          status: event.status
        });
      }
    });
    this.messages = messages;
    let lastMessageEventId = ((_g = (_f = this.messages) === null || _f === void 0 ? void 0 : _f.at(-1)) === null || _g === void 0 ? void 0 : _g.eventId) || '';
    this.fullyReadConversation(lastMessageEventId);
    this.anotherUsers = Object.values(room.currentState.members).filter(member => member.userId !== this.myMatrixUserId);
    // console.log('conversation messages', this.messages, this.isUserAtTheTop())
    this.messages.length < 15 && this.scrollHandler();
  }
  fullyReadConversation(lastMessageEventId) {
    if (lastMessageEventId !== this.lastMessageEventId) {
      this.lastMessageEventId = lastMessageEventId;
      // const headers = { Authorization: `Bearer ${localStorage.getItem('chatAccessToken')}` }
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('chatAccessToken')}`
      };
      this.http.post(`${_case_clinical_web_core_feature__WEBPACK_IMPORTED_MODULE_6__.environment.matrix_url}/_matrix/client/v3/rooms/${this.roomId}/read_markers `, {
        'm.read': lastMessageEventId,
        'm.read.private': lastMessageEventId
      }, {
        headers
      }).subscribe(res => {
        // console.log('read_marker', res)
      });
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
   * Open the group info
   */
  openGroupInfo() {
    // // console.log("openGroupInfo")
    // Open the drawer
    this.drawerOpened = true;
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Reset the chat
   */
  resetChat() {
    this._chatService.resetChat();
    // Close the group info in case it's opened
    this.drawerOpened = false;
    // Mark for check
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Toggle mute notifications
   */
  toggleMuteNotifications() {
    // Toggle the muted
    this.chat.muted = !this.chat.muted;
    // Update the chat on the server
    this._chatService.updateChat(this.chat.id, this.chat).subscribe();
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
  fChanged(files) {
    // console.log('fChanged', files)
    this.selectedFiles$.next([...this.selectedFiles$.getValue(), ...files]);
    this._resizeMessageInput();
  }
  getAbbrName(s) {
    const maxLength = 30; //30 Characters + ... returned
    if (!s) return '';
    return s.length > 30 ? s.slice(0, 30) + '...' : s;
  }
  fileDeleted(file, index) {
    let data = this.selectedFiles$.getValue();
    data.splice(index, 1);
    this.selectedFiles$.next(data);
    this._resizeMessageInput();
    // // console.log(typeof data )
  }

  openDocument(file) {
    this.store.getFileBuffer(file).then(file => {
      var _a;
      console.log('openDocument', file);
      (_a = this.filePreviewComponent) === null || _a === void 0 ? void 0 : _a.document.next(file);
    }).catch(error => {
      console.log('error while downloading', error);
    });
  }
  trim(onlyLeft = false) {
    this.messageInputValue = onlyLeft ? this.messageInputValue.trimStart() : this.messageInputValue.trim();
    this._resizeMessageInput();
  }
  sendMessage(event) {
    event.preventDefault();
    if (this.selectedFiles$.getValue().length > 0) {
      this.store.convertFileToUrl(this.roomId, this.selectedFiles$.getValue());
      this.selectedFiles$.next([]);
    } else if (this.messageInputValue.trim().length > 0) {
      let type = 'm.text';
      let urlRegex = /^(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])$/;
      if (urlRegex.test(this.messageInputValue.trim())) {
        type = 'm.link';
      }
      this.store.sendMessage(this.roomId, this.messageInputValue.trim(), type);
      this.messageInputValue = '';
    }
    this.conversationContainer.nativeElement.scrollTop = 0;
    this._resizeMessageInput();
    this.messageInput.nativeElement.focus();
  }
  onFocus() {
    // this.sendTyping(true)
  }
  onBlur() {
    this.trim();
    // this.sendTyping(false)
  }

  onKeyDown(event) {
    console.log("keydown", event);
    if (event.key !== 'Enter') {
      if (this.typingIndicator.value === false) {
        this.typingIndicator.value = true;
        this.typingIndicator.typingStartTime = moment__WEBPACK_IMPORTED_MODULE_0___default()(new Date());
        this.sendTyping(true);
      } else {
        let diffInSeconds = moment__WEBPACK_IMPORTED_MODULE_0___default().duration(moment__WEBPACK_IMPORTED_MODULE_0___default()(new Date()).diff(this.typingIndicator.typingStartTime)).asSeconds();
        console.log("diffInSeconds", diffInSeconds);
        if (diffInSeconds > 15) {
          this.typingIndicator.value = true;
          this.typingIndicator.typingStartTime = moment__WEBPACK_IMPORTED_MODULE_0___default()(new Date());
          this.sendTyping(true);
        }
      }
      this.debounce(() => {
        if (this.typingIndicator.value) {
          console.log("debounced fun ran");
          this.typingIndicator.value = false;
          this.typingIndicator.typingStartTime = undefined;
          this.sendTyping(false);
        }
      })();
    }
  }
  debounce(callback) {
    return (...args) => {
      clearTimeout(this.typingIndicator.timer);
      this.typingIndicator.timer = setTimeout(() => {
        callback.apply(this, args);
      }, 3000);
    };
  }
  sendTyping(isTyping) {
    this.store.sendTyping(this.roomId, isTyping);
    // const headers = { Authorization: 'Bearer syt_cGNo_ZQCYDCajaeNbVxiMPXCc_41EXS1' }
    // this.http
    // .put(
    //     `https://matrix-uat.caseclinical.com/_matrix/client/v3/rooms/!vnoLTvTQaTCHDPoLxH:caseclinical.com/typing/@pch:caseclinical.com`,
    //     {
    //         "timeout": 30000,
    //         "typing": isTyping
    //     },
    //     { headers },
    // )
    // .subscribe((res) => {
    //     // console.log('typing', res)
    // })
  }

  scrollHandler() {
    setTimeout(() => {
      if (this.room.oldState.paginationToken && this.isUserAtTheTop()) {
        this.scrollback();
      }
    }, 1000);
  }
  isUserAtTheTop() {
    // we have taken col reverse css class that's why we will count all positions in negative
    const threshold = 20;
    const position = this.conversationContainer.nativeElement.scrollTop - this.conversationContainer.nativeElement.offsetHeight;
    const height = -1 * this.conversationContainer.nativeElement.scrollHeight;
    return position < height + threshold;
  }
  scrollback() {
    let scrollTop = this.conversationContainer.nativeElement.scrollTop;
    this.store.scrollback(this.room, 50).then(isSuccessful => {
      if (isSuccessful) {
        this.conversationContainer.nativeElement.scrollTop = scrollTop;
        this._changeDetectorRef.markForCheck();
        this._changeDetectorRef.detectChanges();
      }
    });
  }
}
ConversationComponent.ɵfac = function ConversationComponent_Factory(t) {
  return new (t || ConversationComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_chat_service__WEBPACK_IMPORTED_MODULE_7__.ChatService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_fuse_services_media_watcher__WEBPACK_IMPORTED_MODULE_8__.FuseMediaWatcherService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_chat_store__WEBPACK_IMPORTED_MODULE_9__.ChatStore), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_12__.WebUiToastService));
};
ConversationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: ConversationComponent,
  selectors: [["chat-conversation"]],
  viewQuery: function ConversationComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c1, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c2, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.messageInput = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.conversationContainer = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.filePreviewComponent = _t.first);
    }
  },
  hostBindings: function ConversationComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("input", function ConversationComponent_input_HostBindingHandler() {
        return ctx._resizeMessageInput();
      })("ngModelChange", function ConversationComponent_ngModelChange_HostBindingHandler() {
        return ctx._resizeMessageInput();
      });
    }
  },
  decls: 2,
  vars: 3,
  consts: [["class", "absolute inset-0 flex flex-col flex-auto overflow-y-auto lg:overflow-hidden bg-card dark:bg-default", 4, "ngIf"], [1, "absolute", "inset-0", "flex", "flex-col", "flex-auto", "overflow-y-auto", "lg:overflow-hidden", "bg-card", "dark:bg-default"], [4, "ngIf"], [1, "flex-auto", "h-full", 3, "hasBackdrop"], [1, "w-full", "sm:w-100", "lg:border-l", "lg:shadow-none", "dark:bg-gray-900", 3, "autoFocus", "mode", "position", "opened", "openedChange"], ["drawer", ""], [3, "drawer", "room"], [1, "flex", "flex-col", "overflow-hidden", "relative"], [1, "relative", "flex", "flex-0", "items-center", "h-18", "px-4", "md:px-6", "border-b", "bg-gray-50", "dark:bg-transparent"], ["class", "absolute inset-x-0 top-0 h-0.5", 3, "mode", 4, "ngIf"], ["mat-icon-button", "", 1, "lg:hidden", "md:-ml-2", 3, "routerLink", "click"], [3, "svgIcon"], [1, "flex", "items-center", "ml-2", "lg:ml-0", "mr-2", 2, "width", "90%"], [1, "relative", "flex", "flex-0", "items-center", "justify-center", "w-10", "h-10"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-lg", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], [1, "ml-4", "text-lg", "font-medium", "leading-5", "truncate"], ["class", "ml-auto", "mat-icon-button", "", 3, "matMenuTriggerFor", 4, "ngIf"], [1, "flex", "overflow-y-auto", "h-full", "flex-col-reverse", 3, "scroll"], ["conversationContainer", ""], ["class", "flex flex-col flex-auto shrink p-6 bg-card dark:bg-transparent", 4, "ngIf", "ngIfElse"], ["noConversation", ""], ["class", "text-sm font-medium text-primary bg-white pl-3 pb-1", 4, "ngIf"], ["class", "flex items-end p-4 border-t bg-gray-50 dark:bg-transparent", 4, "ngIf"], ["class", "flex justify-center items-center text-secondary p-6 border-t bg-gray-50 dark:bg-transparent", 4, "ngIf"], ["selectChatOrStartNew", ""], ["speechBubbleExtension", ""], ["filePreviewTpl", ""], [3, "isDownloadable"], ["filePreview", ""], [1, "absolute", "inset-x-0", "top-0", "h-0.5", 3, "mode"], ["mat-icon-button", "", 1, "ml-auto", 3, "matMenuTriggerFor"], ["conversationHeaderMenu", ""], ["mat-menu-item", "", 3, "click"], [1, "flex", "flex-col", "flex-auto", "shrink", "p-6", "bg-card", "dark:bg-transparent"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "flex flex-col", 3, "ngClass", 4, "ngIf"], [1, "flex", "items-center", "justify-center", "my-3", "-mx-6"], [1, "flex-auto", "border-b"], ["class", "flex-0 mx-4 text-sm font-medium leading-5 text-secondary", 4, "ngIf"], [1, "flex-0", "mx-4", "text-sm", "font-medium", "leading-5", "text-secondary"], [1, "flex", "items-center", "justify-center"], ["class", "flex-0 mx-4 my-3 text-sm font-medium leading-5 text-secondary", 4, "ngIf"], [1, "flex-0", "mx-4", "my-3", "text-sm", "font-medium", "leading-5", "text-secondary"], [1, "flex", "flex-col", 3, "ngClass"], [1, "relative", "max-w-3/4", "px-3", "py-2", "rounded-lg", 2, "overflow-wrap", "anywhere", 3, "ngClass"], ["class", "min-w-4 leading-5 text-slate-500 italic", 3, "innerHTML", 4, "ngIf"], ["class", "whitespace-pre-wrap min-w-4 leading-5", 3, "innerText", 4, "ngIf"], ["class", "whitespace-pre-wrap min-w-4 leading-5", 4, "ngIf"], [3, "download", "matTooltip", "click", 4, "ngIf"], [1, "my-0.5", "text-sm", "font-medium", "text-secondary"], [1, "absolute", "bottom-0", "w-3", 3, "ngClass"], [4, "ngTemplateOutlet"], [1, "min-w-4", "leading-5", "text-slate-500", "italic", 3, "innerHTML"], [1, "whitespace-pre-wrap", "min-w-4", "leading-5", 3, "innerText"], [1, "whitespace-pre-wrap", "min-w-4", "leading-5"], ["target", "_blank", 3, "href"], [3, "download", "matTooltip", "click"], ["tooltip", "matTooltip"], [1, "flex", "items-center", "cursor-pointer"], [1, "flex", "items-center", "justify-center", "w-10", "h-10", "rounded-md", "overflow-hidden", "bg-white", "shrink-0"], [1, "flex", "items-center", "justify-center", "text-xs", "font-semibold", "text-gray-500"], [1, "ml-3", "truncate"], [1, "text-md", "font-medium", "truncate"], ["class", "text-xs font-medium truncate", 4, "ngIf"], [1, "text-xs", "font-medium", "truncate"], [1, "my-0.5", "text-sm", "font-medium", "text-secondary", 3, "ngClass"], [1, "flex", "flex-auto", "flex-col", "items-center", "justify-center", "h-full"], [1, "icon-size-24", 3, "svgIcon"], [1, "mt-4", "text-2xl", "font-semibold", "tracking-tight", "text-secondary"], [1, "text-sm", "font-medium", "text-primary", "bg-white", "pl-3", "pb-1"], [1, "flex", "items-end", "p-4", "border-t", "bg-gray-50", "dark:bg-transparent"], [1, "flex", "items-center", "h-11", "my-px"], [3, "formControl", "multiple", "fChanged"], ["class", "fuse-mat-dense fuse-mat-no-subscript fuse-mat-rounded fuse-mat-bold w-full ml-4", 4, "ngIf", "ngIfElse"], ["fileUpload", ""], [1, "flex", "items-center", "h-11", "my-px", "ml-4"], ["mat-icon-button", "", 3, "disabled", "click"], [1, "rotate-90", 3, "svgIcon"], [1, "fuse-mat-dense", "fuse-mat-no-subscript", "fuse-mat-rounded", "fuse-mat-bold", "w-full", "ml-4"], ["matInput", "", 1, "min-h-5", "my-0", "resize-none", 2, "margin", "11px 0 !important", "padding", "0 !important", "max-height", "100px !important", 3, "rows", "maxLength", "ngModel", "ngModelChange", "focus", "blur", "keydown", "keydown.enter"], ["messageInput", ""], [1, "border-2", "bg-white", "px-4", "w-full", "ml-4", "my-0", 2, "min-height", "46px !important", "padding", "11px 16px !important", "border-radius", "20px !important", "border-color", "rgb(203 213 225) !important"], [1, "flex", "flex-wrap", "gap-2", 2, "min-height", "20px !important", "max-height", "100px !important", "overflow-y", "auto !important"], ["class", "rounded-xl p-2.5 bg-stone-200", 4, "ngFor", "ngForOf"], [1, "rounded-xl", "p-2.5", "bg-stone-200"], [1, "flex", "flex-row", "justify-between", "items-center", "gap-4"], ["webUiFormFieldFile", "", "ngDefaultControl", "", 1, "text-blue-500", "no-underline", "hover:cursor-pointer", "break-all", 3, "download", "formControl", "formlyAttributes", "matTooltip", "click"], ["xmlns", "http://www.w3.org/2000/svg", "class", "h-6 w-6 min-w-6 hover:cursor-pointer", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 3, "click", 4, "ngIf"], ["xmlns", "http://www.w3.org/2000/svg", "fill", "none", "viewBox", "0 0 24 24", "stroke", "currentColor", 1, "h-6", "w-6", "min-w-6", "hover:cursor-pointer", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", 1, "text-red-500", "w-5", "h-5"], [1, "flex", "justify-center", "items-center", "text-secondary", "p-6", "border-t", "bg-gray-50", "dark:bg-transparent"], [1, "flex", "flex-col", "flex-auto", "items-center", "justify-center", "bg-gray-100", "dark:bg-transparent"], ["width", "100%", "height", "100%", "viewBox", "0 0 66 66", "xmlns", "http://www.w3.org/2000/svg"], ["id", "Page-1", "stroke", "none", "stroke-width", "1", "fill", "none", "fill-rule", "evenodd"], ["d", "M1.01522827,0.516204834 C-8.83532715,54.3062744 61.7609863,70.5215302 64.8009949,64.3061218 C68.8074951,54.8859711 30.1663208,52.9997559 37.5036011,0.516204834 L1.01522827,0.516204834 Z", "fill", "currentColor", "fill-rule", "nonzero"]],
  template: function ConversationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, ConversationComponent_div_0_Template, 3, 3, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_router__WEBPACK_IMPORTED_MODULE_10__.RouterLink, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatIconAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_13__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_16__.MatInput, _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_17__.MatMenuTrigger, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__.MatDrawer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__.MatDrawerContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__.MatDrawerContent, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_19__.MatTooltip, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_20__.MatProgressBar, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_21__.NgTemplateOutlet, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlDirective, _ui_form_src_lib_types_file_upload_chat_input_file_upload_chat_input_component__WEBPACK_IMPORTED_MODULE_22__.FileUploadChatInput, _ui_file_preview_web_ui_file_preview_component__WEBPACK_IMPORTED_MODULE_23__.WebUiFilePreviewComponent, _group_info_group_info_component__WEBPACK_IMPORTED_MODULE_24__.GroupInfoComponent, _angular_common__WEBPACK_IMPORTED_MODULE_21__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_21__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_21__.DatePipe],
  styles: ["textarea.mat-input-element {\n  box-shadow: none !important;\n}\n\n  input.mat-input-element {\n  box-shadow: none !important;\n}"],
  changeDetection: 0
});

/***/ }),

/***/ 50439:
/*!**************************************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/group-info/group-info.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GroupInfoComponent": () => (/* binding */ GroupInfoComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _chat_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chat.store */ 327566);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/progress-bar */ 973162);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 836895);











function GroupInfoComponent_div_0_mat_progress_bar_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-progress-bar", 17);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("mode", "indeterminate");
  }
}
function GroupInfoComponent_div_0_ng_container_19_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 20)(2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 23)(7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const member_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", member_r6 == null ? null : member_r6.name.charAt(0), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](member_r6 == null ? null : member_r6.name);
  }
}
function GroupInfoComponent_div_0_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, GroupInfoComponent_div_0_ng_container_19_ng_container_2_Template, 9, 2, "ng-container", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r3.joinedMembers)("ngForTrackBy", ctx_r3.trackByFn);
  }
}
function GroupInfoComponent_div_0_div_20_ng_container_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 20)(2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 23)(7, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const member_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", member_r8 == null ? null : member_r8.name.charAt(0), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](member_r8 == null ? null : member_r8.name);
  }
}
function GroupInfoComponent_div_0_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 13)(1, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Invited");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, GroupInfoComponent_div_0_div_20_ng_container_5_Template, 9, 2, "ng-container", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.invitedMembers)("ngForTrackBy", ctx_r4.trackByFn);
  }
}
function GroupInfoComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GroupInfoComponent_div_0_mat_progress_bar_1_Template, 1, 1, "mat-progress-bar", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 3)(3, "button", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GroupInfoComponent_div_0_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r9.drawer.close());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-icon", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Group info");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7)(8, "div", 8)(9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 12)(16, "div", 13)(17, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Members");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](19, GroupInfoComponent_div_0_ng_container_19_Template, 3, 2, "ng-container", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](20, GroupInfoComponent_div_0_div_20_Template, 6, 2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const vm_r1 = ctx.ngIf;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", vm_r1.loadingRoom);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:x");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r0.room == null ? null : ctx_r0.room.name == null ? null : ctx_r0.room.name.charAt(0), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.room == null ? null : ctx_r0.room.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.joinedMembers.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r0.invitedMembers.length);
  }
}
class GroupInfoComponent {
  /**
   * Constructor
   */
  constructor(store, route) {
    this.store = store;
    this.route = route;
    this.joinedMembers = [];
    this.invitedMembers = [];
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    this.vm$ = this.store.vm$;
    this.route.params.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(id => {
      var _a;
      (_a = this.drawer) === null || _a === void 0 ? void 0 : _a.close();
    });
    this.store.myMatrixUserId$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(id => {
      this.myMatrixUserId = id;
    });
  }
  ngDoCheck() {
    var _a, _b;
    // console.log("groupInfooooooo", {...this.room})
    if ((_b = (_a = this.room) === null || _a === void 0 ? void 0 : _a.currentState) === null || _b === void 0 ? void 0 : _b.members) {
      let joinedMembers = Object.values(this.room.currentState.members).filter(member => member.userId !== this.myMatrixUserId && member.membership === 'join');
      joinedMembers.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      joinedMembers.unshift({
        userId: this.myMatrixUserId,
        name: 'You'
      });
      this.joinedMembers = joinedMembers;
      let invitedMembers = Object.values(this.room.currentState.members).filter(member => member.userId !== this.myMatrixUserId && member.membership === 'invite');
      invitedMembers.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      this.invitedMembers = invitedMembers;
    }
  }
}
GroupInfoComponent.ɵfac = function GroupInfoComponent_Factory(t) {
  return new (t || GroupInfoComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_store__WEBPACK_IMPORTED_MODULE_3__.ChatStore), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute));
};
GroupInfoComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: GroupInfoComponent,
  selectors: [["chat-group-info"]],
  inputs: {
    room: "room",
    drawer: "drawer"
  },
  decls: 2,
  vars: 3,
  consts: [["class", "flex flex-col flex-auto h-full bg-card dark:bg-default", 4, "ngIf"], [1, "flex", "flex-col", "flex-auto", "h-full", "bg-card", "dark:bg-default"], ["class", "absolute inset-x-0 top-0 h-0.5", 3, "mode", 4, "ngIf"], [1, "flex", "flex-0", "items-center", "h-18", "px-4", "border-b", "bg-gray-50", "dark:bg-transparent"], ["mat-icon-button", "", 3, "click"], [3, "svgIcon"], [1, "ml-2", "text-lg", "font-medium"], [1, "overflow-y-auto"], [1, "flex", "flex-col", "items-center", "mt-8"], [1, "w-40", "h-40", "rounded-full"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-8xl", "font-semibold", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], [1, "mt-4", "text-lg", "font-medium", "text-center", "px-5"], [1, "py-10", "px-7"], [1, "mt-10", "space-y-4"], [1, "text-lg", "font-medium", "mb-3"], [4, "ngIf"], ["class", "mt-10 space-y-4", 4, "ngIf"], [1, "absolute", "inset-x-0", "top-0", "h-0.5", 3, "mode"], [1, "flex-auto", "overflow-y-auto"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "z-20", "flex", "items-center", "py-2", "cursor-auto"], [1, "relative", "flex", "flex-0", "items-center", "justify-center", "w-10", "h-10"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-lg", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], [1, "min-w-0", "ml-4"], [1, "font-medium", "leading-5", "truncate"]],
  template: function GroupInfoComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, GroupInfoComponent_div_0_Template, 21, 6, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](1, "async");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](1, 1, ctx.vm$));
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_7__.MatProgressBar, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 650516:
/*!**********************************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/new-chat/new-chat.component.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewChatComponent": () => (/* binding */ NewChatComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chat.service */ 760665);
/* harmony import */ var _chat_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../chat.store */ 327566);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 836895);










function NewChatComponent_div_6_ng_container_1_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const user_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", user_r6.user.name.charAt(0), " ");
  }
}
function NewChatComponent_div_6_ng_container_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NewChatComponent_div_6_ng_container_1_ng_container_1_ng_container_1_Template, 3, 1, "ng-container", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NewChatComponent_div_6_ng_container_1_ng_container_1_Template_div_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r11);
      const user_r6 = restoredCtx.$implicit;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r10.createRoom(user_r6.matrixUserId));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 14)(8, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const user_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", i_r7 === 0 || user_r6.user.name.charAt(0) !== ctx_r5.users[i_r7 - 1].user.name.charAt(0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", user_r6.user.name.charAt(0), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](user_r6.user.name);
  }
}
function NewChatComponent_div_6_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NewChatComponent_div_6_ng_container_1_ng_container_1_Template, 10, 3, "ng-container", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r4.users)("ngForTrackBy", ctx_r4.trackByFn);
  }
}
function NewChatComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, NewChatComponent_div_6_ng_container_1_Template, 2, 2, "ng-container", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const vm_r3 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", vm_r3.users.length)("ngIfElse", _r1);
  }
}
function NewChatComponent_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "There are no users!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
}
class NewChatComponent {
  /**
   * Constructor
   */
  constructor(_chatService, store) {
    this._chatService = _chatService;
    this.store = store;
    this.vm$ = this.store.vm$;
    this.users = [];
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Contacts
    // this._chatService.contacts$
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((contacts: Contact[]) => {
    //         this.contacts = contacts;
    //     });
    this.store.me$.subscribe(me => {
      this.myUserId = me === null || me === void 0 ? void 0 : me.id;
    });
    this.store.filterUsers().pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(users => {
      // console.log('users', users)
      this.users = users.filter(user => user.userId !== this.myUserId);
    });
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
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index, item) {
    return item.id || index;
  }
  createRoom(matrixUserId) {
    this.store.createRoom([matrixUserId]).subscribe(res => {
      // console.log('create----------------', res)
      if (res.room_id) {
        this.drawer.close();
      }
    });
    // .then((res) => {
    //   // console.log('res create room', res)
    //   this.drawer.close()
    // })
    // .catch((err) => {
    //   // console.log('err create room', err)
    // })
  }
}

NewChatComponent.ɵfac = function NewChatComponent_Factory(t) {
  return new (t || NewChatComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_service__WEBPACK_IMPORTED_MODULE_3__.ChatService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_store__WEBPACK_IMPORTED_MODULE_4__.ChatStore));
};
NewChatComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NewChatComponent,
  selectors: [["chat-new-chat"]],
  inputs: {
    drawer: "drawer"
  },
  decls: 10,
  vars: 4,
  consts: [[1, "flex", "flex-col", "flex-auto", "h-full", "overflow-hidden", "bg-card", "dark:bg-default"], [1, "flex", "flex-0", "items-center", "h-18", "-mb-px", "px-6", "bg-gray-50", "dark:bg-transparent"], ["mat-icon-button", "", 3, "click"], [3, "svgIcon"], [1, "ml-2", "text-2xl", "font-semibold"], ["class", "relative overflow-y-auto", 4, "ngIf"], ["noUsers", ""], [1, "relative", "overflow-y-auto"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngIf"], [1, "z-20", "flex", "items-center", "px-6", "py-4", "md:px-8", "cursor-pointer", "border-b", "hover:bg-gray-100", "dark:hover:bg-hover", 3, "click"], [1, "flex", "flex-0", "items-center", "justify-center", "w-10", "h-10", "rounded-full", "overflow-hidden"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-lg", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"], [1, "min-w-0", "ml-4"], [1, "font-medium", "leading-5", "truncate"], [1, "z-10", "sticky", "top-0", "-mt-px", "px-6", "py-1", "md:px-8", "border-t", "border-b", "font-medium", "uppercase", "text-secondary", "bg-gray-100", "dark:bg-gray-900"], [1, "p-8", "sm:p-16", "border-t", "text-4xl", "font-semibold", "tracking-tight", "text-center"]],
  template: function NewChatComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function NewChatComponent_Template_button_click_2_listener() {
        return ctx.drawer.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "New chat");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, NewChatComponent_div_6_Template, 2, 2, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, NewChatComponent_ng_template_8_Template, 2, 0, "ng-template", null, 6, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 2, ctx.vm$));
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_5__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 79081:
/*!************************************************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/no-conversation/no-conversation.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NoConversationComponent": () => (/* binding */ NoConversationComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/icon */ 397392);


class NoConversationComponent {
  constructor() {}
}
NoConversationComponent.ɵfac = function NoConversationComponent_Factory(t) {
  return new (t || NoConversationComponent)();
};
NoConversationComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: NoConversationComponent,
  selectors: [["no-conversation"]],
  decls: 5,
  vars: 1,
  consts: [[1, "flex-auto", "border-l", "z-20", "absolute", "inset-0", "lg:static", "lg:inset-auto", "flex"], [1, "flex", "flex-col", "flex-auto", "items-center", "justify-center", "bg-gray-100", "dark:bg-transparent"], [1, "icon-size-24", 3, "svgIcon"], [1, "mt-4", "text-2xl", "font-semibold", "tracking-tight", "text-secondary"]],
  template: function NoConversationComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "mat-icon", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Select a conversation or start a new chat");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "iconsmind:speach_bubble");
    }
  },
  dependencies: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_1__.MatIcon],
  encapsulation: 2
});

/***/ }),

/***/ 290414:
/*!********************************************************************!*\
  !*** ./libs/web/chat/feature/src/lib/profile/profile.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileComponent": () => (/* binding */ ProfileComponent)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 746758);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 782722);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var _chat_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chat.service */ 760665);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 224006);











function ProfileComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r0.profile.avatar, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", "Profile avatar");
  }
}
function ProfileComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx_r1.profile.name.charAt(0), " ");
  }
}
class ProfileComponent {
  /**
   * Constructor
   */
  constructor(_chatService) {
    this._chatService = _chatService;
    this._unsubscribeAll = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit() {
    // Profile
    this._chatService.profile$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.takeUntil)(this._unsubscribeAll)).subscribe(profile => {
      this.profile = profile;
    });
  }
  /**
   * On destroy
   */
  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
ProfileComponent.ɵfac = function ProfileComponent_Factory(t) {
  return new (t || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_chat_service__WEBPACK_IMPORTED_MODULE_3__.ChatService));
};
ProfileComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ProfileComponent,
  selectors: [["chat-profile"]],
  inputs: {
    drawer: "drawer"
  },
  decls: 35,
  vars: 11,
  consts: [[1, "flex", "flex-col", "flex-auto", "overflow-y-auto", "bg-card", "dark:bg-default"], [1, "flex", "flex-0", "items-center", "h-18", "px-6", "border-b", "bg-gray-50", "dark:bg-transparent"], ["mat-icon-button", "", 3, "click"], [3, "svgIcon"], [1, "ml-2", "text-2xl", "font-semibold"], [1, "px-6"], [1, "group", "relative", "flex", "flex-0", "mt-8", "mx-auto", "w-40", "h-40", "rounded-full"], [1, "hidden", "group-hover:flex", "absolute", "inset-0", "flex-col", "items-center", "justify-center", "backdrop-filter", "backdrop-blur", "bg-opacity-80", "rounded-full", "cursor-pointer", "bg-gray-800"], [1, "text-white", 3, "svgIcon"], [1, "mt-2", "mx-6", "font-medium", "text-center", "text-white"], [4, "ngIf"], [1, "flex", "flex-col", "mt-8", "mx-2"], ["matPrefix", "", 1, "icon-size-5", 3, "svgIcon"], ["matInput", "", 3, "ngModel"], [1, "flex", "items-center", "justify-end", "mt-4"], ["mat-button", "", 3, "click"], ["mat-flat-button", "", 1, "ml-2", 3, "color"], [1, "w-full", "h-full", "rounded-full", "object-cover", 3, "src", "alt"], [1, "flex", "items-center", "justify-center", "w-full", "h-full", "rounded-full", "text-8xl", "font-semibold", "uppercase", "bg-gray-200", "text-gray-600", "dark:bg-gray-700", "dark:text-gray-200"]],
  template: function ProfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileComponent_Template_button_click_2_listener() {
        return ctx.drawer.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Profile");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5)(7, "div", 6)(8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](9, "mat-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Change Profile Photo");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, ProfileComponent_ng_container_12_Template, 2, 2, "ng-container", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, ProfileComponent_ng_container_13_Template, 3, 1, "ng-container", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 11)(15, "mat-form-field")(16, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Name");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "mat-icon", 12)(19, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-form-field")(21, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Email");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](23, "mat-icon", 12)(24, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "mat-form-field")(26, "mat-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "About");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](28, "mat-icon", 12)(29, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "div", 14)(31, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ProfileComponent_Template_button_click_31_listener() {
        return ctx.drawer.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Cancel ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "button", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Save ");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:arrow-narrow-left");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:camera");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.profile.avatar);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.profile.avatar);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:user-circle");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.profile.name);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:mail");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.profile.email);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_solid:identification");
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.profile.about);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("color", "primary");
    }
  },
  dependencies: [_angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatIconButton, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__.MatPrefix, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel],
  encapsulation: 2,
  changeDetection: 0
});

/***/ }),

/***/ 804123:
/*!***************************************************************************************************!*\
  !*** ./libs/web/ui/form/src/lib/types/file-upload-chat-input/file-upload-chat-input.component.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileUploadChatInput": () => (/* binding */ FileUploadChatInput)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 570655);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 861135);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 439646);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 311481);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 134793);
/* harmony import */ var _case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @case-clinical/web/core/data-access */ 311477);
/* harmony import */ var _case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @case-clinical/web/ui/toast */ 971873);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 397392);















const _c0 = ["filePreview"];
const _c1 = ["fileUpload"];
const _c2 = ["imageFileInput"];
class FileUploadChatInput {
  // TO DO LIST :
  // Create a custom button, on click trigger input
  // create custom file counter ( counts both already stored files, newly selected files)
  //
  constructor(ref, domSanitizer, route, store, toast) {
    this.ref = ref;
    this.domSanitizer = domSanitizer;
    this.route = route;
    this.store = store;
    this.toast = toast;
    this.allowedExtensions = undefined;
    this.multiple = true;
    this.sizeLimit = undefined;
    this.clickedLink = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.fChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.fChangedEventTargetFiles = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this.document$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
    this.uploadedDocuments$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject([]);
    this.fieldBlur$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(false);
    this.fileUploadConfig = {
      controlName: "",
      formType: "create",
      required: false,
      isValidFile: true
    };
    // super()
  }
  // allowInput = false;
  // preventDef(e : Event){
  //   if(!this.allowInput)e.preventDefault();
  //   else this.allowInput = !this.allowInput;
  // }
  getAbbrName(s) {
    const maxLength = 30; //30 Characters + ... returned
    if (!s) return '';
    return s.length > 30 ? s.slice(0, 30) + '...' : s;
  }
  // getSize(s : number){
  //   if(s > (1024 * 1024)){
  //     return ''+Math.floor(s/(1024*1024))+' MB'
  //   }else if(s > 1024){
  //     return ''+Math.floor(s/1024)+' KB'
  //   }else{
  //     return ''+s+' Byte'
  //   }
  // }
  ngOnInit() {
    // this.fileUploadConfig.controlName = this.field.key.toString();
    // if(this.to.required){
    //   this.fileUploadConfig.required = true;
    // }
    // if(this.to.documents$){
    //   this.fileUploadConfig.formType = "edit";
    // }
    // if(Array.isArray(this.to.currentFiles)){
    //   // let up = [];
    //   // let curr = [];
    //   // this.to.currentFiles.forEach(ele=>{
    //   //     if(ele.id){up.push(ele);}
    //   //     else{ curr.push(ele);}
    //   // })
    //   // this.document$.next(curr);
    //   // this.uploadedDocuments$.next(up);
    //   this.document$.next(this.to.currentFiles)
    // }
    // if(this.to.updateCurrentDocs$){
    //   this.to.updateCurrentDocs$.subscribe(val=>{
    //     this.document$.next( (Array.isArray(val)) ? val : [val] );
    //   })
    // }
    //  this.document$.pipe().subscribe(val=>{
    //   if(this.to?.isWitnessStepper === true){
    //     this.model.witnessDocument = val;
    //   }else if(this.to?.isPriorInjuryStepper === true){
    //     this.model.document = val;
    //   }else{
    //     if(this.to.multiple){
    //       if(this.to.multiple===true)this.to?.onChange(val);
    //     }else{
    //       this.to?.onChange(val[0] || null);
    //     }
    //   }
    //   this.setFileUploadValidation(val)
    // })
    // this.uploadedDocuments$.subscribe(ele=>{
    //   if(ele && ele.length===0 && this.document$.value.length===0){
    //     this.setFileUploadValidation();
    //   }
    // })
    // if((this.to.documents$) && (this.fileUploadConfig.formType == "edit")){
    //   this.uploadedDocuments$.subscribe(ele=>{
    //     // console.log(ele)
    //   })
    //   const destroy$ = new Subject<boolean>();
    //   if(this.to.multiple===true) {
    //     this.to.documents$.pipe(takeUntil(destroy$)).subscribe(val=>{
    //       this.uploadedDocuments$.next(val.filter(ele=>ele!=null && ele!=undefined));
    //       // if(this.uploadedDocuments$.value && this.uploadedDocuments$.value.length > 0)
    //       // destroy$.next(true);
    //     });
    //   }
    //   else {
    //     this.to.documents$.subscribe(val=>{
    //       this.uploadedDocuments$.next(val);
    //       // if((this.to?.multiple===true) && (this.uploadedDocuments$.value.length > 0)){
    //       //   destroy$.next(true);
    //       // }
    //       // else if(this.uploadedDocuments$.value){
    //       //   destroy$.next(true);
    //       // }
    //     });
    //   }
    // }
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.uploadedDocuments$.subscribe(data => {
    //     this.setFileUploadValidation()
    //   });
    // },300);
  }
  // onFileUploadBtnClick(fileUploadRef){
  //   this.allowInput = true;
  //   fileUploadRef.click();
  //   fileUploadRef.focus();
  // }
  // onFocus(event:any){
  //   /* if(!((<HTMLInputElement>event.target)?.classList?.contains('ng-untouched'))){
  //     this.formControl.updateValueAndValidity();
  //   }else{
  //     this.formControl.setErrors(null);
  //   } */
  //   this.setFileUploadData(event);
  // }
  fileToDataURL(file_) {
    const reader = new FileReader();
    // tslint:disable-next-line:no-unused
    return new Promise((resolve, reject) => {
      reader.readAsDataURL(file_);
      reader.addEventListener('load', function (event) {
        resolve(event.target.result);
      }, false);
    });
  }
  fileChanged(event) {
    var _a;
    return (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__awaiter)(this, void 0, void 0, function* () {
      console.log("event", event);
      if (!event.target.files) return;
      /* const datas : DocumentInput[] = [];
        await Array.from(event.target.files).forEach(async (ele : File)=>{
           datas.push(
            {
              name : ele.name,
              extension : ele.type,
              attachment : (await this.fileToDataURL(ele) as string)
            }
           )
        }) */
      this.formControl.setErrors({
        "maxFileSize": true
      });
      this.ref.markForCheck();
      this.ref.detectChanges();
      const datas = [];
      for (const ele of event.target.files) {
        const base64 = yield this.fileToDataURL(ele);
        datas.push({
          name: ele.name,
          extension: ele.type,
          size: ele.size,
          attachment: base64
        });
      }
      this.fChangedEventTargetFiles.emit((_a = event.target.files) !== null && _a !== void 0 ? _a : []);
      this.formControl.patchValue(null);
      this.document$.next(!!this.multiple && this.multiple === true ? [...this.document$.getValue(), ...datas] : datas);
      /* this.document$ = of(datas);
      if(this.to?.isWitnessStepper === true){
        this.model.witnessDocument = datas;
      }else if(this.to?.isPriorInjuryStepper === true){
        this.model.document = datas;
      }else{
        // this.to?.onChange(datas);
        if(this.to.multiple){
          if(this.to.multiple===true)this.to?.onChange(datas);
                  }else{
          this.to?.onChange(datas[0]);
        }
      } */
      this.formControl.markAsDirty();
      this.formControl.updateValueAndValidity();
      this.ref.markForCheck();
      this.ref.detectChanges();
      this.setFileUploadData();
    });
  }
  // getFormData(base64 : string, fileName : string){
  //   // Form Data testing
  //   const file = this.DataURIToBlob(base64)
  //   const formData = new FormData();
  //   formData.append('upload', file, fileName)
  //   return formData;
  // }
  // DataURIToBlob(dataURI: string) {
  //   const splitDataURI = dataURI.split(',')
  //   const byteString = splitDataURI[0].indexOf('base64') >= 0 ? Buffer.from(splitDataURI[1],'base64').toString() : decodeURI(splitDataURI[1])
  //   const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
  //   const ia = new Uint8Array(byteString.length)
  //   for (let i = 0; i < byteString.length; i++)
  //       ia[i] = byteString.charCodeAt(i)
  //   console.log(byteString)
  //   return new Blob([ia], { type: mimeString })
  // }
  setFileUploadValidation(files = [], focusEvent = "") {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!this.fileUploadConfig.required || this.document$.value.length) {
      this.formControl.clearValidators();
      this.formControl.updateValueAndValidity();
    } else {
      if (((_a = this.document$.value) === null || _a === void 0 ? void 0 : _a.length) === 0) {
        if (this.fileUploadConfig.formType == "edit") {
          const data = this.uploadedDocuments$.getValue();
          if (data && data.length) {
            //this.formControl.patchValue(null);
            this.formControl.clearValidators();
            this.formControl.updateValueAndValidity();
          } else {
            this.formControl.patchValue(null);
            this.formControl.markAsDirty();
            this.formControl.markAsTouched();
            this.formControl.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required);
            this.formControl.updateValueAndValidity();
          }
        } else {
          this.formControl.patchValue(null);
          this.formControl.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required);
          this.formControl.updateValueAndValidity();
        }
      }
    }
    if (!(files && files.length)) {
      this.formControl.setErrors(null);
      if (focusEvent && !((_c = (_b = focusEvent.target) === null || _b === void 0 ? void 0 : _b.classList) === null || _c === void 0 ? void 0 : _c.contains('ng-untouched'))) {
        this.formControl.updateValueAndValidity();
      } else if (!focusEvent) {
        this.formControl.updateValueAndValidity();
      }
      this.fileUploadConfig.isValidFile = true;
    } else {
      // validation start
      let invalidFiles = [];
      // Adding support for custom extension validation
      // declare allowedExtensions in templateOptions in your formField, should be a string[] with following format :
      // example, { allowedExtensions : [ 'png', 'jpg', 'jpeg' ] }
      if (this.allowedExtensions && Array.isArray(this.allowedExtensions) && this.allowedExtensions.length > 0) {
        if (!(typeof this.allowedExtensions[0] === 'string')) console.error('allowedExtensions in fileUpload of wrong type, allowed type is string');else {
          this.fileUploadConfig.isValidFile = true;
          this.formControl.setErrors({
            "extensionType": true
          });
          this.ref.markForCheck();
          this.ref.detectChanges();
          for (let index = 0; index < files.length; index++) {
            if (!this.allowedExtensions.includes((_f = (_e = (_d = files[index]) === null || _d === void 0 ? void 0 : _d.extension) === null || _e === void 0 ? void 0 : _e.split('/')) === null || _f === void 0 ? void 0 : _f[1])) {
              this.fileUploadConfig.isValidFile = false;
              this.toast.error(`${(_g = files[index]) === null || _g === void 0 ? void 0 : _g.name} is of invalid extension`);
              invalidFiles.push(files[index]);
              // break;
            }
          }
        }
        // checks if previous validation returns invalid. if invalid, it wont execute below validation
        if (this.fileUploadConfig.isValidFile === false) {
          this.ref.markForCheck();
          this.ref.detectChanges();
          // return;
        } else if (this.fileUploadConfig.isValidFile) {
          this.formControl.setErrors(null);
          this.formControl.updateValueAndValidity();
          this.fileUploadConfig.isValidFile = true;
        }
      }
      // size validation start
      // Adding support for custom size validation
      // Declare sizeLimit in templateOptions in your formField.
      // sizeLimit is in bytes, be careful of that.
      if (this.sizeLimit && typeof this.sizeLimit === 'number') {
        const customLimit = this.sizeLimit;
        this.fileUploadConfig.isValidFile = true;
        this.formControl.setErrors({
          "customFileSize": true
        });
        this.ref.markForCheck();
        this.ref.detectChanges();
        Array.prototype.forEach.call(files, ele => {
          if (ele.size > customLimit) {
            this.fileUploadConfig.isValidFile = false;
            this.toast.error(`${ele.name} file is too big`);
            invalidFiles.push(ele);
          }
        });
      } else {
        // Normal size validation
        const maxFileSizeInMB = 200;
        const totalFileSizeInBytes = maxFileSizeInMB * 1024 * 1024;
        this.fileUploadConfig.isValidFile = true;
        this.formControl.setErrors({
          "maxFileSize": true
        });
        this.ref.markForCheck();
        this.ref.detectChanges();
        Array.prototype.forEach.call(files, ele => {
          if (ele.size > totalFileSizeInBytes) {
            this.fileUploadConfig.isValidFile = false;
            this.toast.error(`${ele.name} file is too big`);
            invalidFiles.push(ele);
          }
        });
      }
      // remove invalid files
      let validFiles = files.filter(file => !invalidFiles.includes(file));
      this.fChanged.emit(validFiles);
      this.document$.next([]);
      this.imageFileInput.nativeElement.value = '';
      if (this.fileUploadConfig.isValidFile) {
        this.formControl.setErrors(null);
        this.formControl.updateValueAndValidity();
        this.fileUploadConfig.isValidFile = true;
      }
      //sizeValidation end
    }

    this.ref.markForCheck();
    this.ref.detectChanges();
    // console.log(this.fileUploadConfig.isValidFile)
  }
  // fileDeleted(file, index) {
  //   /* const destroy$ = new Subject<boolean>();
  //   this.document$.pipe(
  //     map(ele=>ele.filter(ele=>(ele.name!=event.name) || (ele?.attachment!=ele?.attachment))),
  //     filter(array=>array && array.length>=0),
  //     takeUntil(destroy$)
  //   ).subscribe(val=>{this.document$.next(val); destroy$.next(true)}); */
  //   /* this.document$.pipe(take(1)).subscribe(datas=>{
  //     if(datas.length<1) this.formControl.setValue(null);
  //     if(this.to?.isWitnessStepper === true){
  //       this.model.witnessDocument = datas;
  //     }else if(this.to?.isPriorInjuryStepper === true){
  //       this.model.document = datas;
  //     }else{
  //       if(this.to.multiple){
  //         if(this.to.multiple===true)this.to?.onChange(datas);
  //       }else{
  //         this.to?.onChange(null);
  //       }
  //     }
  //   }); */
  //   if(file.id) {this.deleteUploaded(file, index, true); return;}
  //   const data = this.document$.getValue()
  //   data.splice(index,1);
  //   // console.log(typeof data )
  //   this.document$.next(data);
  //   this.formControl.markAsDirty()
  //   this.formControl.updateValueAndValidity()
  //   this.ref.markForCheck()
  //   this.ref.detectChanges()
  //   this.setFileUploadData();
  // }
  // deleteUploaded(file : Document,i, isUploadedInDocument?: boolean ){
  //   if(!confirm('File will be permanently deleted from the server. Do you wish to continue?')) return;
  //   const featureName = this.to?.featureName ?? ''
  //   this.store.userDeleteDocument({documentId : file.id, featureName : featureName}).pipe(
  //     tapResponse(
  //       (res) => {this.toast.success('File deleted successfully'); this.deleteFile(file.id, i,isUploadedInDocument ?? false)},
  //       (errors: any) =>
  //         {
  //           this.toast.error(errors.message || 'File could not be deleted')
  //         }
  //     ),
  //     take(1)
  //   ).subscribe();
  // }
  // deleteFile(id : string, index?:number, isUploadedInDocument? : boolean){
  //   const updata = this.uploadedDocuments$.getValue()
  //   const uploadedIndex = updata.findIndex(ele=>ele.id===id);
  //   if(uploadedIndex > -1){
  //     if(this.to.uploadedDeleted)  this.to?.uploadedDeleted(id);
  //     updata.splice(uploadedIndex, 1);
  //   }
  //   this.uploadedDocuments$.next(updata)
  //   this.to.documents$.next(this.uploadedDocuments$.getValue())
  //   if(isUploadedInDocument){
  //   const data = this.document$.getValue()
  //   data.splice(index,1);
  //   this.document$.next(data);
  //   }
  //   // this.document$.next(this.document$.getValue().filter(ele=>ele.id!=id));
  // }
  // openDocument(file : Document){
  //   this.filePreviewComponent?.document.next(file);
  //   this.to?.clickedLink(file);
  // }
  setFileUploadData(focusEvent = "") {
    this.setFileUploadValidation(this.document$.getValue(), focusEvent);
  }
}
FileUploadChatInput.ɵfac = function FileUploadChatInput_Factory(t) {
  return new (t || FileUploadChatInput)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.DomSanitizer), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_core_data_access__WEBPACK_IMPORTED_MODULE_7__.WebCoreDataAccessService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_case_clinical_web_ui_toast__WEBPACK_IMPORTED_MODULE_8__.WebUiToastService));
};
FileUploadChatInput.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: FileUploadChatInput,
  selectors: [["file-upload-chat-input"]],
  viewQuery: function FileUploadChatInput_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c2, 5, _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.filePreviewComponent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.elRef = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.imageFileInput = _t.first);
    }
  },
  inputs: {
    formControl: "formControl",
    allowedExtensions: "allowedExtensions",
    multiple: "multiple",
    sizeLimit: "sizeLimit"
  },
  outputs: {
    clickedLink: "clickedLink",
    fChanged: "fChanged",
    fChangedEventTargetFiles: "fChangedEventTargetFiles"
  },
  decls: 5,
  vars: 3,
  consts: [["id", "image-file-input", "type", "file", 1, "absolute", "h-0", "w-0", "opacity-0", "invisible", "pointer-events-none", 3, "multiple", "accept", "change"], ["imageFileInput", ""], ["for", "image-file-input", "matRipple", "", 1, "flex", "items-center", "justify-center", "w-10", "h-10", "rounded-full", "cursor-pointer", "hover:bg-gray-400", "hover:bg-opacity-20", "dark:hover:bg-black", "dark:hover:bg-opacity-5"], [3, "svgIcon"]],
  template: function FileUploadChatInput_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div")(1, "input", 0, 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function FileUploadChatInput_Template_input_change_1_listener($event) {
        return ctx.fileChanged($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "label", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "mat-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("multiple", ctx.multiple)("accept", ctx.allowedExtensions);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("svgIcon", "heroicons_outline:paper-clip");
    }
  },
  dependencies: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon],
  styles: [".mat-tooltip {\n  word-break: break-all !important;\n  white-space: normal !important;\n  \n}"],
  changeDetection: 0
});

/***/ }),

/***/ 851199:
/*!************************************************************************************************!*\
  !*** ./libs/web/ui/form/src/lib/types/file-upload-chat-input/file-upload-chat-input.module.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileUploadChatInputModule": () => (/* binding */ FileUploadChatInputModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 836895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 224006);
/* harmony import */ var _wrappers_form_field_ui_form_field_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../wrappers/form-field/ui-form-field.module */ 256623);
/* harmony import */ var _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../file-preview/web-ui-file-preview.module */ 442875);
/* harmony import */ var _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @case-clinical/web/ui/button */ 510948);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/tooltip */ 810266);
/* harmony import */ var _file_upload_chat_input_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./file-upload-chat-input.component */ 804123);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 804859);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/checkbox */ 556709);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 759549);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 397392);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 300284);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 94650);













class FileUploadChatInputModule {}
FileUploadChatInputModule.ɵfac = function FileUploadChatInputModule_Factory(t) {
  return new (t || FileUploadChatInputModule)();
};
FileUploadChatInputModule.ɵmod = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: FileUploadChatInputModule
});
FileUploadChatInputModule.ɵinj = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _wrappers_form_field_ui_form_field_module__WEBPACK_IMPORTED_MODULE_3__.UiFormFieldModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_4__.WebUiButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__.MatTooltipModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule,
  // FormlyModule.forChild({
  //   types: [
  //     {
  //       name: 'file-upload-chat-component',
  //       component: FileUploadChatInput,
  //       wrappers: ['form-field'],
  //     },
  //   ],
  // }),
  _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_11__.WebUiFilePreviewModule]
});
(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FileUploadChatInputModule, {
    declarations: [_file_upload_chat_input_component__WEBPACK_IMPORTED_MODULE_12__.FileUploadChatInput],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _wrappers_form_field_ui_form_field_module__WEBPACK_IMPORTED_MODULE_3__.UiFormFieldModule, _case_clinical_web_ui_button__WEBPACK_IMPORTED_MODULE_4__.WebUiButtonModule, _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_5__.MatTooltipModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_7__.MatCheckboxModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormFieldModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIconModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule,
    // FormlyModule.forChild({
    //   types: [
    //     {
    //       name: 'file-upload-chat-component',
    //       component: FileUploadChatInput,
    //       wrappers: ['form-field'],
    //     },
    //   ],
    // }),
    _file_preview_web_ui_file_preview_module__WEBPACK_IMPORTED_MODULE_11__.WebUiFilePreviewModule],
    exports: [_file_upload_chat_input_component__WEBPACK_IMPORTED_MODULE_12__.FileUploadChatInput]
  });
})();

/***/ })

}]);