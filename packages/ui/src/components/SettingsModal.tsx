import * as i18nProviders from '@dailies-tracker/i18n';
import { I18n } from './I18n';
import { Modal, NewModalProps } from './Modal';
import {
  SettingsPanel,
  FormGroup,
  RewardsSection,
  RewardLine,
  RewardInputFields,
  RewardShowcase,
  RewardChooseImageButton,
  RealmsSection,
  RealmsTable,
} from './SettingsModal.styles';
import { Select } from './Select';
import {
  LanguageSelector,
  ShouldNotifySelector,
  ShowReleasePopupSelector,
  TimeBeforeAlertingSelector,
  useI18n,
  useRewardService,
} from '../states';
import { Checkbox } from './Checkbox';
import { useAsyncState, useLocalStorage } from '../hooks';
import { Button, TextButton } from './Button';
import { Reward } from './Reward';
import { Input, InputGroup } from './Input';
import { Camera, Plus, Trash2 } from 'react-feather';
import { useTheme } from 'styled-components';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from './Tabs';
import { useRecoilState } from 'recoil';

const availableLanguages = Object.entries(i18nProviders);

const validAlertingTimes: Record<number, string> = {
  [1000 * 60 * 5]: 'time.5minutes',
  [1000 * 60 * 15]: 'time.15minutes',
  [1000 * 60 * 30]: 'time.30minutes',
  [1000 * 60 * 60]: 'time.1hour',
  [1000 * 60 * 60 * 2]: 'time.2hours',
  [1000 * 60 * 60 * 4]: 'time.4hours',
  [1000 * 60 * 60 * 8]: 'time.8hours',
};

export const SettingsAndAboutModal: React.FC<NewModalProps> = (props) => {
  const [lang, setLang] = useRecoilState(LanguageSelector);
  const [showReleasePopup, setShowReleasePopup] = useRecoilState(
    ShowReleasePopupSelector
  );
  const [shouldNotify, setShouldNotify] = useRecoilState(ShouldNotifySelector);
  const [timeBeforeAlerting, setTimeBeforeAlerting] = useRecoilState(
    TimeBeforeAlertingSelector
  );
  const i18n = useI18n();
  const theme = useTheme();
  const rewardService = useRewardService();
  const [rewards, setRewards] = useAsyncState(
    rewardService.getAvailableRewards
  );
  const [realms, setRealms] = useLocalStorage('realms', i18n.realms);
  const [newRealmName, setNewRealmName] = useState('');
  const currentLanguageName = availableLanguages.find(
    ([name]) => name === lang
  )?.[0];

  function changeLanguage(name: string) {
    setLang(name);
  }

  function addRealm(name: string) {
    setRealms([...realms, name]);
  }

  function removeRealm(name: string) {
    setRealms(realms.filter((realm) => realm !== name));
  }

  useEffect(() => {
    setRealms(i18n.realms);
  }, [i18n]);

  return (
    <Modal {...props}>
      <Modal.Header showCloseButton>
        <I18n iden="app.settings" />
      </Modal.Header>
      <Modal.Body>
        <Tabs>
          <Tab title="app.settings.interfaceTab">
            <SettingsPanel>
              <FormGroup>
                <Select
                  defaultValue={currentLanguageName}
                  onChange={(e) => changeLanguage(e.currentTarget.value)}
                  label={<I18n iden="app.language" />}
                >
                  {availableLanguages?.map(([key, value]) => (
                    <option key={key} value={key}>
                      {value.languageName}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Select
                  defaultValue={timeBeforeAlerting}
                  onChange={(e) =>
                    setTimeBeforeAlerting(Number(e.currentTarget.value))
                  }
                  label={
                    <I18n iden="app.settings.interfaceTab.alertBeforeEndOfDay" />
                  }
                >
                  {Object.entries(validAlertingTimes).map(([key, value]) => (
                    <option key={key} value={key}>
                      <I18n iden={value} />
                    </option>
                  ))}
                </Select>
              </FormGroup>
              <FormGroup>
                <Checkbox
                  checked={showReleasePopup}
                  onChange={(e) => setShowReleasePopup(e.currentTarget.checked)}
                >
                  <I18n iden="app.settings.interfaceTab.showReleasePopup" />
                </Checkbox>
                <Checkbox
                  checked={shouldNotify}
                  onChange={(e) => setShouldNotify(e.currentTarget.checked)}
                >
                  <I18n iden="app.settings.interfaceTab.enableNotifications" />
                </Checkbox>
              </FormGroup>
            </SettingsPanel>
          </Tab>
          <Tab title="app.settings.rewardsTab">
            <RewardsSection>
              {rewards &&
                rewards.map((reward) => (
                  <RewardLine key={reward.id}>
                    <RewardShowcase>
                      <Reward {...reward} />
                      <RewardChooseImageButton>
                        <Camera color={theme.colors.backgroundColored} />
                      </RewardChooseImageButton>
                    </RewardShowcase>
                    <RewardInputFields>
                      <Input
                        type="text"
                        placeholder="Reward name"
                        value={reward.type}
                        onChange={(e) => {
                          const newName = e.currentTarget.value;
                          setRewards(
                            rewards.map((r) =>
                              r.id === reward.id ? { ...r, type: newName } : r
                            )
                          );
                        }}
                      />
                      <Input
                        type="number"
                        placeholder="Reward count"
                        value={reward.count}
                        onChange={(e) => {
                          const newCount = parseInt(e.currentTarget.value, 10);
                          setRewards(
                            rewards.map((r) =>
                              r.id === reward.id ? { ...r, count: newCount } : r
                            )
                          );
                        }}
                      />
                    </RewardInputFields>
                  </RewardLine>
                ))}
            </RewardsSection>
          </Tab>
          <Tab title="app.settings.realmsTab">
            <RealmsSection>
              <InputGroup>
                <Input
                  placeholder={i18n['app.settings.realmsTab.newRealmName']}
                  value={newRealmName}
                  onChange={(e) => setNewRealmName(e.currentTarget.value)}
                />
                <Button
                  variant="primary"
                  onClick={() => {
                    addRealm(newRealmName);
                    setNewRealmName('');
                  }}
                >
                  <Plus />
                </Button>
              </InputGroup>
              <RealmsTable>
                <thead>
                  <tr>
                    <th>
                      <I18n iden="app.settings.realmsTab.realmName" />
                    </th>
                    <th>
                      <I18n iden="app.settings.realmsTab.actions" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {realms?.map((realm) => (
                    <tr key={realm}>
                      <td width="90%">{realm}</td>
                      <td>
                        <TextButton onClick={() => removeRealm(realm)}>
                          <Trash2 />
                        </TextButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </RealmsTable>
            </RealmsSection>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
};
