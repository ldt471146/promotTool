// 检测运行环境
const isElectron = window.electronAPI !== undefined;

// 应用状态
export const state = {
  currentView: 'optimizer',
  input: '',
  result: '',
  history: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'), // 收藏夹
  apiKey: localStorage.getItem('apiKey') || '',
  apiUrl: localStorage.getItem('apiUrl') || '',
  modelType: localStorage.getItem('modelType') || 'openai',
  selectedModel: localStorage.getItem('selectedModel') || '',
  availableModels: [],
  isOptimizing: false,
  currentPage: 1,
  pageSize: 12,
  optimizeMode: 'fast',
  selectedTemplate: null // 当前选中的模板
};

// 初始化加载历史
if (isElectron) {
  window.electronAPI.loadHistory().then(data => {
    state.history = JSON.parse(data);
  }).catch(() => {
    state.history = [];
  });
} else {
  state.history = JSON.parse(localStorage.getItem('history') || '[]');
}

// 保存历史到文件
async function saveToFile() {
  const content = JSON.stringify(state.history, null, 2);
  if (isElectron) {
    await window.electronAPI.saveHistory(content);
  } else {
    localStorage.setItem('history', content);
  }
}

// 保存历史记录
export async function saveHistory(input, output, mode, model) {
  const historyItem = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    input,
    output,
    mode,
    model
  };

  state.history.unshift(historyItem);

  // 只保留最近 100 条
  if (state.history.length > 100) {
    state.history = state.history.slice(0, 100);
  }

  await saveToFile();
}

// 删除历史记录
export async function deleteHistory(id) {
  state.history = state.history.filter(item => item.id !== id);
  await saveToFile();
}

// 清空所有历史
export async function clearAllHistory() {
  state.history = [];
  await saveToFile();
}

