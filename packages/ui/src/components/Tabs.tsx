import React, { useMemo, useState } from 'react';
import {
  StyledTab,
  StyledTabs,
  TabButton,
  TabsBody,
  TabsButtonGroup,
} from './Tabs.styles';
import { I18n } from './I18n';
import { I18nProvider } from '@dailies-tracker/i18n';

export type TabsProps = {
  children?: React.ReactNode;
};

export type TabProps = {
  title: keyof I18nProvider;
  children?: React.ReactNode;
};

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = useMemo(
    () =>
      React.Children.toArray(children ?? []).map((child) => {
        if (!React.isValidElement(child)) {
          throw new Error('Invalid child');
        }
        return {
          child,
          title: child.props.title,
        };
      }) as { child: React.ReactElement<TabProps>; title: string }[],
    [children]
  );

  return (
    <StyledTabs>
      <TabsButtonGroup>
        {tabs.map(({ title }, i) => (
          <TabButton
            key={title}
            onClick={() => setActiveTab(i)}
            active={i === activeTab}
          >
            <I18n iden={title} />
          </TabButton>
        ))}
      </TabsButtonGroup>
      <TabsBody>{tabs[activeTab].child}</TabsBody>
    </StyledTabs>
  );
};

export const Tab: React.FC<TabProps> = ({ children }) => (
  <StyledTab>{children}</StyledTab>
);
