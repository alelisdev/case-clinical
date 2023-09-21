import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { FormService } from '@case-clinical/web/ui/form';
import { Injectable } from "@angular/core";
import { switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { Board, UserCreateBoardInput, WebCoreDataAccessService } from '@case-clinical/web/core/data-access';

export interface ScrumboardState {
  loading: boolean,
  query: string,
  boards: Board[],
  done?: boolean,
  item?: any
}

@Injectable()
export class BoardListStore extends ComponentStore<ScrumboardState> {
  constructor(
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
    private data: WebCoreDataAccessService,
  ) {
    super({
      query: "",
      loading: false,
      boards: [],
      done: false,
    })
  }

  loading$ = this.select(s => s.loading)
  boards$ = this.select(s => s.boards)
  done$ = this.select(s => s.done)
  item$ = this.select(s => s.item)

  vm$ = this.select(
    this.loading$,
    (
      loading
    ) => ({
      loading
    })
  )

  readonly actionResult$ = this.select(this.item$, this.done$, (item, done) => ({ item, done }), { debounce: true })

  addBoard = this.updater((state, board: Board) => {
    return {
      ...state,
      boards: [
        ...state.boards,
        board,
      ]
    }
  })

  loadBoardsEffect = this.effect<void>($ => $.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(() => this.data.userBoards({ input: {} }).pipe(
      tapResponse(
        (res) => {
          this.patchState({
            boards: res.data.boards,
          })
        },
        (error) => {
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  createBoardEffect = this.effect<UserCreateBoardInput>(input$ => input$.pipe(
    tap((input) => { this.patchState({ loading: true }) }),
    switchMap((input) => this.data.userCreateBoard({ input }).pipe(
      tapResponse(
        (res) => {
          this.toast.success('Successfully created new board', { duration: 3000 })
          this.addBoard(res.data.created);
          setTimeout(() => this.patchState({ item: res.data.created, loading: false, done: true }), 300)
          setTimeout(() => this.patchState({ done: false, item: null }), 600)
        },
        (error) => {
          this.toast.error("Failed to ", { duration: 3000 })
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))
}
