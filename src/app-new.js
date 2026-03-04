import { state, designStyles, templates } from './data.js';

// 渲染左侧导航栏
function renderSidebar() {
  return `
    <aside class="w-64 bg-white border-r-2 border-black flex flex-col h-screen">
      <div class="border-b-2 border-black px-4 py-4">
        <h1 class="font-black text-xl">提示词优化器</h1>
      </div>
      <nav class="flex-1 py-4">
        ${renderNavItem('optimizer', '⚡', '提示词优化')}
        ${renderNavItem('styles', '🎨', '前端风格库')}
        ${renderNavItem('templates', '📋', '模板库')}
        ${renderNavItem('history', '📜', '历史记录')}
        ${renderNavItem('settings', '⚙️', '设置')}
      </nav>
    </aside>
  `;
}

function renderNavItem(view, icon, label) {
  const active = state.currentView === view;
  return `
    <button onclick="switchView('${view}')" class="w-full px-4 py-3 text-left font-bold text-sm flex items-center gap-3 ${active ? 'bg-black text-white' : 'hover:bg-gray-100'}">
      <span class="text-lg">${icon}</span>
      <span>${label}</span>
    </button>
  `;
}

// 渲染主内容
function renderContent() {
  switch (state.currentView) {
    case 'optimizer': return renderOptimizer();
    case 'styles': return renderStyles();
    case 'templates': return renderTemplates();
    case 'history': return renderHistory();
    case 'settings': return renderSettings();
    default: return renderOptimizer();
  }
}

