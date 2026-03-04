/**
 * 流云智炬 AI Chat Widget
 */

const AI_CONFIG = {
    apiKey: 'sk-cp-xeHyOKMxDaVLVHlirjKRLT6h2ptVhO3CRkBH6aDEpHe01DW9I40w--rXlEpIOzZu6GygeS1dFNthaiL3PhFUplxKHiRhf1YEh9NpVcrZ_7NYQasfegZpU2E',
    apiUrl: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
    model: 'abab6.5s-chat',
    
    systemPrompt: `你是流云智炬的智能顾问，专门为访客解答关于网站设计、小程序开发等数字化服务的问题。

## 关于流云智炬
流云智炬是海南自贸港企业数字化服务领先品牌，专注于为海南企业提供原创网站设计、SEO优化、小程序开发等数字化服务。
- 已服务200+企业客户
- 交付成功率100%
- 售后响应时间：工作日2小时内
- 地址：海南省三亚市

## 服务套餐
- 初创速启版 ¥3,800 (3-5天)
- 品牌升级版 ¥6,800 (7-10天，最热销)
- 集团形象版 ¥12,800 (15-20天)

## 定制服务
- 多语言版本 +¥3,000~8,000/语种
- 电商功能 ¥8,000~20,000
- 小程序对接 ¥3,000~8,000

## 常见问题
Q:为什么你们比淘宝贵？A:我们原创设计定制、SEO优化、售后响应快(2小时内)、本地服务。

Q:做网站要多久？A:初创版3-5天，品牌版7-10天，集团版15-20天。加急30%。

## 回答要求
1.只回答与流云智炬服务相关的问题
2.回答要专业简洁
3.适当引导用户预约咨询`
};

const chatWidget = document.getElementById('aiChatWidget');
const chatToggle = document.getElementById('aiChatToggle');
const chatWindow = document.getElementById('aiChatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

let conversationHistory = [];
let isProcessing = false;

function initAIChat() {
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
}

function toggleAiChat() {
    if (chatWindow.classList.contains('active')) {
        chatWindow.classList.remove('active');
    } else {
        chatWindow.classList.add('active');
        chatInput.focus();
    }
}

async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message || isProcessing) return;
    
    addMessage(message, 'user');
    chatInput.value = '';
    isProcessing = true;
    chatSend.disabled = true;
    showTyping();
    
    } catch (error) {
        removeTyping();
        addMessage('抱歉，服务暂时不可用。请稍后再试。', 'ai');
        console.error('AI Error:', error);
    }
        const response = await callAI(message);
        removeTyping();
        addMessage(response, 'ai');
    } catch (error) {
        removeTyping();
        addMessage('抱歉，服务暂时不可用（CORS跨域限制）。您可以联系我们获取更多帮助。', 'ai');
        console.error('AI Error:', error);
    }
        removeTyping();
        addMessage('抱歉，服务暂时不可用。请稍后再试。', 'ai');
    }
    
    isProcessing = false;
    chatSend.disabled = false;
}

async function callAI(userMessage) {
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
            max_tokens: 500
        })
    });
    
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    
    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
        conversationHistory.push({ role: 'user', content: userMessage });
        conversationHistory.push({ role: 'assistant', content: data.choices[0].message.content });
        if (conversationHistory.length > 16) conversationHistory = conversationHistory.slice(-16);
        return data.choices[0].message.content;
    }
    throw new Error('Invalid response');
}

function addMessage(content, type) {
    const div = document.createElement('div');
    div.className = 'message';
    div.innerHTML = '<div class="message-content">' + content.replace(/\n/g, '<br>') + '</div>';
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    const div = document.createElement('div');
    div.id = 'typing';
    div.className = 'message';
    div.innerHTML = '<div class="message-content">正在输入...</div>';
    chatMessages.appendChild(div);
}

function removeTyping() {
    const typing = document.getElementById('typing');
    if (typing) typing.remove();
}

function clearChat() {
    conversationHistory = [];
    chatMessages.innerHTML = '<div class="message"><div class="message-content">对话已清空。请问有什么可以帮您？</div></div>';
}

document.addEventListener('DOMContentLoaded', initAIChat);
