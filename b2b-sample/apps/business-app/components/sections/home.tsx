/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { LogoComponent } from "@b2bsample/business-app/ui/ui-components";
import { signout } from "@b2bsample/business-app/util/util-authorization-config-util";
import { FooterComponent, HomeComponent, SignOutComponent } from "@b2bsample/shared/ui/ui-components";
import React, { useState } from "react";
import "rsuite/dist/rsuite.min.css";
import DashboardSectionComponent from "./sections/dashboardSection/dashboardSectionComponent";
import sideNavData from "../../../../libs/business-app/ui-assets/src/lib/data/sideNav.json";
import Custom500 from "../../pages/500";


/**
 * 
 * @param prop - orgId, name, session, colorTheme
 *
 * @returns The home section. Mainly side nav bar and the section to show other settings sections.
 */
export default function Home(prop) {

    const { orgId, session } = prop;

    const [ activeKeySideNav, setActiveKeySideNav ] = useState("1");
    const [ signOutModalOpen, setSignOutModalOpen ] = useState(false);

    const mainPanelComponenet = (activeKey) => {
        switch (activeKey) {
            case "1":

                return <DashboardSectionComponent orgId={ orgId } session={ session } />;
        }
    };

    const signOutCallback = () => {
        signout(session);
    };

    const activeKeySideNavSelect = (eventKey) => {
        setActiveKeySideNav(eventKey);
    };

    const signOutModalClose = () => {
        setSignOutModalOpen(false);
    };

    return (
        <div>
            <SignOutComponent
                open={ signOutModalOpen }
                onClose={ signOutModalClose }
                signOutCallback={ signOutCallback } />

            { session
                ? (

                    <HomeComponent
                        scope={ session.scope }
                        sideNavData = { sideNavData }
                        activeKeySideNav={ activeKeySideNav }
                        activeKeySideNavSelect={ activeKeySideNavSelect }
                        setSignOutModalOpen={ setSignOutModalOpen }
                        logoComponent={ <LogoComponent imageSize="small" white={ true } /> }>

                        { mainPanelComponenet(activeKeySideNav) }

                    </HomeComponent>
                )
                : <Custom500 /> }

            <FooterComponent />
        </div>
    );
}
