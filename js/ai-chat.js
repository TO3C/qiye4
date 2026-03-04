/**
 * 流云智炬 AI Chat Widget
 * 使用 MiniMax API 实现智能对话
 */

// ===== 配置 =====
const AI_CONFIG = {
    // MiniMax API 配置
    apiKey: 'sk-cp-xeHyOKMxDaVLVHlirjKRLT6h2ptVhO3CRkBH6aDEpHe01DW9I40w--rXlEpIOzZu6GygeS1dFNthaiL3PhFUplxKHiRhf1YEh9NpVcrZ_7NYQasfegZpU2E',
    apiUrl: 'https://api.minimax.chat/v1/text/chatcompletion_pro',
    model: 'abab6.5s-chat',
    
    // 系统提示词 - 流云智炬产品知识库
    systemPrompt: `你是流云智炬的智能顾问，专门为访客解答关于网站设计、小程序开发等数字化服务的问题。

## 关于流云智炬
流云智炬是海南自贸港企业数字化服务领先品牌，专注于为海南企业提供原创网站设计、SEO优化、小程序开发等数字化服务。
- 已服务200+企业客户
- 交付成功率100%
- 售后响应时间：工作日2小时内
- 地址：海南省三亚市

## 服务套餐

### 套餐A：初创公司速启版 ¥3,800
- 适用：海南新注册公司，需要快速上线官网
- 服务内容：
  - 公司简介页 1页
  - 产品/服务页 2页
  - 联系我们页 1页
  - 移动端适配
  - 域名1年 + 服务器1年
- 交付周期：3-5个工作日

### 套餐B：品牌升级版 ¥6,800（最热销）
- 适用：有一定规模，需要品牌形象升级
- 服务内容：
  - 首页（品牌展示）1页
  - 关于我们 1页
  - 产品/服务 3页
  - 案例展示 1页
  - 新闻动态 1页
  - 联系我们 + 表单 1页
  - SEO基础优化
  - 后台管理系统
  - 移动端适配
  - 域名1年 + 服务器1年
  - 免费赠送：AI客服机器人（基础版）
- 交付周期：7-10个工作日

### 套餐C：集团形象版 ¥12,800
- 适用：集团公司、资本平台、外资企业
- 服务内容：
  - 首页（高端设计）1页
  - 多级栏目 8-12页
  - 中英文双语
  - 后台管理系统
  - 新闻发布系统
  - 在线留言系统
  - SEO深度优化
  - 移动端适配
  - 高性能服务器 2年
- 交付周期：15-20个工作日

## 定制服务（按需报价）
- 多语言版本（英语/日语/俄语等）：+¥3,000~8,000/语种
- 电商功能：¥8,000~20,000
- 会员系统：¥5,000~15,000
- 小程序对接：¥3,000~8,000
- 视频制作：¥2,000~5,000/个
- 年度维护（基础）：¥2,400/年
- 年度维护（高级）：¥6,000/年

## 增值服务/打包方案
- 方案A（初创打包）：套餐A + 公众号注册 + 小红书/抖音账号基础设置 = ¥4,500（省¥300）
- 方案B（品牌打包）：套餐B + 公众号搭建 + 3篇AI营销文案 = ¥8,500（省¥1,000）
- 方案C（全案打包）：套餐B + 套餐A（双语言）+ 公众号 + 小程序 = ¥15,800（省¥3,800）

## 客户常见问题应答

### Q：为什么你们比淘宝贵？
A：
- 淘宝模板站：套用现成模板，无设计感，无售后
- 我们的优势：
  - ✅ 原创设计，根据您公司特点定制
  - ✅ SEO优化，帮你获客
  - ✅ 售后响应快（工作日2小时内）
  - ✅ 海南本地服务，沟通方便

### Q：做网站要多久？
A：
- 初创版：3-5个工作日
- 品牌版：7-10个工作日
- 集团版：15-20个工作日
- 加急可协商（加收30%）

### Q：你们负责推广吗？
A：
- 我们负责网站技术端的SEO优化
- 推广投放（如百度竞价，信息流）可额外合作
- 我们有合作渠道，可以一起打包

## 2026年海南限时活动
- 封关特惠：签约套餐B即送价值¥2,000小程序（2026.12.31前）
- 同行转介绍：介绍新客户签约，双方各返¥500（长期有效）
- 老客户专享：续费维护费8折（签约后1年内）

## 回答要求
1. 只回答与流云智炬服务相关的问题
2. 如果用户问的问题与本公司无关，礼貌地引导回到服务话题
3. 回答要专业、简洁、友好
4. 适当使用中文标点符号
5. 根据用户问题长度调整回答长度
6. 适当引导用户了解更多产品信息或预约咨询
7. 如果用户询问价格，可以给出套餐价格或引导到联系方式进一步沟通`
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
    
    // 点击"开始对话"按钮打开聊天
    const openChatBtn = document.getElementById('openChatBtn');
    if (openChatBtn) {
        openChatBtn.addEventListener('click', () => {
            chatToggle.classList.add('active');
            chatWindow.classList.add('active');
            chatInput.focus();
        });
    }
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
        addMessage('抱歉，当前服务暂时不可用。请稍后再试或通过页面联系方式与我们沟通。', 'ai');
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
