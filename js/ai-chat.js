/**
 * NEXUS AI Chat Widget
 * 使用 MiniMax API 实现智能对话
 */

// ===== 配置 =====
const AI_CONFIG = {
    // MiniMax API 配置
    apiKey: 'sk-cp-xeHyOKMxDaVLVHlirjKRLT6h2ptVhO3CRkBH6aDEpHe01DW9I40w--rXlEpIOzZu6GygeS1dFNthaiL3PhFUplxKHiRhf1YEh9NpVcrZ_7NYQasfegZpU2E',
    apiUrl: 'https://api.minimax.chat/v1/text/chatcompletion_pro',
    model: 'abab6.5s-chat',
    
    // 系统提示词 - 限定产品知识范围
    systemPrompt: `你是 NEXUS 智能顾问，专门为访客解答关于 NEXUS 公司产品和服务的问题。

## 关于 NEXUS
NEXUS（股票代码：NEXS）是全球领先的云原生基础设施服务商，为超过2000家企业提供稳定、安全、智能的数字化底座。服务可用性达99.999%，累计处理数据量超过50EB。

## 核心产品
1. **Nexus Cloud Platform** - 企业级混合云平台
   - 支持公有云、私有云、边缘云统一纳管
   - 基于自研分布式架构，单集群可支持10万+节点
   - 多云统一管理、智能弹性伸缩、金融级安全防护

2. **数据中台引擎** - 一站式大数据开发与治理平台
   - 支持PB级数据实时处理
   - 助力企业数据资产化

3. **AI训练平台** - GPU集群管理与AI模型训练平台
   - 支持分布式训练
   - 训练效率提升300%

4. **零信任安全** - 新一代网络安全架构
   - 基于身份验证和最小权限原则
   - 保障企业核心资产安全

## 技术指标
- 服务可用性：99.999%
- 支持100万+容器实例同时调度
- 覆盖30+全球数据中心
- 通过等保三级、ISO27001认证
- 256位加密

## 客户案例
- 金融科技：某头部券商核心交易系统重构，峰值TPS达50万
- 智能制造：工业互联网平台，连接10万+工业设备
- 新零售：日均千万级订单处理能力

## 服务能力
- 电话咨询：400-888-8888（7×24小时）
- 预约演示：获取专属解决方案
- 在线咨询：实时解答技术问题

## 回答要求
1. 只回答与 NEXUS 产品和服务相关的问题
2. 如果用户问的问题与 NEXUS 无关，礼貌地引导回到产品话题
3. 回答要专业、简洁、友好
4. 可以适当使用中文标点符号
5. 根据用户问题长度调整回答长度
6. 适当引导用户了解更多产品信息`
};

// ===== DOM 元素 =====
const chatWidget = document.getElementById('aiChatWidget');
const chatToggle = document.getElementById('aiChatToggle');
const chatWindow = document.getElementById('aiChatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatClear = document.getElementById('chatClear');

// ===== 状态 =====
let conversationHistory = [];
let isProcessing = false;

// ===== 初始化 =====
function initAIChat() {
    // 绑定事件
    chatToggle.addEventListener('click', toggleChat);
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    chatClear.addEventListener('click', clearChat);
}

// ===== 切换聊天窗口 =====
function toggleChat() {
    chatToggle.classList.toggle('active');
    chatWindow.classList.toggle('active');
    
    if (chatWindow.classList.contains('active')) {
        chatInput.focus();
    }
}

// ===== 发送消息 =====
async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message || isProcessing) return;
    
    // 添加用户消息
    addMessage(message, 'user');
    chatInput.value = '';
    
    // 显示加载状态
    showTyping();
    isProcessing = true;
    chatSend.disabled = true;
    
    try {
        // 调用 AI API
        const response = await callAI(message);
        
        // 移除加载状态
        removeTyping();
        
        // 添加 AI 响应
        addMessage(response, 'ai');
    } catch (error) {
        removeTyping();
        addMessage('抱歉，当前服务暂时不可用。请稍后再试或拨打客服热线 400-888-8888。', 'ai');
        console.error('AI API Error:', error);
    }
    
    isProcessing = false;
    chatSend.disabled = false;
    chatInput.focus();
}

// ===== 调用 MiniMax API =====
async function callAI(userMessage) {
    // 构建消息历史
    const messages = [
        { role: 'system', content: AI_CONFIG.systemPrompt },
        ...conversationHistory,
        { role: 'user', content: userMessage }
    ];
    
    const response = await fetch(AI_CONFIG.apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        body: JSON.stringify({
            model: AI_CONFIG.model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 1000
        })
    });
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
        // 更新对话历史
        conversationHistory.push({ role: 'user', content: userMessage });
        conversationHistory.push({ role: 'assistant', content: data.choices[0].message.content });
        
        // 限制历史长度
        if (conversationHistory.length > 20) {
            conversationHistory = conversationHistory.slice(-20);
        }
        
        return data.choices[0].message.content;
    }
    
    throw new Error('Invalid API response');
}

// ===== 添加消息 =====
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    
    const avatarSvg = type === 'ai' 
        ? '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        : '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>';
    
    // 处理内容中的换行
    const formattedContent = content.replace(/\n/g, '<br>');
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                ${avatarSvg}
            </svg>
        </div>
        <div class="message-content">
            <p>${formattedContent}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    
    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== 显示加载动画 =====
function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message message-ai message-typing';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <div class="message-content">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== 移除加载动画 =====
function removeTyping() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// ===== 清空对话 =====
function clearChat() {
    // 清空历史记录
    conversationHistory = [];
    
    // 清空消息区域
    chatMessages.innerHTML = `
        <div class="message message-ai">
            <div class="message-avatar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="message-content">
                <p>对话已清空。请问有什么可以帮您？</p>
            </div>
        </div>
    `;
}

// ===== 页面加载完成后初始化 =====
document.addEventListener('DOMContentLoaded', initAIChat);
