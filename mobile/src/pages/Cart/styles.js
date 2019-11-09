import styled from 'styled-components/native';

import { darken } from 'polished';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  margin-top: 20px;
`;

export const ProductList = styled.View`
  background: #fff;
  border-radius: 4px;
  padding: 10px;
`;

export const ProductWrapper = styled.View``;

export const Product = styled.View`
  flex-direction: row;
  padding: 10px;
`;

export const ProductImage = styled.Image`
  width: 100px;
  height: 80px;
`;

export const ProductTextContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 10px;
`;

export const ProductTitle = styled.Text`
  font-size: 16px;
`;

export const ProductPrice = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: auto;
`;

export const ProductRemove = styled(RectButton)`
  align-items: center;
  justify-content: center;
`;

export const PurchaseButton = styled(RectButton)`
  background: ${darken(0.03, '#7159c1')};
  align-items: center;
  justify-content: center;
  color: #fff;
  width: 350px;
  margin-top: 20px;
`;

export const PurchaseButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 10px;
`;

export const AmountWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #eee;
  padding: 10px;
  margin-top: 10px;
`;

export const AmountSelect = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const AmountNumber = styled.TextInput.attrs({
  readOnly: true,
})`
  background: #fff;
  width: 50px;
  padding: 4px;
  margin: 0 5px;
`;

export const AmountControlButton = styled(RectButton)``;

export const AmountTotal = styled.View``;

export const AmountTotalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const Total = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const TotalText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: gray;
`;

export const TotalPrice = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-top: 5px;
`;

export const EmptyCart = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const EmptyCartText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin: 10px 10px;
  text-align: center;
`;
