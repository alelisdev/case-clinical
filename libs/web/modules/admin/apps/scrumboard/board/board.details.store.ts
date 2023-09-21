import { FuseLoadingService } from '@fuse/services/loading/loading.service';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Injectable } from "@angular/core";
import { EMPTY, switchMap, tap, withLatestFrom } from 'rxjs';
import { WebUiToastService } from '@case-clinical/web/ui/toast';
import { Board, BoardList, BoardCard, UserCreateBoardCardInput, WebCoreDataAccessService, UserUpdateBoardCardInput } from '@case-clinical/web/core/data-access';
import { ActivatedRoute } from '@angular/router';

export interface BoardDetailsState {
  loading: boolean,
  query: string,
  board?: Board
  done?: boolean,
  item?: any
  selectedCard?: BoardCard
}

@Injectable()
export class BoardDetailsStore extends ComponentStore<BoardDetailsState> {

  private readonly _maxListCount: number = 200;
  private readonly _positionStep: number = 65536;
  private readonly _maxPosition: number = this._positionStep * 500;

  constructor(
    private loading: FuseLoadingService,
    private toast: WebUiToastService,
    private data: WebCoreDataAccessService,
    private readonly route: ActivatedRoute,
  ) {
    super({
      query: "",
      loading: false,
      done: false,
    })

    if (this.route.snapshot.paramMap.has('boardId')) {
      const boardId = this.route.snapshot.paramMap.get('boardId');
      this.loadBoardEffect(boardId);
    }
  }

  loading$ = this.select(s => s.loading)
  selectedCard$ = this.select(s => s.selectedCard)
  done$ = this.select(s => s.done)
  item$ = this.select(s => s.item)
  boardOrigin$ = this.select(s => s.board)

  board$ = this.select(this.boardOrigin$, (boardOrigin) => {
    console.log("boardOrigin: ", boardOrigin)
    const lists = boardOrigin?.lists?.sort((a, b) => a.position - b.position) ?? []
    const sortedList : any[] = []
    lists?.forEach((item) => {
      sortedList.push({
        ...item,
        cards: item?.cards?.sort((a, b) =>  a.position - b.position)
      })
    })
    return {
      ...boardOrigin,
     lists: sortedList
    }
  });
  

  vm$ = this.select(
    this.loading$,
    (
      loading
    ) => ({
      loading
    })
  )

  readonly actionResult$ = this.select(this.item$, this.done$, (item, done) => ({ item, done }), { debounce: true })

  selectCard = this.updater((state, selectedCard: BoardCard) => ({
    ...state,
    selectedCard
  }))

  addList = this.updater((state, list: any) => {
    return {
      ...state,
      board: {
        ...state.board,
        lists: [
          ...state.board.lists,
          list,
        ]
      }
    }
  });

  updateList = this.updater((state, list: BoardList) => {
    return {
      ...state,
      board: {
        ...state.board,
        lists: [
          ...state.board.lists.map((boardList) => {
            if (list.id === boardList.id) return list;
            else return boardList;
          }),
        ]
      }
    }
  })

  deleteList = this.updater((state, deleted: BoardList) => {
    return {
      ...state,
      board: {
        ...state.board,
        lists: [
          ...state.board.lists.filter((boardList) => {
            return boardList.id !== deleted.id;
          }),
        ]
      }
    }
  })

  addCard = this.updater((state, newCard: BoardCard) => {
    return {
      ...state,
      board: {
        ...state.board,
        lists: [
          ...state.board.lists.map((boardList) => {
            if (newCard.boardListId === boardList.id) {
              return {
                ...boardList,
                cards: [
                  ...boardList.cards,
                  newCard,
                ]
              }
            } else return boardList;
          }),
        ]
      }
    }
  })

  updateCard = this.updater((state, updateCard: BoardCard) => {
    return {
      ...state,
      board: {
        ...state.board,
        lists: [
          ...state.board.lists.map((boardList) => {
            if (updateCard.boardListId === boardList.id) {
              return {
                ...boardList,
                cards: [
                  ...boardList.cards,
                ]
              }
            } else return boardList;
          }),
        ]
      }
    }
  })

