/**
 * 流云智炬 AI Chat Widget
 * 基于关键词匹配的知识库问答系统
 */

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

期待为您服务！`,

    'hello': `👋 您好！欢迎访问流云智炬！

我可以帮您解答：
- 服务套餐和价格
- 网站制作周期
- 小程序开发
- SEO优化
- 售后服务

请问有什么可以帮您？`,
    
    '你好': `👋 您好！欢迎访问流云智炬！

我可以帮您解答：
- 服务套餐和价格
- 网站制作周期
- 小程序开发
- SEO优化
- 售后服务

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

请直接输入您的问题，比如：
"套餐有哪些？"
"做一个网站多少钱？"
"你们负责推广吗？"
"海南本地有公司吗？"`
};

const chatWidget = document.getElementById('aiChatWidget');
const chatToggle = document.getElementById('aiChatToggle');
const chatWindow = document.getElementById('aiChatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');

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
    div.className = 'message';
    div.innerHTML = '<div class="message-content">' + content + '</div>';
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
    chatMessages.innerHTML = '<div class="message"><div class="message-content">对话已清空。请问有什么可以帮您？</div></div>';
}

document.addEventListener('DOMContentLoaded', initAIChat);
