import * as i18nProviders from '@dailies-tracker/i18n';
import { I18n } from './I18n';
import { Label } from './Label';
import { Modal, ModalProps } from './Modal';
import {
  SettingsPanel,
  AboutSection,
  FormGroup,
  RewardsSection,
} from './SettingsAndAboutModal.styles';
import { Select } from './Select';
import { useI18n, useRewardService } from '../states';
import { Checkbox } from './Checkbox';
import { useAsyncState } from '../hooks';
import { Button } from './Button';
import { useEffect } from 'react';

const availableLanguages = Object.entries(i18nProviders);

export const SettingsAndAboutModal: React.FC<Omit<ModalProps, 'children'>> = (
  props
) => {
  const [i18n, setI18n] = useI18n();
  const [rewardService] = useRewardService();
  const [rewards, setRewards] = useAsyncState(
    rewardService.getAvailableRewards
  );
  const currentLanguageName = availableLanguages.find(
    ([_, provider]) => provider === i18n
  )?.[0];

  function changeLanguage(name: string) {
    // @ts-ignore
    setI18n(i18nProviders[name] ?? i18nProviders.enUS);
  }

  return (
    <Modal {...props}>
      <Modal.Header showCloseButton>
        <I18n iden="app.settings" />
      </Modal.Header>
      <Modal.Body>
        <Label align="center">
          <I18n iden="app.settings" />
        </Label>
        <SettingsPanel>
          <FormGroup>
            <span>
              <I18n iden="app.language" />
            </span>
            <Select
              defaultValue={currentLanguageName}
              onChange={(e) => changeLanguage(e.currentTarget.value)}
            >
              {availableLanguages.map(([key, value]) => (
                <option key={key} value={key}>
                  {value.languageName}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup>
            <Checkbox>Show release popup?</Checkbox>
          </FormGroup>
        </SettingsPanel>
        <Label align="center">Available rewards</Label>
        <RewardsSection>
          {rewards &&
            rewards.map((reward) => (
              <div key={reward.id}>
                <img src={reward.imageBase64} alt={reward.type} />
                <span>{reward.type}</span>
                <span>{reward.count}</span>
              </div>
            ))}
        </RewardsSection>
        <Label align="center">
          <I18n iden="app.about" />
        </Label>
        <AboutSection></AboutSection>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Reset to defaults</Button>
      </Modal.Footer>
    </Modal>
  );
};
