import React from 'react';
import styled from 'styled-components';

const ScreenWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  background: ${props => props.bgColor || '#ffffff'};
  opacity: ${props => (props.loading ? 1 : 0)};
  visibility: ${props => (props.loading ? 'visible' : 'hidden')};
  transition: opacity 0.4s, visibility -0.3s linear 0.5s;
`;
const LoadingComponents = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const LoadableData = styled.div`
  display: ${props => (props.loading ? 'none' : 'block')};
`;

function LoadingScreen({ loading }) {
  return (
    <div>
      <ScreenWrapper loading={loading}>
        <LoadingComponents>
          <img alt="logo" src="/ecat_gif.gif" width={'200px'} />
        </LoadingComponents>
      </ScreenWrapper>

      <LoadableData loading={loading} />
    </div>
  );
}

export default LoadingScreen;
