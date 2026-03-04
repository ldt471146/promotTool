import { state, designStyles, templates } from './data.js';

// 渲染左侧导航栏
function renderSidebar() {
  return `
    <aside class="w-64 bg-white border-r-2 md:border-r-4 border-black flex flex-col h-screen">
      <!-- Logo -->
      <div class="border-b-2 md:border-b-4 border-black px-4 py-4">
        <h1 class="font-black text-xl tracking-tight">提示词优化器</h1>
      </div>

      <!-- 导航菜单 -->
      <nav class="flex-1 overflow-y-auto py-4">
        ${renderNavItem('optimizer', '⚡', '提示词优化')}
        ${renderNavItem('styles', '🎨', '前端风格库')}
        ${renderNavItem('templates', '📋', '模板库')}
        ${renderNavItem('history', '📜', '历史记录')}
        ${renderNavItem('settings', '⚙️', '设置')}
      </nav>

      <!-- 底部信息 -->
      <div class="border-t-2 border-black px-4 py-3 text-xs text-gray-600">
        v0.1.0
      </div>
    </aside>
  `;
}

function renderNavItem(view, icon, label) {
  const active = state.currentView === view;
  return `
    <button
      onclick="switchView('${view}')"
      class="w-full px-4 py-3 text-left font-sans font-bold text-sm transition-colors flex items-center gap-3 ${
        active ? 'bg-black text-white' : 'hover:bg-gray-100'
      }"
    >
      <span class="text-lg">${icon}</span>
      <span>${label}</span>
    </button>
  `;
}

// 渲染主内容区
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

// 提示词优化器视图
function renderOptimizer() {
  return `
    <div class="flex-1 overflow-y-auto p-6 md:p-8">
      <h2 class="font-black text-2xl md:text-3xl mb-6">提示词优化</h2>

      <!-- 输入区 -->
      <div class="mb-6">
        <label class="font-sans font-bold text-sm mb-2 block">输入需求</label>
        <textarea
          id="input"
          class="w-full h-48 rounded-none border-2 border-black font-sans text-sm p-4 focus:outline-none focus:border-[#ff006e] transition-colors resize-none"
          placeholder="描述你的需求..."
          oninput="updateInput(this.value)"
        >${state.input}</textarea>
      </div>

      <!-- 操作按钮 -->
      <div class="flex gap-3 mb-6">
        <button
          onclick="optimize()"
          class="rounded-none font-sans font-bold bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
            state.isOptimizing ? 'opacity-50' : ''
          }"
          ${state.isOptimizing ? 'disabled' : ''}
        >
          ${state.isOptimizing ? '优化中...' : '优化提示词'}
        </button>
      </div>

      <!-- 结果区 -->
      ${state.result ? `
        <div class="rounded-none border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-sans font-bold text-lg">优化结果</h3>
            <div class="flex gap-2">
              <button onclick="copyResult()" class="rounded-none font-sans font-bold text-sm px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors">复制</button>
              <button onclick="saveToHistory()" class="rounded-none font-sans font-bold text-sm px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors">保存</button>
            </div>
          </div>
          <pre class="font-sans text-sm whitespace-pre-wrap leading-relaxed">${state.result}</pre>
        </div>
      ` : ''}
    </div>
  `;
}

