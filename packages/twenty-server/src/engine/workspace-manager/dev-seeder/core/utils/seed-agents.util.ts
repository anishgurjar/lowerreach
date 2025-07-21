import { DataSource } from 'typeorm';

import { AgentChatMessageRole } from 'src/engine/metadata-modules/agent/agent-chat-message.entity';
import { USER_WORKSPACE_DATA_SEED_IDS } from 'src/engine/workspace-manager/dev-seeder/core/utils/seed-user-workspaces.util';
import {
    SEED_APPLE_WORKSPACE_ID,
    SEED_YCOMBINATOR_WORKSPACE_ID,
} from 'src/engine/workspace-manager/dev-seeder/core/utils/seed-workspaces.util';

const agentTableName = 'agent';
const workspaceTableName = 'workspace';
const agentChatThreadTableName = 'agentChatThread';
const agentChatMessageTableName = 'agentChatMessage';

export const AGENT_DATA_SEED_IDS = {
  APPLE_DEFAULT_AGENT: '20202020-0000-4000-8000-000000000001',
  YCOMBINATOR_DEFAULT_AGENT: '20202020-0000-4000-8000-000000000002',
};

export const AGENT_CHAT_THREAD_DATA_SEED_IDS = {
  APPLE_DEFAULT_THREAD: '20202020-0000-4000-8000-000000000011',
  YCOMBINATOR_DEFAULT_THREAD: '20202020-0000-4000-8000-000000000012',
};

export const AGENT_CHAT_MESSAGE_DATA_SEED_IDS = {
  APPLE_MESSAGE_1: '20202020-0000-4000-8000-000000000021',
  APPLE_MESSAGE_2: '20202020-0000-4000-8000-000000000022',
  APPLE_MESSAGE_3: '20202020-0000-4000-8000-000000000023',
  APPLE_MESSAGE_4: '20202020-0000-4000-8000-000000000024',
  YCOMBINATOR_MESSAGE_1: '20202020-0000-4000-8000-000000000031',
  YCOMBINATOR_MESSAGE_2: '20202020-0000-4000-8000-000000000032',
  YCOMBINATOR_MESSAGE_3: '20202020-0000-4000-8000-000000000033',
  YCOMBINATOR_MESSAGE_4: '20202020-0000-4000-8000-000000000034',
};

