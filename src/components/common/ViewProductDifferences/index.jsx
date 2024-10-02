import React from 'react';
import {
  Container,
  ProductSection,
  PartitionLine,
  ProductHeader,
  ProductDetails,
  Detail,
  Label,
  Value,
  MediaImage,
} from './ViewProductDifferences.styles';
import { FaFilePdf } from 'react-icons/fa';

const ProductDetailRow = ({ label, value }) => (
  <Detail>
    <Label>{label}:</Label>
    <Value>{value}</Value>
  </Detail>
);
function getFileNameIfPdf(url) {
  const fileName = url.substring(url.lastIndexOf('/') + 1);
  const extension = fileName.split('.').pop();

  if (extension === 'pdf') {
    return fileName;
  }
  return null;
}

const AmenitiesList = ({ amenities }) => (
  <Detail>
    <Label>Amenities:</Label>
    <Value>
      {amenities.length > 0 ? (
        <ul>
          {amenities.map((amenity, index) => (
            <li key={index}>{`${index + 1}) ${amenity}`}</li>
          ))}
        </ul>
      ) : (
        'None'
      )}
    </Value>
  </Detail>
);

const ViewProductDifferences = ({ originalProduct, alteredProduct }) => {
  const renderProductDetails = product => (
    <ProductDetails>
      <ProductDetailRow label="Product Name" value={product.productName} />
      <ProductDetailRow label="Address" value={product.address} />
      <ProductDetailRow label="Description" value={product.description} />
      <ProductDetailRow label="Investment Reason" value={product.investmentReason} />
      <ProductDetailRow label="Asset Value" value={`$${product.assetValue}`} />
      <ProductDetailRow label="Investment Type" value={product.investmentType.name} />
      <ProductDetailRow label="Deadline" value={new Date(product.deadline).toLocaleDateString()} />
      <ProductDetailRow label="Minimum Investment" value={`$${product.minimumInvestment}`} />
      <ProductDetailRow label="Maximum Backers" value={product.maximumBackers} />
      <ProductDetailRow label="Minimum Backers" value={product.minimumBackers} />
      <ProductDetailRow label="Is Infinite Backers" value={product.isInfiniteBackers ? 'Yes' : 'No'} />
      <ProductDetailRow label="KYC Level" value={product.kycLevel} />
      <AmenitiesList amenities={product.amenities} />
      <Detail>
        <Label>Media:</Label>
        <div>
          {product?.media?.slice(0, 3)?.map((url, index) => (
            <MediaImage key={index} src={url} alt={`Media ${index + 1}`} width={160} height={160} />
          ))}
        </div>
      </Detail>
      <Detail>
        <Label>Documents:</Label>
        <div className="additional-document">
          {product?.media?.slice(3)?.map((url, index) => (
            // <MediaImage key={index} src={url} alt={`Media ${index + 1}`} width={160} height={160} />
            <div className="" key={index}>
              <FaFilePdf color="var(--danger-dark)" size={20} />
              <a href={url} download target="_blank">
                {getFileNameIfPdf(url)}
              </a>
            </div>
          ))}
        </div>
      </Detail>
    </ProductDetails>
  );

  return (
    <Container>
      <ProductSection>
        <ProductHeader>Original Product</ProductHeader>
        {renderProductDetails(originalProduct)}
      </ProductSection>
      <PartitionLine />
      <ProductSection>
        <ProductHeader>Altered Product</ProductHeader>
        {renderProductDetails(alteredProduct)}
      </ProductSection>
    </Container>
  );
};

export default ViewProductDifferences;
