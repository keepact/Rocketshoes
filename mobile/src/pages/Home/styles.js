import styled from 'styled-components/native';
import { darken } from 'polished';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View``;

export const ProductList = styled.View`
  background: #fff;
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
  width: 220px;
`;

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
`;

export const ProductTitle = styled.Text`
  font-size: 16px;
  line-height: 20px;
  color: #333;
  margin-top: 5px;
`;

export const ProductPrice = styled.Text`
  font-size: 21px;
  font-weight: bold;
  margin: 5px 0 20px;
`;

export const SubmitProduct = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  background: ${darken(0.03, '#7159c1')};
  border-radius: 4px;
  overflow: hidden;
  margin-top: auto;
`;

export const ProductBasket = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background: rgba(0, 0, 0, 0.1);
`;

export const ProductAmount = styled.Text`
  margin-left: 5px;
  color: #fff;
`;

export const ProductBasketText = styled.Text`
  flex: 1;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  color: #fff;
`;
