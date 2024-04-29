import styled from 'styled-components';
import { sif } from '@/utils/scomp';

export const StyledSection = styled.section`
  display: grid;
  grid-template-rows: auto 1fr;
  position: relative;
  margin-bottom: 2rem;
`;

export const SectionLine = styled.div`
  content: '';
  width: 100%;
  height: 4px;
  margin-top: 26px;
  background-color: ${(props) => props.theme.colors.border};
  border-radius: 8px;
`;

export const SectionTitleContainer = styled.div<{
  align: 'center' | 'left' | 'right';
}>`
  display: grid;
  column-gap: 8px;
  ${sif('align', 'left')} {
    grid-template-columns: auto 1fr;
  }

  ${sif('align', 'center')} {
    grid-template-columns: 1fr auto 1fr;
  }

  ${sif('align', 'right')} {
    grid-template-columns: 1fr auto;
  }
`;

export const SectionTitle = styled.p`
  color: ${(props) => props.theme.colors.textColored};
`;
