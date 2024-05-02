import styled from 'styled-components';
import { rgba, invert } from 'polished';
import { breakpoints, areChildrenOf, sides, hasChildOf } from '../utils';

export const StyledModal = styled.div`
  position: fixed;
  ${sides(0)}
  z-index: 999;
  background-color: ${(props) =>
    rgba(invert(props.theme.colors.background), 0.5)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ModalCloseButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`;

export const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

export const ModalHeaderText = styled.h2`
  color: ${(props) => props.theme.colors.textColored};
  width: 100%;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  color: ${(props) => props.theme.colors.text};
`;

export const ModalFooter = styled.div``;

export const ModalWindow = styled.div`
  display: grid;
  row-gap: 2rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 3px solid ${(props) => props.theme.colors.border};
  border-radius: 1.5rem;
  padding: 2rem;

  ${hasChildOf(ModalHeader)} {
    padding-top: 1rem;
  }

  ${areChildrenOf(ModalHeader, ModalBody)},
  ${areChildrenOf(ModalHeader, ModalFooter)},
  ${areChildrenOf(ModalHeader, ModalBody)} {
    grid-template-rows: auto 1fr;
  }

  ${areChildrenOf(ModalHeader, ModalBody, ModalFooter)} {
    grid-template-rows: auto 1fr auto;
  }

  ${breakpoints('sm')} {
    width: 75%;
  }

  ${breakpoints('md')} {
    width: 50%;
  }
`;
