import { LowerLogo } from '@/ai/components/LowerLogo';
import { useCommandMenu } from '@/command-menu/hooks/useCommandMenu';
import { CommandMenuPages } from '@/command-menu/types/CommandMenuPages';
import { t } from '@lingui/core/macro';
import { v4 } from 'uuid';

export const useOpenAskAIPageInCommandMenu = () => {
  const { navigateCommandMenu } = useCommandMenu();

  const openAskAIPage = (pageTitle?: string | null) => {
    navigateCommandMenu({
      page: CommandMenuPages.AskAI,
      pageTitle: pageTitle ?? t`Ask LOAI`,
      pageIcon: LowerLogo,
      pageId: v4(),
    });
  };

  return {
    openAskAIPage,
  };
};
