
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { ApiCoreSharedService, CorePaging, CorePagingInput, UpdateResult  } from '@case-clinical/api/core/data-access'
import { UserCreateReviewInput } from './dto/user-create-review.input'
import { UserListReviewInput } from './dto/user-list-review.input'
import { UserUpdateReviewInput } from './dto/user-update-review.input'
import { UserUpdateReviewsInput } from './dto/user-update-reviews.input'

import { UserListClinicalProviderInput } from '@case-clinical/api/clinical-provider/data-access'

@Injectable()
export class ApiReviewDataAccessUserService {
  constructor(private readonly data: ApiCoreSharedService) {}

  async userReviews(userId: string, input?: UserListReviewInput) {
    let name = input?.name ? input.name : undefined

    return this.data.review.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },

      take: input?.limit,
      skip: input?.skip , include: {clinicalProvider: true, patient: true, childrenReviews: { include: { patient: true} }}
    })
  }

  async userSelectReviews(userId: string, input?: UserListReviewInput) {
    let name = input?.name ? input.name : undefined

    return this.data.review.findMany({
      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },
      select: {
        id: true,
        name: true
      },
      take: input?.limit,
      skip: input?.skip
    })
  }

  async userCountReviews(userId: string, input?: UserListReviewInput): Promise<CorePaging> {
    let name = input?.name ? input.name : undefined

    const total = await this.data.review.count(
    {

      where: {
            AND: [{
            name: { contains: name },
            clinicalProviderId: input?.clinicalProviderId,}]
          },

    }
        )

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }
  async getRatingReview(userId: string, clinicalProviderId) {
    const total = await this.data.review.aggregate(
      {
        _avg: {
          rating: true,
        },
        _count: {
          id: true,
        },
        where: {
              AND: [{
              clinicalProviderId: clinicalProviderId,}]
            },

      }
    )

    return total
  }

  async userReview(userId: string, reviewId) {

    return this.data.review.findUnique({ where: { id: reviewId } , include: { childrenReviews: { include: { patient: true} }, patient: true, clinicalProvider: true}  })
  }

  async checkReviewExist(reviewName: string) {
    try {
      return this.data.review.findMany({ where: { name: reviewName } })
    } catch (error) {
      throw new Error('Error while fetching data.')
    }
  }

  async userCreateReview(userId: string, input: UserCreateReviewInput) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    if(input.rating === undefined) input.rating = 0;

    try {
        const reviewData = await this.checkReviewExist(input.name)

        if (reviewData.length > 0) {
            throw new ConflictException("Record must be unique.")
        }



    await this.data.logEvent(sendingUser, true, 'Review', 'Create', input)

    let review = await this.data.review.create({
      data: {
        parentReview: input.parentId ? {
          connect: {
            id: input.parentId,
          }
        } : undefined,
                clinicalProvider:
                input.clinicalProviderId != null
                ? {
                        connect:  {
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name,
                    patient: input.patientId ? {
                      connect: {
                        id: input.patientId
                      }
                    } : undefined,
comment: input.comment,
rating: input.rating,
reivewDateAndTime: input.reivewDateAndTime,
}
, include: {clinicalProvider: true, patient: true,}
    })

    await this.data.logEvent(sendingUser, false, 'Review', 'Create', review)

    return review

    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in creating Review')
    }

  }





  async userUpdateReview(userId: string, reviewId: string, input: UserUpdateReviewInput) {

    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!reviewId) {
        throw new BadRequestException('Review Id is required')
      } else {

      const reviewData = await this.checkReviewExist(input.name)

      if (reviewData.length > 0) {
        if (reviewData[0].id != reviewId) {
          throw new ConflictException("Record must be unique.")
        }
      }



    await this.data.logEvent(sendingUser, true, 'Review', 'Update', input)

    let review = this.data.review.update({
      where: { id: reviewId },
      data: {
        parentReview: input.parentId ? {
          connect: {
            id: input.parentId,
          }
        } : undefined,
                clinicalProvider:
                input.clinicalProviderId != null
                ? {
                        connect:  {
                            id: input.clinicalProviderId
                        }
                    }: undefined,name: input.name,
                    patient: input.patientId ? {
                      connect: {
                        id: input.patientId
                      }
                    } : undefined,
comment: input.comment,
rating: input.rating,
reivewDateAndTime: input.reivewDateAndTime,

}
, include: {clinicalProvider: true, patient: true, childrenReviews: true}
    })

    await this.data.logEvent(sendingUser, false, 'Review', 'Update', review)

    return review

      }
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) {
        throw error
      }
      throw new InternalServerErrorException('Error in updating Review')
    }
  }

  async userUpdateReviews(userId: string, input: UserUpdateReviewsInput): Promise<UpdateResult> {
    const total = input.reviews.length
    let updated = []
    let created = []
    let failed = []

    for (const key in input.reviews) {
      const inputData = input.reviews[key]

      const data = {
        id: inputData.id,
name: inputData.name,
patientId: inputData.patientId,
clinicalProviderId: inputData.clinicalProviderId,
comment: inputData.comment,
rating: inputData.rating,
reivewDateAndTime: inputData.reivewDateAndTime,
parentId: inputData.parentId,

      }

      const reviewData = await this.checkReviewExist(inputData.name)

      if (reviewData.length > 0) {
        failed.push(inputData)
      } else {
        try {
          const result = await this.data.review.upsert({
            where: { id: inputData.id || '' },
            create: data,
            update: data,
          })

          if (result.id === inputData.id) updated.push(result)
          else {
            created.push(result)
          }
        } catch (error) {
          failed.push(inputData)
        }
      }
    }

    return {
      total,
      created: JSON.stringify(created),
      updated: JSON.stringify(updated),
      failed: JSON.stringify(failed),
    }
  }


  async userDeleteReview(userId: string, reviewId: string) {
    let sendingUser = (await this.data.user.findFirst({where: { id: userId }}))

    try {
      if (!reviewId) {
        throw new BadRequestException('Review Id is required')
      } else {



        await this.data.logEvent(sendingUser, true, 'Review', 'Delete', reviewId)

        let review = this.data.review.delete({
          where: { id: reviewId }
        })

        await this.data.logEvent(sendingUser, false, 'Review', 'Delete', review)

        return review

        }
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error
        }

        throw new InternalServerErrorException('Error in deleting Review')
    }
  }
}

