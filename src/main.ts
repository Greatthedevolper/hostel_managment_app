import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  UserOutline,
  SettingOutline,
  EditOutline,
  ShareAltOutline,
  MenuFoldOutline,
  MenuUnfoldOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  UserOutline,
  SettingOutline,
  EditOutline,
  ShareAltOutline,
  MenuFoldOutline,
  MenuUnfoldOutline
];

import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);


