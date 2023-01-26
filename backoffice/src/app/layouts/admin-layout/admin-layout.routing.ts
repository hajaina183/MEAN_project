import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { VoitureDiagnostiqueComponent } from '../../voiture-diagnostique/voiture-diagnostique.component';
import { VoitureGarageComponent } from '../../voiture-garage/voiture-garage.component';
import { DepenseComponent } from '../../depense/depense.component';
import { ValiderPaiementComponent } from '../../valider-paiement/valider-paiement.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'voiture-diagnostique',     component: VoitureDiagnostiqueComponent },
    { path: 'voiture-garage',     component: VoitureGarageComponent },
    { path: 'depense',     component: DepenseComponent },
    { path: 'valider-paiement',     component: ValiderPaiementComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
