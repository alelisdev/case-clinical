import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { of, switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { FormlyModalController } from '@case-clinical/web/ui/formly-designer';
import { WebGenderFeatureStore } from '@case-clinical/web/gender/shared';


const initialUsers: User[] = [
  {
    "id": 1,
    "name": "User 1",
    "gender": "m",
    "status": "Online",
    "url": "https://images.unsplash.com/photo-1682685796766-0fddd3e480de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    "id": 2,
    "name": "User 2",
    "gender": "m",
    "status": "Offline",
    "url": "https://images.unsplash.com/photo-1692653055277-acb45c75f1f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    "id": 3,
    "name": "User 3",
    "gender": "m",
    "status": "Online",
    "url": "https://images.unsplash.com/photo-1686509595443-9d87f8733eb6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
  },
  {
    "id": 4,
    "name": "User 4",
    "gender": "m",
    "status": "Online",
    "url": "https://images.unsplash.com/photo-1693331238991-8c2faa576080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
  },
  {
    "id": 5,
    "name": "User 5",
    "gender": "f",
    "status": "Offline",
    "url": "https://images.unsplash.com/photo-1682685797140-c17807f8f217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  }
]

export interface User {
  id: number
  name: string
  gender: string
  status: "Online"|"Offline"
  url: string
}

export interface LaIconState {
  loading: boolean,
  query: string,
  users: User[]
}

@Injectable()
export class LaIconStore extends ComponentStore<LaIconState> {

  private userAddModalCtrl: FormlyModalController;
  private userUpdateModalCtrl: FormlyModalController;
  private userDeleteConfirmModalCtrl: FormlyModalController;

  constructor(
    private formService: FormService,
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
    private genderStore: WebGenderFeatureStore,
  ) {
    super({
      query: "",
      loading: false,
      users: initialUsers
    })

    this.genderStore.loadGendersEffect();
  }

  loading$ = this.select(s => s.loading)
  users$ = this.select(s => s.users);
  genders$ = this.genderStore.genders$;

  vm$ = this.select(
    this.loading$,
    this.users$,
    (
      loading,
      users,
    ) => ({
      loading,
      users,
    })
  )

  readonly addNewUser = this.updater((state, newUser: User) => ({
    ...state,
    users: [
      ...state.users,
      newUser,
    ]
  }))

  readonly updateNewUser = this.updater((state, newUser: User) => ({
    ...state,
    users: state.users.map(user=>user.id === newUser.id ? newUser: user)
  }))

  readonly deleteUser = this.updater((state, id: number) => ({
    ...state,
    users: state.users.filter(user => user.id !== id)
  }))


  /** User Add */
  setUserAddModalCtrl(ctrl: FormlyModalController) {
    this.userAddModalCtrl = ctrl;
  }

  
  openUserAddModal(model: any = {}) {
    this.userAddModalCtrl.open(model, {
      genders: this.genders$,
    }, this);
  }

  

  addNewUserEffect = this.effect<User>(userInput$ => userInput$.pipe(
    tap((userInput) => { this.patchState({ loading: true }) }),
    withLatestFrom(this.users$),
    switchMap(([userInput, users]) => {
      const { name, gender, url, status } = userInput;
      const newId = users.length;
      this.addNewUser({ id: newId, name, gender, url, status });
      return of(true);
    }
    )
  ))
  /** User Add */

  /** User Update */
  setUserUpdateModalCtrl(ctrl: FormlyModalController) {
    this.userUpdateModalCtrl = ctrl;
  }

  openUserUpdateModal(model: any = {}) {
    this.userUpdateModalCtrl.open(model, {
      genders: this.genders$,
    }, this);
  }

  closeUserUpdateModal() {
    this.userUpdateModalCtrl.close();
  }

  updateUserEffect = this.effect<User>(userInput$ => userInput$.pipe(
    tap((userInput) => { this.patchState({ loading: true }) }),
    withLatestFrom(this.users$),
    switchMap(([userInput, users]) => {
      const { id, name, gender, url, status } = userInput;      
      this.updateNewUser({ id: id, name, gender, url, status });
      this.closeUserUpdateModal();
      return of(true);
    }
    )
  ))
  /** User Update */

   /** User Delete */

   setUserDeleteConfirmModalCtrl(ctrl: FormlyModalController) {
    this.userDeleteConfirmModalCtrl = ctrl;
  }

  openUserDeleteConfirmModal(modal: User) {
    this.userDeleteConfirmModalCtrl.open(modal, {}, this);
  }

  closeUserDeleteConfirmModal() {
    this.userDeleteConfirmModalCtrl.close();
  }

  deleteUserEffect = this.effect<User>(userInput$ => userInput$.pipe(
    tap((userInput) => { this.patchState({ loading: true }) }),
    withLatestFrom(this.users$),
    switchMap(([userInput, users]) => {
      this.deleteUser(userInput.id)
      this.closeUserDeleteConfirmModal()

      return of(true);
    })
  ))

  cancelUserDeleteEffect = this.effect<User>(userInput$ => userInput$.pipe(
    tap((userInput) => { this.patchState({ loading: true }) }),
    withLatestFrom(this.users$),
    switchMap(([userInput, users]) => {
      this.closeUserDeleteConfirmModal()
      return of(true);
    }
    )
  ))

  /** User Delete */

  /** User Update */

  updateUserStatus = this.effect<User>(toggle$ => toggle$.pipe(
    tap((toggle) => { this.patchState({ loading: true }) }),
    withLatestFrom(this.users$),
    switchMap(([toggle, users]) => {
      const { id, name, gender, url, status } = toggle;      
      this.updateNewUser({ id, name, gender, url, status });
      return of(true);
    }
    )
  ))
  /** User Update */
  

}
