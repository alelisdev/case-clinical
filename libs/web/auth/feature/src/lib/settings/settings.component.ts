import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'settings',
  template: `
    <auth-normal-settings [panels]="allPanels" *ngIf="!signupSettings"></auth-normal-settings>
    <auth-sign-up-settings [panels]="panels" *ngIf="signupSettings" class="w-full h-full flex"></auth-sign-up-settings>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent{
  signupSettings = false;

  adminPanels = [
    {
      id: 'role',
      icon: 'heroicons_outline:user-group',
      title: 'Role Designer',
      description: 'Manage user roles'
    },
    {
      id: 'team',
      icon: 'heroicons_outline:user-group',
      title: 'Team',
      description: 'Manage your existing team and change roles/permissions'
    },
    {
      id: 'tenant',
      icon: 'heroicons_outline:user-group',
      title: 'Tenant',
      description: 'Manage your tenants'
    },
  ]

  panels = [
    {
      id: 'account',
      icon: 'heroicons_outline:user-circle',
      title: 'Account',
      description: 'Manage your public profile and private information'
    },
    {
      id: 'security',
      icon: 'heroicons_outline:lock-closed',
      title: 'Security',
      description: 'Manage your password and 2-step verification preferences'
    },
    {
      id: 'plan-billing',
      icon: 'heroicons_outline:credit-card',
      title: 'Plan & Billing',
      description: 'Manage your subscription plan, payment method and billing information'
    },
    {
      id: 'feature',
      icon: 'heroicons_outline:user-group',
      title: 'Features',
      description: 'Manage your features'
    },
    {
      id: 'notifications',
      icon: 'heroicons_outline:bell',
      title: 'Notifications',
      description: 'Manage when you\'ll be notified on which channels'
    },
    {
      id: 'theme',
      icon: 'heroicons_outline:cog',
      title: 'Theme',
      description: 'Manage theme and layout settings'
    },
    {
      id: 'formly-settings',
      icon: 'heroicons_outline:cog',
      title: 'Formly Setting',
      description: 'Manage Formly Setting'
    },
  ];

  get allPanels() {
    return [...this.panels, ...this.adminPanels]
  }
}