// 前端设计风格数据（仅展示，点击跳转官网）
export const designStyles = [
  {
    id: 'neo-brutalist',
    name: '新野兽派',
    nameEn: 'Neo-Brutalist',
    desc: '黑色粗边框、硬边缘阴影、无圆角',
    colors: ['#000000', '#ffffff', '#ff006e', '#ccff00'],
    keywords: ['粗边框', '硬阴影', '高对比'],
    docUrl: 'https://www.stylekit.top/styles/neo-brutalist',
    image: 'https://stylekit.top/styles/neo-brutalist.svg'
  },
  {
    id: 'glassmorphism',
    name: '玻璃拟态',
    nameEn: 'Glassmorphism',
    desc: '半透明毛玻璃效果',
    colors: ['#ffffff', '#667eea', '#764ba2'],
    keywords: ['毛玻璃', '半透明', '模糊'],
    docUrl: 'https://www.stylekit.top/styles/glassmorphism',
    image: 'https://stylekit.top/styles/glassmorphism.svg'
  },
  {
    id: 'material-design',
    name: '材料设计',
    nameEn: 'Material Design',
    desc: 'Google 设计系统，海拔阴影与涟漪效果',
    colors: ['#6200ee', '#03dac6', '#ffde03', '#00c853'],
    keywords: ['Material', '层次', '动效'],
    docUrl: 'https://www.stylekit.top/styles/material-design',
    image: 'https://stylekit.top/styles/material-design.svg'
  },
  {
    id: 'neumorphism',
    name: '新拟物派',
    nameEn: 'Neumorphism',
    desc: '柔和立体、双重阴影',
    colors: ['#e0e5ec', '#6d5dfc', '#ff6b6b'],
    keywords: ['立体', '双重阴影', '柔和'],
    docUrl: 'https://www.stylekit.top/styles/neumorphism',
    image: 'https://stylekit.top/styles/neumorphism.svg'
  },
  {
    id: 'bauhaus',
    name: '包豪斯',
    nameEn: 'Bauhaus',
    desc: '功能主义、几何形式、原色运用',
    colors: ['#000000', '#ffffff', '#ff0000', '#ffcc00'],
    keywords: ['几何', '原色', '功能主义'],
    docUrl: 'https://www.stylekit.top/styles/bauhaus',
    image: 'https://stylekit.top/styles/bauhaus.svg'
  },
  {
    id: 'apple-style',
    name: 'Apple 风格',
    nameEn: 'Apple Style',
    desc: '极致简约的高端设计风格',
    colors: ['#000000', '#f5f5f7', '#0071e3'],
    keywords: ['极简', '高端', '科技'],
    docUrl: 'https://www.stylekit.top/styles/apple-style',
    image: 'https://stylekit.top/styles/apple-style.svg'
  },
  {
    id: 'fluent-design',
    name: '流利设计',
    nameEn: 'Fluent Design',
    desc: '微软设计系统，光效与深度',
    colors: ['#0078d4', '#ffffff'],
    keywords: ['光效', '深度', '动效'],
    docUrl: 'https://www.stylekit.top/styles/fluent-design',
    image: 'https://stylekit.top/styles/fluent-design.svg'
  },
  {
    id: 'pixel-art',
    name: '像素艺术风',
    nameEn: 'Pixel Art',
    desc: '复古 8-bit 像素游戏风格',
    colors: ['#1a1c2c', '#ff004d', '#00e436', '#29adff'],
    keywords: ['像素', '8-bit', '复古'],
    docUrl: 'https://www.stylekit.top/styles/pixel-art',
    image: 'https://stylekit.top/styles/pixel-art.svg'
  },
  {
    id: 'neon-retro',
    name: '霓虹复古',
    nameEn: 'Neon Retro',
    desc: '80-90年代复古未来主义美学',
    colors: ['#ff006e', '#8338ec', '#3a86ff', '#fb5607'],
    keywords: ['霓虹', '复古', '蒸汽波'],
    docUrl: 'https://www.stylekit.top/styles/neon-retro',
    image: 'https://stylekit.top/styles/neon-retro.svg'
  },
  {
    id: 'y2k',
    name: '千禧风格',
    nameEn: 'Y2K',
    desc: '2000年代初的未来主义美学',
    colors: ['#c0c0c0', '#ff69b4', '#00ffff'],
    keywords: ['千禧', '金属', '气泡'],
    docUrl: 'https://www.stylekit.top/styles/y2k',
    image: 'https://stylekit.top/styles/y2k.svg'
  },
  {
    id: 'memphis',
    name: '孟菲斯风格',
    nameEn: 'Memphis',
    desc: '80年代意大利设计运动',
    colors: ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf'],
    keywords: ['几何', '撞色', '图案'],
    docUrl: 'https://www.stylekit.top/styles/memphis',
    image: 'https://stylekit.top/styles/memphis.svg'
  },
  {
    id: 'art-deco',
    name: '装饰艺术',
    nameEn: 'Art Deco',
    desc: '1920-30年代的奢华设计风格',
    colors: ['#000000', '#d4af37', '#ffffff'],
    keywords: ['奢华', '几何', '金色'],
    docUrl: 'https://www.stylekit.top/styles/art-deco',
    image: 'https://stylekit.top/styles/art-deco.svg'
  },
  {
    id: 'skeuomorphism',
    name: '拟物设计',
    nameEn: 'Skeuomorphism',
    desc: '模拟真实世界物体的数字设计',
    colors: ['#8b7355', '#d4a574', '#2c2416'],
    keywords: ['真实', '纹理', '立体'],
    docUrl: 'https://www.stylekit.top/styles/skeuomorphism',
    image: 'https://stylekit.top/styles/skeuomorphism.svg'
  },
  {
    id: 'swiss-design',
    name: '瑞士国际风格',
    nameEn: 'Swiss International',
    desc: '网格系统、无衬线字体、清晰层次',
    colors: ['#000000', '#ffffff', '#ff0000'],
    keywords: ['网格', '理性', '清晰'],
    docUrl: 'https://www.stylekit.top/styles/swiss-design',
    image: 'https://stylekit.top/styles/swiss-design.svg'
  },
  {
    id: 'ghibli-style',
    name: '吉卜力风格',
    nameEn: 'Ghibli Style',
    desc: '温暖柔和的色调、手绘质感',
    colors: ['#8fbc8f', '#f4a460', '#87ceeb'],
    keywords: ['温暖', '手绘', '治愈'],
    docUrl: 'https://www.stylekit.top/styles/ghibli-style',
    image: 'https://stylekit.top/styles/ghibli-style.svg'
  },
  {
    id: 'comic-style',
    name: '漫画风格',
    nameEn: 'Comic Style',
    desc: '浓重墨线、网点填充、对话气泡',
    colors: ['#000000', '#ff0000', '#ffff00', '#0000ff'],
    keywords: ['漫画', '墨线', '分镜'],
    docUrl: 'https://www.stylekit.top/styles/comic-style',
    image: 'https://stylekit.top/styles/comic-style.svg'
  },
  {
    id: 'notion-style',
    name: 'Notion 风格',
    nameEn: 'Notion Style',
    desc: '极简文档风格，清爽协作',
    colors: ['#f7f6f3', '#37352f', '#2eaadc'],
    keywords: ['文档', '极简', '协作'],
    docUrl: 'https://www.stylekit.top/styles/notion-style',
    image: 'https://stylekit.top/styles/notion-style.svg'
  },
  {
    id: 'risograph',
    name: 'Risograph 印刷风',
    nameEn: 'Risograph',
    desc: '专色叠印、半色调网点',
    colors: ['#ff3366', '#00ccff', '#ffcc00'],
    keywords: ['印刷', '网点', '叠印'],
    docUrl: 'https://www.stylekit.top/styles/risograph',
    image: 'https://stylekit.top/styles/risograph.svg'
  },
  {
    id: 'mecha',
    name: '机甲风',
    nameEn: 'Mecha',
    desc: '钢铁质感、警示标识、技术参数',
    colors: ['#1a1a1a', '#ff6600', '#00ff00', '#ffff00'],
    keywords: ['机甲', '科技', '工业'],
    docUrl: 'https://www.stylekit.top/styles/mecha',
    image: 'https://stylekit.top/styles/mecha.svg'
  },
  {
    id: 'gothic-lolita',
    name: '哥特萝莉风',
    nameEn: 'Gothic Lolita',
    desc: '深色蕾丝、玫瑰纹样、维多利亚式装饰',
    colors: ['#000000', '#8b0000', '#ffffff', '#c0c0c0'],
    keywords: ['哥特', '蕾丝', '暗黑'],
    docUrl: 'https://www.stylekit.top/styles/gothic-lolita',
    image: 'https://stylekit.top/styles/gothic-lolita.svg'
  },
  {
    id: 'cyber-chinese',
    name: '赛博中华风',
    nameEn: 'Cyber Chinese',
    desc: '霓虹灯笼、数字山水、东方未来主义',
    colors: ['#ff0000', '#ffd700', '#00ffff', '#ff1493'],
    keywords: ['赛博', '中华', '霓虹'],
    docUrl: 'https://www.stylekit.top/styles/cyber-chinese',
    image: 'https://stylekit.top/styles/cyber-chinese.svg'
  },
  {
    id: 'acid-graphics',
    name: '酸性平面设计',
    nameEn: 'Acid Graphics',
    desc: '荧光色彩、扭曲字体、液态流动',
    colors: ['#00ff00', '#ff00ff', '#ffff00', '#00ffff'],
    keywords: ['荧光', '迷幻', '实验'],
    docUrl: 'https://www.stylekit.top/styles/acid-graphics',
    image: 'https://stylekit.top/styles/acid-graphics.svg'
  },
  {
    id: 'cottagecore',
    name: '田园风格',
    nameEn: 'Cottagecore',
    desc: '柔和自然色、花卉纹样、手工质感',
    colors: ['#f5e6d3', '#d4a574', '#8fbc8f', '#dda0dd'],
    keywords: ['田园', '自然', '温馨'],
    docUrl: 'https://www.stylekit.top/styles/cottagecore',
    image: 'https://stylekit.top/styles/cottagecore.svg'
  },
  {
    id: 'bento-grid',
    name: '便当盒布局',
    nameEn: 'Bento Grid',
    desc: '不规则网格布局，大小不一的卡片组合',
    colors: ['#3b82f6', '#8b5cf6', '#ec4899', '#f97316'],
    keywords: ['网格', '卡片', '不规则'],
    docUrl: 'https://www.stylekit.top/styles/bento-grid',
    image: 'https://stylekit.top/styles/bento-grid.svg'
  },
  {
    id: 'editorial',
    name: '编辑杂志风',
    nameEn: 'Editorial',
    desc: '优雅的杂志排版，衬线标题与留白之美',
    colors: ['#000000', '#ffffff'],
    keywords: ['杂志', '排版', '优雅'],
    docUrl: 'https://www.stylekit.top/styles/editorial',
    image: 'https://stylekit.top/styles/editorial.svg'
  },
  {
    id: 'corporate-clean',
    name: '企业简洁风',
    nameEn: 'Corporate Clean',
    desc: '专业简洁的企业风格，强调可读性',
    colors: ['#0066cc', '#333333', '#f5f5f5'],
    keywords: ['企业', '专业', 'B2B'],
    docUrl: 'https://www.stylekit.top/styles/corporate-clean',
    image: 'https://stylekit.top/styles/corporate-clean.svg'
  },
  {
    id: 'minimalist-flat',
    name: '极简扁平风',
    nameEn: 'Minimalist Flat',
    desc: '极致简约的扁平设计',
    colors: ['#2c3e50', '#3498db', '#ecf0f1'],
    keywords: ['极简', '扁平', '现代'],
    docUrl: 'https://www.stylekit.top/styles/minimalist-flat',
    image: 'https://stylekit.top/styles/minimalist-flat.svg'
  },
  {
    id: 'soft-ui',
    name: '柔和界面风',
    nameEn: 'Soft UI',
    desc: '温和友好的界面风格，柔和阴影',
    colors: ['#e0e5ec', '#a3b1c6', '#ffffff'],
    keywords: ['柔和', '友好', '圆润'],
    docUrl: 'https://www.stylekit.top/styles/soft-ui',
    image: 'https://stylekit.top/styles/soft-ui.svg'
  },
  {
    id: 'natural-organic',
    name: '自然有机风',
    nameEn: 'Natural Organic',
    desc: '自然温暖的风格',
    colors: ['#8fbc8f', '#d2b48c', '#f5f5dc'],
    keywords: ['自然', '有机', '温暖'],
    docUrl: 'https://www.stylekit.top/styles/natural-organic',
    image: 'https://stylekit.top/styles/natural-organic.svg'
  },
  {
    id: 'modern-gradient',
    name: '现代渐变风',
    nameEn: 'Modern Gradient',
    desc: '现代感十足的渐变设计',
    colors: ['#667eea', '#764ba2', '#f093fb'],
    keywords: ['渐变', '现代', '动感'],
    docUrl: 'https://www.stylekit.top/styles/modern-gradient',
    image: 'https://stylekit.top/styles/modern-gradient.svg'
  },
  {
    id: 'retro-vintage',
    name: '复古怀旧风',
    nameEn: 'Retro Vintage',
    desc: '复古怀旧的设计风格',
    colors: ['#d4a574', '#8b7355', '#f5e6d3'],
    keywords: ['复古', '怀旧', '经典'],
    docUrl: 'https://www.stylekit.top/styles/retro-vintage',
    image: 'https://stylekit.top/styles/retro-vintage.svg'
  },
  {
    id: 'dark-mode',
    name: '暗黑模式',
    nameEn: 'Dark Mode',
    desc: '现代暗黑主题设计',
    colors: ['#1a1a1a', '#2d2d2d', '#ffffff'],
    keywords: ['暗黑', '夜间', '护眼'],
    docUrl: 'https://www.stylekit.top/styles/dark-mode',
    image: 'https://stylekit.top/styles/dark-mode.svg'
  },
  {
    id: 'monochrome',
    name: '单色极简',
    nameEn: 'Monochrome',
    desc: '纯黑白灰的极致单色设计',
    colors: ['#000000', '#808080', '#ffffff'],
    keywords: ['单色', '黑白', '极简'],
    docUrl: 'https://www.stylekit.top/styles/monochrome',
    image: 'https://stylekit.top/styles/monochrome.svg'
  },
  {
    id: 'terracotta',
    name: '赤陶暖调',
    nameEn: 'Terracotta',
    desc: '地中海赤陶与暖色大地',
    colors: ['#d4735e', '#e8b298', '#f5e6d3'],
    keywords: ['暖调', '陶土', '自然'],
    docUrl: 'https://www.stylekit.top/styles/terracotta',
    image: 'https://stylekit.top/styles/terracotta.svg'
  },
  {
    id: 'brutalist-web',
    name: '网页粗野主义',
    nameEn: 'Brutalist Web',
    desc: '90年代早期互联网的原始美学',
    colors: ['#0000ee', '#000000', '#ffffff'],
    keywords: ['粗野', '原始', '低保真'],
    docUrl: 'https://www.stylekit.top/styles/brutalist-web',
    image: 'https://stylekit.top/styles/brutalist-web.svg'
  },
  {
    id: 'mid-century-modern',
    name: '中世纪现代',
    nameEn: 'Mid-Century Modern',
    desc: '50年代原子时代设计美学',
    colors: ['#ff6b35', '#f7931e', '#004e89'],
    keywords: ['复古', '几何', '原子'],
    docUrl: 'https://www.stylekit.top/styles/mid-century-modern',
    image: 'https://stylekit.top/styles/mid-century-modern.svg'
  },
  {
    id: 'constructivism',
    name: '构成主义',
    nameEn: 'Constructivism',
    desc: '苏联构成主义海报风格',
    colors: ['#ff0000', '#000000', '#ffffff'],
    keywords: ['构成', '海报', '革命'],
    docUrl: 'https://www.stylekit.top/styles/constructivism',
    image: 'https://stylekit.top/styles/constructivism.svg'
  },
  {
    id: 'op-art',
    name: '欧普艺术',
    nameEn: 'Op Art',
    desc: '视觉错觉图案',
    colors: ['#000000', '#ffffff'],
    keywords: ['错觉', '图案', '视觉'],
    docUrl: 'https://www.stylekit.top/styles/op-art',
    image: 'https://stylekit.top/styles/op-art.svg'
  },
  {
    id: 'islamic-geometric',
    name: '伊斯兰几何',
    nameEn: 'Islamic Geometric',
    desc: '神圣几何图案',
    colors: ['#1e3a8a', '#fbbf24', '#ffffff'],
    keywords: ['几何', '图案', '神圣'],
    docUrl: 'https://www.stylekit.top/styles/islamic-geometric',
    image: 'https://stylekit.top/styles/islamic-geometric.svg'
  },
  {
    id: 'indian-festive',
    name: '印度节庆',
    nameEn: 'Indian Festive',
    desc: '鲜艳的庆典色彩',
    colors: ['#ff6b35', '#f7931e', '#c1121f', '#ffd60a'],
    keywords: ['节庆', '鲜艳', '庆典'],
    docUrl: 'https://www.stylekit.top/styles/indian-festive',
    image: 'https://stylekit.top/styles/indian-festive.svg'
  },
  {
    id: 'african-textile',
    name: '非洲纺织',
    nameEn: 'African Textile',
    desc: '大胆的编织图案',
    colors: ['#d62828', '#f77f00', '#fcbf49', '#003049'],
    keywords: ['纺织', '图案', '大胆'],
    docUrl: 'https://www.stylekit.top/styles/african-textile',
    image: 'https://stylekit.top/styles/african-textile.svg'
  },
  {
    id: 'korean-minimal',
    name: '韩式极简',
    nameEn: 'Korean Minimal',
    desc: '柔和精致的简约',
    colors: ['#f8f9fa', '#e9ecef', '#495057'],
    keywords: ['韩式', '柔和', '精致'],
    docUrl: 'https://www.stylekit.top/styles/korean-minimal',
    image: 'https://stylekit.top/styles/korean-minimal.svg'
  },
  {
    id: 'pastel-goth',
    name: '粉彩哥特',
    nameEn: 'Pastel Goth',
    desc: '暗黑遇见粉彩',
    colors: ['#c8b6ff', '#ffc6ff', '#000000'],
    keywords: ['粉彩', '哥特', '暗黑'],
    docUrl: 'https://www.stylekit.top/styles/pastel-goth',
    image: 'https://stylekit.top/styles/pastel-goth.svg'
  },
  {
    id: 'maximalism',
    name: '极繁主义',
    nameEn: 'Maximalism',
    desc: 'More is more',
    colors: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec'],
    keywords: ['极繁', '丰富', '大胆'],
    docUrl: 'https://www.stylekit.top/styles/maximalism',
    image: 'https://stylekit.top/styles/maximalism.svg'
  },
  {
    id: 'medieval-manuscript',
    name: '中世纪手抄本',
    nameEn: 'Medieval Manuscript',
    desc: '装饰手稿风格',
    colors: ['#8b0000', '#daa520', '#2f4f4f'],
    keywords: ['手抄本', '装饰', '中世纪'],
    docUrl: 'https://www.stylekit.top/styles/medieval-manuscript',
    image: 'https://stylekit.top/styles/medieval-manuscript.svg'
  },
  {
    id: 'graffiti-street',
    name: '涂鸦街头',
    nameEn: 'Graffiti Street',
    desc: '街头艺术氛围',
    colors: ['#ff006e', '#ffbe0b', '#3a86ff', '#000000'],
    keywords: ['涂鸦', '街头', '艺术'],
    docUrl: 'https://www.stylekit.top/styles/graffiti-street',
    image: 'https://stylekit.top/styles/graffiti-street.svg'
  },
  {
    id: 'marble-luxury',
    name: '大理石奢华',
    nameEn: 'Marble Luxury',
    desc: '精致优雅的大理石质感',
    colors: ['#ffffff', '#c0c0c0', '#000000'],
    keywords: ['大理石', '奢华', '优雅'],
    docUrl: 'https://www.stylekit.top/styles/marble-luxury',
    image: 'https://stylekit.top/styles/marble-luxury.svg'
  },
  {
    id: 'victorian-botanical',
    name: '维多利亚植物',
    nameEn: 'Victorian Botanical',
    desc: '古典植物插画风格',
    colors: ['#2d5016', '#8b4513', '#f5e6d3'],
    keywords: ['维多利亚', '植物', '古典'],
    docUrl: 'https://www.stylekit.top/styles/victorian-botanical',
    image: 'https://stylekit.top/styles/victorian-botanical.svg'
  },
  {
    id: 'doodle',
    name: '涂鸦手绘',
    nameEn: 'Doodle',
    desc: '手绘涂鸦感',
    colors: ['#000000', '#ff006e', '#ffbe0b'],
    keywords: ['手绘', '涂鸦', '随性'],
    docUrl: 'https://www.stylekit.top/styles/doodle',
    image: 'https://stylekit.top/styles/doodle.svg'
  },
  {
    id: 'ink-wash',
    name: '水墨风',
    nameEn: 'Ink Wash',
    desc: '中国水墨画风格',
    colors: ['#000000', '#808080', '#ffffff'],
    keywords: ['水墨', '中国', '写意'],
    docUrl: 'https://www.stylekit.top/styles/ink-wash',
    image: 'https://stylekit.top/styles/ink-wash.svg'
  },
  {
    id: 'stripe-style',
    name: '条纹风格',
    nameEn: 'Stripe Style',
    desc: 'Stripe 公司的设计风格',
    colors: ['#635bff', '#0a2540', '#ffffff'],
    keywords: ['Stripe', '渐变', '现代'],
    docUrl: 'https://www.stylekit.top/styles/stripe-style',
    image: 'https://stylekit.top/styles/stripe-style.svg'
  }
];

