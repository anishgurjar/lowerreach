import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { t } from '@lingui/core/macro';
import { LowerLogo } from './LowerLogo';

const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.spacing(2)};
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const StyledLogoIcon = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.background.transparent.blue};
  border-radius: ${({ theme }) => theme.border.radius.sm};
  padding: ${({ theme }) => theme.spacing(2.5)};
  display: flex;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledTitle = styled.div`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: 600;
`;

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.font.color.secondary};
  text-align: center;
  max-width: 85%;
  font-size: ${({ theme }) => theme.font.size.md};
`;

export const AIChatEmptyState = () => {
  const theme = useTheme();

  return (
    <StyledEmptyState>
      <StyledLogoIcon>
        <LowerLogo size={theme.icon.size.lg} />
      </StyledLogoIcon>
      <StyledTitle>{t`Chat with LOAI`}</StyledTitle>
      <StyledDescription>
        {t`Start a conversation with LOAI to get help with recruiting, candidate research, pipeline management, and talent acquisition insights`}
      </StyledDescription>
    </StyledEmptyState>
  );
};
