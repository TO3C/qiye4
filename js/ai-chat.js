const KNOWLEDGE_BASE = {
    '套餐': `🎯 **服务套餐**

✅ **初创速启版 ¥3,800**
- 公司简介页1页 + 产品/服务2页 + 联系我们1页
- 移动端适配、域名+服务器1年
- 交付：3-5个工作日

✅ **品牌升级版 ¥6,800**（最热销）
- 首页+关于我们、产品/服务3页、案例展示+新闻动态
- 后台管理系统、SEO基础优化
- 赠送AI客服机器人
- 交付：7-10个工作日

✅ **集团形象版 ¥12,800**
- 高端首页设计、多级栏目8-12页、中英文双语
- 新闻发布系统、SEO深度优化
- 交付：15-20个工作日

您对哪个套餐感兴趣？`,

    '价格': `💰 **价格一览**

| 套餐 | 价格 | 周期 |
|------|------|------|
| 初创速启版 | ¥3,800 | 3-5天 |
| 品牌升级版 | ¥6,800 | 7-10天 |
| 集团形象版 | ¥12,800 | 15-20天 |

另有定制服务：
- 多语言版本 +¥3,000~8,000/语种
- 电商功能 ¥8,000~20,000
- 小程序对接 ¥3,000~8,000

需要了解更多请回复"联系方式"。`,

    '多少钱': `💰 **价格一览**

| 套餐 | 价格 | 周期 |
|------|------|------|
| 初创速启版 | ¥3,800 | 3-5天 |
| 品牌升级版 | ¥6,800 | 7-10天 |
| 集团形象版 | ¥12,800 | 15-20天 |

另有定制服务：
- 多语言版本 +¥3,000~8,000/语种
- 电商功能 ¥8,000~20,000
- 小程序对接 ¥3,000~8,000

需要了解更多请回复"联系方式"。`,

    '做网站': `🌐 **做网站要多久？**

- 初创版：3-5个工作日
- 品牌版：7-10个工作日  
- 集团版：15-20个工作日
- 加急可协商（加收30%）

我们承诺交付成功率100%，售后响应2小时内！

想了解更多可以回复"套餐"。`,

    '多久': `⏱️ **制作周期**

- 初创速启版：3-5个工作日
- 品牌升级版：7-10个工作日
- 集团形象版：15-20个工作日
- 加急：可协商（加收30%）

想了解具体套餐请回复"套餐"或"价格"`,

    '淘宝': `❓ **为什么比淘宝贵？**

淘宝模板站：套用现成模板，无设计感，无售后

我们优势：
✅ 原创设计，根据您公司特点定制
✅ SEO优化，帮你获客
✅ 售后响应快（工作日2小时内）
✅ 海南本地服务，沟通方便

一分价钱一分货，专业服务值得信赖！`,

    '推广': `📣 **关于推广**

我们负责网站技术端的SEO基础优化，帮助搜索引擎更好地收录您的网站。

付费推广（如百度竞价、信息流广告）可额外合作，我们有合作渠道可以一起打包。

需要推广服务可以回复"联系方式"详细沟通。`,

    '小程序': `📱 **小程序开发**

我们提供小程序定制开发服务：
- 微信小程序 ¥3,000~8,000
- 支付宝小程序 ¥3,000~8,000

签约套餐B即送价值¥2,000小程序（限2026年活动）

想了解更多可以回复"套餐"。`,

    'SEO': `🔍 **SEO优化**

我们提供专业的SEO优化服务：

- 基础SEO：网站结构优化、关键词布局
- 深度SEO：外链建设、内容优化

套餐B包含基础SEO，套餐C包含深度SEO。

想提升网站排名可以回复"联系方式"详细咨询。`,

    '售后': `🛡️ **售后服务**

我们提供完善的售后服务：
- 售后响应：工作日2小时内
- 免费维护：交付后1个月内
- 续费维护：¥2,400~6,000/年

选择品牌升级版套餐，赠送AI客服机器人！

想了解更多请回复"套餐"`,

    '海南': `📍 **关于我们**

流云智炬是海南自贸港企业数字化服务领先品牌：
- 📍 地址：海南省三亚市
- 📞 客服：工作日 9:00-18:00
- ✅ 已服务200+企业客户
- ✅ 交付成功率100%

本地服务，沟通更方便！`,

    '公司': `🏢 **关于流云智炬**

流云智炬是海南自贸港企业数字化服务领先品牌，专注于：
- 🌐 网站设计开发
- 📱 小程序开发  
- 🔍 SEO优化
- 📣 营销推广

✅ 已服务200+企业客户
✅ 交付成功率100%
✅ 售后响应2小时内
📍 海南省三亚市

想了解我们的服务可以回复"套餐"或"价格"`,

    '联系': `📞 **联系我们**

💬 在线咨询：直接对话即可
📞 电话咨询：工作日 9:00-18:00
📍 地址：海南省三亚市
📧 邮箱：296077990@qq.com

期待为您服务！`,

    '流程': `🔄 **合作流程**

1️⃣ **需求沟通**
- 了解项目需求
- 初步方案设计
- 预算评估

2️⃣ **合同签订**
- 确定项目范围
- 明确交付时间
- 签订正式合同

3️⃣ **设计开发**
- UI/UX 设计
- 前端开发
- 后端集成

4️⃣ **测试上线**
- 功能测试
- 性能优化
- 正式上线

5️⃣ **售后支持**
- 免费维护期
- 持续技术支持
- 定期更新迭代`,

    '优势': `⭐ **为什么选择我们**

🚀 **高效交付**
- 快速响应
- 准时交付
- 敏捷开发

💎 **品质保证**
- 代码规范
- 严格测试
- 性能优化

🤝 **贴心服务**
- 1对1专属客服
- 定期进度汇报
- 终身技术支持

💰 **合理价格**
- 透明定价
- 性价比高
- 免费维护期

🌟 **持续创新**
- 最新技术栈
- 持续学习改进
- 行业最佳实践`,

    'hello': `👋 您好！欢迎访问流云智炬！

我可以帮您解答：
- 服务套餐和价格
- 网站制作周期
- 小程序开发
- SEO优化
- 售后服务
- 合作流程

请问有什么可以帮您？`,
    
    '你好': `👋 您好！欢迎访问流云智炬！

我可以帮您解答：
- 服务套餐和价格
- 网站制作周期
- 小程序开发
- SEO优化
- 售后服务
- 合作流程

请问有什么可以帮您？`,

    '谢谢': `😊 不客气！很高兴为您服务～

还有其他问题欢迎随时咨询！`,

    '再见': `👋 再见！感谢您的访问！

如有任何问题，欢迎随时联系我们。祝您生活愉快！`,
    
    '默认': `😊 您好！我是流云智炬智能顾问

我可以帮您解答：
- 📦 服务套餐和价格
- ⏱️ 网站制作周期  
- 📱 小程序开发
- 🔍 SEO优化
- 🛡️ 售后服务
- 🔄 合作流程
- ⭐ 为什么选择我们

请直接输入您的问题，或者点击下方快捷按钮~`
};

