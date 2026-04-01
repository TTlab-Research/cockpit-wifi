import React from 'react';
import { Page, PageSection } from '@patternfly/react-core';

import { AccessPointPage } from './components/AccessPoint/AccessPointPage';

export const Application: React.FC = () => {
    return (
        <Page>
            <PageSection>
                <AccessPointPage />
            </PageSection>
        </Page>
    );
};
