// 应用状态
export const state = {
  currentView: 'optimizer',
  input: '',
  result: '',
  history: JSON.parse(localStorage.getItem('history') || '[]'),
  apiKey: localStorage.getItem('apiKey') || '',
  selectedStyle: null,
  selectedTemplate: null,
  isOptimizing: false
};

// 前端设计风格数据
export const designStyles = [
  {
    id: 'neo-brutalist',
    name: '新野兽派',
    nameEn: 'Neo-Brutalist',
    desc: '黑色粗边框、硬边缘阴影、无圆角、高对比度',
    colors: ['#000000', '#ffffff', '#ff006e', '#ccff00'],
    keywords: ['粗边框', '硬阴影', '高对比'],
    prompt: `STYLEKIT_STYLE_REFERENCE
style_name: 新野兽派
style_slug: neo-brutalist

# Hard Prompt
请严格遵守以下风格规则并保持一致性，禁止风格漂移。

## 执行要求
- 优先保证风格一致性，其次再做创意延展
- 遇到冲突时以禁止项为最高优先级
- 输出前自检：颜色、排版、间距、交互是否仍属于该风格

## 核心理念
功能优先、诚实表达、大胆直接、反对圆滑

## Token 字典
边框: border-2 md:border-4 border-black rounded-none
阴影: shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
字体: 标题 font-black, 正文 font-mono
交互: hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all

## 绝对禁止
- rounded-lg, rounded-md, rounded-xl
- shadow-sm, shadow-lg, shadow-xl
- bg-gradient-*
- border-gray-*, border-slate-*

## 必须包含
按钮: rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] font-black
卡片: rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white`
  },