const chatWidget = document.getElementById('aiChatWidget');
const chatToggle = document.getElementById('aiChatToggle');
const chatWindow = document.getElementById('aiChatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function parseMarkdown(text) {
    let html = text;
    
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    html = html.replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => /^[-:]+$/.test(c.trim()))) {
            return '';
        }
        const row = cells.map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${row}</tr>`;
    });
    
    if (html.includes('<tr>')) {
        html = html.replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<table class="chat-table">$&</table>');
    }
    
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul class="chat-list">$&</ul>');
    
    html = html.replace(/^(\d)️⃣\s+(.+)$/gm, '<div class="chat-step"><span class="step-num">$1</span><span class="step-text">$2</span></div>');
    
    html = html.replace(/✅|❓|💰|🌐|📱|🔍|🛡️|📍|🏢|👋|😊|👎|👍/g, '<span class="emoji">$&</span>');
    
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    return html;
}

function initAIChat() {
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    
    const minimizeBtn = document.getElementById('chatMinimize');
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', toggleAiChat);
    }
    
    loadChatHistory();
}

function toggleAiChat() {
    if (chatWindow.classList.contains('active')) {
        chatWindow.classList.remove('active');
    } else {
        chatWindow.classList.add('active');
        chatInput.focus();
    }
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    
    showTyping();
    setTimeout(() => {
        removeTyping();
        const response = getAnswer(message);
        addMessage(response, 'ai');
    }, 600);
}

function getAnswer(input) {
    const lowerInput = input.toLowerCase();
    for (const [keyword, answer] of Object.entries(KNOWLEDGE_BASE)) {
        if (lowerInput.includes(keyword.toLowerCase())) {
            return answer;
        }
    }
    return KNOWLEDGE_BASE['默认'];
}

function addMessage(content, type) {
    const div = document.createElement('div');
    div.className = `message message-${type}`;
    
    const time = getCurrentTime();
    const renderedContent = parseMarkdown(content);
    
    div.innerHTML = `<div class="message-content">${renderedContent}</div><div class="message-time">${time}</div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    saveChatHistory();
}

