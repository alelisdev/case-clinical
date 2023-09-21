import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common'
import {
  ApiCoreDataAccessService,
  CorePaging,
  CorePagingInput,
  UpdateResult,
} from '../../../../../core/data-access/src'
import { UserCreateChatUsers } from './dto/user-create-chat-users.input'
import axios from 'axios'

import * as https from 'https'
import * as fs from 'fs'

let httpsAgent
// if (process.env.NODE_ENV === 'development') {
httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})
// }else{
//   httpsAgent = new https.Agent({
//     rejectUnauthorized: true,
//     cert: fs.readFileSync(process.env.CERTIFICATE_PATH),
//   });
// }
axios.defaults.httpsAgent = httpsAgent

@Injectable()
export class ApiChatUsersDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async getChatUsers() {
    try {
      return await this.data.chatUsers.findMany({
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: [
          {
            user: {
              firstName: 'asc',
            },
          },
          {
            user: {
              lastName: 'asc',
            },
          },
        ],
      })
    } catch (error) {
      throw new InternalServerErrorException('Error while fetching chat users', error)
    }
  }

  async createChatUsers(input: UserCreateChatUsers) {
    try {
      const response = await axios.post(process.env.MATRIX_CHAT_URL + '/v1/register', {
        username: input.userId,
        password: input.userId,
        name: input.firstname + ' ' + input.lastname,
      })

      // // console.log(response)

      if (response.status === 200 && response.statusText === 'OK') {
        await this.data.chatUsers.create({
          data: {
            userId: input.userId,
            // name: input.firstname + ' ' + input.lastname, will check if needed
            matrixUserId: response?.data?.body?.user_id,
          },
        })
      }
      return response
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error while creating chat users', error)
    }
  }

  async loginMatrixUser(userId: string) {
    try {
      const response = await axios.post(
        process.env.MATRIX_CHAT_URL + '/v1/login',
        {
          username: userId,
          password: userId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response.data.body
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Error while Logging in', error)
    }
  }

  async createChatRoom({ fromId, toId, access_token, refresh_token }) {
    try {
      const isRoomExist = await this.data.chatUserMapping.findMany({
        where: {
          OR: [
            {
              to: toId,
              from: fromId,
            },
            {
              to: fromId,
              from: toId,
            },
          ],
        },
      })
      if (isRoomExist.length > 0) {
        return { room_id: isRoomExist[0].roomId }
      } else {
        const response: any = await axios.post(
          process.env.MATRIX_CHAT_URL + '/v1/room/create',
          {
            is_direct: true,
            preset: 'trusted_private_chat',
            invite: [toId],
            topic: 'direct',
            access_token: access_token,
            refresh_token: refresh_token,
            initial_state: [
              {
                content: {
                  history_visibility: 'invited',
                },
                type: 'm.room.history_visibility',
              },
            ],
            // creation_content: {
            //   'm.federate': false,
            // },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        await this.data.chatUserMapping.create({
          data: {
            from: fromId,
            to: toId,
            roomId: response.data.room_id,
          },
        })
        return response.data
      }
    } catch (error) {
      // console.error(error)
      throw new InternalServerErrorException('Error while creating chat room', error)
    }
  }

  async joinChatRoom({ roomId, access_token, refresh_token }) {
    try {
      const response: any = await axios.post(
        process.env.MATRIX_CHAT_URL + '/v1/room/join',
        {
          access_token: access_token,
          refresh_token: refresh_token,
          room_id: roomId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response?.data
    } catch (error) {
      // console.log(error)
      throw new InternalServerErrorException('Error while joining chat room', error)
    }
  }
}
