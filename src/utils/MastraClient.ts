import { MastraClient } from '@mastra/client-js';

const client = new MastraClient({
  // 配置选项，例如：
  baseUrl: 'https://agent.pandatest.site',
});
// 添加一些辅助方法或扩展功能（如果需要）
const enhancedClient = {
  ...client,

  getAgent: async (agentName: string) => {
    return client.getAgent(agentName);
  },
};
export default enhancedClient;
