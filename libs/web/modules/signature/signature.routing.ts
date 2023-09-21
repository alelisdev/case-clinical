import { Route } from '@angular/router';
import { SignatureComponent } from './signature.component';

export const signatureRoutes: Route[] = [
    {
        path     : ':legalCaseId',
        component: SignatureComponent
    }
];
