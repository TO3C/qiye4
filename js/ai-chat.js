const KNOWLEDGE_BASE = {
    '套餐': `📦 **服务套餐**

💰 初创速启版 ¥3,800（3-5天）
💰 品牌升级版 ¥6,800（7-10天）🔥热销
💰 集团形象版 ¥12,800（15-20天）

回复"价格"了解详细报价`,

    '价格': `💰 **价格一览**

初创版 ¥3,800 | 品牌版 ¥6,800 | 集团版 ¥12,800

📱 定制服务：小程序¥3,000起、电商¥8,000起

📞 联系：296077990@qq.com`,

    '多少钱': `💰 网站价格：¥3,800 起

- 初创版 ¥3,800
- 品牌版 ¥6,800  
- 集团版 ¥12,800

详情回复"套餐"`,

    '做网站': `🕐 **制作周期**

初创版：3-5天
品牌版：7-10天
集团版：15-20天

加急可协商`,

    '多久': `⏱️ 制作周期：

初创版 3-5天
品牌版 7-10天
集团版 15-20天

回复"套餐"看详情`,

    '淘宝': `❓ **为什么贵？**

✅ 原创设计（非模板）
✅ SEO优化帮获客
✅ 2小时售后响应
✅ 海南本地服务

一分价钱一分货！`,

    '推广': `📣 **关于推广**

✅ 网站SEO优化（免费）
✅ 百度竞价、信息流（付费）

需推广可回复"联系"`,

    '小程序': `📱 **小程序开发**

微信/支付宝：¥3,000起

签约品牌版送小程序

回复"套餐"了解`,

    'SEO': `🔍 **SEO服务**

✅ 基础SEO（免费）
✅ 深度优化付费

提升排名，回复"联系"`,

    '售后': `🛡️ **售后服务**

✅ 2小时响应
✅ 1个月免费维护
✅ 续费¥2,400/年`,

    '海南': `📍 **关于我们**

📍 海南省三亚市
📞 工作日 9:00-18:00
✅ 200+企业客户

本地服务更方便！`,

    '公司': `🏢 **流云智炬**

🌐 网站设计 | 📱 小程序
🔍 SEO优化 | 📣 营销推广

📍 三亚 | ✅ 200+客户`,

    '联系': `📞 **联系我们**

📧 邮箱：296077990@qq.com
📍 地址：海南省三亚市
⏰ 工作日 9:00-18:00

点击右下角在线咨询~`,

    '流程': `🔄 **合作流程**

1️⃣ 需求沟通
2️⃣ 合同签订
3️⃣ 设计开发
4️⃣ 测试上线
5️⃣ 售后支持`,

    '优势': `⭐ **选择我们**

🚀 快速交付
💎 品质保证
🤝 贴心服务
💰 合理价格`,

    'hello': `👋 您好！我是流云智炬AI助手

请问有什么可以帮您？
💰 价格 | 📦 套餐 | 📞 联系`,

    '你好': `👋 您好！

💰 价格 | 📦 套餐 | 📞 联系
直接点击下方按钮~`,

    '谢谢': `😊 不客气！有问题随时问我~`,

    '再见': `👋 再见！祝您生活愉快！`,
    
    '默认': `😊 您好！我是流云智炬AI助手

💰 价格 | 📦 套餐 | 📞 联系 | 🔄 流程
直接点击下方按钮或输入问题~`
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
        if (cells.every(c => /^[-:]+$/.test(c.trim()))) return '';
        const row = cells.map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${row}</tr>`;
    });
    if (html.includes('<tr>')) {
        html = html.replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<table class="chat-table">$&</table>');
    }
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul class="chat-list">$&</ul>');
    html = html.replace(/^(\d)️⃣\s+(.+)$/gm, '<div class="chat-step"><span class="step-num">$1</span><span class="step-text">$2</span></div>');
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    return html;
}

function initAIChat() {
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    const minimizeBtn = document.getElementById('chatMinimize');
    if (minimizeBtn) minimizeBtn.addEventListener('click', toggleAiChat);
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
        if (lowerInput.includes(keyword.toLowerCase())) return answer;
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

function clearChatAndClose() {
    clearChat();
    toggleAiChat();
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
    if (quickReplies) quickReplies.remove();
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
        } catch (e) { console.warn('Failed to load chat history:', e); }
    } else { addQuickReplies(); }
}

function addQuickReplies() {
    const quickReplies = document.createElement('div');
    quickReplies.className = 'quick-replies';
    quickReplies.innerHTML = `
        <button class="quick-reply-btn" data-question="套餐">📦 套餐</button>
        <button class="quick-reply-btn" data-question="价格">💰 价格</button>
        <button class="quick-reply-btn" data-question="联系">📞 联系</button>
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
        case '套餐': message = '我想了解套餐'; break;
        case '价格': message = '我想了解价格'; break;
        case '联系': message = '我想联系你们'; break;
    }
    chatInput.value = message;
    sendMessage();
}

document.addEventListener('DOMContentLoaded', initAIChat);