const seedAgentChatThreads = async (
  dataSource: DataSource,
  schemaName: string,
  workspaceId: string,
  agentId: string,
) => {
  let threadId: string;
  let userWorkspaceId: string;

  if (workspaceId === SEED_APPLE_WORKSPACE_ID) {
    threadId = AGENT_CHAT_THREAD_DATA_SEED_IDS.APPLE_DEFAULT_THREAD;
    userWorkspaceId = USER_WORKSPACE_DATA_SEED_IDS.TIM;
  } else if (workspaceId === SEED_YCOMBINATOR_WORKSPACE_ID) {
    threadId = AGENT_CHAT_THREAD_DATA_SEED_IDS.YCOMBINATOR_DEFAULT_THREAD;
    userWorkspaceId = USER_WORKSPACE_DATA_SEED_IDS.TIM_ACME;
  } else {
    throw new Error(
      `Unsupported workspace ID for agent chat thread seeding: ${workspaceId}`,
    );
  }

  const now = new Date();

  await dataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${agentChatThreadTableName}`, [
      'id',
      'agentId',
      'userWorkspaceId',
      'createdAt',
      'updatedAt',
    ])
    .orIgnore()
    .values([
      {
        id: threadId,
        agentId,
        userWorkspaceId,
        createdAt: now,
        updatedAt: now,
      },
    ])
    .execute();

  return threadId;
};

const seedAgentChatMessages = async (
  dataSource: DataSource,
  schemaName: string,
  workspaceId: string,
  threadId: string,
) => {
  let messageIds: string[];
  let messages: Array<{
    id: string;
    threadId: string;
    role: AgentChatMessageRole;
    content: string;
    createdAt: Date;
  }>;

  const now = new Date();
  const baseTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

  if (workspaceId === SEED_APPLE_WORKSPACE_ID) {
    messageIds = [
      AGENT_CHAT_MESSAGE_DATA_SEED_IDS.APPLE_MESSAGE_1,
      AGENT_CHAT_MESSAGE_DATA_SEED_IDS.APPLE_MESSAGE_2,
      AGENT_CHAT_MESSAGE_DATA_SEED_IDS.APPLE_MESSAGE_3,
      AGENT_CHAT_MESSAGE_DATA_SEED_IDS.APPLE_MESSAGE_4,
    ];
    messages = [
      {
        id: messageIds[0],
        threadId,
        role: AgentChatMessageRole.USER,
        content:
          'Hello! Can you help me understand our current recruiting pipeline and key metrics?',
        createdAt: new Date(baseTime.getTime()),
      },
      {
        id: messageIds[1],
        threadId,
        role: AgentChatMessageRole.ASSISTANT,
        content:
          "Hello! I'm LOAI, your recruiting assistant. I'd be happy to help you understand your recruiting pipeline and metrics. Based on your Lower Reach CRM data, I can analyze candidate flow, interview conversion rates, and time-to-hire metrics. What specific recruiting aspect would you like to explore - candidate sourcing performance, interview pipeline, or hiring analytics?",
        createdAt: new Date(baseTime.getTime() + 5 * 60 * 1000), // 5 minutes later
      },
      {
        id: messageIds[2],
        threadId,
        role: AgentChatMessageRole.USER,
        content:
          "I'd like to focus on our candidate conversion rates and how they're trending over the last quarter.",
        createdAt: new Date(baseTime.getTime() + 10 * 60 * 1000), // 10 minutes later
      },
      {
        id: messageIds[3],
        threadId,
        role: AgentChatMessageRole.ASSISTANT,
        content:
          'Great! Looking at your recruiting data, I can see several key trends from the last quarter. Your application-to-interview conversion rate has improved by 12%, now averaging 18%. Interview-to-offer conversion is at 35%, up from 32% last quarter. Time-to-hire has decreased to 28 days on average. Your top-performing sources are LinkedIn (45% conversion) and employee referrals (62% conversion). Would you like me to dive deeper into any specific conversion metrics or create a detailed recruiting performance report?',
        createdAt: new Date(baseTime.getTime() + 15 * 60 * 1000), // 15 minutes later
      },
    ];
  } else if (workspaceId === SEED_YCOMBINATOR_WORKSPACE_ID) {
    messageIds = [
      AGENT_CHAT_MESSAGE_DATA_SEED_IDS.YCOMBINATOR_MESSAGE_1,
      AGENT_CHAT_MESSAGE_DATA_SEED_IDS.YCOMBINATOR_MESSAGE_2,
      AGENT_CHAT_MESSAGE_DATA_SEED_IDS.YCOMBINATOR_MESSAGE_3,
      AGENT_CHAT_MESSAGE_DATA_SEED_IDS.YCOMBINATOR_MESSAGE_4,
    ];
    messages = [
      {
        id: messageIds[0],
        threadId,
        role: AgentChatMessageRole.USER,
        content:
          'What are the current startup talent trends and which recruiting strategies are performing best?',
        createdAt: new Date(baseTime.getTime()),
      },
      {
        id: messageIds[1],
        threadId,
        role: AgentChatMessageRole.ASSISTANT,
        content:
          "Hello! I'm LOAI, your recruiting assistant. I can help you analyze startup talent trends and recruiting performance. From your Lower Reach CRM data, I can see strong success in tech recruiting, particularly for engineering and product roles. Several recruiting strategies are showing 40%+ improvement in candidate quality. Would you like me to provide specific recruiting metrics or focus on broader talent acquisition trends?",
        createdAt: new Date(baseTime.getTime() + 3 * 60 * 1000), // 3 minutes later
      },
      {
        id: messageIds[2],
        threadId,
        role: AgentChatMessageRole.USER,
        content:
          'Please focus on our top 5 performing recruiting channels and their key metrics.',
        createdAt: new Date(baseTime.getTime() + 8 * 60 * 1000), // 8 minutes later
      },
      {
        id: messageIds[3],
        threadId,
        role: AgentChatMessageRole.ASSISTANT,
        content:
          'Here are your top 5 performing recruiting channels: 1) Employee Referrals - 65% hire rate, 22 days avg time-to-hire, 2) LinkedIn Recruiting - 42% hire rate, 28 days avg time-to-hire, 3) GitHub sourcing - 38% hire rate, 31 days avg time-to-hire, 4) University partnerships - 35% hire rate, 45 days avg time-to-hire, 5) Technical communities - 32% hire rate, 26 days avg time-to-hire. All channels show strong candidate retention (>92%) and positive hiring manager feedback. Would you like detailed breakdowns for any specific channel?',
        createdAt: new Date(baseTime.getTime() + 12 * 60 * 1000), // 12 minutes later
      },
    ];
  } else {
    throw new Error(
      `Unsupported workspace ID for agent chat message seeding: ${workspaceId}`,
    );
  }

  await dataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${agentChatMessageTableName}`, [
      'id',
      'threadId',
      'role',
      'content',
      'createdAt',
    ])
    .orIgnore()
    .values(messages)
    .execute();
};

