'use client';

import { Sidebar } from 'primereact/sidebar';
import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { LayoutState } from '@/types';

const AppProfileSidebar = () => {
    const { layoutConfig, setLayoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);

    const onConfigSidebarHide = () => {
        setLayoutState((prevState: LayoutState) => ({ ...prevState, configSidebarVisible: false }));
    };
    return (
        <Sidebar visible={layoutState.configSidebarVisible} onHide={onConfigSidebarHide} position="right" className="layout-config-sidebar w-20rem">
            <h5>PrimeOne Design</h5>
            <div className="grid"></div>
        </Sidebar>
    );
};

export default AppProfileSidebar;
