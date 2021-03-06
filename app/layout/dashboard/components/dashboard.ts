import {Component, ViewEncapsulation} from 'angular2/core';
import {
RouteConfig,
ROUTER_DIRECTIVES
} from 'angular2/router';

import {HomeCmp} from '../../../pages/home/components/home';
import {ChartCmp} from '../../../pages/charts/components/charts';
import {ReportsCmp} from '../../../pages/reports/components/reports';
import {GridCmp} from '../../../pages/grid/components/grid';
import {FormCmp} from '../../../pages/forms/components/forms';
import {SettingsCmp} from '../../../pages/settings/components/settings';
import {TableCmp} from '../../../pages/tables/components/tables';
import {BSCmp} from '../../../pages/bootstrap-element/components/bs_element';
import {BlockedUsersCmp} from '../../../pages/blocked-users/components/blocked.users';
import {BlankPageCmp} from '../../../pages/blank-page/components/blank_page';
import {ComponentCmp} from '../../../pages/component/components/component';
import {TopNavCmp} from '../../../widgets/topnav/components/topnav';
import {SidebarCmp} from '../../../widgets/sidebar/components/sidebar';
import {ProfileCmp} from '../../../pages/profile/components/profile';

@Component({
  selector: 'dashboard',
  templateUrl: './layout/dashboard/components/dashboard.html',
  encapsulation: ViewEncapsulation.None,
  directives: [ROUTER_DIRECTIVES, TopNavCmp, SidebarCmp]
})
@RouteConfig([
  { path: '/', component: HomeCmp, as: 'Home', useAsDefault:true},
  { path: '/charts', component: ChartCmp, as: 'Chart' },
  { path: '/reports', component: ReportsCmp, as: 'Reports' },
  { path: '/grid', component: GridCmp, as: 'Grid' },
  { path: '/tables', component: TableCmp, as: 'Tables' },
  { path: '/forms', component: FormCmp, as: 'Forms' },
  { path: '/settings', component: SettingsCmp, as: 'Settings' },
  { path: '/bootstrap-element', component: BSCmp, as: 'BSElement' },
  { path: '/blocked.users', component: BlockedUsersCmp, as: 'BlockedUsers' },
  { path: '/component', component: ComponentCmp, as: 'Component' },
  { path: '/blank-page', component: BlankPageCmp, as: 'BlankPage' },
  { path: '/profile', component: ProfileCmp, as: 'Profile' }
])
export class DashboardCmp {}
