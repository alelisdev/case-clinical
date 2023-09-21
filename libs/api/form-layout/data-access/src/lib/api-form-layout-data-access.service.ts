import { BadRequestException, Injectable } from '@nestjs/common'
import { ApiCoreSharedService } from '@case-clinical/api/core/data-access'
import { UserFormLayoutCreateInput } from './dto/user-form-layout-create-input';
import { UserChildFormCreateInput } from './dto/user-child-form-create-input';
import { UserChildFormUpdateInput } from './dto/user-child-form-update-input';

@Injectable()
export class ApiFormLayoutDataAccessService {
  constructor(private readonly data: ApiCoreSharedService) { }

  async publicFormLayouts(formName: string) {
    const formLayouts = await this.data.formLayout.findMany({
      where: {
        name: { contains: formName }
      },
      include: { children: true }
    });
    const modalLayoutNames = [
      'appointmentView',
      'providerPatientProfileRequestMoreVisitsModal',
      'requestMoreVisitsModal',
      'providerPatientProfileRecOrderModal',
      'providerPatientProfileReferralModal',
      'providerPatientProfileDMEModal',
      'providerPatientProfileImagingModal',
      'providerPatientProfileRequestMoreVisitsModal'
    ];
    const modalLayouts = await this.data.formLayout.findMany({
      where: {
        name: {
          in: modalLayoutNames
        },
      },
      include: { children: true }
    })

    return formLayouts.concat(modalLayouts).map(async (formLayout) => {
      const { name, config } = formLayout;
      const customLayouts = {};
      await this.getCustomLayouts(name, config, customLayouts, true);
      const children = [];
      if(formLayout.children?.length > 0) {
        for(let i = 0; i < formLayout.children.length; i++) children.push(await this.publicFormLayout(formLayout.children[i].name));
      }
      return { ...formLayout, customLayouts: JSON.stringify(customLayouts), children }
    })
  }

  async userAdminFormLayouts() {
    const formLayouts = await this.data.formLayout.findMany({
      where: {
        OR: [
          {
            name: { endsWith: 'create' }
          },
          {
            name: { endsWith: 'edit' }
          },
          {
            name: { endsWith: 'overview' }
          },
          {
            name: {
              in: [
                'legalCase_negotiations'
              ]
            }
          }
        ],
        type: 0,
      },
      include: { children: true }
    });

    return formLayouts.map(async (formLayout) => {
      const { name, config } = formLayout;
      const customLayouts = {};
      await this.getCustomLayouts(name, config, customLayouts, true);
      const children = [];
      if(formLayout.children?.length > 0) {
        for(let i = 0; i < formLayout.children.length; i++) children.push(await this.publicFormLayout(formLayout.children[i].name));
      }
      return { ...formLayout, customLayouts: JSON.stringify(customLayouts), children }
    })
  }

  async publicFormLayout(formName: string, id: string = undefined) {
    let formLayout = await this.data.formLayout.findFirst({
      where: {
        name: formName,
        id
      },
      include: {
        children: true
      }
    });
    if(!formLayout) {
      formLayout = await this.data.formLayout.create({
        data: {
          name: formName,
          type: 0,
        },
        include: {
          children: true,
        }
      })
    }
    const { name, config } = formLayout;
    const customLayouts = {};
    await this.getCustomLayouts(name, config, customLayouts, true);
    const children = [];
    if(formLayout.children?.length > 0) {
      for(let i = 0; i < formLayout.children.length; i++) children.push(await this.publicFormLayout(undefined, formLayout.children[i].id));
    }
    return { ...formLayout, customLayouts: JSON.stringify(customLayouts), children }
  }

  async userCreateChildForm(input: UserChildFormCreateInput) {
    const parentCount = await this.data.formLayout.count({ where: { id: input.parentId, name: input.parentName } });

    const formLayout = await this.data.formLayout.create({
      data: {
        config: input.config,
        type: 0,
        parentId: input.parentId,
        order: input.order,
        title: input.title,
        name: parentCount === 0 ? input.parentName : undefined
      },
    });
    const { name, config } = formLayout;
    const customLayouts = {};
    await this.getCustomLayouts(name, config, customLayouts, true);
    return { ...formLayout, customLayouts: JSON.stringify(customLayouts) }
  }

