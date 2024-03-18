/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef, LayoutConfig, LayoutState } from '@/types';
import { LayoutContext } from './context/layoutcontext';
import { PrimeReactContext } from 'primereact/api';
import AppProfileSidebar from './AppProfileSidebar';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar, setLayoutConfig, setLayoutState } = useContext(LayoutContext);
    const { changeTheme } = useContext(PrimeReactContext);

    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));

    const toggleDarkTheme = () => {
        const isDark = layoutConfig.colorScheme === 'dark';
        const theme = isDark ? 'lara-light-green' : 'lara-dark-green';
        const colorScheme = isDark ? 'light' : 'dark';

        console.log(layoutConfig.theme, theme, colorScheme);
        changeTheme?.(layoutConfig.theme, theme, 'theme-css', () => {
            setLayoutConfig((prevState: LayoutConfig) => ({ ...prevState, theme, colorScheme }));
        });
    };

    const onConfigButtonClick = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: true }));
    };

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>Bank Sampah</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button" onClick={toggleDarkTheme}>
                    <i className={layoutConfig.colorScheme === 'dark' ? 'pi pi-sun' : 'pi pi-moon'}></i>
                    <span>Theme</span>
                </button>
                <button type="button" className="p-link layout-topbar-button" onClick={onConfigButtonClick}>
                    <i className="pi pi-user"></i>
                    <span>Profile</span>
                </button>

                <AppProfileSidebar />
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