// 前端风格库视图
function renderStyles() {
  return `
    <div class="flex-1 overflow-y-auto p-6 md:p-8">
      <h2 class="font-black text-2xl md:text-3xl mb-6">前端风格库</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${designStyles.map(style => `
          <div class="rounded-none border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] hover:-translate-y-1 transition-all">
            <!-- 图片 -->
            <img src="${style.image}" alt="${style.name}" class="w-full h-48 object-cover border-b-2 border-black" />

            <!-- 内容 -->
            <div class="p-6">
              <h3 class="font-sans font-bold text-xl mb-2">${style.name} / ${style.nameEn}</h3>
              <p class="font-sans text-sm text-gray-600 mb-4">${style.desc}</p>

              <!-- 配色 -->
              <div class="flex gap-2 mb-4">
                ${style.colors.map(c => `<div class="w-8 h-8 rounded-none border border-black" style="background:${c}"></div>`).join('')}
              </div>

              <!-- 关键词 -->
              <div class="flex gap-2 flex-wrap mb-4">
                ${style.keywords.map(k => `<span class="font-sans text-xs px-2 py-1 border border-black">${k}</span>`).join('')}
              </div>

              <!-- 操作按钮 -->
              <div class="flex gap-2">
                <button onclick="copyPrompt('${style.id}')" class="flex-1 rounded-none font-sans font-bold text-sm px-3 py-2 border-2 border-black bg-black text-white hover:bg-gray-800 transition-colors">复制提示词</button>
                <a href="${style.docUrl}" target="_blank" class="flex-1 rounded-none font-sans font-bold text-sm px-3 py-2 border-2 border-black text-center hover:bg-gray-100 transition-colors">完整文档</a>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 模板库视图
function renderTemplates() {
  return `
    <div class="flex-1 overflow-y-auto p-6 md:p-8">
      <h2 class="font-black text-2xl md:text-3xl mb-6">模板库</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${templates.map(t => `
          <div class="rounded-none border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] hover:-translate-y-1 transition-all cursor-pointer" onclick="selectTemplate(${t.id})">
            <div class="text-3xl mb-3">${t.icon}</div>
            <h3 class="font-sans font-bold text-lg mb-2">${t.name}</h3>
            <div class="font-sans text-xs text-gray-600 mb-3">${t.category}</div>
            <pre class="font-sans text-xs text-gray-700 whitespace-pre-wrap">${t.template.substring(0, 50)}...</pre>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 历史记录视图
function renderHistory() {
  return `
    <div class="flex-1 overflow-y-auto p-6 md:p-8">
      <h2 class="font-black text-2xl md:text-3xl mb-6">历史记录</h2>

      ${state.history.length === 0 ? `
        <div class="text-center py-24 text-gray-500 font-sans">暂无历史记录</div>
      ` : `
        <div class="space-y-4">
          ${state.history.map(h => `
            <div class="rounded-none border-2 border-black bg-white p-6">
              <div class="font-sans text-xs text-gray-600 mb-2">${h.time}</div>
              <div class="font-sans font-bold mb-2">原始输入：</div>
              <div class="font-sans text-sm text-gray-700 mb-4">${h.input.substring(0, 100)}...</div>
              <button onclick="loadHistory(${h.id})" class="rounded-none font-sans font-bold text-sm px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors">查看详情</button>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// 设置视图
function renderSettings() {
  return `
    <div class="flex-1 overflow-y-auto p-6 md:p-8">
      <h2 class="font-black text-2xl md:text-3xl mb-6">设置</h2>

      <div class="max-w-2xl">
        <div class="mb-6">
          <label class="font-sans font-bold text-sm mb-2 block">API Key</label>
          <input
            type="password"
            id="apiKey"
            class="w-full rounded-none border-2 border-black font-sans text-sm p-3 focus:outline-none focus:border-[#ff006e]"
            placeholder="输入你的 OpenAI API Key"
            value="${state.apiKey}"
            oninput="updateApiKey(this.value)"
          />
          <p class="font-sans text-xs text-gray-600 mt-2">API Key 将保存在本地浏览器中</p>
        </div>

        <button onclick="saveSettings()" class="rounded-none font-sans font-bold bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
          保存设置
        </button>
      </div>
    </div>
  `;
}

window.switchView = (view) => {
  state.currentView = view;
  render();
};

window.updateInput = (value) => {
  state.input = value;
};

window.optimize = async () => {
  if (!state.input.trim()) {
    alert('请输入需求');
    return;
  }

  state.isOptimizing = true;
  render();

  await new Promise(resolve => setTimeout(resolve, 1500));

  state.result = `# 优化后的提示词

你是一位专业的 AI 助手。

## 任务目标
${state.input}

## 输出要求
1. 结构清晰，分段明确
2. 语言准确，逻辑严谨
3. 符合目标受众的阅读习惯

## 约束条件
- 字数：根据内容需要自然展开
- 风格：专业且易懂
- 格式：使用 Markdown 格式

请开始创作。`;

  state.isOptimizing = false;
  render();
};

window.copyResult = () => {
  navigator.clipboard.writeText(state.result);
  alert('已复制到剪贴板');
};

window.saveToHistory = () => {
  state.history.unshift({
    id: Date.now(),
    input: state.input,
    result: state.result,
    time: new Date().toLocaleString('zh-CN')
  });
  localStorage.setItem('history', JSON.stringify(state.history));
  alert('已保存到历史记录');
};

window.selectStyle = (id) => {
  const style = designStyles.find(s => s.id === id);
  state.input = style.prompt;
  state.currentView = 'optimizer';
  render();
};

window.copyPrompt = (id) => {
  const style = designStyles.find(s => s.id === id);
  navigator.clipboard.writeText(style.prompt);
  alert('提示词已复制到剪贴板');
};

window.selectTemplate = (id) => {
  const template = templates.find(t => t.id === id);
  state.input = template.template;
  state.currentView = 'optimizer';
  render();
};

window.loadHistory = (id) => {
  const item = state.history.find(h => h.id === id);
  state.input = item.input;
  state.result = item.result;
  state.currentView = 'optimizer';
  render();
};

window.updateApiKey = (value) => {
  state.apiKey = value;
};

window.saveSettings = () => {
  localStorage.setItem('apiKey', state.apiKey);
  alert('设置已保存');
};

function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="flex h-screen">
      ${renderSidebar()}
      ${renderContent()}
    </div>
  `;
}

render();