  async userUpdateChildForm(input: UserChildFormUpdateInput) {
    const formLayout = await this.data.formLayout.update({
      where: { id: input.formLayoutId },
      data: {
        config: input.config,
        title: input.title,
        order: input.order,
        testData: input.testData,
        modelData: input.modelData,
      }
    })
    const { id, name, config } = formLayout;
    const customLayouts = {};
    await this.getCustomLayouts(name, config, customLayouts, true);
    return { ...formLayout, customLayouts: JSON.stringify(customLayouts) }
  }

  async userDeleteChildForm(formId: string) {
    const formLayout = await this.data.formLayout.findFirst({ where: { id: formId } });
    if(!formLayout) throw new BadRequestException(`Cannot find form with ID: ${formId}`);
    if(formLayout.name) throw new BadRequestException('Cannot delete main view');

    await this.data.formLayout.delete({ where: { id: formId } });
    return formId;
  }

  async userFormLayout(userId: string, formName: string) {
    const formLayout = await this.data.formLayout.findFirst({
      where: {
        name: formName
      }
    });
    if (formLayout) {
      const { id, name, config } = formLayout;
      const customLayouts = {};
      await this.getCustomLayouts(name, config, customLayouts, true);
      return { ...formLayout, customLayouts: JSON.stringify(customLayouts) }
    } else {
      return null;
    }
  }

  async getCustomLayouts(name: string, formConfig: string, customLayouts: any, skip=false) {
    const customConfigRegExp = /(custom-component|custom-wrapper)[^a-zA-Z]+name[^a-zA-Z]+([a-z_A-Z/-]+)/g

    if(Object.keys(customLayouts).includes(name)) return;

    if (formConfig?.length > 0) {
      let m;
      const customLayoutNames = [];
      do {
        m = customConfigRegExp.exec(formConfig);
        if (m) {
          customLayoutNames.push(m[2]);
        }
      } while (m)

      if(customLayoutNames.length > 0) {
        if(!skip)
          customLayouts[name] = formConfig;
        for(const key in customLayoutNames) {
          const _formName = customLayoutNames[key];
          const formLayout = await this.data.formLayout.findFirst({
            where: {
              name: _formName
            }
          });
          if(formLayout) {
            const { name, config } = formLayout;
            await this.getCustomLayouts(name, config, customLayouts);
          }
        }
      } else {
        if(!skip)
          customLayouts[name] = formConfig;
      }
    }
  }

  async userWebTemplates(userId: string) {
    return this.data.formLayout.findMany({
      where: {
        type: 2,
      }
    })
  }

  async userWebWrappers(userId: string) {
    return this.data.formLayout.findMany({
      where: {
        type: 3,
      }
    })
  }

  async userWebTemplate(userId: string, formName: string) {
    return this.userFormLayout(userId, formName);
  }

  async userWebWrapper(userId: string, formName: string) {
    return this.userFormLayout(userId, formName);
  }

  async userWebComponent(userId: string, formName: string) {
    return this.userFormLayout(userId, formName);
  }

  async userWebComponents(userId: string) {
    return this.data.formLayout.findMany({
      where: {
        type: 1,
      }
    })
  }

  async userDeleteFormLayout(userId: string, formName: string) {
    const existing = await this.data.formLayout.findFirst({
      where: {
        id: formName
      }
    })
    if (!existing) {
      throw new BadRequestException('form layout does not exist')
    }

    return this.data.formLayout.delete({
      where: {
        id: formName
      }
    })
  }

  async userCreateFormLayout(userId: string, input: UserFormLayoutCreateInput) {
    const existing = await this.data.formLayout.findFirst({
      where: {
        id: input.name
      }
    })
    if (existing) {
      throw new BadRequestException('Form layout with the same name exists already');
    }

    return this.data.formLayout.create({
      data: {
        id: input.name,
        name: input.name,
        config: input.config,
        type: input.type ?? 0,
        parentId: input.parentId
      }
    })
  }

  async userUpdateFormLayout(userId: string, formName: string, config: string, type = 0, previewImage = null, testData = null, modelData=undefined) {
    return this.data.formLayout.upsert({
      where: {
        id: formName
      },
      create: {
        id: formName,
        name: formName,
        config: config,
        type
      },
      update: {
        config: config,
        previewImage,
        testData,
        modelData,
      }
    })
  }
}