  loadBoardEffect = this.effect<string>(boardId$ => boardId$.pipe(
    tap((boardId) => { this.patchState({ loading: true }) }),
    switchMap((boardId) => this.data.userBoard({ boardId }).pipe(
      tapResponse(
        (res) => {
          this.patchState({
            loading: false,
            board: res.data.board,
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

  addListEffect = this.effect<string>(title$ => title$.pipe(
    tap((title) => { this.patchState({ loading: true }) }),
    withLatestFrom(this.board$),
    switchMap(([title, board]) => {
      // Limit the max list count
      if (board.lists?.length >= this._maxListCount) {
        this.toast.error('Cannot add another list because of max list size')
        return EMPTY;
      }
      const input = {
        position: board.lists?.length ? board.lists[board.lists.length - 1].position + this._positionStep : this._positionStep,
        title,
        boardId: board.id,
      }
      return this.data.userCreateBoardList({ input }).pipe(
        tapResponse(
          (res) => {
            this.toast.success('Successfully added new list', { duration: 3000 })
            this.addList(res.data.created);
            this.patchState({
              loading: false,
            })
          },
          (error) => {
            this.toast.error("Failed to ", { duration: 3000 })
            this.patchState({
              loading: false
            })
          }
        )
      )
    }
    )
  ))

  renameBoardListEffect = this.effect<{ listId: string, title: string }>(input$ => input$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap(({ listId, title }) => this.data.userUpdateBoardList({
      boardListId: listId,
      input: {
        title,
      }
    }).pipe(
      tapResponse(
        (res) => {
          this.toast.success('Successfully renamed list', { duration: 3000 })
          this.updateList(res.data.updated);
          this.patchState({
            loading: false,
          })
        },
        (error) => {
          this.toast.error("Failed to rename", { duration: 3000 })
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  deleteBoardListEffect = this.effect<string>(boardListId$ => boardListId$.pipe(
    tap(() => { this.patchState({ loading: true }) }),

    switchMap((boardListId) => this.data.userDeleteBoardList({
      boardListId,
    }).pipe(
      tapResponse(
        (res) => {
          this.toast.success('Successfully deleted list', { duration: 3000 })
          this.deleteList(res.data.deleted);
          this.patchState({
            loading: false,
          })
        },
        (error) => {
          this.toast.error("Failed to delete list", { duration: 3000 })
          this.patchState({
            loading: false
          })
        }
      )
    )
    )
  ))

  addCardEffect = this.effect<UserCreateBoardCardInput>(input$ => input$.pipe(
    tap((input) => { this.patchState({ loading: true }) }),
    withLatestFrom(this.board$),
    switchMap(([input, board]) => {
      const list = board.lists.find((el) => el.id === input.boardListId);
      input.position = list.cards?.length ? list.cards[list.cards.length - 1].position + this._positionStep : this._positionStep

      return this.data.userCreateBoardCard({ input }).pipe(
        tapResponse(
          (res) => {
            this.toast.success('Successfully added card', { duration: 3000 })
            this.addCard(res.data.created);
            console.log(res.data.created);
            this.patchState({
              loading: false,
            })
          },
          (error) => {
            this.toast.error("Failed to add card", { duration: 3000 })
            this.patchState({
              loading: false
            })
          }
        )
      )
    }
    )
  ))

  updateCardEffect = this.effect<UserUpdateBoardCardInput>(input$ => input$.pipe(
    tap(() => { this.patchState({ loading: true }) }),
    switchMap((data) => {
      return this.data.userUpdateBoardCard({ boardCardId: data.id, input: data }).pipe(
        tapResponse(
          (res) => {
            this.toast.success('Successfully updated card', { duration: 3000 })
            this.updateCard(res.data.updated)
            console.log("Updated BoardCard: ", res.data.updated)
            this.patchState({
              loading: false,
            })
          },
          (error) => {
            this.toast.error("Failed to update card", { duration: 3000 })
            this.patchState({
              loading: false
            })
          }
        )
      )
    }
    )
  ))

  changeListPositionEffect = this.effect<{ boardListId: string, position: number }>(input$ => input$.pipe(
    tap((input) => { this.patchState({ loading: true }) }),
    switchMap((input) => {
      const { boardListId, position } = input;
      return this.data.userUpdateBoardList({ boardListId, input: { position } }).pipe(
        tapResponse(
          (res) => {
            this.toast.success('Successfully updated', { duration: 3000 })
            this.patchState({
              loading: false,
            })
          },
          (error) => {
            this.toast.error("Failed to update", { duration: 3000 })
            this.patchState({
              loading: false
            })
          }
        )
      )
    }
    )
  ))
}
