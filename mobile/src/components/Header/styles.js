import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const HomeButton = styled(RectButton)``;

export const Cart = styled(RectButton)`
  position: relative;
`;

export const HeaderImage = styled.Image`
  width: 234px;
  height: 30px;
`;

export const ProductCartItem = styled.Text`
  background: #7159c1;
  border-radius: 10px;
  color: #fff;
  font-size: 11px;
  position: absolute;
  padding: 2px;
  text-align: center;
  right: -8;
  top: -8;
  min-height: 18px;
  min-width: 18px;
`;