export const seedAgents = async (
  dataSource: DataSource,
  schemaName: string,
  workspaceId: string,
) => {
  let agentId: string;
  let agentName: string;
  let agentLabel: string;
  let agentDescription: string;

  if (workspaceId === SEED_APPLE_WORKSPACE_ID) {
    agentId = AGENT_DATA_SEED_IDS.APPLE_DEFAULT_AGENT;
    agentName = 'apple-loai-assistant';
    agentLabel = 'Apple LOAI Assistant';
    agentDescription =
      'LOAI assistant for Apple workspace to help with recruiting, candidate research, and talent pipeline management';
  } else if (workspaceId === SEED_YCOMBINATOR_WORKSPACE_ID) {
    agentId = AGENT_DATA_SEED_IDS.YCOMBINATOR_DEFAULT_AGENT;
    agentName = 'yc-loai-assistant';
    agentLabel = 'YC LOAI Assistant';
    agentDescription =
      'LOAI assistant for YCombinator workspace to help with recruiting, startup talent research, and candidate sourcing';
  } else {
    throw new Error(
      `Unsupported workspace ID for agent seeding: ${workspaceId}`,
    );
  }

  await dataSource
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.${agentTableName}`, [
      'id',
      'name',
      'label',
      'description',
      'prompt',
      'modelId',
      'responseFormat',
      'workspaceId',
    ])
    .orIgnore()
    .values([
      {
        id: agentId,
        name: agentName,
        label: agentLabel,
        description: agentDescription,
        prompt:
          'You are LOAI, an intelligent assistant for Lower.com helping recruiters with talent acquisition and prospect research. Help users with candidate sourcing, pipeline management, interview coordination, and recruiting analytics.',
        modelId: 'auto',
        responseFormat: null,
        workspaceId,
      },
    ])
    .execute();

  await dataSource
    .createQueryBuilder()
    .update(`${schemaName}.${workspaceTableName}`)
    .set({ defaultAgentId: agentId })
    .where('id = :workspaceId', { workspaceId })
    .execute();

  const threadId = await seedAgentChatThreads(
    dataSource,
    schemaName,
    workspaceId,
    agentId,
  );

  await seedAgentChatMessages(dataSource, schemaName, workspaceId, threadId);
};

export const seedAgentsWithRoles = async (
  dataSource: DataSource,
  schemaName: string,
  workspaceId: string,
) => {
  // First seed the agents
  await seedAgents(dataSource, schemaName, workspaceId);

  // Then assign roles to the agents
  const agentId =
    workspaceId === SEED_APPLE_WORKSPACE_ID
      ? AGENT_DATA_SEED_IDS.APPLE_DEFAULT_AGENT
      : AGENT_DATA_SEED_IDS.YCOMBINATOR_DEFAULT_AGENT;

  // Get the workspace's default role
  const workspaceResult = await dataSource
    .createQueryBuilder()
    .select('workspace."defaultRoleId"')
    .from(`${schemaName}.${workspaceTableName}`, 'workspace')
    .where('workspace.id = :workspaceId', { workspaceId })
    .getRawOne();

  if (workspaceResult?.defaultRoleId) {
    // Assign the default workspace role to the agent
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(`${schemaName}.roleTargets`, [
        'roleId',
        'agentId',
        'workspaceId',
        'createdAt',
        'updatedAt',
      ])
      .orIgnore()
      .values([
        {
          roleId: workspaceResult.defaultRoleId,
          agentId: agentId,
          workspaceId: workspaceId,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .execute();

    console.log(
      `Assigned default role ${workspaceResult.defaultRoleId} to agent ${agentId} in workspace ${workspaceId}`,
    );
  } else {
    console.warn(
      `No default role found for workspace ${workspaceId}, agent ${agentId} will have limited access`,
    );
  }
};
