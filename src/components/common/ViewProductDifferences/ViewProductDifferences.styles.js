import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;

export const ProductSection = styled.div`
  width: 45%;
`;

export const PartitionLine = styled.div`
  width: 10px;
  background-color: #ccc;
  margin: 0 10px;
`;

export const ProductHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Detail = styled.div`
  margin-bottom: 10px;
`;

export const Label = styled.span`
  font-weight: bold;
`;

export const Value = styled.span`
  margin-left: 5px;
`;

export const MediaImage = styled(Image)`
  margin-right: 10px;
`;