// 模板
// 内置提示词模板（融合 IBM + 53AI + Giscafer 提示词工程最佳实践）
export const templates = [
  {
    id: 1,
    name: 'RTD 框架 (角色-任务-细节)',
    category: '核心框架',
    icon: '🎯',
    description: '基础框架，通过角色、任务、细节三要素构建提示词，性能提升 10-20%',
    systemPrompt: `【角色 Role】
你是 [专业身份]，拥有 [背景经验]。

【任务 Task】
请 [具体动作] [目标对象]，实现 [预期结果]。

【细节 Details】
- 输出格式：[Markdown/JSON/代码]
- 约束条件：[限制/要求]
- 质量标准：[评判标准]
- 特殊要求：[其他说明]

请按照以上结构完成任务。`
  },
  {
    id: 2,
    name: 'APE 框架 (行动-目的-期望)',
    category: '核心框架',
    icon: '🚀',
    description: '将请求分解为可执行步骤、底层目的和可衡量结果',
    systemPrompt: `【行动 Action】
具体要做什么：[明确的动作步骤]

【目的 Purpose】
为什么要做：[背后的动机和目标]

【期望 Expectation】
期望的结果：[可衡量的成功标准]

请基于以上三要素完成任务。`
  },
  {
    id: 3,
    name: 'BROKE 框架 (背景-角色-目标-关键结果-演进)',
    category: '核心框架',
    icon: '📊',
    description: '结合 OKR 方法论，适合复杂项目和长期目标',
    systemPrompt: `【背景 Background】
项目背景：[当前情况/问题/机会]

【角色 Role】
你是：[专业身份和职责]

【目标 Objectives】
核心目标：[想要达成什么]

【关键结果 Key Results】
成功指标：
- KR1：[可衡量的结果1]
- KR2：[可衡量的结果2]
- KR3：[可衡量的结果3]

【演进 Evolution】
迭代策略：[如何持续优化]

请按照 BROKE 框架完成任务。`
  },
  {
    id: 4,
    name: 'CO-STAR 框架',
    category: '核心框架',
    icon: '⭐',
    description: '六要素完整框架：上下文-目标-风格-语气-受众-响应',
    systemPrompt: `【上下文 Context】
背景信息：[任务的背景和环境]

【目标 Objective】
明确目标：[想要实现什么]

【风格 Style】
输出风格：[正式/技术/通俗/创意]

【语气 Tone】
语言语气：[专业/友好/严肃/幽默]

【受众 Audience】
目标受众：[读者/用户画像]

【响应 Response】
响应格式：[具体的输出格式要求]

请按照 CO-STAR 框架完成任务。`
  },
  {
    id: 5,
    name: 'Chain-of-Thought (思维链)',
    category: '认知增强',
    icon: '🧠',
    description: '让模型展示推理步骤，数学推理准确率提升 50%+',
    systemPrompt: `请使用思维链方法，展示完整的推理过程：

<thinking>
步骤 1：理解问题
- 问题是什么？
- 已知条件有哪些？
- 需要求解什么？

步骤 2：分析推理
- 需要哪些中间步骤？
- 每一步的逻辑是什么？
- 有哪些关键假设？

步骤 3：计算/推导
- 具体的计算过程
- 中间结果验证

步骤 4：得出结论
- 最终答案是什么？
- 如何验证答案的正确性？
</thinking>

<answer>
[最终答案]
</answer>

请展示完整的思考过程。`
  },
  {
    id: 6,
    name: 'Self-Consistency CoT',
    category: '认知增强',
    icon: '🔄',
    description: '生成多条推理路径，选择最一致的答案，提高准确性',
    systemPrompt: `请使用自洽性思维链方法：

【路径 1】
<thinking>
[第一种推理方式]
</thinking>
<answer>[答案1]</answer>

【路径 2】
<thinking>
[第二种推理方式]
</thinking>
<answer>[答案2]</answer>

【路径 3】
<thinking>
[第三种推理方式]
</thinking>
<answer>[答案3]</answer>

【最终答案】
基于多条路径的一致性，最可靠的答案是：[综合答案]

请生成多条推理路径并选择最一致的答案。`
  },
  {
    id: 7,
    name: 'Few-shot 示例引导',
    category: '核心技术',
    icon: '📚',
    description: '通过 2-3 个示例展示期望的输出格式和风格',
    systemPrompt: `请参考以下示例，理解期望的输出风格和格式：

【示例 1】
输入：[示例输入1]
输出：[示例输出1]

【示例 2】
输入：[示例输入2]
输出：[示例输出2]

【示例 3】
输入：[示例输入3]
输出：[示例输出3]

【要求】
严格按照示例的风格、格式、深度处理用户的输入。

现在请处理：[用户输入]`
  },
  {
    id: 8,
    name: '明确清晰型',
    category: '核心技术',
    icon: '✨',
    description: '使用明确的动作动词，避免模糊表达',
    systemPrompt: `请使用明确、清晰的方式完成任务：

【明确要求】
- 使用具体的动作动词（创建、分析、优化、生成、评估）
- 避免模糊表达（"帮我看看"、"处理一下"、"弄一下"）
- 明确指定期望的输出格式和深度

【示例对比】
❌ 模糊：帮我做个仪表板
✅ 明确：创建一个销售数据仪表板，包含：月度趋势图、TOP10产品排名、地区分布饼图

现在请处理用户的具体需求。`
  },
  {
    id: 9,
    name: '上下文动机型',
    category: '核心技术',
    icon: '💡',
    description: '解释任务背后的"为什么"，让 AI 理解目标',
    systemPrompt: `请理解任务背后的动机和目标：

【上下文信息】
- 任务背景：[为什么要做这个]
- 最终目标：[想达到什么效果]
- 使用场景：[在什么情况下使用]
- 目标受众：[给谁看/谁使用]
- 成功标准：[如何判断成功]

【决策原则】
基于上下文做出最符合目标的决策，而不是机械执行指令。

现在请处理用户的需求。`
  },
  {
    id: 10,
    name: '允许不确定型',
    category: '核心技术',
    icon: '❓',
    description: '明确允许 AI 说"不知道"，减少幻觉',
    systemPrompt: `【重要原则】
如果你不确定答案，请明确说"我不知道"或"我不确定"，不要猜测或编造信息。

【回答要求】
- 确定的信息：直接回答，并说明依据
- 部分确定：说明确定的部分，标注不确定的部分
- 完全不确定：诚实说"我不知道"，并建议查阅权威资料

【禁止行为】
- 编造数据或事实
- 过度自信的错误回答
- 模糊的"可能"、"也许"（除非明确标注）

现在请处理用户的需求。`
  },
  {
    id: 11,
    name: 'Prompt Chaining (提示链)',
    category: '高级技术',
    icon: '⛓️',
    description: '将复杂任务拆解为多个子任务，逐步执行',
    systemPrompt: `请将复杂任务拆解为多个子任务，按顺序执行：

【任务拆解】
子任务 1：[任务名称]
- 输入：[初始输入]
- 处理：[具体操作]
- 输出：[中间结果]
- 验证：[质量检查]

子任务 2：[任务名称]
- 输入：[使用子任务1的输出]
- 处理：[具体操作]
- 输出：[中间结果]
- 验证：[质量检查]

子任务 3：[任务名称]
- 输入：[使用子任务2的输出]
- 处理：[具体操作]
- 输出：[最终结果]
- 验证：[质量检查]

【执行原则】
每个子任务独立完成，确保前一个任务的输出质量。`
  },
  {
    id: 12,
    name: '响应预填充 (JSON 格式)',
    category: '高级技术',
    icon: '📝',
    description: '预填充响应开头，强制特定格式输出',
    systemPrompt: `请以 JSON 格式输出结果。

【输出格式】
{
  "status": "success",
  "data": {
    // 你的数据
  },
  "metadata": {
    "timestamp": "ISO 8601 格式",
    "version": "1.0",
    "confidence": 0.95
  }
}

【要求】
- 严格遵循 JSON 格式
- 所有字段必须有值
- 确保 JSON 可解析
- 不要添加额外的文本说明

现在请处理用户的需求。`
  },
  {
    id: 13,
    name: '代码生成专用',
    category: '应用场景',
    icon: '💻',
    description: '专门用于代码开发，包含完整的技术约束',
    systemPrompt: `你是资深软件工程师。

【技术栈】
- 语言：[编程语言]
- 框架：[框架名称]
- 版本：[版本号]

【开发要求】
- 代码规范：遵循 [语言] 最佳实践
- 性能要求：[具体指标，如响应时间、内存占用]
- 安全要求：防止 SQL注入、XSS、CSRF 等漏洞
- 可维护性：清晰的命名、适当的注释、模块化设计

【输出格式】
1. 完整可运行的代码
2. 关键逻辑说明
3. 使用示例
4. 测试建议
5. 潜在问题和优化方向

如果不确定某个技术细节，请明确说明。`
  },
  {
    id: 14,
    name: '内容创作专用',
    category: '应用场景',
    icon: '✍️',
    description: '专门用于内容创作，包含受众和风格约束',
    systemPrompt: `你是专业内容创作者。

【创作要求】
- 内容类型：[文章/博客/文案/脚本/社交媒体]
- 主题：[具体主题]
- 目标受众：[年龄/职业/兴趣/痛点]
- 字数要求：[字数范围]

【风格要求】
- 语气：[正式/轻松/专业/幽默/激励]
- 结构：[总分总/递进式/对比式/故事化]
- 特色：[数据驱动/案例丰富/实用性强]

【内容要点】
- 核心观点：[主要论点]
- 支撑论据：[数据/案例/引用]
- 行动号召：[希望读者做什么]

【禁止】
- 避免的内容：[敏感话题/过时信息]

如果需要的数据或事实不确定，请明确标注。`
  },
  {
    id: 15,
    name: '数据分析专用',
    category: '应用场景',
    icon: '📊',
    description: '专门用于数据分析，包含完整的分析框架',
    systemPrompt: `你是数据分析专家。

【分析任务】
- 数据类型：[数值/文本/时间序列/分类]
- 分析目标：[趋势/对比/预测/分类/异常检测]
- 业务场景：[具体业务背景]

【分析框架】
1. 数据概览
   - 数据量：[样本数/时间跨度]
   - 数据质量：[完整性/准确性]
   - 关键指标：[核心指标定义]

2. 深度分析
   - 趋势发现：[时间序列分析]
   - 异常识别：[离群点/突变点]
   - 相关性分析：[变量关系]
   - 细分分析：[按维度拆解]

3. 洞察与建议
   - 核心发现：[3-5个关键洞察]
   - 业务影响：[对业务的意义]
   - 行动建议：[可执行的建议]
   - 风险提示：[需要注意的问题]

请提供专业的数据分析报告。`
  }
];

