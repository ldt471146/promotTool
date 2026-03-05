import { state, designStyles, saveHistory, deleteHistory, clearAllHistory, getAllTemplates, saveCustomTemplate, deleteCustomTemplate, addToFavorites, deleteFavorite, updateFavoriteNote, clearAllFavorites, customTemplates } from './data.js';

// 美化提示信息
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  const colors = {
    success: 'from-green-400 to-emerald-500',
    error: 'from-red-400 to-rose-500',
    info: 'from-blue-400 to-cyan-500'
  };
  toast.className = `fixed top-20 right-8 bg-gradient-to-r ${colors[type]} text-white px-6 py-4 border-3 border-black font-bold depth-4 rounded-sm animate-slide-in-right z-50`;
  toast.innerHTML = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slide-out-right 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// 检查是否已收藏
function isFavorited(type, identifier) {
  if (type === 'style') {
    return state.favorites.some(f => f.type === 'style' && f.name === identifier);
  } else if (type === 'template') {
    return state.favorites.some(f => f.type === 'template' && (f.templateId === identifier || f.templateId === parseInt(identifier)));
  }
  return false;
}

// 渲染左侧导航栏
function renderSidebar() {
  return `
    <aside class="w-64 bg-gradient-to-b from-white to-gray-50 border-r-2 border-black flex flex-col h-screen animate-slide-in-left depth-3">
      <div class="p-6 border-b-2 border-black bg-gradient-to-r from-purple-500 to-pink-500 animate-shimmer depth-2">
        <h1 class="font-black text-xl text-white drop-shadow-lg">AI 提示词优化器</h1>
      </div>
      <nav class="py-4">
        ${renderNavItem('optimizer', '⚡', '提示词优化', 'from-yellow-400 to-orange-500')}
        ${renderNavItem('styles', '🎨', '前端风格库', 'from-pink-400 to-rose-500')}
        ${renderNavItem('templates', '📋', '模板库', 'from-blue-400 to-cyan-500')}
        ${renderNavItem('favorites', '⭐', '收藏夹', 'from-amber-400 to-yellow-500')}
        ${renderNavItem('history', '📜', '历史记录', 'from-green-400 to-emerald-500')}
        ${renderNavItem('settings', '⚙️', '设置', 'from-gray-400 to-slate-500')}
      </nav>
    </aside>
  `;
}

function renderNavItem(view, icon, label, gradient) {
  const active = state.currentView === view;
  return `
    <button onclick="switchView('${view}')" class="w-full px-4 py-3 text-left font-bold text-sm flex items-center gap-3 smooth-transition btn-click ${active ? `bg-gradient-to-r ${gradient} text-white depth-2` : 'hover:bg-gray-100 hover:translate-x-2'}">
      <span class="text-2xl ${active ? 'animate-bounce-slow drop-shadow-md' : ''}">${icon}</span>
      <span>${label}</span>
    </button>
  `;
}

// 渲染主内容
function renderContent() {
  return `
    <div class="flex-1 overflow-y-auto page-transition-enter">
      ${renderContentInner()}
    </div>
  `;
}

function renderContentInner() {
  switch (state.currentView) {
    case 'optimizer': return renderOptimizer();
    case 'styles': return renderStyles();
    case 'templates': return renderTemplates();
    case 'favorites': return renderFavorites();
    case 'history': return renderHistory();
    case 'settings': return renderSettings();
    default: return renderOptimizer();
  }
}

