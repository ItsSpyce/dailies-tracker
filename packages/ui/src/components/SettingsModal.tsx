import * as i18nProviders from '@dailies-tracker/i18n';
import { I18n } from './I18n';
import { Label } from './Label';
import { Modal, NewModalProps } from './Modal';
import {
  SettingsPanel,
  AboutSection,
  FormGroup,
  RewardsSection,
  RewardLine,
  RewardInputFields,
  RewardShowcase,
  RewardChooseImageButton,
} from './SettingsModal.styles';
import { Select } from './Select';
import { useLang, useRewardService } from '../states';
import { Checkbox } from './Checkbox';
import { useAsyncState } from '../hooks';
import { Button } from './Button';
import { Reward } from './Reward';
import { Input } from './Input';
import { Camera } from 'react-feather';
import { useTheme } from 'styled-components';
import { Link } from './Link';
import { ButtonGroup } from './ButtonGroup';

const availableLanguages = Object.entries(i18nProviders);

export const SettingsAndAboutModal: React.FC<NewModalProps> = (props) => {
  const [lang, setLang] = useLang();
  const theme = useTheme();
  const [rewardService] = useRewardService();
  const [rewards, setRewards] = useAsyncState(
    rewardService.getAvailableRewards
  );
  const currentLanguageName = availableLanguages.find(
    ([name]) => name === lang
  )?.[0];

  function changeLanguage(name: string) {
    setLang(name);
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
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <Button variant="primary">Save</Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
};
