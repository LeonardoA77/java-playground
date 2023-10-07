/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { css } from '@emotion/react';

import * as actions from './actions';
import { useAppDispatch } from './configureStore';

import ButtonMenuItem from './ButtonMenuItem';
import MenuGroup from './MenuGroup';

import styles from './BuildMenu.module.css';

const the_button = css`
  background-color: #20c997
  &:hover: {
    color: #198754;
  }
`
interface BuildMenuProps {
  close: () => void;
}

const useDispatchAndClose = (action: () => actions.ThunkAction, close: () => void) => {
  const dispatch = useAppDispatch();

  return useCallback(
    () => {
      dispatch(action());
      close();
    },
    [action, close, dispatch]
  );
}

const BuildMenu: React.FC<BuildMenuProps> = props => {
  const compile = useDispatchAndClose(actions.performCompile, props.close);
  const execute = useDispatchAndClose(actions.performExecute, props.close);

  return (
    <MenuGroup title="Run Now">
      <ButtonMenuItem css={the_button} name="Run" onClick={execute}>
          Build and run the code, showing the output. Equivalent to <Code>java Main.java</Code>.
      </ButtonMenuItem>
      <ButtonMenuItem css={the_button} name="Build" onClick={compile}>
          Build the code without running it. Equivalent to <Code>javac Main.java</Code>.
      </ButtonMenuItem>
    </MenuGroup>
  );
};

const Code: React.FC<{ children: string }> = ({ children }) => (
  <code className={styles.code}>{children}</code>
);

export default BuildMenu;
