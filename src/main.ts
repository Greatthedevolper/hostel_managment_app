import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import {
  UserOutline,
  SettingOutline,
  EditOutline,
  ShareAltOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
} from '@ant-design/icons-angular/icons';

import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';

const icons = [
  UserOutline,
  SettingOutline,
  EditOutline,
  ShareAltOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // ✅ use this
    provideNzIcons(icons),
    ...(appConfig.providers || []),
  ],
});