// 自定义模板（从 localStorage 加载）
export const customTemplates = JSON.parse(localStorage.getItem('customTemplates') || '[]');

// 保存自定义模板
export function saveCustomTemplate(name, category, systemPrompt) {
  const newTemplate = {
    id: `custom-${Date.now()}`,
    name,
    category,
    icon: '⭐',
    systemPrompt,
    isCustom: true
  };
  customTemplates.push(newTemplate);
  localStorage.setItem('customTemplates', JSON.stringify(customTemplates));
  return newTemplate;
}

// 删除自定义模板
export function deleteCustomTemplate(id) {
  const index = customTemplates.findIndex(t => t.id === id);
  if (index > -1) {
    customTemplates.splice(index, 1);
    localStorage.setItem('customTemplates', JSON.stringify(customTemplates));
  }
}

// 获取所有模板（内置 + 自定义）
export function getAllTemplates() {
  return [...templates, ...customTemplates];
}

// 收藏功能
export function addToFavorites(input, output, mode, model, templateName) {
  const favorite = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    input,
    output,
    mode,
    model,
    templateName: templateName || '无模板',
    note: '' // 用户备注
  };
  state.favorites.unshift(favorite);
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
}

// 删除收藏
export function deleteFavorite(id) {
  state.favorites = state.favorites.filter(f => f.id !== id);
  localStorage.setItem('favorites', JSON.stringify(state.favorites));
}

// 更新收藏备注
export function updateFavoriteNote(id, note) {
  const favorite = state.favorites.find(f => f.id === id);
  if (favorite) {
    favorite.note = note;
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
  }
}

// 清空收藏
export function clearAllFavorites() {
  state.favorites = [];
  localStorage.setItem('favorites', JSON.stringify([]));
}
