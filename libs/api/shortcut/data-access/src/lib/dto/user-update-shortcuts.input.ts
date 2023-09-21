import { Field, InputType } from '@nestjs/graphql'
import { UserUpdateShortcutInput } from './user-update-shortcut.input'

@InputType()
export class UserUpdateShortcutsInput {
  @Field(() => [UserUpdateShortcutInput], {nullable: true }) 
  shortcuts: UserUpdateShortcutInput[]
}