// 前端风格库视图
function renderStyles() {
  const { currentPage, pageSize, styleSearchKeyword } = state;
  const filteredStyles = styleSearchKeyword
    ? designStyles.filter(s =>
        s.name.includes(styleSearchKeyword) ||
        s.nameEn.toLowerCase().includes(styleSearchKeyword.toLowerCase()) ||
        s.desc.includes(styleSearchKeyword) ||
        s.keywords.some(k => k.includes(styleSearchKeyword))
      )
    : designStyles;

  const totalPages = Math.ceil(filteredStyles.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentStyles = filteredStyles.slice(startIndex, endIndex);

  return `
    <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="font-black text-3xl">前端风格库</h2>
          <div class="text-sm text-gray-600">
            <span>共 ${filteredStyles.length} 个风格</span>
            <span class="mx-2">|</span>
            <span>数据来源: <a href="https://www.stylekit.top" target="_blank" class="font-bold text-black hover:text-[#ff006e] transition-colors">StyleKit.top</a></span>
          </div>
        </div>

        <div class="mb-8">
          <input type="text" id="styleSearch" placeholder="🔍 搜索风格名称、关键词... (按回车搜索)" value="${styleSearchKeyword}" onkeypress="if(event.key==='Enter') searchStyles(this.value)" class="w-full border-2 border-black p-3 font-medium hover:bg-gray-50 focus:bg-white smooth-transition rounded-sm" />
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
                <div class="flex gap-2">
                  <a href="${style.docUrl}" target="_blank" class="flex-1 border-2 border-black bg-black text-white font-bold py-2 text-sm text-center hover:bg-gray-800 transition-colors">查看文档</a>
                  <button onclick="favoriteStyle('${style.name}')" class="border-2 border-black ${isFavorited('style', style.name) ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-yellow animate-pulse-slow scale-110' : 'bg-gray-200 text-gray-500'} px-3 py-2 text-xl font-bold hover:scale-105 transition-all">${isFavorited('style', style.name) ? '⭐' : '☆'}</button>
                </div>
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
  const allTemplates = getAllTemplates();

  return `
    <div class="p-8 ${state.backgroundImage ? 'bg-transparent' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50'} bg-dots animate-fade-in min-h-screen">
      <div class="flex justify-between items-center mb-8">
        <h2 class="font-black text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-in-left drop-shadow-md">提示词优化</h2>
        <div id="optimizerMode" class="flex gap-3 animate-slide-in-right">
          <button onclick="switchMode('fast')" class="px-5 py-2.5 border-2 border-black font-bold smooth-transition btn-click hover-lift ${state.optimizeMode === 'fast' ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-yellow scale-105 animate-pulse-slow' : 'bg-white hover:bg-yellow-100 hover:scale-105'}">⚡ 快速</button>
          <button onclick="switchMode('deep')" class="px-5 py-2.5 border-2 border-black font-bold smooth-transition btn-click hover-lift ${state.optimizeMode === 'deep' ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-purple scale-105 animate-pulse-slow' : 'bg-white hover:bg-blue-100 hover:scale-105'}">🧠 深度</button>
        </div>
      </div>

      <!-- 选择栏 -->
      <div class="mb-6 p-6 border-2 border-black bg-white depth-3 rounded-sm">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 模型选择 -->
          <div>
            <label class="font-bold text-sm mb-2 flex items-center gap-2 text-purple-700">
              <span class="text-2xl">🤖</span>
              <span>AI 模型</span>
            </label>
            <div class="relative">
              ${state.availableModels.length > 0 ? `
                <select id="optimizerModel" class="w-full border-2 border-purple-300 p-3 pr-10 font-medium bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 smooth-transition rounded-sm cursor-pointer appearance-none focus:outline-none focus:border-purple-500">
                  ${state.availableModels.map(m => `<option value="${m}" ${state.selectedModel === m ? 'selected' : ''}>${m}</option>`).join('')}
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-purple-600">▼</div>
              ` : `
                <div class="w-full border-2 border-gray-300 p-3 bg-gray-50 rounded-sm text-gray-500 text-sm flex items-center gap-2">
                  <span>⚠️</span>
                  <span>请先在设置中测试连接</span>
                </div>
              `}
            </div>
          </div>

          <!-- 模板选择 -->
          <div>
            <label class="font-bold text-sm mb-2 flex items-center gap-2 text-blue-700">
              <span class="text-2xl">📋</span>
              <span>提示词模板</span>
            </label>
            <div class="relative">
              <select id="templateSelect" onchange="selectTemplateFromDropdown(this.value)" class="w-full border-2 border-blue-300 p-3 pr-10 font-medium bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 smooth-transition rounded-sm cursor-pointer appearance-none focus:outline-none focus:border-blue-500">
                <option value="">💡 不使用模板</option>
                ${allTemplates.map(t => `
                  <option value="${t.id}" ${state.selectedTemplate && state.selectedTemplate.id === t.id ? 'selected' : ''}>
                    ${t.icon} ${t.name}
                  </option>
                `).join('')}
              </select>
              <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600">▼</div>
            </div>
          </div>
        </div>

        <!-- 我的收藏按钮 -->
        <div class="mt-4 flex justify-end">
          <button onclick="openFavoritesModal()" class="border-3 border-black bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white px-6 py-3 font-black text-lg hover:from-yellow-500 hover:via-amber-600 hover:to-orange-600 smooth-transition depth-3 hover:depth-4 rounded-sm flex items-center gap-2 shadow-yellow animate-pulse-slow hover:scale-110 btn-click">
            <span class="text-2xl animate-bounce">⭐</span>
            <span>我的收藏</span>
          </button>
        </div>
      </div>

      <textarea id="input" class="w-full h-48 border-2 border-black p-4 mb-4 bg-white hover:bg-purple-50 focus:bg-white focus:border-purple-500 smooth-transition depth-2 hover:depth-3 inset-shadow rounded-sm" placeholder="✍️ 在这里输入你的需求...">${state.input}</textarea>

      <button onclick="optimize()" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 text-lg font-bold border-2 border-black hover:from-purple-700 hover:to-pink-700 smooth-transition shadow-purple hover:shadow-pink btn-click hover-lift hover-glow ${state.isOptimizing ? 'opacity-50 cursor-not-allowed animate-pulse-slow' : ''}" ${state.isOptimizing ? 'disabled' : ''}>
        ${state.isOptimizing ? '<span class="animate-rotate inline-block">⏳</span> 优化中...' : '✨ 开始优化'}
      </button>

      ${state.result ? `
        <div class="mt-8 border-2 border-black depth-4 animate-fade-in hover-lift smooth-transition rounded-sm overflow-hidden">
          <div class="border-b-2 border-black p-5 flex justify-between items-center bg-gradient-to-r from-green-400 to-cyan-500">
            <h3 class="font-bold text-white text-xl drop-shadow-md">✨ 优化结果</h3>
            <div class="flex gap-2">
              <button onclick="addCurrentToFavorites()" class="border-2 border-black bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 font-bold hover:from-yellow-500 hover:to-amber-600 smooth-transition shadow-yellow btn-click hover:scale-105 rounded-sm">⭐ 收藏</button>
              <button onclick="translateToEnglish()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-blue-100 smooth-transition depth-1 hover:depth-2 btn-click hover:scale-105 rounded-sm">🌐 翻译</button>
              <button onclick="copyResult()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-green-100 smooth-transition depth-1 hover:depth-2 btn-click hover:scale-105 rounded-sm">📋 复制</button>
            </div>
          </div>
          <div class="p-6 bg-gradient-to-br from-white to-gray-50"><pre class="whitespace-pre-wrap leading-relaxed">${state.result}</pre></div>
        </div>
      ` : ''}

    <!-- 收藏模态框 -->
    <div id="favoritesModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" onclick="if(event.target.id==='favoritesModal') closeFavoritesModal()">
      <div class="bg-gradient-to-br from-yellow-50 to-amber-50 border-4 border-black max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto depth-4 rounded-sm" onclick="event.stopPropagation()">
        <div class="bg-gradient-to-r from-yellow-400 to-amber-500 p-4 border-b-4 border-black flex items-center justify-between sticky top-0 z-10">
          <h3 class="font-black text-2xl text-white flex items-center gap-2 drop-shadow-lg">
            <span class="text-3xl animate-bounce-slow">⭐</span>
            我的收藏
          </h3>
          <button onclick="closeFavoritesModal()" class="text-white text-3xl hover:scale-110 hover:rotate-90 smooth-transition">×</button>
        </div>
        <div class="p-6">
          ${state.favorites.filter(f => f.type === 'template').length === 0 ? `
            <div class="text-center text-gray-500 py-12 bg-white border-2 border-black depth-2 rounded-sm">
              <div class="text-6xl mb-4 animate-bounce-slow">📋</div>
              <p class="text-xl mb-2 font-bold">暂无收藏的模板</p>
              <p class="text-sm">去模板库收藏你喜欢的模板吧！</p>
            </div>
          ` : `
            <div class="space-y-3">
              ${state.favorites.filter(f => f.type === 'template').map(item => `
                <div class="border-2 border-black p-4 bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] smooth-transition cursor-pointer depth-2 hover:depth-3 hover:scale-102 rounded-sm" onclick="useFavoriteTemplateInOptimizer(${item.id})">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-3xl animate-bounce-slow">${item.icon}</span>
                      <div>
                        <h4 class="font-bold text-lg">${item.name}</h4>
                        <p class="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-sm inline-block">${item.category}</p>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-amber-600">点击使用 →</span>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    </div>
    </div>
  `;
}

// 模板库视图
function renderTemplates() {
  const allTemplates = getAllTemplates();
  const { templateSearchKeyword } = state;

  const filteredTemplates = templateSearchKeyword
    ? allTemplates.filter(t =>
        t.name.includes(templateSearchKeyword) ||
        t.category.includes(templateSearchKeyword) ||
        t.description?.includes(templateSearchKeyword) ||
        t.systemPrompt.includes(templateSearchKeyword)
      )
    : allTemplates;

  const categories = [...new Set(filteredTemplates.map(t => t.category))];

  const categoryColors = {
    '核心框架': 'from-purple-400 to-pink-500',
    '认知增强': 'from-blue-400 to-cyan-500',
    '核心技术': 'from-green-400 to-emerald-500',
    '高级技术': 'from-orange-400 to-red-500',
    '应用场景': 'from-indigo-400 to-purple-500',
    '自定义': 'from-gray-400 to-slate-500'
  };

  return `
    <div class="p-8 ${state.backgroundImage ? 'bg-transparent' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'} bg-waves animate-fade-in min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-black text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-left drop-shadow-md">模板库</h2>
        <div class="flex items-center gap-4 animate-slide-in-right">
          <span class="text-sm text-gray-600">
            数据来源: <a href="https://www.ibm.com/cn-zh/think/prompt-engineering" target="_blank" class="font-bold text-blue-600 hover:text-purple-600 smooth-transition">IBM 提示词工程指南</a>
          </span>
        </div>
      </div>

      <!-- 浮动添加按钮 -->
      <button onclick="importTemplateFile()" class="fixed bottom-8 right-8 w-16 h-16 border-4 border-black bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 smooth-transition depth-4 hover:depth-5 z-50 flex items-center justify-center text-3xl font-bold animate-bounce-slow" title="导入模板文件">
        +
      </button>

      <div class="mb-6">
        <input type="text" id="templateSearch" placeholder="🔍 搜索模板名称、分类、内容... (按回车搜索)" value="${templateSearchKeyword}" onkeypress="if(event.key==='Enter') searchTemplates(this.value)" class="w-full border-2 border-black p-3 font-medium hover:bg-gray-50 focus:bg-white smooth-transition rounded-sm" />
      </div>

      <div class="mb-6 text-sm text-gray-600 bg-white border-2 border-black p-4 depth-2 animate-fade-in hover-lift smooth-transition rounded-sm">
        💡 点击模板卡片使用，点击"查看"按钮查看和编辑模板内容
      </div>

      ${categories.map(category => `
        <div class="mb-8">
          <h3 class="font-bold text-2xl mb-4 border-b-2 border-black pb-2 bg-gradient-to-r ${categoryColors[category] || 'from-gray-400 to-slate-500'} bg-clip-text text-transparent animate-slide-in-left drop-shadow-sm">${category}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${filteredTemplates.filter(t => t.category === category).map(t => `
              <div class="border-2 border-black p-5 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] smooth-transition hover-lift btn-click card-enter depth-2 hover:depth-3 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${categoryColors[category] || 'from-gray-400 to-slate-500'} opacity-10 rounded-bl-full"></div>
                <div class="flex justify-between items-start mb-3 relative z-10">
                  <div class="flex items-center gap-2">
                    <div class="text-4xl animate-bounce-slow drop-shadow-md">${t.icon}</div>
                    <h4 class="font-bold">${t.name}</h4>
                  </div>
                </div>
                <pre class="text-xs text-gray-600 whitespace-pre-wrap line-clamp-3 mb-3 bg-gray-50 p-2 border border-gray-200 rounded-sm">${t.systemPrompt.substring(0, 100)}...</pre>
                <div class="flex gap-2">
                  <button onclick="selectTemplate('${t.id}')" class="flex-1 border-2 border-black bg-gradient-to-r ${categoryColors[category] || 'from-gray-400 to-slate-500'} text-white px-3 py-2 text-sm font-bold hover:opacity-90 smooth-transition depth-1 hover:depth-2 btn-click">使用</button>
                  <button onclick="viewTemplate('${t.id}')" class="flex-1 border-2 border-black bg-white px-3 py-2 text-sm font-bold hover:bg-gray-100 smooth-transition btn-click">查看</button>
                  <button onclick="favoriteTemplate('${t.id}')" class="border-2 border-black ${isFavorited('template', t.id) ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-yellow animate-pulse-slow scale-110' : 'bg-gray-200 text-gray-500'} px-3 py-2 text-xl font-bold hover:scale-105 smooth-transition btn-click transition-all">${isFavorited('template', t.id) ? '⭐' : '☆'}</button>
                  ${t.isCustom ? `<button onclick="deleteTemplate('${t.id}')" class="border-2 border-red-500 text-red-500 px-3 py-2 text-sm font-bold hover:bg-red-500 hover:text-white smooth-transition btn-click">删除</button>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}

      <div class="border-t-2 border-black pt-6 text-center text-sm text-gray-600 bg-white p-4 depth-2 animate-fade-in rounded-sm">
        <p class="mb-2">模板基于 <a href="https://www.ibm.com/cn-zh/think/prompt-engineering" target="_blank" class="font-bold text-blue-600 hover:text-purple-600 smooth-transition">IBM 提示词工程指南</a> 设计</p>
        <p>包含 Zero-shot、Few-shot、Chain-of-Thought、Tree-of-Thoughts、RAG、Meta-prompting 等专业方法</p>
      </div>
    </div>

    <!-- 查看/编辑模板弹窗 -->
    <div id="viewTemplateModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white border-4 border-black p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto depth-5 animate-fade-in">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-black text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" id="modalTemplateName"></h3>
          <button onclick="hideViewTemplateModal()" class="text-2xl font-bold hover:text-red-500 smooth-transition hover:rotate-90">×</button>
        </div>
        <div class="mb-4">
          <label class="font-bold text-sm mb-2 block text-purple-800">模板名称</label>
          <input id="editTemplateName" type="text" class="w-full border-2 border-black p-2 bg-gray-50" readonly>
        </div>
        <div class="mb-4">
          <label class="font-bold text-sm mb-2 block text-purple-800">分类</label>
          <input id="editTemplateCategory" type="text" class="w-full border-2 border-black p-2 smooth-transition hover:bg-gray-50">
        </div>
        <div class="mb-4">
          <label class="font-bold text-sm mb-2 block text-purple-800">系统提示词</label>
          <textarea id="editTemplateContent" class="w-full h-96 border-2 border-black p-3 font-mono text-sm smooth-transition hover:bg-gray-50 inset-shadow"></textarea>
        </div>
        <div class="flex gap-2 justify-end">
          <button onclick="hideViewTemplateModal()" class="border-2 border-black px-4 py-2 font-bold hover:bg-gray-100 smooth-transition btn-click">取消</button>
          <button onclick="saveTemplateEdit()" class="border-2 border-black bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 font-bold hover:from-purple-700 hover:to-pink-700 smooth-transition shadow-purple btn-click hover:scale-105">保存修改</button>
        </div>
      </div>
    </div>
  `;
}

// 收藏夹视图
function renderFavorites() {
  const promptFavorites = state.favorites.filter(f => !f.type || f.type === 'prompt');
  const styleFavorites = state.favorites.filter(f => f.type === 'style');
  const templateFavorites = state.favorites.filter(f => f.type === 'template');

  return `
    <div class="p-8 ${state.backgroundImage ? 'bg-transparent' : 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50'} animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-black text-4xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent animate-slide-in-left drop-shadow-md">收藏夹</h2>
        <div class="flex gap-2 animate-slide-in-right">
          <button onclick="exportFavoritesJSON()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-amber-100 smooth-transition depth-2 hover:depth-3 btn-click hover:scale-105">📤 导出 JSON</button>
          <button onclick="clearFavorites()" class="border-2 border-black bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 font-bold hover:from-red-600 hover:to-pink-600 smooth-transition shadow-pink btn-click hover:scale-105">🗑️ 清空收藏</button>
        </div>
      </div>

      ${state.favorites.length === 0 ? `
        <div class="text-center text-gray-500 py-12 bg-white border-2 border-black depth-4 glass animate-fade-in">
          <div class="text-6xl mb-4 animate-bounce-slow">⭐</div>
          <p class="text-2xl mb-2 font-bold">暂无收藏</p>
          <p class="text-sm">可以收藏：提示词、模板、前端风格</p>
        </div>
      ` : `
        <div class="space-y-8">
          <!-- 模板收藏 -->
          ${templateFavorites.length > 0 ? `
            <div>
              <h3 class="font-bold text-2xl mb-4 text-purple-700">📋 收藏的模板 (${templateFavorites.length})</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${templateFavorites.map(item => `
                  <div class="border-2 border-black p-4 bg-white depth-2 hover:depth-3 smooth-transition">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-2xl">${item.icon}</span>
                      <h4 class="font-bold">${item.name}</h4>
                    </div>
                    <p class="text-xs text-gray-600 mb-3">${item.category}</p>
                    <div class="flex gap-2">
                      <button onclick="useFavoriteTemplate(${item.id})" class="flex-1 border-2 border-black bg-green-500 text-white px-3 py-2 text-sm font-bold hover:bg-green-600 smooth-transition">使用</button>
                      <button onclick="deleteFavoriteItem(${item.id})" class="border-2 border-black bg-red-500 text-white px-3 py-2 text-sm font-bold hover:bg-red-600 smooth-transition">删除</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- 风格收藏 -->
          ${styleFavorites.length > 0 ? `
            <div>
              <h3 class="font-bold text-2xl mb-4 text-pink-700">🎨 收藏的风格 (${styleFavorites.length})</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${styleFavorites.map(item => `
                  <div class="border-2 border-black bg-white depth-2 hover:depth-3 smooth-transition overflow-hidden">
                    <div class="aspect-[4/3] bg-gray-100">
                      <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
                    </div>
                    <div class="p-3">
                      <h4 class="font-bold text-sm mb-1">${item.name}</h4>
                      <p class="text-xs text-gray-600 mb-2">${item.desc}</p>
                      <div class="flex gap-2">
                        <a href="${item.docUrl}" target="_blank" class="flex-1 border-2 border-black bg-black text-white px-3 py-2 text-xs text-center font-bold hover:bg-gray-800 smooth-transition">查看</a>
                        <button onclick="deleteFavoriteItem(${item.id})" class="border-2 border-black bg-red-500 text-white px-3 py-2 text-xs font-bold hover:bg-red-600 smooth-transition">删除</button>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- 提示词收藏 -->
          ${promptFavorites.length > 0 ? `
            <div>
              <h3 class="font-bold text-2xl mb-4 text-amber-700">✨ 收藏的提示词 (${promptFavorites.length})</h3>
              <div class="space-y-4">
              <div class="space-y-4">
                ${promptFavorites.map(item => `
                  <div class="border-2 border-black p-4 bg-gradient-to-r from-yellow-100 to-amber-100 depth-2 hover:depth-3 smooth-transition">
                    <div class="flex justify-between items-start mb-3">
                      <div>
                        <span class="text-xs px-2 py-1 bg-gradient-to-r ${item.mode === 'fast' ? 'from-yellow-400 to-orange-500' : 'from-blue-500 to-purple-600'} text-white font-bold rounded-sm">${item.mode === 'fast' ? '⚡ 快速' : '🧠 深度'}</span>
                        <span class="text-xs px-2 py-1 bg-white ml-2 border border-gray-300 rounded-sm">${item.model}</span>
                        <span class="text-xs text-gray-500 ml-2">🕒 ${new Date(item.timestamp).toLocaleString('zh-CN')}</span>
                      </div>
                      <div class="flex gap-2">
                        <button onclick="reuseFavorite(${item.id})" class="text-xs px-3 py-1 border-2 border-black bg-white hover:bg-green-100 font-bold smooth-transition">♻️ 复用</button>
                        <button onclick="deleteFavoriteItem(${item.id})" class="text-xs px-3 py-1 border-2 border-black bg-red-500 text-white hover:bg-red-600 font-bold smooth-transition">删除</button>
                      </div>
                    </div>
                    <div class="text-sm bg-white p-3 border-2 border-gray-200 rounded-sm">${item.input.substring(0, 100)}${item.input.length > 100 ? '...' : ''}</div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `}
    </div>
  `;
}

// 历史记录视图
function renderHistory() {
  return `
    <div class="p-8 ${state.backgroundImage ? 'bg-transparent' : 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50'} bg-grid animate-fade-in min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-black text-4xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-slide-in-left drop-shadow-md">历史记录</h2>
        <div class="flex gap-2 animate-slide-in-right">
          <button onclick="importHistory()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-green-100 smooth-transition depth-2 hover:depth-3 btn-click hover:scale-105">📥 导入 JSON</button>
          <button onclick="exportHistoryJSON()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-emerald-100 smooth-transition depth-2 hover:depth-3 btn-click hover:scale-105">📤 导出 JSON</button>
          <button onclick="clearHistory()" class="border-2 border-black bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 font-bold hover:from-red-600 hover:to-pink-600 smooth-transition shadow-pink btn-click hover:scale-105">🗑️ 清空历史</button>
        </div>
      </div>

      ${state.history.length === 0 ? `
        <div class="text-center text-gray-500 py-16 bg-white border-2 border-black depth-4 glass animate-fade-in relative overflow-hidden">
          <div class="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-float"></div>
          <div class="absolute bottom-10 right-10 w-40 h-40 bg-emerald-200 rounded-full opacity-20 animate-float" style="animation-delay: 1s;"></div>
          <div class="relative z-10">
            <div class="text-7xl mb-4 animate-bounce-slow">📜</div>
            <p class="text-2xl mb-2 font-bold">暂无历史记录</p>
            <p class="text-sm">开始优化提示词后，历史记录会显示在这里</p>
          </div>
        </div>
      ` : `
        <div class="space-y-6">
          ${state.history.map((item, index) => `
            <div class="border-2 border-black p-6 bg-white depth-3 hover:depth-4 smooth-transition hover-lift btn-click card-enter" style="animation-delay: ${index * 0.1}s">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <span class="text-xs px-3 py-1.5 bg-gradient-to-r ${item.mode === 'fast' ? 'from-yellow-400 to-orange-500' : 'from-blue-500 to-purple-600'} text-white font-bold depth-1 rounded-sm">${item.mode === 'fast' ? '⚡ 快速' : '🧠 深度'}</span>
                  <span class="text-xs px-3 py-1.5 bg-white ml-2 border border-gray-300 depth-1 rounded-sm">${item.model}</span>
                  <span class="text-xs text-gray-500 ml-2">🕒 ${new Date(item.timestamp).toLocaleString('zh-CN')}</span>
                </div>
                <div class="flex gap-2">
                  <button onclick="reuseHistory(${item.id})" class="text-sm px-3 py-2 border-2 border-black bg-white hover:bg-green-100 font-bold smooth-transition depth-1 hover:depth-2 btn-click hover:scale-105">♻️ 复用</button>
                  <button onclick="deleteHistoryItem(${item.id})" class="text-sm px-3 py-2 border-2 border-black bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 font-bold smooth-transition shadow-pink btn-click hover:scale-105">🗑️ 删除</button>
                </div>
              </div>
              <div class="mb-3">
                <div class="text-sm font-bold mb-2 text-green-800 flex items-center gap-2">
                  <span class="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500"></span>
                  📥 输入
                </div>
                <div class="text-sm bg-gray-50 p-3 border-2 border-gray-200 depth-1 inset-shadow rounded-sm">${item.input.substring(0, 100)}${item.input.length > 100 ? '...' : ''}</div>
              </div>
              <div>
                <div class="text-sm font-bold mb-2 text-green-800 flex items-center gap-2">
                  <span class="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500"></span>
                  📤 输出
                </div>
                <div class="text-sm bg-gray-50 p-3 border-2 border-gray-200 max-h-32 overflow-y-auto depth-1 inset-shadow rounded-sm">${item.output.substring(0, 200)}${item.output.length > 200 ? '...' : ''}</div>
              </div>
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
    <div class="p-8 ${state.backgroundImage ? 'bg-transparent' : 'bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50'} min-h-screen">
      <h2 class="font-black text-4xl mb-8 bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">设置</h2>
      <div class="max-w-3xl">
        <!-- 设置按钮组 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- 外观主题按钮 -->
          <button id="openBackgroundModalBtn" type="button" onclick="openBackgroundModal()" class="border-2 border-black bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white hover:from-purple-600 hover:to-pink-600 smooth-transition depth-3 hover:depth-4 rounded-sm group">
            <div class="text-6xl mb-4 group-hover:scale-110 smooth-transition">🎨</div>
            <h3 class="font-black text-2xl mb-2">外观主题</h3>
            <p class="text-sm opacity-90">自定义背景图片和样式</p>
          </button>

          <!-- API 配置按钮 -->
          <button id="openApiModalBtn" type="button" onclick="openApiModal()" class="border-2 border-black bg-gradient-to-r from-blue-500 to-cyan-500 p-8 text-white hover:from-blue-600 hover:to-cyan-600 smooth-transition depth-3 hover:depth-4 rounded-sm group">
            <div class="text-6xl mb-4 group-hover:scale-110 smooth-transition">⚙️</div>
            <h3 class="font-black text-2xl mb-2">API 配置</h3>
            <p class="text-sm opacity-90">配置模型和 API 密钥</p>
          </button>
        </div>
      </div>
    </div>

    <!-- 背景设置模态框 -->
    <div id="backgroundModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" onclick="if(event.target.id==='backgroundModal') closeBackgroundModal()">
      <div class="bg-white border-4 border-black max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto depth-4 rounded-sm" onclick="event.stopPropagation()">
        <div class="bg-gradient-to-r from-purple-500 to-pink-500 p-4 border-b-4 border-black flex items-center justify-between sticky top-0 z-10">
          <h3 class="font-black text-2xl text-white flex items-center gap-2">
            <span class="text-3xl">🎨</span>
            外观主题
          </h3>
          <button onclick="closeBackgroundModal()" class="text-white text-3xl hover:scale-110 smooth-transition">×</button>
        </div>
        <div class="p-6 space-y-6">
          <!-- 背景预览 -->
          <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-4 border-2 border-purple-200 rounded-sm">
            <div class="font-bold text-sm mb-3 text-purple-700 flex items-center gap-2">
              <span class="text-xl">👁️</span>
              背景预览
            </div>
            <div class="border-2 border-black h-48 bg-gray-100 bg-center bg-no-repeat relative overflow-hidden depth-2 rounded-sm" style="${state.backgroundImage ? `background-image:url('${state.backgroundImage}'); background-size: ${state.backgroundSize};` : ''}">
              ${!state.backgroundImage ? '<div class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-bold">暂无背景图片</div>' : ''}
            </div>
          </div>

          <!-- 背景 URL -->
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 border-2 border-blue-200 rounded-sm">
            <label class="font-bold text-sm mb-3 block text-blue-700 flex items-center gap-2">
              <span class="text-xl">🔗</span>
              背景图片 URL
            </label>
            <div class="flex gap-2">
              <input type="text" id="backgroundUrl" class="flex-1 border-2 border-black p-3 bg-white hover:bg-gray-50 smooth-transition rounded-sm" placeholder="https://example.com/bg.jpg" value="${state.backgroundImage.startsWith('data:') ? '' : state.backgroundImage}" />
              <button onclick="applyBackgroundUrl()" class="border-2 border-black px-6 py-3 font-bold bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 smooth-transition depth-1 hover:depth-2 rounded-sm whitespace-nowrap">应用</button>
            </div>
          </div>

          <!-- 上传图片 -->
          <div class="bg-gradient-to-br from-pink-50 to-rose-50 p-4 border-2 border-pink-200 rounded-sm">
            <label class="font-bold text-sm mb-3 block text-pink-700 flex items-center gap-2">
              <span class="text-xl">📤</span>
              上传背景图片
            </label>
            <input type="file" accept="image/*" onchange="uploadBackgroundImage(event)" class="w-full border-2 border-black p-3 bg-white hover:bg-gray-50 smooth-transition rounded-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white file:font-bold file:cursor-pointer file:rounded-sm" />
          </div>

          <!-- 背景设置 -->
          <div class="bg-gradient-to-br from-amber-50 to-orange-50 p-4 border-2 border-amber-200 rounded-sm">
            <div class="font-bold text-sm mb-3 text-amber-700 flex items-center gap-2">
              <span class="text-xl">⚙️</span>
              背景设置
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="font-bold text-xs mb-2 block text-gray-700 flex items-center gap-1">
                  <span>📐</span>
                  背景适配
                </label>
                <select onchange="updateBackgroundSize(this.value)" class="w-full border-2 border-black p-2 bg-white font-bold hover:bg-gray-50 smooth-transition rounded-sm text-sm">
                  <option value="cover" ${state.backgroundSize === 'cover' ? 'selected' : ''}>🖼️ Cover（铺满裁切）</option>
                  <option value="contain" ${state.backgroundSize === 'contain' ? 'selected' : ''}>📦 Contain（完整显示）</option>
                  <option value="auto" ${state.backgroundSize === 'auto' ? 'selected' : ''}>🔧 Auto（原始大小）</option>
                </select>
              </div>
              <div>
                <label class="font-bold text-xs mb-2 block text-gray-700 flex items-center gap-1">
                  <span>🌓</span>
                  遮罩强度：<span id="overlayValue" class="text-purple-600">${state.backgroundOverlay.toFixed(2)}</span>
                </label>
                <input type="range" min="0" max="0.8" step="0.05" value="${state.backgroundOverlay}" oninput="updateBackgroundOverlay(this.value)" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500" />
              </div>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="flex gap-3">
            <button onclick="clearBackgroundImage()" class="flex-1 border-2 border-black px-6 py-3 font-bold bg-white hover:bg-red-50 smooth-transition depth-1 hover:depth-2 rounded-sm flex items-center justify-center gap-2">
              <span>🗑️</span>
              恢复默认
            </button>
            <button onclick="closeBackgroundModal()" class="flex-1 border-2 border-black px-6 py-3 font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 smooth-transition depth-2 hover:depth-3 rounded-sm flex items-center justify-center gap-2">
              <span>✓</span>
              完成
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- API 配置模态框 -->
    <div id="apiModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50" onclick="if(event.target.id==='apiModal') closeApiModal()">
      <div class="bg-white border-4 border-black max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto depth-4 rounded-sm" onclick="event.stopPropagation()">
        <div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 border-b-4 border-black flex items-center justify-between sticky top-0 z-10">
          <h3 class="font-black text-2xl text-white flex items-center gap-2">
            <span class="text-3xl">⚙️</span>
            API 配置
          </h3>
          <button onclick="closeApiModal()" class="text-white text-3xl hover:scale-110 smooth-transition">×</button>
        </div>
        <div class="p-6 space-y-6">
          <div>
            <label class="font-bold text-sm mb-2 block text-gray-700 flex items-center gap-2">
              <span>🤖</span>
              模型类型
            </label>
            <select id="modelType" class="w-full border-2 border-black p-3 font-bold bg-white hover:bg-gray-50 smooth-transition depth-1 rounded-sm" onchange="updateModelType(this.value)">
              <option value="openai" ${state.modelType === 'openai' ? 'selected' : ''}>🤖 OpenAI (GPT)</option>
              <option value="claude" ${state.modelType === 'claude' ? 'selected' : ''}>🧠 Claude (Anthropic)</option>
              <option value="gemini" ${state.modelType === 'gemini' ? 'selected' : ''}>💎 Gemini (Google)</option>
            </select>
          </div>
          <div>
            <label class="font-bold text-sm mb-2 block text-gray-700 flex items-center gap-2">
              <span>🌐</span>
              API URL
            </label>
            <input type="text" id="apiUrl" class="w-full border-2 border-black p-3 bg-white hover:bg-gray-50 smooth-transition depth-1 rounded-sm" placeholder="https://api.openai.com/v1" value="${state.apiUrl}" />
          </div>
          <div>
            <label class="font-bold text-sm mb-2 block text-gray-700 flex items-center gap-2">
              <span>🔑</span>
              API Key
            </label>
            <input type="password" id="apiKey" class="w-full border-2 border-black p-3 bg-white hover:bg-gray-50 smooth-transition depth-1 rounded-sm" placeholder="sk-..." value="${state.apiKey}" />
          </div>
          ${state.availableModels.length > 0 ? `
            <div>
              <label class="font-bold text-sm mb-2 block text-gray-700 flex items-center gap-2">
                <span>✨</span>
                选择模型
              </label>
              <select id="selectedModel" class="w-full border-2 border-black p-3 font-bold bg-white hover:bg-gray-50 smooth-transition depth-1 rounded-sm">
                ${state.availableModels.map(m => `<option value="${m}" ${state.selectedModel === m ? 'selected' : ''}>${m}</option>`).join('')}
              </select>
            </div>
          ` : ''}
          <div class="flex gap-3 pt-2">
            <button onclick="testConnection()" class="flex-1 border-2 border-black px-6 py-3 font-bold bg-white hover:bg-blue-50 smooth-transition depth-1 hover:depth-2 rounded-sm flex items-center justify-center gap-2">
              <span>🔍</span>
              测试连接
            </button>
            <button onclick="saveSettings()" class="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 font-bold border-2 border-black hover:from-blue-600 hover:to-cyan-600 smooth-transition depth-2 hover:depth-3 rounded-sm flex items-center justify-center gap-2">
              <span>💾</span>
              保存设置
            </button>
          </div>
          <div id="testResult"></div>
        </div>
      </div>
    </div>
  `;
}

// 交互函数
window.openBackgroundModal = () => {
  // 先关闭 API 模态框
  const apiModal = document.getElementById('apiModal');
  if (apiModal) {
    apiModal.classList.add('hidden');
    apiModal.classList.remove('flex');
  }

  const modal = document.getElementById('backgroundModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeBackgroundModal = () => {
  const modal = document.getElementById('backgroundModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openApiModal = () => {
  // 先关闭背景模态框
  const bgModal = document.getElementById('backgroundModal');
  if (bgModal) {
    bgModal.classList.add('hidden');
    bgModal.classList.remove('flex');
  }

  const modal = document.getElementById('apiModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeApiModal = () => {
  const modal = document.getElementById('apiModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.openFavoritesModal = () => {
  const modal = document.getElementById('favoritesModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
};

window.closeFavoritesModal = () => {
  const modal = document.getElementById('favoritesModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
};

window.useFavoriteTemplateInOptimizer = (favoriteId) => {
  const favorite = state.favorites.find(f => f.id === favoriteId);
  if (!favorite || favorite.type !== 'template') return;

  state.selectedTemplate = {
    id: favorite.templateId,
    name: favorite.name,
    category: favorite.category,
    icon: favorite.icon,
    systemPrompt: favorite.systemPrompt
  };

  closeFavoritesModal();
  render();
  showToast('✅ 已选择该模板！', 'success');
};

function bindSettingsButtons() {
  const openBgBtn = document.getElementById('openBackgroundModalBtn');
  if (openBgBtn) {
    openBgBtn.onclick = window.openBackgroundModal;
  }

  const openApiBtn = document.getElementById('openApiModalBtn');
  if (openApiBtn) {
    openApiBtn.onclick = window.openApiModal;
  }
}

window.switchView = (view) => {
  state.currentView = view;
  state.currentPage = 1;
  state.styleSearchKeyword = '';
  state.templateSearchKeyword = '';

  // 只更新内容区域
  const contentContainer = document.querySelector('.flex-1.overflow-y-auto');
  if (contentContainer) {
    contentContainer.outerHTML = renderContent();
  }

  // 更新侧边栏高亮
  document.querySelectorAll('aside button').forEach(btn => {
    const isActive = btn.getAttribute('onclick')?.includes(`'${view}'`);
    if (isActive) {
      btn.className = btn.className.replace(/hover:bg-gray-100 hover:translate-x-2/, `bg-gradient-to-r ${getNavGradient(view)} text-white depth-2`);
    } else {
      btn.className = btn.className.replace(/bg-gradient-to-r.*?depth-2/, 'hover:bg-gray-100 hover:translate-x-2');
    }
  });

  // 重新应用背景图片
  if (state.backgroundImage) {
    const shell = document.getElementById('app-shell');
    const overlay = document.getElementById('app-bg-overlay');
    if (shell) {
      shell.style.backgroundImage = `url("${state.backgroundImage}")`;
      shell.style.backgroundSize = state.backgroundSize;
      shell.style.backgroundPosition = 'center';
      shell.style.backgroundRepeat = state.backgroundSize === 'auto' ? 'repeat' : 'no-repeat';
    }
    if (overlay) {
      overlay.style.opacity = String(state.backgroundOverlay);
    }
  }
};

function getNavGradient(view) {
  const gradients = {
    'optimizer': 'from-yellow-400 to-orange-500',
    'styles': 'from-pink-400 to-rose-500',
    'templates': 'from-blue-400 to-cyan-500',
    'favorites': 'from-amber-400 to-yellow-500',
    'history': 'from-green-400 to-emerald-500',
    'settings': 'from-gray-400 to-slate-500'
  };
  return gradients[view] || 'from-gray-400 to-slate-500';
}

window.selectTemplateFromDropdown = (templateId) => {
  if (!templateId) {
    state.selectedTemplate = null;
  } else {
    const allTemplates = getAllTemplates();
    state.selectedTemplate = allTemplates.find(t => t.id === templateId || t.id === parseInt(templateId));
  }
};

window.translateStyle = async (styleName) => {
  if (!confirm(`将 "${styleName}" 翻译成英文？`)) return;

  try {
    const text = encodeURIComponent(styleName);
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=zh|en`);

    if (!response.ok) throw new Error('翻译服务暂时不可用');

    const data = await response.json();
    if (data.responseStatus === 200) {
      showToast(`✅ 翻译成功：${data.responseData.translatedText}`, 'success');
    } else {
      throw new Error('翻译失败');
    }
  } catch (error) {
    showToast(`❌ 翻译失败：${error.message}`, 'error');
  }
};

window.searchStyles = (keyword) => {
  state.styleSearchKeyword = keyword;
  state.currentPage = 1;
  const contentContainer = document.querySelector('.flex-1.overflow-y-auto');
  if (contentContainer) {
    contentContainer.innerHTML = renderContentInner();
  }
};

window.searchTemplates = (keyword) => {
  state.templateSearchKeyword = keyword;
  const contentContainer = document.querySelector('.flex-1.overflow-y-auto');
  if (contentContainer) {
    contentContainer.innerHTML = renderContentInner();
  }
};

window.changePage = (page) => {
  const totalPages = Math.ceil(designStyles.length / state.pageSize);
  if (page >= 1 && page <= totalPages) {
    state.currentPage = page;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

window.switchMode = (mode) => {
  state.optimizeMode = mode;
  // 只更新按钮样式，不刷新整个页面
  document.querySelectorAll('#optimizerMode button').forEach(btn => {
    if (btn.getAttribute('onclick')?.includes(`'${mode}'`)) {
      btn.className = btn.className.replace(/bg-white.*?hover:scale-105/, `bg-gradient-to-r ${mode === 'fast' ? 'from-yellow-400 to-orange-500' : 'from-blue-500 to-purple-600'} text-white shadow-${mode === 'fast' ? 'yellow' : 'purple'} scale-105 animate-pulse-slow`);
    } else {
      btn.className = btn.className.replace(/bg-gradient-to-r.*?animate-pulse-slow/, 'bg-white hover:bg-' + (mode === 'fast' ? 'blue' : 'yellow') + '-100 hover:scale-105');
    }
  });
};

window.optimize = async () => {
  const input = document.getElementById('input').value;
  if (!input.trim()) {
    showToast('❌ 请输入需求', 'error');
    return;
  }

  if (!state.apiUrl || !state.apiKey || !state.selectedModel) {
    showToast('❌ 请先在设置中配置 API', 'error');
    state.currentView = 'settings';
    render();
    return;
  }

  // 获取用户选择的模型
  const selectedModel = document.getElementById('optimizerModel')?.value || state.selectedModel;

  state.input = input;
  state.isOptimizing = true;
  state.result = '';
  render();

  try {
    // 如果选中了模板，使用模板的系统提示词
    let systemPrompt;
    if (state.selectedTemplate) {
      systemPrompt = state.selectedTemplate.systemPrompt;
    } else {
      // 否则使用默认的快速/深度模式提示词
      systemPrompt = state.optimizeMode === 'fast'
        ? `你是提示词优化专家。将用户需求快速转换为 RTD 格式（角色-任务-细节）。

输出格式：
# 角色
[定义角色]

# 任务
[具体任务]

# 细节
- 输出格式：[格式]
- 约束条件：[条件]

简洁明了即可，不需要过多解释。`
        : `你是一位专业的提示词工程师，精通 2026 年最新的提示词工程技术。

核心能力：
1. 将模糊需求转化为结构化、高质量的提示词
2. 应用 RTD（角色-任务-细节）、APE、BROKE 等框架
3. 使用零样本、少样本、思维链等核心技术
4. 遵循 OpenAI、IBM、AWS 等权威机构的最佳实践

优化原则：
1. 明确指令：使用清晰、具体的动词和描述
2. 角色定位：定义专业身份和背景经验
3. 上下文分离：用 ### 或 """ 分隔指令和内容
4. 输出格式：明确指定结构（Markdown/JSON/列表）
5. 约束条件：添加限制、要求、禁止事项
6. 思维链：复杂任务要求"一步步思考"
7. 示例引导：提供 1-2 个期望输出的示例
8. 质量检查：添加自检步骤

输出结构：
# 优化后的提示词

[使用 RTD 框架或思维链结构的完整提示词]

---

## 优化说明
- 应用的框架：[RTD/APE/思维链等]
- 添加的要素：[角色/示例/约束等]
- 预期提升：[准确性/完整性/可控性]`;
    }

    const response = await fetch(`${state.apiUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.apiKey}`
      },
      body: JSON.stringify({
        model: selectedModel,
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

    // 保存到历史记录
    saveHistory(input, state.result, state.optimizeMode, selectedModel);
  } catch (error) {
    state.result = `❌ 优化失败：${error.message}\n\n请检查设置中的 API 配置是否正确。`;
  }

  state.isOptimizing = false;
  render();
};

window.copyResult = () => {
  navigator.clipboard.writeText(state.result);
  showToast('✅ 已复制到剪贴板', 'success');
};

window.reuseHistory = (id) => {
  const item = state.history.find(h => h.id === id);
  if (item) {
    state.input = item.input;
    state.result = item.output;
    state.currentView = 'optimizer';
    render();
  }
};

window.deleteHistoryItem = async (id) => {
  if (confirm('确定删除这条历史记录？')) {
    await deleteHistory(id);
    showToast('✅ 已删除历史记录', 'success');
    render();
  }
};

window.clearHistory = async () => {
  if (confirm('确定清空所有历史记录？此操作不可恢复！')) {
    await clearAllHistory();
    render();
  }
};

window.exportHistoryJSON = () => {
  const dataStr = JSON.stringify(state.history, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prompt-history-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.importHistory = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedHistory = JSON.parse(text);

      if (!Array.isArray(importedHistory)) {
        showToast('❌ JSON 格式错误：必须是数组格式', 'error');
        return;
      }

      // 合并导入的历史记录
      const existingIds = new Set(state.history.map(h => h.id));
      const newItems = importedHistory.filter(item => !existingIds.has(item.id));

      state.history = [...newItems, ...state.history];
      localStorage.setItem('history', JSON.stringify(state.history));

      showToast(`✅ 成功导入 ${newItems.length} 条历史记录`, 'success');
      render();
    } catch (error) {
      showToast('❌ 导入失败：' + error.message, 'error');
    }
  };
  input.click();
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
    showToast(`❌ 翻译失败：${error.message}`, 'error');
  }

  state.isOptimizing = false;
  render();
};

function persistBackgroundSettings() {
  localStorage.setItem('backgroundImage', state.backgroundImage);
  localStorage.setItem('backgroundSize', state.backgroundSize);
  localStorage.setItem('backgroundOverlay', String(state.backgroundOverlay));
}

window.applyBackgroundUrl = () => {
  const input = document.getElementById('backgroundUrl');
  const url = input?.value.trim() || '';
  if (!url) {
    showToast('❌ 请输入图片 URL', 'error');
    return;
  }
  state.backgroundImage = url;
  persistBackgroundSettings();
  render();
};

window.uploadBackgroundImage = (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    showToast('❌ 请选择图片文件', 'error');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    state.backgroundImage = String(reader.result || '');
    persistBackgroundSettings();
    render();
  };
  reader.readAsDataURL(file);
};

window.updateBackgroundSize = (size) => {
  state.backgroundSize = size;
  persistBackgroundSettings();
  render();
};

window.updateBackgroundOverlay = (value) => {
  state.backgroundOverlay = parseFloat(value);
  persistBackgroundSettings();
  const overlayValue = document.getElementById('overlayValue');
  if (overlayValue) overlayValue.textContent = state.backgroundOverlay.toFixed(2);
  const overlay = document.getElementById('app-bg-overlay');
  if (overlay) overlay.style.opacity = String(state.backgroundOverlay);
};

window.clearBackgroundImage = () => {
  state.backgroundImage = '';
  persistBackgroundSettings();
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

  showToast('✅ 设置已保存', 'success');
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

      // 只更新模型选择下拉框，不刷新整个页面
      const modelSelectContainer = resultDiv.previousElementSibling;
      if (state.availableModels.length > 0 && !document.getElementById('selectedModel')) {
        const newModelSelect = `
          <div>
            <label class="font-bold text-sm mb-2 block text-gray-700 flex items-center gap-2">
              <span>✨</span>
              选择模型
            </label>
            <select id="selectedModel" class="w-full border-2 border-black p-3 font-bold bg-white hover:bg-gray-50 smooth-transition depth-1 rounded-sm">
              ${state.availableModels.map(m => `<option value="${m}" ${state.selectedModel === m ? 'selected' : ''}>${m}</option>`).join('')}
            </select>
          </div>
        `;
        modelSelectContainer.insertAdjacentHTML('beforebegin', newModelSelect);
      }
    } else {
      const error = await response.text();
      resultDiv.innerHTML = `<div class="border-2 border-black bg-red-100 p-4 text-sm">❌ 连接失败 (${response.status})：${error.substring(0, 150)}</div>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<div class="border-2 border-black bg-red-100 p-4 text-sm">❌ 连接错误：${error.message}</div>`;
  }
};

// 模板功能
let currentEditingTemplate = null;

window.selectTemplate = (templateId) => {
  const allTemplates = getAllTemplates();
  const template = allTemplates.find(t => t.id === templateId || t.id === parseInt(templateId));
  if (template) {
    state.selectedTemplate = template;
    state.currentView = 'optimizer';
    render();
    showToast(`✅ 已选择模板：${template.name}`, 'success');
  }
};

window.viewTemplate = (templateId) => {
  const allTemplates = getAllTemplates();
  const template = allTemplates.find(t => t.id === templateId || t.id === parseInt(templateId));
  if (template) {
    currentEditingTemplate = template;
    document.getElementById('modalTemplateName').textContent = `${template.icon} ${template.name}`;
    document.getElementById('editTemplateName').value = template.name;
    document.getElementById('editTemplateCategory').value = template.category;
    document.getElementById('editTemplateContent').value = template.systemPrompt;

    // 内置模板不可编辑名称和内容
    if (!template.isCustom) {
      document.getElementById('editTemplateName').readOnly = true;
      document.getElementById('editTemplateContent').readOnly = true;
      document.getElementById('editTemplateCategory').readOnly = true;
    } else {
      document.getElementById('editTemplateName').readOnly = false;
      document.getElementById('editTemplateContent').readOnly = false;
      document.getElementById('editTemplateCategory').readOnly = false;
    }

    document.getElementById('viewTemplateModal').classList.remove('hidden');
  }
};

window.hideViewTemplateModal = () => {
  document.getElementById('viewTemplateModal').classList.add('hidden');
  currentEditingTemplate = null;
};

window.saveTemplateEdit = () => {
  if (!currentEditingTemplate || !currentEditingTemplate.isCustom) {
    showToast('❌ 内置模板不可修改', 'error');
    return;
  }

  const name = document.getElementById('editTemplateName').value.trim();
  const category = document.getElementById('editTemplateCategory').value.trim();
  const systemPrompt = document.getElementById('editTemplateContent').value.trim();

  if (!name || !category || !systemPrompt) {
    showToast('❌ 请填写完整信息', 'error');
    return;
  }

  // 更新自定义模板
  const index = customTemplates.findIndex(t => t.id === currentEditingTemplate.id);
  if (index > -1) {
    customTemplates[index].name = name;
    customTemplates[index].category = category;
    customTemplates[index].systemPrompt = systemPrompt;
    localStorage.setItem('customTemplates', JSON.stringify(customTemplates));

    hideViewTemplateModal();
    render();
    showToast('✅ 模板已更新！', 'success');
  }
};

window.clearTemplate = () => {
  state.selectedTemplate = null;
  render();
};

window.importTemplateFile = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.md,.txt';
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const name = file.name.replace(/\.(md|txt)$/, '');

      const category = prompt('请输入模板分类（例如：编程、写作、分析）：', '自定义');
      if (!category) return;

      saveCustomTemplate(name, category, text);
      render();
      showToast(`✅ 成功导入模板：${name}`, 'success');
    } catch (error) {
      showToast('❌ 导入失败：' + error.message, 'error');
    }
  };
  input.click();
};

window.deleteTemplate = (templateId) => {
  if (confirm('确定删除这个模板？')) {
    deleteCustomTemplate(templateId);
    showToast('✅ 已删除模板', 'success');
    render();
  }
};

// 收藏功能
window.addCurrentToFavorites = () => {
  if (!state.result || !state.input) {
    showToast('❌ 没有可收藏的内容', 'error');
    return;
  }

  const templateName = state.selectedTemplate ? state.selectedTemplate.name : '无模板';
  addToFavorites(state.input, state.result, state.optimizeMode, state.selectedModel, templateName);
  showToast('⭐ 已添加到收藏夹！', 'success');
};

window.favoriteStyle = (styleName) => {
  const style = designStyles.find(s => s.name === styleName);
  if (!style) return;

  // 检查是否已收藏
  if (isFavorited('style', styleName)) {
    showToast('⚠️ 该风格已在收藏夹中', 'info');
    return;
  }

  const favorite = {
    id: Date.now(),
    type: 'style',
    name: style.name,
    nameEn: style.nameEn,
    desc: style.desc,
    keywords: style.keywords,
    docUrl: style.docUrl,
    image: style.image,
    timestamp: new Date().toISOString()
  };

  state.favorites.push(favorite);
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
  showToast('⭐ 风格已收藏！', 'success');

  // 刷新当前视图
  const contentContainer = document.querySelector('.flex-1.overflow-y-auto');
  if (contentContainer) {
    contentContainer.innerHTML = renderContentInner();
  }
};

window.favoriteTemplate = (templateId) => {
  const allTemplates = getAllTemplates();
  const template = allTemplates.find(t => t.id === templateId || t.id === parseInt(templateId));
  if (!template) return;

  // 检查是否已收藏
  if (isFavorited('template', templateId)) {
    showToast('⚠️ 该模板已在收藏夹中', 'info');
    return;
  }

  const favorite = {
    id: Date.now(),
    type: 'template',
    templateId: template.id,
    name: template.name,
    category: template.category,
    icon: template.icon,
    systemPrompt: template.systemPrompt,
    timestamp: new Date().toISOString()
  };

  state.favorites.push(favorite);
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
  showToast('⭐ 模板已收藏！', 'success');

  // 刷新当前视图
  const contentContainer = document.querySelector('.flex-1.overflow-y-auto');
  if (contentContainer) {
    contentContainer.innerHTML = renderContentInner();
  }
};

window.useFavoriteTemplate = (favoriteId) => {
  const favorite = state.favorites.find(f => f.id === favoriteId);
  if (!favorite || favorite.type !== 'template') return;

  state.selectedTemplate = {
    id: favorite.templateId,
    name: favorite.name,
    category: favorite.category,
    icon: favorite.icon,
    systemPrompt: favorite.systemPrompt
  };

  state.currentView = 'optimizer';
  render();
  showToast('✅ 已切换到优化器并选择该模板！', 'success');
};

window.reuseFavorite = (id) => {
  const item = state.favorites.find(f => f.id === id);
  if (item) {
    state.input = item.input;
    state.result = item.output;
    state.optimizeMode = item.mode;
    state.currentView = 'optimizer';
    render();
  }
};

window.editFavoriteNote = (id) => {
  const item = state.favorites.find(f => f.id === id);
  if (item) {
    const note = prompt('添加备注（可选）：', item.note || '');
    if (note !== null) {
      updateFavoriteNote(id, note);
      render();
    }
  }
};

window.deleteFavoriteItem = (id) => {
  if (confirm('确定删除这条收藏？')) {
    deleteFavorite(id);
    showToast('✅ 已删除收藏', 'success');
    render();
  }
};

window.clearFavorites = () => {
  if (confirm('确定清空所有收藏？此操作不可恢复！')) {
    clearAllFavorites();
    render();
  }
};

window.exportFavoritesJSON = () => {
  const dataStr = JSON.stringify(state.favorites, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `prompt-favorites-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

function render() {
  document.getElementById('app').innerHTML = `
    <div id="app-shell" class="relative h-screen overflow-hidden ${state.backgroundImage ? '' : 'bg-white'}">
      ${state.backgroundImage ? '<div id="app-bg-overlay" class="absolute inset-0 bg-black pointer-events-none z-0"></div>' : ''}
      <div class="relative z-1 flex h-screen">
        ${renderSidebar()}
        ${renderContent()}
      </div>
    </div>
  `;

  if (state.backgroundImage) {
    const shell = document.getElementById('app-shell');
    const overlay = document.getElementById('app-bg-overlay');
    if (shell) {
      shell.style.backgroundImage = `url("${state.backgroundImage}")`;
      shell.style.backgroundSize = state.backgroundSize;
      shell.style.backgroundPosition = 'center';
      shell.style.backgroundRepeat = state.backgroundSize === 'auto' ? 'repeat' : 'no-repeat';
    }
    if (overlay) {
      overlay.style.opacity = String(state.backgroundOverlay);
    }
  }

  // 兼容部分环境下内联 onclick 失效的情况
  bindSettingsButtons();
}

render();
