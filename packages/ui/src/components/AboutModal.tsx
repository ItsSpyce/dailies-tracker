import { Heart } from 'react-feather';
import { I18n } from './I18n';
import { Label } from './Label';
import { Link } from './Link';
import { Modal, NewModalProps } from './Modal';
import { Text } from './Text';

export const AboutModal: React.FC<NewModalProps> = (props) => (
  <Modal {...props}>
    <Modal.Header showCloseButton>
      <I18n iden="app.about" />
    </Modal.Header>
    <Modal.Body>
      <Label align="center">Credits</Label>
      <Text>
        First and foremost, thank you for using Dailies Tracker. The original
        idea came from{' '}
        <Link href="https://x.com/cherieIiquor/status/1782453572921119027">
          this post
        </Link>
        , the user being{' '}
        <Link href="https://twitter.com/milkhatersinc">
          Juls/@milkhatersinc
        </Link>
        . Not only this, but they&apos;ve been wonderful to work with and
        supportive of me the whole way.
      </Text>
      <Label align="center">Translations</Label>
      <Text>
        Translations have been publicly contributed to by the community. If
        you&apos;d like to contribute as well, you can either{' '}
        <Link href="https://docs.google.com/forms/d/e/1FAIpQLSehuVYpcELJSQHQPA1HUfeJU5x1PVFKjJYbMh4WCq5xNtPY2w/viewform">
          fill out this Google docs form
        </Link>{' '}
        or{' '}
        <Link href="https://github.com/ItsSpyce/dailies-tracker/pulls">
          open a pull request on the GitHub
        </Link>
        . A full list of people who have contributed so far (as I&apos;ve been
        able to update) is found{' '}
        <Link href="https://github.com/ItsSpyce/dailies-tracker/blob/main/README.md#current-translations">
          here
        </Link>
        .
      </Text>
      <Label align="center">Development</Label>
      <Text align="center">
        <Link href="https://github.com/ItsSpyce/dailies-tracker">
          Source code
        </Link>
        <br />
        <Link href="https://twitter.com/SpyceCodes">
          Made with <Heart /> by Spyce
        </Link>
      </Text>
    </Modal.Body>
  </Modal>
);