function showTyping() {
    const div = document.createElement('div');
    div.id = 'typing';
    div.className = 'message message-ai';
    div.innerHTML = '<div class="message-content typing"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
}

function clearChat() {
    chatMessages.innerHTML = '<div class="message message-ai"><div class="message-content">对话已清空。请问有什么可以帮您？</div></div>';
    localStorage.removeItem('ai-chat-history');
}

function saveChatHistory() {
    const messages = [];
    const messageElements = chatMessages.querySelectorAll('.message');
    messageElements.forEach(msg => {
        const contentEl = msg.querySelector('.message-content');
        if (contentEl) {
            const content = contentEl.innerText || contentEl.textContent;
            const isUser = msg.classList.contains('message-user');
            messages.push({ content, type: isUser ? 'user' : 'ai' });
        }
    });
    
    const quickReplies = chatMessages.querySelector('.quick-replies');
    if (quickReplies) {
        quickReplies.remove();
    }
    
    localStorage.setItem('ai-chat-history', JSON.stringify(messages));
}

function loadChatHistory() {
    const saved = localStorage.getItem('ai-chat-history');
    if (saved) {
        try {
            const messages = JSON.parse(saved);
            chatMessages.innerHTML = '';
            
            messages.forEach(msg => {
                const div = document.createElement('div');
                div.className = `message message-${msg.type}`;
                const renderedContent = parseMarkdown(msg.content);
                div.innerHTML = `<div class="message-content">${renderedContent}</div>`;
                chatMessages.appendChild(div);
            });
            
            addQuickReplies();
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (e) {
            console.warn('Failed to load chat history:', e);
        }
    } else {
        addQuickReplies();
    }
}

function addQuickReplies() {
    const quickReplies = document.createElement('div');
    quickReplies.className = 'quick-replies';
    quickReplies.innerHTML = `
        <button class="quick-reply-btn" data-question="套餐">📦 服务套餐</button>
        <button class="quick-reply-btn" data-question="价格">💰 咨询价格</button>
        <button class="quick-reply-btn" data-question="流程">🔄 合作流程</button>
        <button class="quick-reply-btn" data-question="优势">⭐ 为什么选我们</button>
    `;
    
    chatMessages.appendChild(quickReplies);
    
    quickReplies.querySelectorAll('.quick-reply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question');
            sendQuickReply(question);
        });
    });
}

function sendQuickReply(question) {
    let message = '';
    switch(question) {
        case '套餐': message = '我想了解服务套餐'; break;
        case '价格': message = '我想咨询价格'; break;
        case '流程': message = '我想了解合作流程'; break;
        case '优势': message = '为什么选择你们'; break;
    }
    chatInput.value = message;
    sendMessage();
}

document.addEventListener('DOMContentLoaded', initAIChat);