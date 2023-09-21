import { Injectable } from '@nestjs/common'
import { ApiCoreDataAccessService, CorePaging } from '@case-clinical/api/core/data-access'
import { UserListStepInput } from './dto/user-list-step.input'
import { UserCreateStepInput } from './dto/user-create-step.input'
import { UserUpdateStepInput } from './dto/user-update-step.input'

@Injectable()
export class ApiStepDataAccessUserService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async userSteps(userId: string, input?: UserListStepInput) {
    return this.data.step.findMany({
      where: {
        AND: [
          {
            title: { contains: input?.title },
            courseId: input.courseId,
          },
        ],
      },
      take: input?.limit,
      skip: input?.skip,
      include: { course: true },
    })
  }

  async userCountSteps(userId: string, input?: UserListStepInput): Promise<CorePaging> {
    const total = await this.data.step.count({
      where: {
        title: {
          contains: input?.title,
        },
      },
    })

    return {
      limit: input?.limit,
      skip: input?.skip,
      total,
    }
  }

  async userStep(userId: string, stepId) {
    return this.data.step.findUnique({
      where: { id: stepId },
      include: { course: true },
    })
  }

  async userCreateStep(userId: string, input: UserCreateStepInput) {
    const course = await this.data.course.findUnique({ where: { id: input.courseId } })
    const createResult = await this.data.step.create({
      data: {
        course:
          input.courseId != null
            ? {
                connect: {
                  id: input.courseId,
                },
              }
            : undefined,
        title: input.title,
        order: course.totalSteps,
        subtitle: input.subtitle,
        content: input.content
      },
      include: { course: true },
    })
    await this.data.course.update({
      where: { id: input.courseId },
      data: {
        totalSteps: {
          increment: 1
        }
      }
    })
    return createResult;
  }

  async userUpdateStep(
    userId: string,
    stepId: string,
    input: UserUpdateStepInput,
  ) {
    return this.data.step.update({
      where: { id: stepId },
      data: {
        title: input.title,
        order: input.order,
        subtitle: input.subtitle,
        content: input.content
      },
      include: { course: true },
    })
  }

  async userDeleteStep(userId: string, stepId: string) {
    return this.data.step.delete({ where: { id: stepId } })
  }

  async updateStepOrder(stepId: string, order: number) {
    const step = await this.data.step.findUnique({
      where: { id: stepId }
    });
    if(step.order < order) {
      await this.data.step.updateMany({
        where: {
          AND: {
            courseId: step.courseId,
            order: {
              lte: order,
              gt: step.order
            }
          }
        },
        data: {
          order: {
            decrement: 1
          }
        }
      })
    } else if(step.order > order) {
      await this.data.step.updateMany({
        where: {
          AND: {
            courseId: step.courseId,
            order: {
              gte: order,
              lt: step.order
            }
          }
        },
        data: {
          order: {
            increment: 1
          }
        }
      })
    }

    return this.data.step.update({
      where: {
        id: stepId
      },
      data: {
        order: order
      }
    })
  }
}
