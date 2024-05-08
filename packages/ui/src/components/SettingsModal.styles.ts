import styled from 'styled-components';

export const SettingsPanel = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: column;
  gap: 1rem;
  margin: 1.5rem 0;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RewardsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RewardShowcase = styled.button`
  position: relative;
  aspect-ratio: 9/10;
  height: 100%;
  cursor: pointer;
  outline: 0;
  border: 0;
  margin: 0;
  padding: 0;
`;

export const RewardChooseImageButton = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
`;

export const RewardLine = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
`;

export const RewardInputFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AboutSection = styled.div`
  text-align: center;
`;
