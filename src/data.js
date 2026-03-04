// 应用状态
export const state = {
  currentView: 'optimizer',
  input: '',
  result: '',
  history: JSON.parse(localStorage.getItem('history') || '[]'),
  apiKey: localStorage.getItem('apiKey') || '',
  apiUrl: localStorage.getItem('apiUrl') || '',
  modelType: localStorage.getItem('modelType') || 'openai',
  selectedModel: localStorage.getItem('selectedModel') || '',
  availableModels: [],
  isOptimizing: false,
  currentPage: 1,
  pageSize: 12
};

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
export const templates = [
  { id: 1, name: '代码审查', category: '编程', icon: '💻', template: '请审查以下代码：\n{code}\n\n关注：性能、安全、规范' },
  { id: 2, name: '文章润色', category: '写作', icon: '✍️', template: '润色文章：\n{content}\n\n读者：{audience}\n风格：{style}' },
  { id: 3, name: '专业翻译', category: '翻译', icon: '🌐', template: '翻译：{source_lang} → {target_lang}\n{content}' },
  { id: 4, name: 'Bug 分析', category: '编程', icon: '🐛', template: '分析 Bug：\n错误：{error}\n代码：{code}' }
];