// 前端风格库视图
function renderStyles() {
  const { currentPage, pageSize } = state;
  const totalPages = Math.ceil(designStyles.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentStyles = designStyles.slice(startIndex, endIndex);

  return `
    <div class="flex-1 overflow-y-auto">
      <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="flex justify-between items-center mb-8">
          <h2 class="font-black text-3xl">前端风格库</h2>
          <div class="text-sm text-gray-600">
            <span>共 ${designStyles.length} 个风格</span>
            <span class="mx-2">|</span>
            <span>数据来源: <a href="https://www.stylekit.top" target="_blank" class="font-bold text-black hover:text-[#ff006e] transition-colors">StyleKit.top</a></span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          ${currentStyles.map(style => `
            <div class="border-2 border-black overflow-hidden hover:shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] transition-all">
              <div class="aspect-[4/3] bg-gray-100">
                <img src="${style.image}" alt="${style.name}" class="w-full h-full object-cover" />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2">${style.name} / ${style.nameEn}</h3>
                <p class="text-sm text-gray-600 mb-3">${style.desc}</p>
                <div class="flex gap-2 mb-4">
                  ${style.keywords.slice(0,3).map(k => `<span class="text-xs px-2 py-1 bg-gray-100">${k}</span>`).join('')}
                </div>
                <a href="${style.docUrl}" target="_blank" class="block w-full border-2 border-black bg-black text-white font-bold py-2 text-sm text-center hover:bg-gray-800 transition-colors">查看完整文档</a>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- 分页 -->
        <div class="flex justify-center items-center gap-2 mb-8">
          <button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="px-4 py-2 border-2 border-black font-bold ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'} transition-colors">上一页</button>
          ${Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
            <button onclick="changePage(${page})" class="px-4 py-2 border-2 border-black font-bold ${page === currentPage ? 'bg-black text-white' : 'hover:bg-gray-100'} transition-colors">${page}</button>
          `).join('')}
          <button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''} class="px-4 py-2 border-2 border-black font-bold ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-black hover:text-white'} transition-colors">下一页</button>
        </div>

        <!-- 引用说明 -->
        <div class="border-t-2 border-black pt-6 text-center text-sm text-gray-600">
          <p class="mb-2">风格数据来源于 <a href="https://www.stylekit.top" target="_blank" class="font-bold text-black hover:text-[#ff006e] transition-colors">StyleKit.top</a></p>
          <p>感谢 StyleKit 提供的优质设计风格资源 ❤️</p>
        </div>
      </div>
    </div>
  `;
}

// 优化器视图
function renderOptimizer() {
  return `
    <div class="flex-1 overflow-y-auto p-8">
      <h2 class="font-black text-3xl mb-6">提示词优化</h2>
      <textarea id="input" class="w-full h-48 border-2 border-black p-4 mb-4" placeholder="输入需求...">${state.input}</textarea>
      <button onclick="optimize()" class="bg-black text-white px-6 py-3 font-bold border-2 border-black hover:bg-gray-800 transition-colors ${state.isOptimizing ? 'opacity-50 cursor-not-allowed' : ''}" ${state.isOptimizing ? 'disabled' : ''}>
        ${state.isOptimizing ? '优化中...' : '优化提示词'}
      </button>
      ${state.result ? `
        <div class="mt-6 border-2 border-black">
          <div class="border-b-2 border-black p-4 flex justify-between items-center bg-gray-50">
            <h3 class="font-bold">优化结果</h3>
            <div class="flex gap-2">
              <button onclick="translateToEnglish()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-black hover:text-white transition-colors">翻译成英文</button>
              <button onclick="copyResult()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-black hover:text-white transition-colors">复制</button>
            </div>
          </div>
          <div class="p-6"><pre class="whitespace-pre-wrap">${state.result}</pre></div>
        </div>
      ` : ''}
    </div>
  `;
}

// 模板库视图
function renderTemplates() {
  return `
    <div class="flex-1 overflow-y-auto p-8">
      <h2 class="font-black text-3xl mb-6">模板库</h2>
      <div class="grid grid-cols-3 gap-4">
        ${templates.map(t => `
          <div class="border-2 border-black p-6 cursor-pointer hover:bg-gray-100" onclick="selectTemplate(${t.id})">
            <div class="text-3xl mb-3">${t.icon}</div>
            <h3 class="font-bold text-lg">${t.name}</h3>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 历史记录视图
function renderHistory() {
  return `<div class="flex-1 overflow-y-auto p-8"><h2 class="font-black text-3xl mb-6">历史记录</h2><div class="text-gray-500">暂无历史</div></div>`;
}

// 设置视图
function renderSettings() {
  return `
    <div class="flex-1 overflow-y-auto p-8">
      <h2 class="font-black text-3xl mb-6">设置</h2>
      <div class="max-w-2xl">
        <div class="mb-6">
          <label class="font-bold text-sm mb-2 block">模型类型</label>
          <select id="modelType" class="w-full border-2 border-black p-3 font-bold" onchange="updateModelType(this.value)">
            <option value="openai" ${state.modelType === 'openai' ? 'selected' : ''}>OpenAI (GPT)</option>
            <option value="claude" ${state.modelType === 'claude' ? 'selected' : ''}>Claude (Anthropic)</option>
            <option value="gemini" ${state.modelType === 'gemini' ? 'selected' : ''}>Gemini (Google)</option>
          </select>
        </div>
        <div class="mb-6">
          <label class="font-bold text-sm mb-2 block">API URL</label>
          <input type="text" id="apiUrl" class="w-full border-2 border-black p-3" placeholder="https://api.openai.com/v1" value="${state.apiUrl}" />
        </div>
        <div class="mb-6">
          <label class="font-bold text-sm mb-2 block">API Key</label>
          <input type="password" id="apiKey" class="w-full border-2 border-black p-3" placeholder="sk-..." value="${state.apiKey}" />
        </div>
        ${state.availableModels.length > 0 ? `
          <div class="mb-6">
            <label class="font-bold text-sm mb-2 block">选择模型</label>
            <select id="selectedModel" class="w-full border-2 border-black p-3 font-bold">
              ${state.availableModels.map(m => `<option value="${m}" ${state.selectedModel === m ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
          </div>
        ` : ''}
        <div class="flex gap-3 mb-4">
          <button onclick="testConnection()" class="border-2 border-black px-6 py-3 font-bold hover:bg-gray-100 transition-colors">测试连接</button>
          <button onclick="saveSettings()" class="bg-black text-white px-6 py-3 font-bold border-2 border-black hover:bg-gray-800 transition-colors">保存设置</button>
        </div>
        <div id="testResult"></div>
      </div>
    </div>
  `;
}

// 交互函数
window.switchView = (view) => {
  state.currentView = view;
  state.currentPage = 1; // 切换视图时重置页码
  render();
};

window.changePage = (page) => {
  const totalPages = Math.ceil(designStyles.length / state.pageSize);
  if (page >= 1 && page <= totalPages) {
    state.currentPage = page;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.optimize = async () => {
  const input = document.getElementById('input').value;
  if (!input.trim()) {
    alert('请输入需求');
    return;
  }

  if (!state.apiUrl || !state.apiKey || !state.selectedModel) {
    alert('请先在设置中配置 API');
    state.currentView = 'settings';
    render();
    return;
  }

  state.input = input;
  state.isOptimizing = true;
  state.result = '';
  render();

  try {
    const systemPrompt = `你是一位专业的提示词工程师。你的任务是将用户的模糊需求转化为结构化、高质量的 AI 提示词。

优化原则：
1. 明确指令：使用清晰、具体的动词（分析、总结、生成、评估）
2. 上下文分离：用 ### 或 """ 分隔指令和内容
3. 输出格式：明确指定输出结构（JSON、Markdown、列表）
4. 约束条件：添加字数限制、风格要求、禁止事项
5. 思考链：对于复杂任务，要求"一步一步思考"
6. 示例引导：提供 1-2 个期望输出的示例

输出格式：
# 优化后的提示词

[优化后的完整提示词]

---

## 优化说明
- 添加了什么
- 为什么这样优化
- 预期效果`;

    const response = await fetch(`${state.apiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.apiKey}`
      },
      body: JSON.stringify({
        model: state.selectedModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `请优化以下提示词需求：\n\n${input}` }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      throw new Error(`API 错误: ${response.status}`);
    }

    const data = await response.json();
    state.result = data.choices[0].message.content;
  } catch (error) {
    state.result = `❌ 优化失败：${error.message}\n\n请检查设置中的 API 配置是否正确。`;
  }

  state.isOptimizing = false;
  render();
};

window.copyResult = () => {
  navigator.clipboard.writeText(state.result);
  alert('已复制到剪贴板');
};

window.translateToEnglish = async () => {
  state.isOptimizing = true;
  render();

  try {
    // 使用 MyMemory 免费翻译 API
    const text = encodeURIComponent(state.result);
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=zh|en`);

    if (!response.ok) {
      throw new Error('翻译服务暂时不可用');
    }

    const data = await response.json();
    if (data.responseStatus === 200) {
      state.result = data.responseData.translatedText;
    } else {
      throw new Error('翻译失败');
    }
  } catch (error) {
    alert(`翻译失败：${error.message}\n\n提示：你也可以复制后使用 Google 翻译或 DeepL`);
  }

  state.isOptimizing = false;
  render();
};

window.selectTemplate = (id) => {
  const template = templates.find(t => t.id === id);
  state.input = template.template;
  state.currentView = 'optimizer';
  render();
};

window.saveSettings = () => {
  const apiUrl = document.getElementById('apiUrl').value;
  const apiKey = document.getElementById('apiKey').value;
  const selectedModel = document.getElementById('selectedModel')?.value || state.selectedModel;

  state.apiUrl = apiUrl;
  state.apiKey = apiKey;
  state.selectedModel = selectedModel;

  localStorage.setItem('apiUrl', apiUrl);
  localStorage.setItem('apiKey', apiKey);
  localStorage.setItem('modelType', state.modelType);
  localStorage.setItem('selectedModel', selectedModel);

  alert('设置已保存');
};

window.updateModelType = (type) => {
  state.modelType = type;
};

window.testConnection = async () => {
  const apiUrl = document.getElementById('apiUrl').value;
  const apiKey = document.getElementById('apiKey').value;
  const resultDiv = document.getElementById('testResult');

  if (!apiUrl || !apiKey) {
    resultDiv.innerHTML = '<div class="border-2 border-black bg-red-100 p-4 text-sm">❌ 请先填写 API URL 和 API Key</div>';
    return;
  }

  resultDiv.innerHTML = '<div class="border-2 border-black bg-gray-100 p-4 text-sm">⏳ 测试连接中...</div>';

  try {
    const endpoint = `${apiUrl}/models`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        ...(state.modelType === 'claude' ? { 'anthropic-version': '2023-06-01' } : {})
      }
    });

    if (response.ok) {
      const data = await response.json();
      const models = data.data || data.models || [];
      state.availableModels = models.map(m => m.id || m.name || m).filter(Boolean);

      if (state.availableModels.length > 0 && !state.selectedModel) {
        state.selectedModel = state.availableModels[0];
      }

      resultDiv.innerHTML = `<div class="border-2 border-black bg-green-100 p-4 text-sm">✅ 连接成功！检测到 ${state.availableModels.length} 个可用模型</div>`;
      render();
    } else {
      const error = await response.text();
      resultDiv.innerHTML = `<div class="border-2 border-black bg-red-100 p-4 text-sm">❌ 连接失败 (${response.status})：${error.substring(0, 150)}</div>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<div class="border-2 border-black bg-red-100 p-4 text-sm">❌ 连接错误：${error.message}</div>`;
  }
};

function render() {
  document.getElementById('app').innerHTML = `
    <div class="flex h-screen">
      ${renderSidebar()}
      ${renderContent()}
    </div>
  `;
}

render();
