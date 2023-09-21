import { Layout } from 'libs/web/layout/feature/web-layout/src/lib/layout.types'


// Types
export type Scheme = 'auto' | 'dark' | 'light';
export type Screens = { [key: string]: string };
export type Theme = 'theme-default' | string;
export type Themes = { id: string; name: string }[];
export type AgGridTheme = 'alpine' | 'alpine-dark' | 'balham' | 'balham-dark' | 'material';

/**
 * AppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface AppConfig
{
    layout: Layout;
    scheme: Scheme;
    screens: Screens;
    theme: Theme;
    agGridTheme: AgGridTheme;
    themes: Themes;
    language: string;
    dateFormat: string;
    currency: string;
}

/**
 * Default configuration for the entire application. This object is used by
 * FuseConfigService to set the default configuration.
 *
 * If you need to store global configuration for your app, you can use this
 * object to set the defaults. To access, update and reset the config, use
 * FuseConfigService and its methods.
 *
 * "Screens" are carried over to the BreakpointObserver for accessing them within
 * components, and they are required.
 *
 * "Themes" are required for Tailwind to generate themes.
 */
export const appConfig: AppConfig = {
    layout : 'modern',
    agGridTheme: 'balham',
    scheme : 'light',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    currency: '$',
    screens: {
        sm: '600px',
        md: '960px',
        lg: '1280px',
      xl: '1440px'
    },
    theme  : 'theme-brand',
    themes : [
        {
            id  : 'theme-default',
            name: 'Default'
        },
        {
            id  : 'theme-brand',
            name: 'Brand'
        },
        {
            id  : 'theme-teal',
            name: 'Teal'
        },
        {
            id  : 'theme-rose',
            name: 'Rose'
        },
        {
            id  : 'theme-purple',
            name: 'Purple'
        },
        {
            id  : 'theme-amber',
            name: 'Amber'
        }
    ]
};
