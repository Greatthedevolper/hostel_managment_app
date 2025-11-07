// src/app/components/layout/sidebar-layout.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconService } from 'ng-zorro-antd/icon';
// Icons (keep your existing icon imports)
import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  UserOutline,
  TeamOutline,
  DollarOutline,
  ToolOutline,
  BarChartOutline,
  SettingOutline,
  LogoutOutline,
  BellOutline,
  DownOutline,
} from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzAvatarModule,
    NzDropDownModule,
    NzBreadCrumbModule,
  ],
  template: `
    <nz-layout class="min-h-screen">
      <!-- Header -->
      <nz-header class="bg-white shadow-sm border-b border-gray-200 px-2!">
        <div class="flex items-center justify-between h-full">
          <!-- Left Side: Toggle & Breadcrumb -->
          <div class="flex items-center space-x-4">
            <div
              class="p-4 border-b border-gray-200 flex items-center justify-center"
            >
              <div class="flex items-center space-x-2" *ngIf="!isCollapsed">
                <div
                  class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
                >
                  <span class="text-white font-bold text-sm">HM</span>
                </div>
                <span class="text-lg font-semibold text-gray-300"
                  >Hostel Manager</span
                >
              </div>
              <div
                *ngIf="isCollapsed"
                class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
              >
                <span class="text-white font-bold text-sm">HM</span>
              </div>
            </div>
          </div>

          <!-- Right Side: User Menu & Notifications -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button
              nz-button
              nzType="text"
              nzShape="circle"
              class="text-white hover:text-blue-600"
            >
              <span nz-icon nzType="bell" class="text-white! "></span>
            </button>

            <!-- User Dropdown -->
            <div
              nz-dropdown
              [nzDropdownMenu]="userMenu"
              nzPlacement="bottomRight"
            >
              <div
                class="flex items-center gap-2 cursor-pointer rounded-lg px-3 py-2 border hover:border-white"
              >
                <nz-avatar
                  nzSrc="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
                  nzSize="small"
                ></nz-avatar>
                <span class="text-sm font-medium text-white hidden sm:block"
                  >Admin User</span
                >
                <span nz-icon nzType="down" class="text-white! "></span>
              </div>
            </div>
          </div>
        </div>
      </nz-header>

      <!-- User Dropdown Menu -->
      <nz-dropdown-menu #userMenu="nzDropdownMenu">
        <ul nz-menu class="w-48">
          <li nz-menu-item>
            <span nz-icon nzType="user"></span>
            <span>Profile</span>
          </li>
          <li nz-menu-item>
            <span nz-icon nzType="setting"></span>
            <span>Account Settings</span>
          </li>
          <li nz-menu-divider></li>
          <li nz-menu-item (click)="logout()" class="text-red-600">
            <span nz-icon nzType="logout"></span>
            <span>Logout</span>
          </li>
        </ul>
      </nz-dropdown-menu>

      <!-- Content Area -->
      <nz-content class=" bg-black h-[calc(100vh-64px)] flex! gap-2">
        <!-- Sidebar -->
        <nz-sider
          [(nzCollapsed)]="isCollapsed"
          [nzWidth]="240"
          [nzCollapsedWidth]="80"
          [nzTrigger]="null"
          class="shadow-lg pt-4"
        >
          <ul
            nz-menu
            nzTheme="dark"
            [nzInlineCollapsed]="isCollapsed"
            class="border-none pt-2"
          >
            <li nz-menu-item nzMatchRouter routerLink="/dashboard">
              <span nz-icon nzType="dashboard"></span>
              <span>Dashboard</span>
            </li>

            <li nz-menu-item nzMatchRouter routerLink="/students">
              <span nz-icon nzType="user"></span>
              <span>Students</span>
            </li>

            <li nz-menu-item nzMatchRouter routerLink="/rooms">
              <span nz-icon nzType="team"></span>
              <span>Rooms</span>
            </li>

            <li nz-menu-item nzMatchRouter routerLink="/home">
              <span nz-icon nzType="dollar"></span>
              <span>Home</span>
            </li>

            <li nz-menu-item nzMatchRouter routerLink="/maintenance">
              <span nz-icon nzType="tool"></span>
              <span>Maintenance</span>
            </li>

            <li nz-menu-item nzMatchRouter routerLink="/profile">
              <span nz-icon nzType="bar-chart"></span>
              <span>Profile</span>
            </li>

            <li nz-menu-item nzMatchRouter routerLink="/settings">
              <span nz-icon nzType="setting"></span>
              <span>Settings</span>
            </li>
          </ul>
        </nz-sider>
        <div class="bg-[#090707] min-h-full w-full">
          <ng-content></ng-content>
        </div>
      </nz-content>
    </nz-layout>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100vh;
      }

      .ant-layout-sider {
        background: linear-gradient(
          180deg,
          #1e3a8a 0%,
          #1e40af 100%
        ) !important;
      }

      .ant-menu-dark {
        background: transparent !important;
      }

      .ant-menu-item-selected {
        background-color: rgba(255, 255, 255, 0.1) !important;
      }
    `,
  ],
})
export default class SidebarLayoutComponent {
  isCollapsed = false;

  constructor(private iconService: NzIconService) {
    this.iconService.addIcon(
      MenuFoldOutline,
      MenuUnfoldOutline,
      DashboardOutline,
      UserOutline,
      TeamOutline,
      DollarOutline,
      ToolOutline,
      BarChartOutline,
      SettingOutline,
      LogoutOutline,
      BellOutline,
      DownOutline
    );
  }

  logout() {
    console.log('Logout clicked');
    // Add your logout logic here
  }
}
