const KNOWLEDGE_BASE = {
    '套餐': [
        '📦 初创版 ¥3,800（3-5天）\n💰 品牌版 ¥6,800（7-10天）🔥\n💰 集团版 ¥12,800（15-20天）\n\n回复"价格"看详细',
    ],
    '价格': [
        '💰 初创3,800 | 品牌6,800 | 集团12,800\n📱 小程序3,000起 | 电商8,000起\n📧 296077990@qq.com',
    ],
    '多少钱': [
        '💰 网站 ¥3,800 起\n根据需求定制，免费咨询',
    ],
    '做网站': [
        '🕐 初创3-5天，品牌7-10天，集团15-20天\n加急可协商~',
    ],
    '多久': [
        '⏱️ 初创3-5天 | 品牌7-10天 | 集团15-20天',
    ],
    '淘宝': [
        '✅ 原创设计 | ✅ SEO优化\n✅ 2小时售后 | ✅ 海南本地\n专业服务，值得信赖！',
    ],
    '推广': [
        '📣 网站SEO免费\n付费推广可合作，回复"联系"详谈',
    ],
    '小程序': [
        '📱 微信/支付宝小程序 ¥3,000起\n品牌版赠送小程序',
    ],
    'SEO': [
        '🔍 基础SEO免费送\n深度优化需付费，提升排名有效',
    ],
    '售后': [
        '🛡️ 2小时响应 | 1个月免费维护\n续费¥2,400/年',
    ],
    '海南': [
        '📍 海南三亚\n📞 工作日9-18点\n服务200+企业',
    ],
    '公司': [
        '🏢 流云智炬科技\n🌐 网站 | 📱 小程序 | 🔍 SEO\n📍 海南三亚 | 200+客户',
    ],
    '联系': [
        '📧 296077990@qq.com\n📍 海南三亚\n💬 点击在线咨询',
    ],
    '流程': [
        '🔄 需求→签约→开发→上线→售后\n5步完成，欢迎咨询~',
    ],
    '优势': [
        '⭐ 快速响应 | 原创设计\n⭐ 2小时售后 | 合理价格',
    ],
    'hello': ['👋 您好！有什么可以帮您？'],
    '你好': ['👋 你好！随时为您服务~'],
    'hi': ['👋 Hi！想问什么尽管说'],
    '谢谢': ['😊 不客气！有问题随时问'],
    '好': ['😊 很高兴帮到您！'],
    '棒': ['👍 感谢支持！有问题随时找我'],
    '再见': ['👋 再见！欢迎下次光临~'],
    '拜拜': ['👋 拜拜！有需要随时找我'],
};

function getSmartReply(input) {
    const lower = input.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    
    const scores = {
        '套餐': ['套餐', '服务', '方案'],
        '价格': ['价格', '报价', '收费', '多少', '钱'],
        '多少钱': ['多少钱', '贵不贵', '便宜'],
        '做网站': ['做网站', '建站', '网站制作', '开发网站'],
        '多久': ['多久', '时间', '周期', '几天'],
        '淘宝': ['淘宝', '便宜', '模板'],
        '推广': ['推广', '流量', '获客', '竞价'],
        '小程序': ['小程序', '微信小程序', '支付宝'],
        'SEO': ['SEO', '排名', '搜索引擎'],
        '售后': ['售后', '维护', '服务'],
        '海南': ['海南', '三亚', '本地'],
        '公司': ['公司', '你们', '流云', '关于'],
        '联系': ['联系', '微信', '邮箱', '电话', '地址'],
        '流程': ['流程', '合作', '怎么'],
        '优势': ['优势', '为什么', '好在哪'],
        'hello': ['hello', 'hi', '你好', '您好', '在吗'],
        '谢谢': ['谢谢', '感谢', '好的', '知道了'],
        '好': ['好', '不错', '可以'],
        '棒': ['棒', '厉害', '优秀'],
        '再见': ['再见', '拜拜', 'bye', '走了'],
    };
    
    for (const [key, keywords] of Object.entries(scores)) {
        let score = 0;
        for (const kw of keywords) {
            if (lower.includes(kw)) score++;
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = key;
        }
    }
    
    if (bestMatch && KNOWLEDGE_BASE[bestMatch]) {
        const replies = KNOWLEDGE_BASE[bestMatch];
        return replies[Math.floor(Math.random() * replies.length)];
    }
    
    return '😊 欢迎访问流云智炬！\n💰 价格 | 📦 套餐 | 📞 联系\n直接点击下方按钮或输入问题~';
}

const chatWidget = document.getElementById('aiChatWidget');
const chatToggle = document.getElementById('aiChatToggle');
const chatWindow = document.getElementById('aiChatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

function getCurrentTime() {
    const now = new Date();
    return String(now.getHours()).padStart(2, '0') + ':' + 
           String(now.getMinutes()).padStart(2, '0');
}

function initAIChat() {
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    loadChatHistory();
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    addMessage(message, 'user');
    chatInput.value = '';
    showTyping();
    setTimeout(() => {
        removeTyping();
        const response = getSmartReply(message);
        addMessage(response, 'ai');
    }, 500);
}

function addMessage(content, type) {
    const div = document.createElement('div');
    div.className = `message message-${type}`;
    div.innerHTML = `<div class="message-content">${content.replace(/\n/g, '<br>')}</div><div class="message-time">${getCurrentTime()}</div>`;
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

function saveChatHistory() {
    const messages = [];
    chatMessages.querySelectorAll('.message').forEach(msg => {
        const contentEl = msg.querySelector('.message-content');
        if (contentEl) {
            messages.push({ 
                content: contentEl.innerText, 
                type: msg.classList.contains('message-user') ? 'user' : 'ai' 
            });
        }
    });
    const quick = chatMessages.querySelector('.quick-replies');
    if (quick) quick.remove();
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
                div.innerHTML = `<div class="message-content">${msg.content.replace(/\n/g, '<br>')}</div>`;
                chatMessages.appendChild(div);
            });
            addQuickReplies();
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (e) { addQuickReplies(); }
    } else { addQuickReplies(); }
}

function addQuickReplies() {
    const quick = document.createElement('div');
    quick.className = 'quick-replies';
    quick.innerHTML = `
        <button class="quick-reply-btn" data-question="套餐">📦 套餐</button>
        <button class="quick-reply-btn" data-question="价格">💰 价格</button>
        <button class="quick-reply-btn" data-question="联系">📞 联系</button>
    `;
    chatMessages.appendChild(quick);
    quick.querySelectorAll('.quick-reply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const q = btn.dataset.question;
            chatInput.value = q === '套餐' ? '我要了解套餐' : q === '价格' ? '我想了解价格' : '我想联系你们';
            sendMessage();
        });
    });
}

document.addEventListener('DOMContentLoaded', initAIChat);