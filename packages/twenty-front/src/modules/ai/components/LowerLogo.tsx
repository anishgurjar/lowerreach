import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';

const StyledLogoContainer = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const LowerLogo = ({ 
  size, 
  color
}: { 
  size?: string | number; 
  color?: string;
}) => {
  const theme = useTheme();
  const logoSize = typeof size === 'number' ? size : 
                   typeof size === 'string' ? parseInt(size) : 
                   theme.icon.size.md;

  return (
    <StyledLogoContainer size={logoSize}>
      <img 
        src="/images/lower-logo.svg" 
        alt="Lower.com Logo" 
      />
    </StyledLogoContainer>
  );
};
