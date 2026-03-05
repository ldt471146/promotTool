(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=s(a);fetch(a.href,i)}})();function T(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function k(e,o=!1){const s=T(),r=`_${s}`;return Object.defineProperty(window,r,{value:a=>(o&&Reflect.deleteProperty(window,r),e==null?void 0:e(a)),writable:!1,configurable:!0}),s}async function M(e,o={}){return new Promise((s,r)=>{const a=k(l=>{s(l),Reflect.deleteProperty(window,`_${i}`)},!0),i=k(l=>{r(l),Reflect.deleteProperty(window,`_${a}`)},!0);window.__TAURI_IPC__({cmd:e,callback:a,error:i,...o})})}window.__TAURI__={invoke:M};const S=window.electronAPI!==void 0,t={currentView:"optimizer",input:"",result:"",history:[],favorites:JSON.parse(localStorage.getItem("favorites")||"[]"),apiKey:localStorage.getItem("apiKey")||"",apiUrl:localStorage.getItem("apiUrl")||"",modelType:localStorage.getItem("modelType")||"openai",selectedModel:localStorage.getItem("selectedModel")||"",backgroundImage:localStorage.getItem("backgroundImage")||"",backgroundSize:localStorage.getItem("backgroundSize")||"cover",backgroundOverlay:parseFloat(localStorage.getItem("backgroundOverlay")||"0.35"),availableModels:[],isOptimizing:!1,currentPage:1,pageSize:12,optimizeMode:"fast",selectedTemplate:null,styleSearchKeyword:"",templateSearchKeyword:""};S?window.electronAPI.loadHistory().then(e=>{t.history=JSON.parse(e)}).catch(()=>{t.history=[]}):t.history=JSON.parse(localStorage.getItem("history")||"[]");async function x(){const e=JSON.stringify(t.history,null,2);S?await window.electronAPI.saveHistory(e):localStorage.setItem("history",e)}async function E(e,o,s,r){const a={id:Date.now(),timestamp:new Date().toISOString(),input:e,output:o,mode:s,model:r};t.history.unshift(a),t.history.length>100&&(t.history=t.history.slice(0,100)),await x()}async function O(e){t.history=t.history.filter(o=>o.id!==e),await x()}async function U(){t.history=[],await x()}const w=[{id:"neo-brutalist",name:"新野兽派",nameEn:"Neo-Brutalist",desc:"黑色粗边框、硬边缘阴影、无圆角",colors:["#000000","#ffffff","#ff006e","#ccff00"],keywords:["粗边框","硬阴影","高对比"],docUrl:"https://www.stylekit.top/styles/neo-brutalist",image:"https://stylekit.top/styles/neo-brutalist.svg"},{id:"glassmorphism",name:"玻璃拟态",nameEn:"Glassmorphism",desc:"半透明毛玻璃效果",colors:["#ffffff","#667eea","#764ba2"],keywords:["毛玻璃","半透明","模糊"],docUrl:"https://www.stylekit.top/styles/glassmorphism",image:"https://stylekit.top/styles/glassmorphism.svg"},{id:"material-design",name:"材料设计",nameEn:"Material Design",desc:"Google 设计系统，海拔阴影与涟漪效果",colors:["#6200ee","#03dac6","#ffde03","#00c853"],keywords:["Material","层次","动效"],docUrl:"https://www.stylekit.top/styles/material-design",image:"https://stylekit.top/styles/material-design.svg"},{id:"neumorphism",name:"新拟物派",nameEn:"Neumorphism",desc:"柔和立体、双重阴影",colors:["#e0e5ec","#6d5dfc","#ff6b6b"],keywords:["立体","双重阴影","柔和"],docUrl:"https://www.stylekit.top/styles/neumorphism",image:"https://stylekit.top/styles/neumorphism.svg"},{id:"bauhaus",name:"包豪斯",nameEn:"Bauhaus",desc:"功能主义、几何形式、原色运用",colors:["#000000","#ffffff","#ff0000","#ffcc00"],keywords:["几何","原色","功能主义"],docUrl:"https://www.stylekit.top/styles/bauhaus",image:"https://stylekit.top/styles/bauhaus.svg"},{id:"apple-style",name:"Apple 风格",nameEn:"Apple Style",desc:"极致简约的高端设计风格",colors:["#000000","#f5f5f7","#0071e3"],keywords:["极简","高端","科技"],docUrl:"https://www.stylekit.top/styles/apple-style",image:"https://stylekit.top/styles/apple-style.svg"},{id:"fluent-design",name:"流利设计",nameEn:"Fluent Design",desc:"微软设计系统，光效与深度",colors:["#0078d4","#ffffff"],keywords:["光效","深度","动效"],docUrl:"https://www.stylekit.top/styles/fluent-design",image:"https://stylekit.top/styles/fluent-design.svg"},{id:"pixel-art",name:"像素艺术风",nameEn:"Pixel Art",desc:"复古 8-bit 像素游戏风格",colors:["#1a1c2c","#ff004d","#00e436","#29adff"],keywords:["像素","8-bit","复古"],docUrl:"https://www.stylekit.top/styles/pixel-art",image:"https://stylekit.top/styles/pixel-art.svg"},{id:"neon-retro",name:"霓虹复古",nameEn:"Neon Retro",desc:"80-90年代复古未来主义美学",colors:["#ff006e","#8338ec","#3a86ff","#fb5607"],keywords:["霓虹","复古","蒸汽波"],docUrl:"https://www.stylekit.top/styles/neon-retro",image:"https://stylekit.top/styles/neon-retro.svg"},{id:"y2k",name:"千禧风格",nameEn:"Y2K",desc:"2000年代初的未来主义美学",colors:["#c0c0c0","#ff69b4","#00ffff"],keywords:["千禧","金属","气泡"],docUrl:"https://www.stylekit.top/styles/y2k",image:"https://stylekit.top/styles/y2k.svg"},{id:"memphis",name:"孟菲斯风格",nameEn:"Memphis",desc:"80年代意大利设计运动",colors:["#ff6b6b","#4ecdc4","#ffe66d","#a8e6cf"],keywords:["几何","撞色","图案"],docUrl:"https://www.stylekit.top/styles/memphis",image:"https://stylekit.top/styles/memphis.svg"},{id:"art-deco",name:"装饰艺术",nameEn:"Art Deco",desc:"1920-30年代的奢华设计风格",colors:["#000000","#d4af37","#ffffff"],keywords:["奢华","几何","金色"],docUrl:"https://www.stylekit.top/styles/art-deco",image:"https://stylekit.top/styles/art-deco.svg"},{id:"skeuomorphism",name:"拟物设计",nameEn:"Skeuomorphism",desc:"模拟真实世界物体的数字设计",colors:["#8b7355","#d4a574","#2c2416"],keywords:["真实","纹理","立体"],docUrl:"https://www.stylekit.top/styles/skeuomorphism",image:"https://stylekit.top/styles/skeuomorphism.svg"},{id:"swiss-design",name:"瑞士国际风格",nameEn:"Swiss International",desc:"网格系统、无衬线字体、清晰层次",colors:["#000000","#ffffff","#ff0000"],keywords:["网格","理性","清晰"],docUrl:"https://www.stylekit.top/styles/swiss-design",image:"https://stylekit.top/styles/swiss-design.svg"},{id:"ghibli-style",name:"吉卜力风格",nameEn:"Ghibli Style",desc:"温暖柔和的色调、手绘质感",colors:["#8fbc8f","#f4a460","#87ceeb"],keywords:["温暖","手绘","治愈"],docUrl:"https://www.stylekit.top/styles/ghibli-style",image:"https://stylekit.top/styles/ghibli-style.svg"},{id:"comic-style",name:"漫画风格",nameEn:"Comic Style",desc:"浓重墨线、网点填充、对话气泡",colors:["#000000","#ff0000","#ffff00","#0000ff"],keywords:["漫画","墨线","分镜"],docUrl:"https://www.stylekit.top/styles/comic-style",image:"https://stylekit.top/styles/comic-style.svg"},{id:"notion-style",name:"Notion 风格",nameEn:"Notion Style",desc:"极简文档风格，清爽协作",colors:["#f7f6f3","#37352f","#2eaadc"],keywords:["文档","极简","协作"],docUrl:"https://www.stylekit.top/styles/notion-style",image:"https://stylekit.top/styles/notion-style.svg"},{id:"risograph",name:"Risograph 印刷风",nameEn:"Risograph",desc:"专色叠印、半色调网点",colors:["#ff3366","#00ccff","#ffcc00"],keywords:["印刷","网点","叠印"],docUrl:"https://www.stylekit.top/styles/risograph",image:"https://stylekit.top/styles/risograph.svg"},{id:"mecha",name:"机甲风",nameEn:"Mecha",desc:"钢铁质感、警示标识、技术参数",colors:["#1a1a1a","#ff6600","#00ff00","#ffff00"],keywords:["机甲","科技","工业"],docUrl:"https://www.stylekit.top/styles/mecha",image:"https://stylekit.top/styles/mecha.svg"},{id:"gothic-lolita",name:"哥特萝莉风",nameEn:"Gothic Lolita",desc:"深色蕾丝、玫瑰纹样、维多利亚式装饰",colors:["#000000","#8b0000","#ffffff","#c0c0c0"],keywords:["哥特","蕾丝","暗黑"],docUrl:"https://www.stylekit.top/styles/gothic-lolita",image:"https://stylekit.top/styles/gothic-lolita.svg"},{id:"cyber-chinese",name:"赛博中华风",nameEn:"Cyber Chinese",desc:"霓虹灯笼、数字山水、东方未来主义",colors:["#ff0000","#ffd700","#00ffff","#ff1493"],keywords:["赛博","中华","霓虹"],docUrl:"https://www.stylekit.top/styles/cyber-chinese",image:"https://stylekit.top/styles/cyber-chinese.svg"},{id:"acid-graphics",name:"酸性平面设计",nameEn:"Acid Graphics",desc:"荧光色彩、扭曲字体、液态流动",colors:["#00ff00","#ff00ff","#ffff00","#00ffff"],keywords:["荧光","迷幻","实验"],docUrl:"https://www.stylekit.top/styles/acid-graphics",image:"https://stylekit.top/styles/acid-graphics.svg"},{id:"cottagecore",name:"田园风格",nameEn:"Cottagecore",desc:"柔和自然色、花卉纹样、手工质感",colors:["#f5e6d3","#d4a574","#8fbc8f","#dda0dd"],keywords:["田园","自然","温馨"],docUrl:"https://www.stylekit.top/styles/cottagecore",image:"https://stylekit.top/styles/cottagecore.svg"},{id:"bento-grid",name:"便当盒布局",nameEn:"Bento Grid",desc:"不规则网格布局，大小不一的卡片组合",colors:["#3b82f6","#8b5cf6","#ec4899","#f97316"],keywords:["网格","卡片","不规则"],docUrl:"https://www.stylekit.top/styles/bento-grid",image:"https://stylekit.top/styles/bento-grid.svg"},{id:"editorial",name:"编辑杂志风",nameEn:"Editorial",desc:"优雅的杂志排版，衬线标题与留白之美",colors:["#000000","#ffffff"],keywords:["杂志","排版","优雅"],docUrl:"https://www.stylekit.top/styles/editorial",image:"https://stylekit.top/styles/editorial.svg"},{id:"corporate-clean",name:"企业简洁风",nameEn:"Corporate Clean",desc:"专业简洁的企业风格，强调可读性",colors:["#0066cc","#333333","#f5f5f5"],keywords:["企业","专业","B2B"],docUrl:"https://www.stylekit.top/styles/corporate-clean",image:"https://stylekit.top/styles/corporate-clean.svg"},{id:"minimalist-flat",name:"极简扁平风",nameEn:"Minimalist Flat",desc:"极致简约的扁平设计",colors:["#2c3e50","#3498db","#ecf0f1"],keywords:["极简","扁平","现代"],docUrl:"https://www.stylekit.top/styles/minimalist-flat",image:"https://stylekit.top/styles/minimalist-flat.svg"},{id:"soft-ui",name:"柔和界面风",nameEn:"Soft UI",desc:"温和友好的界面风格，柔和阴影",colors:["#e0e5ec","#a3b1c6","#ffffff"],keywords:["柔和","友好","圆润"],docUrl:"https://www.stylekit.top/styles/soft-ui",image:"https://stylekit.top/styles/soft-ui.svg"},{id:"natural-organic",name:"自然有机风",nameEn:"Natural Organic",desc:"自然温暖的风格",colors:["#8fbc8f","#d2b48c","#f5f5dc"],keywords:["自然","有机","温暖"],docUrl:"https://www.stylekit.top/styles/natural-organic",image:"https://stylekit.top/styles/natural-organic.svg"},{id:"modern-gradient",name:"现代渐变风",nameEn:"Modern Gradient",desc:"现代感十足的渐变设计",colors:["#667eea","#764ba2","#f093fb"],keywords:["渐变","现代","动感"],docUrl:"https://www.stylekit.top/styles/modern-gradient",image:"https://stylekit.top/styles/modern-gradient.svg"},{id:"retro-vintage",name:"复古怀旧风",nameEn:"Retro Vintage",desc:"复古怀旧的设计风格",colors:["#d4a574","#8b7355","#f5e6d3"],keywords:["复古","怀旧","经典"],docUrl:"https://www.stylekit.top/styles/retro-vintage",image:"https://stylekit.top/styles/retro-vintage.svg"},{id:"dark-mode",name:"暗黑模式",nameEn:"Dark Mode",desc:"现代暗黑主题设计",colors:["#1a1a1a","#2d2d2d","#ffffff"],keywords:["暗黑","夜间","护眼"],docUrl:"https://www.stylekit.top/styles/dark-mode",image:"https://stylekit.top/styles/dark-mode.svg"},{id:"monochrome",name:"单色极简",nameEn:"Monochrome",desc:"纯黑白灰的极致单色设计",colors:["#000000","#808080","#ffffff"],keywords:["单色","黑白","极简"],docUrl:"https://www.stylekit.top/styles/monochrome",image:"https://stylekit.top/styles/monochrome.svg"},{id:"terracotta",name:"赤陶暖调",nameEn:"Terracotta",desc:"地中海赤陶与暖色大地",colors:["#d4735e","#e8b298","#f5e6d3"],keywords:["暖调","陶土","自然"],docUrl:"https://www.stylekit.top/styles/terracotta",image:"https://stylekit.top/styles/terracotta.svg"},{id:"brutalist-web",name:"网页粗野主义",nameEn:"Brutalist Web",desc:"90年代早期互联网的原始美学",colors:["#0000ee","#000000","#ffffff"],keywords:["粗野","原始","低保真"],docUrl:"https://www.stylekit.top/styles/brutalist-web",image:"https://stylekit.top/styles/brutalist-web.svg"},{id:"mid-century-modern",name:"中世纪现代",nameEn:"Mid-Century Modern",desc:"50年代原子时代设计美学",colors:["#ff6b35","#f7931e","#004e89"],keywords:["复古","几何","原子"],docUrl:"https://www.stylekit.top/styles/mid-century-modern",image:"https://stylekit.top/styles/mid-century-modern.svg"},{id:"constructivism",name:"构成主义",nameEn:"Constructivism",desc:"苏联构成主义海报风格",colors:["#ff0000","#000000","#ffffff"],keywords:["构成","海报","革命"],docUrl:"https://www.stylekit.top/styles/constructivism",image:"https://stylekit.top/styles/constructivism.svg"},{id:"op-art",name:"欧普艺术",nameEn:"Op Art",desc:"视觉错觉图案",colors:["#000000","#ffffff"],keywords:["错觉","图案","视觉"],docUrl:"https://www.stylekit.top/styles/op-art",image:"https://stylekit.top/styles/op-art.svg"},{id:"islamic-geometric",name:"伊斯兰几何",nameEn:"Islamic Geometric",desc:"神圣几何图案",colors:["#1e3a8a","#fbbf24","#ffffff"],keywords:["几何","图案","神圣"],docUrl:"https://www.stylekit.top/styles/islamic-geometric",image:"https://stylekit.top/styles/islamic-geometric.svg"},{id:"indian-festive",name:"印度节庆",nameEn:"Indian Festive",desc:"鲜艳的庆典色彩",colors:["#ff6b35","#f7931e","#c1121f","#ffd60a"],keywords:["节庆","鲜艳","庆典"],docUrl:"https://www.stylekit.top/styles/indian-festive",image:"https://stylekit.top/styles/indian-festive.svg"},{id:"african-textile",name:"非洲纺织",nameEn:"African Textile",desc:"大胆的编织图案",colors:["#d62828","#f77f00","#fcbf49","#003049"],keywords:["纺织","图案","大胆"],docUrl:"https://www.stylekit.top/styles/african-textile",image:"https://stylekit.top/styles/african-textile.svg"},{id:"korean-minimal",name:"韩式极简",nameEn:"Korean Minimal",desc:"柔和精致的简约",colors:["#f8f9fa","#e9ecef","#495057"],keywords:["韩式","柔和","精致"],docUrl:"https://www.stylekit.top/styles/korean-minimal",image:"https://stylekit.top/styles/korean-minimal.svg"},{id:"pastel-goth",name:"粉彩哥特",nameEn:"Pastel Goth",desc:"暗黑遇见粉彩",colors:["#c8b6ff","#ffc6ff","#000000"],keywords:["粉彩","哥特","暗黑"],docUrl:"https://www.stylekit.top/styles/pastel-goth",image:"https://stylekit.top/styles/pastel-goth.svg"},{id:"maximalism",name:"极繁主义",nameEn:"Maximalism",desc:"More is more",colors:["#ff006e","#fb5607","#ffbe0b","#8338ec"],keywords:["极繁","丰富","大胆"],docUrl:"https://www.stylekit.top/styles/maximalism",image:"https://stylekit.top/styles/maximalism.svg"},{id:"medieval-manuscript",name:"中世纪手抄本",nameEn:"Medieval Manuscript",desc:"装饰手稿风格",colors:["#8b0000","#daa520","#2f4f4f"],keywords:["手抄本","装饰","中世纪"],docUrl:"https://www.stylekit.top/styles/medieval-manuscript",image:"https://stylekit.top/styles/medieval-manuscript.svg"},{id:"graffiti-street",name:"涂鸦街头",nameEn:"Graffiti Street",desc:"街头艺术氛围",colors:["#ff006e","#ffbe0b","#3a86ff","#000000"],keywords:["涂鸦","街头","艺术"],docUrl:"https://www.stylekit.top/styles/graffiti-street",image:"https://stylekit.top/styles/graffiti-street.svg"},{id:"marble-luxury",name:"大理石奢华",nameEn:"Marble Luxury",desc:"精致优雅的大理石质感",colors:["#ffffff","#c0c0c0","#000000"],keywords:["大理石","奢华","优雅"],docUrl:"https://www.stylekit.top/styles/marble-luxury",image:"https://stylekit.top/styles/marble-luxury.svg"},{id:"victorian-botanical",name:"维多利亚植物",nameEn:"Victorian Botanical",desc:"古典植物插画风格",colors:["#2d5016","#8b4513","#f5e6d3"],keywords:["维多利亚","植物","古典"],docUrl:"https://www.stylekit.top/styles/victorian-botanical",image:"https://stylekit.top/styles/victorian-botanical.svg"},{id:"doodle",name:"涂鸦手绘",nameEn:"Doodle",desc:"手绘涂鸦感",colors:["#000000","#ff006e","#ffbe0b"],keywords:["手绘","涂鸦","随性"],docUrl:"https://www.stylekit.top/styles/doodle",image:"https://stylekit.top/styles/doodle.svg"},{id:"ink-wash",name:"水墨风",nameEn:"Ink Wash",desc:"中国水墨画风格",colors:["#000000","#808080","#ffffff"],keywords:["水墨","中国","写意"],docUrl:"https://www.stylekit.top/styles/ink-wash",image:"https://stylekit.top/styles/ink-wash.svg"},{id:"stripe-style",name:"条纹风格",nameEn:"Stripe Style",desc:"Stripe 公司的设计风格",colors:["#635bff","#0a2540","#ffffff"],keywords:["Stripe","渐变","现代"],docUrl:"https://www.stylekit.top/styles/stripe-style",image:"https://stylekit.top/styles/stripe-style.svg"}],B=[{id:1,name:"RTD 框架 (角色-任务-细节)",category:"核心框架",icon:"🎯",description:"基础框架，通过角色、任务、细节三要素构建提示词，性能提升 10-20%",systemPrompt:`【角色 Role】
你是 [专业身份]，拥有 [背景经验]。

【任务 Task】
请 [具体动作] [目标对象]，实现 [预期结果]。

【细节 Details】
- 输出格式：[Markdown/JSON/代码]
- 约束条件：[限制/要求]
- 质量标准：[评判标准]
- 特殊要求：[其他说明]

请按照以上结构完成任务。`},{id:2,name:"APE 框架 (行动-目的-期望)",category:"核心框架",icon:"🚀",description:"将请求分解为可执行步骤、底层目的和可衡量结果",systemPrompt:`【行动 Action】
具体要做什么：[明确的动作步骤]

【目的 Purpose】
为什么要做：[背后的动机和目标]

【期望 Expectation】
期望的结果：[可衡量的成功标准]

请基于以上三要素完成任务。`},{id:3,name:"BROKE 框架 (背景-角色-目标-关键结果-演进)",category:"核心框架",icon:"📊",description:"结合 OKR 方法论，适合复杂项目和长期目标",systemPrompt:`【背景 Background】
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

请按照 BROKE 框架完成任务。`},{id:4,name:"CO-STAR 框架",category:"核心框架",icon:"⭐",description:"六要素完整框架：上下文-目标-风格-语气-受众-响应",systemPrompt:`【上下文 Context】
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

请按照 CO-STAR 框架完成任务。`},{id:5,name:"Chain-of-Thought (思维链)",category:"认知增强",icon:"🧠",description:"让模型展示推理步骤，数学推理准确率提升 50%+",systemPrompt:`请使用思维链方法，展示完整的推理过程：

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

请展示完整的思考过程。`},{id:6,name:"Self-Consistency CoT",category:"认知增强",icon:"🔄",description:"生成多条推理路径，选择最一致的答案，提高准确性",systemPrompt:`请使用自洽性思维链方法：

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

请生成多条推理路径并选择最一致的答案。`},{id:7,name:"Few-shot 示例引导",category:"核心技术",icon:"📚",description:"通过 2-3 个示例展示期望的输出格式和风格",systemPrompt:`请参考以下示例，理解期望的输出风格和格式：

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

现在请处理：[用户输入]`},{id:8,name:"明确清晰型",category:"核心技术",icon:"✨",description:"使用明确的动作动词，避免模糊表达",systemPrompt:`请使用明确、清晰的方式完成任务：

【明确要求】
- 使用具体的动作动词（创建、分析、优化、生成、评估）
- 避免模糊表达（"帮我看看"、"处理一下"、"弄一下"）
- 明确指定期望的输出格式和深度

【示例对比】
❌ 模糊：帮我做个仪表板
✅ 明确：创建一个销售数据仪表板，包含：月度趋势图、TOP10产品排名、地区分布饼图

现在请处理用户的具体需求。`},{id:9,name:"上下文动机型",category:"核心技术",icon:"💡",description:'解释任务背后的"为什么"，让 AI 理解目标',systemPrompt:`请理解任务背后的动机和目标：

【上下文信息】
- 任务背景：[为什么要做这个]
- 最终目标：[想达到什么效果]
- 使用场景：[在什么情况下使用]
- 目标受众：[给谁看/谁使用]
- 成功标准：[如何判断成功]

【决策原则】
基于上下文做出最符合目标的决策，而不是机械执行指令。

现在请处理用户的需求。`},{id:10,name:"允许不确定型",category:"核心技术",icon:"❓",description:'明确允许 AI 说"不知道"，减少幻觉',systemPrompt:`【重要原则】
如果你不确定答案，请明确说"我不知道"或"我不确定"，不要猜测或编造信息。

【回答要求】
- 确定的信息：直接回答，并说明依据
- 部分确定：说明确定的部分，标注不确定的部分
- 完全不确定：诚实说"我不知道"，并建议查阅权威资料

【禁止行为】
- 编造数据或事实
- 过度自信的错误回答
- 模糊的"可能"、"也许"（除非明确标注）

现在请处理用户的需求。`},{id:11,name:"Prompt Chaining (提示链)",category:"高级技术",icon:"⛓️",description:"将复杂任务拆解为多个子任务，逐步执行",systemPrompt:`请将复杂任务拆解为多个子任务，按顺序执行：

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
每个子任务独立完成，确保前一个任务的输出质量。`},{id:12,name:"响应预填充 (JSON 格式)",category:"高级技术",icon:"📝",description:"预填充响应开头，强制特定格式输出",systemPrompt:`请以 JSON 格式输出结果。

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

现在请处理用户的需求。`},{id:13,name:"代码生成专用",category:"应用场景",icon:"💻",description:"专门用于代码开发，包含完整的技术约束",systemPrompt:`你是资深软件工程师。

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

如果不确定某个技术细节，请明确说明。`},{id:14,name:"内容创作专用",category:"应用场景",icon:"✍️",description:"专门用于内容创作，包含受众和风格约束",systemPrompt:`你是专业内容创作者。

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

如果需要的数据或事实不确定，请明确标注。`},{id:15,name:"数据分析专用",category:"应用场景",icon:"📊",description:"专门用于数据分析，包含完整的分析框架",systemPrompt:`你是数据分析专家。

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

请提供专业的数据分析报告。`},{id:16,name:"翻译专用",category:"应用场景",icon:"🌐",description:"专业翻译工具，支持多语言互译，保持原文风格和专业术语",systemPrompt:`你是专业翻译专家，精通多语言翻译。

【翻译任务】
- 源语言：[自动识别或指定]
- 目标语言：[指定目标语言]
- 文本类型：[技术文档/商务文件/文学作品/日常对话]
- 专业领域：[IT/医疗/法律/金融/通用]

【翻译原则】
1. 准确性：忠实原文，不遗漏、不添加
2. 流畅性：符合目标语言表达习惯
3. 专业性：正确使用行业术语
4. 风格保持：保留原文语气和风格

【输出格式】
**译文：**
[翻译结果]

**术语对照：**
- [专业术语1]：[翻译]
- [专业术语2]：[翻译]

**译注：**
[如有需要说明的文化差异或翻译难点]

请提供准确、流畅的翻译。`}],p=JSON.parse(localStorage.getItem("customTemplates")||"[]");function P(e,o,s){const r={id:`custom-${Date.now()}`,name:e,category:o,icon:"⭐",systemPrompt:s,isCustom:!0};return p.push(r),localStorage.setItem("customTemplates",JSON.stringify(p)),r}function z(e){const o=p.findIndex(s=>s.id===e);o>-1&&(p.splice(o,1),localStorage.setItem("customTemplates",JSON.stringify(p)))}function u(){return[...B,...p]}function A(e,o,s,r,a){const i={id:Date.now(),timestamp:new Date().toISOString(),input:e,output:o,mode:s,model:r,templateName:a||"无模板",note:""};t.favorites.unshift(i),localStorage.setItem("favorites",JSON.stringify(t.favorites))}function N(e){t.favorites=t.favorites.filter(o=>o.id!==e),localStorage.setItem("favorites",JSON.stringify(t.favorites))}function j(e,o){const s=t.favorites.find(r=>r.id===e);s&&(s.note=o,localStorage.setItem("favorites",JSON.stringify(t.favorites)))}function C(){t.favorites=[],localStorage.setItem("favorites",JSON.stringify([]))}function n(e,o="success"){const s=document.createElement("div"),r={success:"from-green-400 to-emerald-500",error:"from-red-400 to-rose-500",info:"from-blue-400 to-cyan-500"};s.className=`fixed top-20 right-8 bg-gradient-to-r ${r[o]} text-white px-6 py-4 border-3 border-black font-bold depth-4 rounded-sm animate-slide-in-right z-50`,s.innerHTML=e,document.body.appendChild(s),setTimeout(()=>{s.style.animation="slide-out-right 0.3s ease-out",setTimeout(()=>s.remove(),300)},2e3)}function f(e,o){return e==="style"?t.favorites.some(s=>s.type==="style"&&s.name===o):e==="template"?t.favorites.some(s=>s.type==="template"&&(s.templateId===o||s.templateId===parseInt(o))):!1}function L(){return`
    <aside class="w-64 bg-gradient-to-b from-white to-gray-50 border-r-2 border-black flex flex-col h-screen animate-slide-in-left depth-3">
      <div class="p-6 border-b-2 border-black bg-gradient-to-r from-purple-500 to-pink-500 animate-shimmer depth-2">
        <h1 class="font-black text-xl text-white drop-shadow-lg">AI 提示词优化器</h1>
      </div>
      <nav class="py-4">
        ${g("optimizer","⚡","提示词优化","from-yellow-400 to-orange-500")}
        ${g("styles","🎨","前端风格库","from-pink-400 to-rose-500")}
        ${g("templates","📋","模板库","from-blue-400 to-cyan-500")}
        ${g("favorites","⭐","收藏夹","from-amber-400 to-yellow-500")}
        ${g("history","📜","历史记录","from-green-400 to-emerald-500")}
        ${g("settings","⚙️","设置","from-gray-400 to-slate-500")}
      </nav>
    </aside>
  `}function g(e,o,s,r){const a=t.currentView===e;return`
    <button onclick="switchView('${e}')" class="w-full px-4 py-3 text-left font-bold text-sm flex items-center gap-3 smooth-transition btn-click ${a?`bg-gradient-to-r ${r} text-white depth-2`:"hover:bg-gray-100 hover:translate-x-2"}">
      <span class="text-2xl ${a?"animate-bounce-slow drop-shadow-md":""}">${o}</span>
      <span>${s}</span>
    </button>
  `}function I(){return`
    <div class="flex-1 overflow-y-auto page-transition-enter">
      ${h()}
    </div>
  `}function h(){switch(t.currentView){case"optimizer":return $();case"styles":return R();case"templates":return F();case"favorites":return K();case"history":return J();case"settings":return _();default:return $()}}function R(){const{currentPage:e,pageSize:o,styleSearchKeyword:s}=t,r=s?w.filter(d=>d.name.includes(s)||d.nameEn.toLowerCase().includes(s.toLowerCase())||d.desc.includes(s)||d.keywords.some(m=>m.includes(s))):w,a=Math.ceil(r.length/o),i=(e-1)*o,l=i+o,b=r.slice(i,l);return`
    <div class="max-w-7xl mx-auto px-6 py-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="font-black text-3xl">前端风格库</h2>
          <div class="text-sm text-gray-600">
            <span>共 ${r.length} 个风格</span>
            <span class="mx-2">|</span>
            <span>数据来源: <a href="https://www.stylekit.top" target="_blank" class="font-bold text-black hover:text-[#ff006e] transition-colors">StyleKit.top</a></span>
          </div>
        </div>

        <div class="mb-8">
          <input type="text" id="styleSearch" placeholder="🔍 搜索风格名称、关键词... (按回车搜索)" value="${s}" onkeypress="if(event.key==='Enter') searchStyles(this.value)" class="w-full border-2 border-black p-3 font-medium hover:bg-gray-50 focus:bg-white smooth-transition rounded-sm" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          ${b.map(d=>`
            <div class="border-2 border-black overflow-hidden hover:shadow-[4px_4px_0px_0px_rgba(255,0,110,1)] transition-all">
              <div class="aspect-[4/3] bg-gray-100">
                <img src="${d.image}" alt="${d.name}" class="w-full h-full object-cover" />
              </div>
              <div class="p-4">
                <h3 class="font-bold text-lg mb-2">${d.name} / ${d.nameEn}</h3>
                <p class="text-sm text-gray-600 mb-3">${d.desc}</p>
                <div class="flex gap-2 mb-4">
                  ${d.keywords.slice(0,3).map(m=>`<span class="text-xs px-2 py-1 bg-gray-100">${m}</span>`).join("")}
                </div>
                <div class="flex gap-2">
                  <a href="${d.docUrl}" target="_blank" class="flex-1 border-2 border-black bg-black text-white font-bold py-2 text-sm text-center hover:bg-gray-800 transition-colors">查看文档</a>
                  <button onclick="favoriteStyle('${d.name}')" class="border-2 border-black ${f("style",d.name)?"bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-yellow animate-pulse-slow scale-110":"bg-gray-200 text-gray-500"} px-3 py-2 text-xl font-bold hover:scale-105 transition-all">${f("style",d.name)?"⭐":"☆"}</button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- 分页 -->
        <div class="flex justify-center items-center gap-2 mb-8">
          <button onclick="changePage(${e-1})" ${e===1?"disabled":""} class="px-4 py-2 border-2 border-black font-bold ${e===1?"opacity-50 cursor-not-allowed":"hover:bg-black hover:text-white"} transition-colors">上一页</button>
          ${Array.from({length:a},(d,m)=>m+1).map(d=>`
            <button onclick="changePage(${d})" class="px-4 py-2 border-2 border-black font-bold ${d===e?"bg-black text-white":"hover:bg-gray-100"} transition-colors">${d}</button>
          `).join("")}
          <button onclick="changePage(${e+1})" ${e===a?"disabled":""} class="px-4 py-2 border-2 border-black font-bold ${e===a?"opacity-50 cursor-not-allowed":"hover:bg-black hover:text-white"} transition-colors">下一页</button>
        </div>

        <!-- 引用说明 -->
        <div class="border-t-2 border-black pt-6 text-center text-sm text-gray-600">
          <p class="mb-2">风格数据来源于 <a href="https://www.stylekit.top" target="_blank" class="font-bold text-black hover:text-[#ff006e] transition-colors">StyleKit.top</a></p>
          <p>感谢 StyleKit 提供的优质设计风格资源 ❤️</p>
        </div>
      </div>
    </div>
  `}function $(){const e=u();return`
    <div class="p-8 ${t.backgroundImage?"bg-transparent":"bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50"} bg-dots animate-fade-in min-h-screen">
      <div class="flex justify-between items-center mb-8">
        <h2 class="font-black text-4xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-slide-in-left drop-shadow-md">提示词优化</h2>
        <div id="optimizerMode" class="flex gap-3 animate-slide-in-right">
          <button onclick="switchMode('fast')" class="px-5 py-2.5 border-2 border-black font-bold smooth-transition btn-click hover-lift ${t.optimizeMode==="fast"?"bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-yellow scale-105 animate-pulse-slow":"bg-white hover:bg-yellow-100 hover:scale-105"}">⚡ 快速</button>
          <button onclick="switchMode('deep')" class="px-5 py-2.5 border-2 border-black font-bold smooth-transition btn-click hover-lift ${t.optimizeMode==="deep"?"bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-purple scale-105 animate-pulse-slow":"bg-white hover:bg-blue-100 hover:scale-105"}">🧠 深度</button>
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
              ${t.availableModels.length>0?`
                <select id="optimizerModel" class="w-full border-2 border-purple-300 p-3 pr-10 font-medium bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 smooth-transition rounded-sm cursor-pointer appearance-none focus:outline-none focus:border-purple-500">
                  ${t.availableModels.map(o=>`<option value="${o}" ${t.selectedModel===o?"selected":""}>${o}</option>`).join("")}
                </select>
                <div class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-purple-600">▼</div>
              `:`
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
                ${e.map(o=>`
                  <option value="${o.id}" ${t.selectedTemplate&&t.selectedTemplate.id===o.id?"selected":""}>
                    ${o.icon} ${o.name}
                  </option>
                `).join("")}
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

      <textarea id="input" class="w-full h-48 border-2 border-black p-4 mb-4 bg-white hover:bg-purple-50 focus:bg-white focus:border-purple-500 smooth-transition depth-2 hover:depth-3 inset-shadow rounded-sm" placeholder="✍️ 在这里输入你的需求...">${t.input}</textarea>

      <button onclick="optimize()" class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 text-lg font-bold border-2 border-black hover:from-purple-700 hover:to-pink-700 smooth-transition shadow-purple hover:shadow-pink btn-click hover-lift hover-glow ${t.isOptimizing?"opacity-50 cursor-not-allowed animate-pulse-slow":""}" ${t.isOptimizing?"disabled":""}>
        ${t.isOptimizing?'<span class="animate-rotate inline-block">⏳</span> 优化中...':"✨ 开始优化"}
      </button>

      ${t.result?`
        <div class="mt-8 border-2 border-black depth-4 animate-fade-in hover-lift smooth-transition rounded-sm overflow-hidden">
          <div class="border-b-2 border-black p-5 flex justify-between items-center bg-gradient-to-r from-green-400 to-cyan-500">
            <h3 class="font-bold text-white text-xl drop-shadow-md">✨ 优化结果</h3>
            <div class="flex gap-2">
              <button onclick="addCurrentToFavorites()" class="border-2 border-black bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2 font-bold hover:from-yellow-500 hover:to-amber-600 smooth-transition shadow-yellow btn-click hover:scale-105 rounded-sm">⭐ 收藏</button>
              <button onclick="translateToEnglish()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-blue-100 smooth-transition depth-1 hover:depth-2 btn-click hover:scale-105 rounded-sm">🌐 翻译</button>
              <button onclick="copyResult()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-green-100 smooth-transition depth-1 hover:depth-2 btn-click hover:scale-105 rounded-sm">📋 复制</button>
            </div>
          </div>
          <div class="p-6 bg-gradient-to-br from-white to-gray-50"><pre class="whitespace-pre-wrap leading-relaxed">${t.result}</pre></div>
        </div>
      `:""}

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
          ${t.favorites.filter(o=>o.type==="template").length===0?`
            <div class="text-center text-gray-500 py-12 bg-white border-2 border-black depth-2 rounded-sm">
              <div class="text-6xl mb-4 animate-bounce-slow">📋</div>
              <p class="text-xl mb-2 font-bold">暂无收藏的模板</p>
              <p class="text-sm">去模板库收藏你喜欢的模板吧！</p>
            </div>
          `:`
            <div class="space-y-3">
              ${t.favorites.filter(o=>o.type==="template").map(o=>`
                <div class="border-2 border-black p-4 bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] smooth-transition cursor-pointer depth-2 hover:depth-3 hover:scale-102 rounded-sm" onclick="useFavoriteTemplateInOptimizer(${o.id})">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-3xl animate-bounce-slow">${o.icon}</span>
                      <div>
                        <h4 class="font-bold text-lg">${o.name}</h4>
                        <p class="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-sm inline-block">${o.category}</p>
                      </div>
                    </div>
                    <span class="text-sm font-bold text-amber-600">点击使用 →</span>
                  </div>
                </div>
              `).join("")}
            </div>
          `}
        </div>
      </div>
    </div>
    </div>
  `}function F(){const e=u(),{templateSearchKeyword:o}=t,s=o?e.filter(i=>{var l;return i.name.includes(o)||i.category.includes(o)||((l=i.description)==null?void 0:l.includes(o))||i.systemPrompt.includes(o)}):e,r=[...new Set(s.map(i=>i.category))],a={核心框架:"from-purple-400 to-pink-500",认知增强:"from-blue-400 to-cyan-500",核心技术:"from-green-400 to-emerald-500",高级技术:"from-orange-400 to-red-500",应用场景:"from-indigo-400 to-purple-500",自定义:"from-gray-400 to-slate-500"};return`
    <div class="p-8 ${t.backgroundImage?"bg-transparent":"bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"} bg-waves animate-fade-in min-h-screen">
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
        <input type="text" id="templateSearch" placeholder="🔍 搜索模板名称、分类、内容... (按回车搜索)" value="${o}" onkeypress="if(event.key==='Enter') searchTemplates(this.value)" class="w-full border-2 border-black p-3 font-medium hover:bg-gray-50 focus:bg-white smooth-transition rounded-sm" />
      </div>

      <div class="mb-6 text-sm text-gray-600 bg-white border-2 border-black p-4 depth-2 animate-fade-in hover-lift smooth-transition rounded-sm">
        💡 点击模板卡片使用，点击"查看"按钮查看和编辑模板内容
      </div>

      ${r.map(i=>`
        <div class="mb-8">
          <h3 class="font-bold text-2xl mb-4 border-b-2 border-black pb-2 bg-gradient-to-r ${a[i]||"from-gray-400 to-slate-500"} bg-clip-text text-transparent animate-slide-in-left drop-shadow-sm">${i}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${s.filter(l=>l.category===i).map(l=>`
              <div class="border-2 border-black p-5 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] smooth-transition hover-lift btn-click card-enter depth-2 hover:depth-3 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${a[i]||"from-gray-400 to-slate-500"} opacity-10 rounded-bl-full"></div>
                <div class="flex justify-between items-start mb-3 relative z-10">
                  <div class="flex items-center gap-2">
                    <div class="text-4xl animate-bounce-slow drop-shadow-md">${l.icon}</div>
                    <h4 class="font-bold">${l.name}</h4>
                  </div>
                </div>
                <pre class="text-xs text-gray-600 whitespace-pre-wrap line-clamp-3 mb-3 bg-gray-50 p-2 border border-gray-200 rounded-sm">${l.systemPrompt.substring(0,100)}...</pre>
                <div class="flex gap-2">
                  <button onclick="selectTemplate('${l.id}')" class="flex-1 border-2 border-black bg-gradient-to-r ${a[i]||"from-gray-400 to-slate-500"} text-white px-3 py-2 text-sm font-bold hover:opacity-90 smooth-transition depth-1 hover:depth-2 btn-click">使用</button>
                  <button onclick="viewTemplate('${l.id}')" class="flex-1 border-2 border-black bg-white px-3 py-2 text-sm font-bold hover:bg-gray-100 smooth-transition btn-click">查看</button>
                  <button onclick="favoriteTemplate('${l.id}')" class="border-2 border-black ${f("template",l.id)?"bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 shadow-yellow animate-pulse-slow scale-110":"bg-gray-200 text-gray-500"} px-3 py-2 text-xl font-bold hover:scale-105 smooth-transition btn-click transition-all">${f("template",l.id)?"⭐":"☆"}</button>
                  ${l.isCustom?`<button onclick="deleteTemplate('${l.id}')" class="border-2 border-red-500 text-red-500 px-3 py-2 text-sm font-bold hover:bg-red-500 hover:text-white smooth-transition btn-click">删除</button>`:""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `).join("")}

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
  `}function K(){const e=t.favorites.filter(r=>!r.type||r.type==="prompt"),o=t.favorites.filter(r=>r.type==="style"),s=t.favorites.filter(r=>r.type==="template");return`
    <div class="p-8 ${t.backgroundImage?"bg-transparent":"bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"} animate-fade-in">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-black text-4xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent animate-slide-in-left drop-shadow-md">收藏夹</h2>
        <div class="flex gap-2 animate-slide-in-right">
          <button onclick="exportFavoritesJSON()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-amber-100 smooth-transition depth-2 hover:depth-3 btn-click hover:scale-105">📤 导出 JSON</button>
          <button onclick="clearFavorites()" class="border-2 border-black bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 font-bold hover:from-red-600 hover:to-pink-600 smooth-transition shadow-pink btn-click hover:scale-105">🗑️ 清空收藏</button>
        </div>
      </div>

      ${t.favorites.length===0?`
        <div class="text-center text-gray-500 py-12 bg-white border-2 border-black depth-4 glass animate-fade-in">
          <div class="text-6xl mb-4 animate-bounce-slow">⭐</div>
          <p class="text-2xl mb-2 font-bold">暂无收藏</p>
          <p class="text-sm">可以收藏：提示词、模板、前端风格</p>
        </div>
      `:`
        <div class="space-y-8">
          <!-- 模板收藏 -->
          ${s.length>0?`
            <div>
              <h3 class="font-bold text-2xl mb-4 text-purple-700">📋 收藏的模板 (${s.length})</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${s.map(r=>`
                  <div class="border-2 border-black p-4 bg-white depth-2 hover:depth-3 smooth-transition">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-2xl">${r.icon}</span>
                      <h4 class="font-bold">${r.name}</h4>
                    </div>
                    <p class="text-xs text-gray-600 mb-3">${r.category}</p>
                    <div class="flex gap-2">
                      <button onclick="useFavoriteTemplate(${r.id})" class="flex-1 border-2 border-black bg-green-500 text-white px-3 py-2 text-sm font-bold hover:bg-green-600 smooth-transition">使用</button>
                      <button onclick="deleteFavoriteItem(${r.id})" class="border-2 border-black bg-red-500 text-white px-3 py-2 text-sm font-bold hover:bg-red-600 smooth-transition">删除</button>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}

          <!-- 风格收藏 -->
          ${o.length>0?`
            <div>
              <h3 class="font-bold text-2xl mb-4 text-pink-700">🎨 收藏的风格 (${o.length})</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                ${o.map(r=>`
                  <div class="border-2 border-black bg-white depth-2 hover:depth-3 smooth-transition overflow-hidden">
                    <div class="aspect-[4/3] bg-gray-100">
                      <img src="${r.image}" alt="${r.name}" class="w-full h-full object-cover" />
                    </div>
                    <div class="p-3">
                      <h4 class="font-bold text-sm mb-1">${r.name}</h4>
                      <p class="text-xs text-gray-600 mb-2">${r.desc}</p>
                      <div class="flex gap-2">
                        <a href="${r.docUrl}" target="_blank" class="flex-1 border-2 border-black bg-black text-white px-3 py-2 text-xs text-center font-bold hover:bg-gray-800 smooth-transition">查看</a>
                        <button onclick="deleteFavoriteItem(${r.id})" class="border-2 border-black bg-red-500 text-white px-3 py-2 text-xs font-bold hover:bg-red-600 smooth-transition">删除</button>
                      </div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}

          <!-- 提示词收藏 -->
          ${e.length>0?`
            <div>
              <h3 class="font-bold text-2xl mb-4 text-amber-700">✨ 收藏的提示词 (${e.length})</h3>
              <div class="space-y-4">
              <div class="space-y-4">
                ${e.map(r=>`
                  <div class="border-2 border-black p-4 bg-gradient-to-r from-yellow-100 to-amber-100 depth-2 hover:depth-3 smooth-transition">
                    <div class="flex justify-between items-start mb-3">
                      <div>
                        <span class="text-xs px-2 py-1 bg-gradient-to-r ${r.mode==="fast"?"from-yellow-400 to-orange-500":"from-blue-500 to-purple-600"} text-white font-bold rounded-sm">${r.mode==="fast"?"⚡ 快速":"🧠 深度"}</span>
                        <span class="text-xs px-2 py-1 bg-white ml-2 border border-gray-300 rounded-sm">${r.model}</span>
                        <span class="text-xs text-gray-500 ml-2">🕒 ${new Date(r.timestamp).toLocaleString("zh-CN")}</span>
                      </div>
                      <div class="flex gap-2">
                        <button onclick="reuseFavorite(${r.id})" class="text-xs px-3 py-1 border-2 border-black bg-white hover:bg-green-100 font-bold smooth-transition">♻️ 复用</button>
                        <button onclick="deleteFavoriteItem(${r.id})" class="text-xs px-3 py-1 border-2 border-black bg-red-500 text-white hover:bg-red-600 font-bold smooth-transition">删除</button>
                      </div>
                    </div>
                    <div class="text-sm bg-white p-3 border-2 border-gray-200 rounded-sm">${r.input.substring(0,100)}${r.input.length>100?"...":""}</div>
                  </div>
                `).join("")}
              </div>
            </div>
          `:""}
        </div>
      `}
    </div>
  `}function J(){return`
    <div class="p-8 ${t.backgroundImage?"bg-transparent":"bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"} bg-grid animate-fade-in min-h-screen">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-black text-4xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-slide-in-left drop-shadow-md">历史记录</h2>
        <div class="flex gap-2 animate-slide-in-right">
          <button onclick="importHistory()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-green-100 smooth-transition depth-2 hover:depth-3 btn-click hover:scale-105">📥 导入 JSON</button>
          <button onclick="exportHistoryJSON()" class="border-2 border-black bg-white px-4 py-2 font-bold hover:bg-emerald-100 smooth-transition depth-2 hover:depth-3 btn-click hover:scale-105">📤 导出 JSON</button>
          <button onclick="clearHistory()" class="border-2 border-black bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 font-bold hover:from-red-600 hover:to-pink-600 smooth-transition shadow-pink btn-click hover:scale-105">🗑️ 清空历史</button>
        </div>
      </div>

      ${t.history.length===0?`
        <div class="text-center text-gray-500 py-16 bg-white border-2 border-black depth-4 glass animate-fade-in relative overflow-hidden">
          <div class="absolute top-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-float"></div>
          <div class="absolute bottom-10 right-10 w-40 h-40 bg-emerald-200 rounded-full opacity-20 animate-float" style="animation-delay: 1s;"></div>
          <div class="relative z-10">
            <div class="text-7xl mb-4 animate-bounce-slow">📜</div>
            <p class="text-2xl mb-2 font-bold">暂无历史记录</p>
            <p class="text-sm">开始优化提示词后，历史记录会显示在这里</p>
          </div>
        </div>
      `:`
        <div class="space-y-6">
          ${t.history.map((e,o)=>`
            <div class="border-2 border-black p-6 bg-white depth-3 hover:depth-4 smooth-transition hover-lift btn-click card-enter" style="animation-delay: ${o*.1}s">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <span class="text-xs px-3 py-1.5 bg-gradient-to-r ${e.mode==="fast"?"from-yellow-400 to-orange-500":"from-blue-500 to-purple-600"} text-white font-bold depth-1 rounded-sm">${e.mode==="fast"?"⚡ 快速":"🧠 深度"}</span>
                  <span class="text-xs px-3 py-1.5 bg-white ml-2 border border-gray-300 depth-1 rounded-sm">${e.model}</span>
                  <span class="text-xs text-gray-500 ml-2">🕒 ${new Date(e.timestamp).toLocaleString("zh-CN")}</span>
                </div>
                <div class="flex gap-2">
                  <button onclick="reuseHistory(${e.id})" class="text-sm px-3 py-2 border-2 border-black bg-white hover:bg-green-100 font-bold smooth-transition depth-1 hover:depth-2 btn-click hover:scale-105">♻️ 复用</button>
                  <button onclick="deleteHistoryItem(${e.id})" class="text-sm px-3 py-2 border-2 border-black bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 font-bold smooth-transition shadow-pink btn-click hover:scale-105">🗑️ 删除</button>
                </div>
              </div>
              <div class="mb-3">
                <div class="text-sm font-bold mb-2 text-green-800 flex items-center gap-2">
                  <span class="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500"></span>
                  📥 输入
                </div>
                <div class="text-sm bg-gray-50 p-3 border-2 border-gray-200 depth-1 inset-shadow rounded-sm">${e.input.substring(0,100)}${e.input.length>100?"...":""}</div>
              </div>
              <div>
                <div class="text-sm font-bold mb-2 text-green-800 flex items-center gap-2">
                  <span class="w-1 h-4 bg-gradient-to-b from-green-500 to-emerald-500"></span>
                  📤 输出
                </div>
                <div class="text-sm bg-gray-50 p-3 border-2 border-gray-200 max-h-32 overflow-y-auto depth-1 inset-shadow rounded-sm">${e.output.substring(0,200)}${e.output.length>200?"...":""}</div>
              </div>
            </div>
          `).join("")}
        </div>
      `}
    </div>
  `}function _(){return`
    <div class="p-8 ${t.backgroundImage?"bg-transparent":"bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50"} min-h-screen">
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
            <div class="border-2 border-black h-48 bg-gray-100 bg-center bg-no-repeat relative overflow-hidden depth-2 rounded-sm" style="${t.backgroundImage?`background-image:url('${t.backgroundImage}'); background-size: ${t.backgroundSize};`:""}">
              ${t.backgroundImage?"":'<div class="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-bold">暂无背景图片</div>'}
            </div>
          </div>

          <!-- 背景 URL -->
          <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 border-2 border-blue-200 rounded-sm">
            <label class="font-bold text-sm mb-3 block text-blue-700 flex items-center gap-2">
              <span class="text-xl">🔗</span>
              背景图片 URL
            </label>
            <div class="flex gap-2">
              <input type="text" id="backgroundUrl" class="flex-1 border-2 border-black p-3 bg-white hover:bg-gray-50 smooth-transition rounded-sm" placeholder="https://example.com/bg.jpg" value="${t.backgroundImage.startsWith("data:")?"":t.backgroundImage}" />
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
                  <option value="cover" ${t.backgroundSize==="cover"?"selected":""}>🖼️ Cover（铺满裁切）</option>
                  <option value="contain" ${t.backgroundSize==="contain"?"selected":""}>📦 Contain（完整显示）</option>
                  <option value="auto" ${t.backgroundSize==="auto"?"selected":""}>🔧 Auto（原始大小）</option>
                </select>
              </div>
              <div>
                <label class="font-bold text-xs mb-2 block text-gray-700 flex items-center gap-1">
                  <span>🌓</span>
                  遮罩强度：<span id="overlayValue" class="text-purple-600">${t.backgroundOverlay.toFixed(2)}</span>
                </label>
                <input type="range" min="0" max="0.8" step="0.05" value="${t.backgroundOverlay}" oninput="updateBackgroundOverlay(this.value)" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500" />
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
              <option value="openai" ${t.modelType==="openai"?"selected":""}>🤖 OpenAI (GPT)</option>
              <option value="claude" ${t.modelType==="claude"?"selected":""}>🧠 Claude (Anthropic)</option>
              <option value="gemini" ${t.modelType==="gemini"?"selected":""}>💎 Gemini (Google)</option>
            </select>
          </div>
          <div>
            <label class="font-bold text-sm mb-2 block text-gray-700 flex items-center gap-2">
              <span>🌐</span>
              API URL
            </label>
            <input type="text" id="apiUrl" class="w-full border-2 border-black p-3 bg-white hover:bg-gray-50 smooth-transition depth-1 rounded-sm" placeholder="https://api.openai.com/v1" value="${t.apiUrl}" />
          </div>
          <div>
            <label class="font-bold text-sm mb-2 block text-gray-700 flex items-center gap-2">
              <span>🔑</span>
              API Key
            </label>
            <input type="password" id="apiKey" class="w-full border-2 border-black p-3 bg-white hover:bg-gray-50 smooth-transition depth-1 rounded-sm" placeholder="sk-..." value="${t.apiKey}" />
          </div>
          ${t.availableModels.length>0?`
            <div>
              <label class="font-bold text-sm mb-2 block text-gray-700 flex items-center gap-2">
                <span>✨</span>
                选择模型
              </label>
              <select id="selectedModel" class="w-full border-2 border-black p-3 font-bold bg-white hover:bg-gray-50 smooth-transition depth-1 rounded-sm">
                ${t.availableModels.map(e=>`<option value="${e}" ${t.selectedModel===e?"selected":""}>${e}</option>`).join("")}
              </select>
            </div>
          `:""}
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
  `}window.openBackgroundModal=()=>{const e=document.getElementById("apiModal");e&&(e.classList.add("hidden"),e.classList.remove("flex"));const o=document.getElementById("backgroundModal");o&&(o.classList.remove("hidden"),o.classList.add("flex"))};window.closeBackgroundModal=()=>{const e=document.getElementById("backgroundModal");e&&(e.classList.add("hidden"),e.classList.remove("flex"))};window.openApiModal=()=>{const e=document.getElementById("backgroundModal");e&&(e.classList.add("hidden"),e.classList.remove("flex"));const o=document.getElementById("apiModal");o&&(o.classList.remove("hidden"),o.classList.add("flex"))};window.closeApiModal=()=>{const e=document.getElementById("apiModal");e&&(e.classList.add("hidden"),e.classList.remove("flex"))};window.openFavoritesModal=()=>{const e=document.getElementById("favoritesModal");e&&(e.classList.remove("hidden"),e.classList.add("flex"))};window.closeFavoritesModal=()=>{const e=document.getElementById("favoritesModal");e&&(e.classList.add("hidden"),e.classList.remove("flex"))};window.useFavoriteTemplateInOptimizer=e=>{const o=t.favorites.find(s=>s.id===e);!o||o.type!=="template"||(t.selectedTemplate={id:o.templateId,name:o.name,category:o.category,icon:o.icon,systemPrompt:o.systemPrompt},closeFavoritesModal(),c(),n("✅ 已选择该模板！","success"))};function D(){const e=document.getElementById("openBackgroundModalBtn");e&&(e.onclick=window.openBackgroundModal);const o=document.getElementById("openApiModalBtn");o&&(o.onclick=window.openApiModal)}window.switchView=e=>{t.currentView=e,t.currentPage=1,t.styleSearchKeyword="",t.templateSearchKeyword="";const o=document.querySelector(".flex-1.overflow-y-auto");if(o&&(o.outerHTML=I()),document.querySelectorAll("aside button").forEach(s=>{var a;((a=s.getAttribute("onclick"))==null?void 0:a.includes(`'${e}'`))?s.className=s.className.replace(/hover:bg-gray-100 hover:translate-x-2/,`bg-gradient-to-r ${H(e)} text-white depth-2`):s.className=s.className.replace(/bg-gradient-to-r.*?depth-2/,"hover:bg-gray-100 hover:translate-x-2")}),t.backgroundImage){const s=document.getElementById("app-shell"),r=document.getElementById("app-bg-overlay");s&&(s.style.backgroundImage=`url("${t.backgroundImage}")`,s.style.backgroundSize=t.backgroundSize,s.style.backgroundPosition="center",s.style.backgroundRepeat=t.backgroundSize==="auto"?"repeat":"no-repeat"),r&&(r.style.opacity=String(t.backgroundOverlay))}};function H(e){return{optimizer:"from-yellow-400 to-orange-500",styles:"from-pink-400 to-rose-500",templates:"from-blue-400 to-cyan-500",favorites:"from-amber-400 to-yellow-500",history:"from-green-400 to-emerald-500",settings:"from-gray-400 to-slate-500"}[e]||"from-gray-400 to-slate-500"}window.selectTemplateFromDropdown=e=>{if(!e)t.selectedTemplate=null;else{const o=u();t.selectedTemplate=o.find(s=>s.id===e||s.id===parseInt(e))}};window.translateStyle=async e=>{if(confirm(`将 "${e}" 翻译成英文？`))try{const o=encodeURIComponent(e),s=await fetch(`https://api.mymemory.translated.net/get?q=${o}&langpair=zh|en`);if(!s.ok)throw new Error("翻译服务暂时不可用");const r=await s.json();if(r.responseStatus===200)n(`✅ 翻译成功：${r.responseData.translatedText}`,"success");else throw new Error("翻译失败")}catch(o){n(`❌ 翻译失败：${o.message}`,"error")}};window.searchStyles=e=>{t.styleSearchKeyword=e,t.currentPage=1;const o=document.querySelector(".flex-1.overflow-y-auto");o&&(o.innerHTML=h())};window.searchTemplates=e=>{t.templateSearchKeyword=e;const o=document.querySelector(".flex-1.overflow-y-auto");o&&(o.innerHTML=h())};window.changePage=e=>{const o=Math.ceil(w.length/t.pageSize);e>=1&&e<=o&&(t.currentPage=e,c(),window.scrollTo({top:0,behavior:"smooth"}))};window.switchMode=e=>{t.optimizeMode=e,document.querySelectorAll("#optimizerMode button").forEach(o=>{var s;(s=o.getAttribute("onclick"))!=null&&s.includes(`'${e}'`)?o.className=o.className.replace(/bg-white.*?hover:scale-105/,`bg-gradient-to-r ${e==="fast"?"from-yellow-400 to-orange-500":"from-blue-500 to-purple-600"} text-white shadow-${e==="fast"?"yellow":"purple"} scale-105 animate-pulse-slow`):o.className=o.className.replace(/bg-gradient-to-r.*?animate-pulse-slow/,"bg-white hover:bg-"+(e==="fast"?"blue":"yellow")+"-100 hover:scale-105")})};window.optimize=async()=>{var s;const e=document.getElementById("input").value;if(!e.trim()){n("❌ 请输入需求","error");return}if(!t.apiUrl||!t.apiKey||!t.selectedModel){n("❌ 请先在设置中配置 API","error"),t.currentView="settings",c();return}const o=((s=document.getElementById("optimizerModel"))==null?void 0:s.value)||t.selectedModel;t.input=e,t.isOptimizing=!0,t.result="",c();try{let r;t.selectedTemplate?r=t.selectedTemplate.systemPrompt:r=t.optimizeMode==="fast"?`你是提示词优化专家。将用户需求快速转换为 RTD 格式（角色-任务-细节）。

输出格式：
# 角色
[定义角色]

# 任务
[具体任务]

# 细节
- 输出格式：[格式]
- 约束条件：[条件]

简洁明了即可，不需要过多解释。`:`你是一位专业的提示词工程师，精通 2026 年最新的提示词工程技术。

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
- 预期提升：[准确性/完整性/可控性]`;const a=await fetch(`${t.apiUrl}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.apiKey}`},body:JSON.stringify({model:o,messages:[{role:"system",content:r},{role:"user",content:`请优化以下提示词需求：

${e}`}],temperature:.7,max_tokens:2e3})});if(!a.ok)throw new Error(`API 错误: ${a.status}`);const i=await a.json();t.result=i.choices[0].message.content,E(e,t.result,t.optimizeMode,o)}catch(r){t.result=`❌ 优化失败：${r.message}

请检查设置中的 API 配置是否正确。`}t.isOptimizing=!1,c()};window.copyResult=()=>{navigator.clipboard.writeText(t.result),n("✅ 已复制到剪贴板","success")};window.reuseHistory=e=>{const o=t.history.find(s=>s.id===e);o&&(t.input=o.input,t.result=o.output,t.currentView="optimizer",c())};window.deleteHistoryItem=async e=>{confirm("确定删除这条历史记录？")&&(await O(e),n("✅ 已删除历史记录","success"),c())};window.clearHistory=async()=>{confirm("确定清空所有历史记录？此操作不可恢复！")&&(await U(),c())};window.exportHistoryJSON=()=>{const e=JSON.stringify(t.history,null,2),o=new Blob([e],{type:"application/json"}),s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=`prompt-history-${new Date().toISOString().split("T")[0]}.json`,r.click(),URL.revokeObjectURL(s)};window.importHistory=()=>{const e=document.createElement("input");e.type="file",e.accept=".json",e.onchange=async o=>{const s=o.target.files[0];if(s)try{const r=await s.text(),a=JSON.parse(r);if(!Array.isArray(a)){n("❌ JSON 格式错误：必须是数组格式","error");return}const i=new Set(t.history.map(b=>b.id)),l=a.filter(b=>!i.has(b.id));t.history=[...l,...t.history],localStorage.setItem("history",JSON.stringify(t.history)),n(`✅ 成功导入 ${l.length} 条历史记录`,"success"),c()}catch(r){n("❌ 导入失败："+r.message,"error")}},e.click()};window.translateToEnglish=async()=>{t.isOptimizing=!0,c();try{const e=encodeURIComponent(t.result),o=await fetch(`https://api.mymemory.translated.net/get?q=${e}&langpair=zh|en`);if(!o.ok)throw new Error("翻译服务暂时不可用");const s=await o.json();if(s.responseStatus===200)t.result=s.responseData.translatedText;else throw new Error("翻译失败")}catch(e){n(`❌ 翻译失败：${e.message}`,"error")}t.isOptimizing=!1,c()};function v(){localStorage.setItem("backgroundImage",t.backgroundImage),localStorage.setItem("backgroundSize",t.backgroundSize),localStorage.setItem("backgroundOverlay",String(t.backgroundOverlay))}window.applyBackgroundUrl=()=>{const e=document.getElementById("backgroundUrl"),o=(e==null?void 0:e.value.trim())||"";if(!o){n("❌ 请输入图片 URL","error");return}t.backgroundImage=o,v(),c()};window.uploadBackgroundImage=e=>{var r;const o=(r=e.target.files)==null?void 0:r[0];if(!o)return;if(!o.type.startsWith("image/")){n("❌ 请选择图片文件","error");return}const s=new FileReader;s.onload=()=>{t.backgroundImage=String(s.result||""),v(),c()},s.readAsDataURL(o)};window.updateBackgroundSize=e=>{t.backgroundSize=e,v(),c()};window.updateBackgroundOverlay=e=>{t.backgroundOverlay=parseFloat(e),v();const o=document.getElementById("overlayValue");o&&(o.textContent=t.backgroundOverlay.toFixed(2));const s=document.getElementById("app-bg-overlay");s&&(s.style.opacity=String(t.backgroundOverlay))};window.clearBackgroundImage=()=>{t.backgroundImage="",v(),c()};window.saveSettings=()=>{var r;const e=document.getElementById("apiUrl").value,o=document.getElementById("apiKey").value,s=((r=document.getElementById("selectedModel"))==null?void 0:r.value)||t.selectedModel;t.apiUrl=e,t.apiKey=o,t.selectedModel=s,localStorage.setItem("apiUrl",e),localStorage.setItem("apiKey",o),localStorage.setItem("modelType",t.modelType),localStorage.setItem("selectedModel",s),n("✅ 设置已保存","success")};window.updateModelType=e=>{t.modelType=e};window.testConnection=async()=>{const e=document.getElementById("apiUrl").value,o=document.getElementById("apiKey").value,s=document.getElementById("testResult");if(!e||!o){s.innerHTML='<div class="border-2 border-black bg-red-100 p-4 text-sm">❌ 请先填写 API URL 和 API Key</div>';return}s.innerHTML='<div class="border-2 border-black bg-gray-100 p-4 text-sm">⏳ 测试连接中...</div>';try{const r=`${e}/models`,a=await fetch(r,{method:"GET",headers:{Authorization:`Bearer ${o}`,...t.modelType==="claude"?{"anthropic-version":"2023-06-01"}:{}}});if(a.ok){const i=await a.json(),l=i.data||i.models||[];t.availableModels=l.map(d=>d.id||d.name||d).filter(Boolean),t.availableModels.length>0&&!t.selectedModel&&(t.selectedModel=t.availableModels[0]),s.innerHTML=`<div class="border-2 border-black bg-green-100 p-4 text-sm">✅ 连接成功！检测到 ${t.availableModels.length} 个可用模型</div>`;const b=s.previousElementSibling;if(t.availableModels.length>0&&!document.getElementById("selectedModel")){const d=`
          <div>
            <label class="font-bold text-sm mb-2 block text-gray-700 flex items-center gap-2">
              <span>✨</span>
              选择模型
            </label>
            <select id="selectedModel" class="w-full border-2 border-black p-3 font-bold bg-white hover:bg-gray-50 smooth-transition depth-1 rounded-sm">
              ${t.availableModels.map(m=>`<option value="${m}" ${t.selectedModel===m?"selected":""}>${m}</option>`).join("")}
            </select>
          </div>
        `;b.insertAdjacentHTML("beforebegin",d)}}else{const i=await a.text();s.innerHTML=`<div class="border-2 border-black bg-red-100 p-4 text-sm">❌ 连接失败 (${a.status})：${i.substring(0,150)}</div>`}}catch(r){s.innerHTML=`<div class="border-2 border-black bg-red-100 p-4 text-sm">❌ 连接错误：${r.message}</div>`}};let y=null;window.selectTemplate=e=>{const s=u().find(r=>r.id===e||r.id===parseInt(e));s&&(t.selectedTemplate=s,t.currentView="optimizer",c(),n(`✅ 已选择模板：${s.name}`,"success"))};window.viewTemplate=e=>{const s=u().find(r=>r.id===e||r.id===parseInt(e));s&&(y=s,document.getElementById("modalTemplateName").textContent=`${s.icon} ${s.name}`,document.getElementById("editTemplateName").value=s.name,document.getElementById("editTemplateCategory").value=s.category,document.getElementById("editTemplateContent").value=s.systemPrompt,s.isCustom?(document.getElementById("editTemplateName").readOnly=!1,document.getElementById("editTemplateContent").readOnly=!1,document.getElementById("editTemplateCategory").readOnly=!1):(document.getElementById("editTemplateName").readOnly=!0,document.getElementById("editTemplateContent").readOnly=!0,document.getElementById("editTemplateCategory").readOnly=!0),document.getElementById("viewTemplateModal").classList.remove("hidden"))};window.hideViewTemplateModal=()=>{document.getElementById("viewTemplateModal").classList.add("hidden"),y=null};window.saveTemplateEdit=()=>{if(!y||!y.isCustom){n("❌ 内置模板不可修改","error");return}const e=document.getElementById("editTemplateName").value.trim(),o=document.getElementById("editTemplateCategory").value.trim(),s=document.getElementById("editTemplateContent").value.trim();if(!e||!o||!s){n("❌ 请填写完整信息","error");return}const r=p.findIndex(a=>a.id===y.id);r>-1&&(p[r].name=e,p[r].category=o,p[r].systemPrompt=s,localStorage.setItem("customTemplates",JSON.stringify(p)),hideViewTemplateModal(),c(),n("✅ 模板已更新！","success"))};window.clearTemplate=()=>{t.selectedTemplate=null,c()};window.importTemplateFile=()=>{const e=document.createElement("input");e.type="file",e.accept=".md,.txt",e.onchange=async o=>{const s=o.target.files[0];if(s)try{const r=await s.text(),a=s.name.replace(/\.(md|txt)$/,""),i=prompt("请输入模板分类（例如：编程、写作、分析）：","自定义");if(!i)return;P(a,i,r),c(),n(`✅ 成功导入模板：${a}`,"success")}catch(r){n("❌ 导入失败："+r.message,"error")}},e.click()};window.deleteTemplate=e=>{confirm("确定删除这个模板？")&&(z(e),n("✅ 已删除模板","success"),c())};window.addCurrentToFavorites=()=>{if(!t.result||!t.input){n("❌ 没有可收藏的内容","error");return}const e=t.selectedTemplate?t.selectedTemplate.name:"无模板";A(t.input,t.result,t.optimizeMode,t.selectedModel,e),n("⭐ 已添加到收藏夹！","success")};window.favoriteStyle=e=>{const o=w.find(a=>a.name===e);if(!o)return;if(f("style",e)){n("⚠️ 该风格已在收藏夹中","info");return}const s={id:Date.now(),type:"style",name:o.name,nameEn:o.nameEn,desc:o.desc,keywords:o.keywords,docUrl:o.docUrl,image:o.image,timestamp:new Date().toISOString()};t.favorites.push(s),localStorage.setItem("favorites",JSON.stringify(t.favorites)),n("⭐ 风格已收藏！","success");const r=document.querySelector(".flex-1.overflow-y-auto");r&&(r.innerHTML=h())};window.favoriteTemplate=e=>{const s=u().find(i=>i.id===e||i.id===parseInt(e));if(!s)return;if(f("template",e)){n("⚠️ 该模板已在收藏夹中","info");return}const r={id:Date.now(),type:"template",templateId:s.id,name:s.name,category:s.category,icon:s.icon,systemPrompt:s.systemPrompt,timestamp:new Date().toISOString()};t.favorites.push(r),localStorage.setItem("favorites",JSON.stringify(t.favorites)),n("⭐ 模板已收藏！","success");const a=document.querySelector(".flex-1.overflow-y-auto");a&&(a.innerHTML=h())};window.useFavoriteTemplate=e=>{const o=t.favorites.find(s=>s.id===e);!o||o.type!=="template"||(t.selectedTemplate={id:o.templateId,name:o.name,category:o.category,icon:o.icon,systemPrompt:o.systemPrompt},t.currentView="optimizer",c(),n("✅ 已切换到优化器并选择该模板！","success"))};window.reuseFavorite=e=>{const o=t.favorites.find(s=>s.id===e);o&&(t.input=o.input,t.result=o.output,t.optimizeMode=o.mode,t.currentView="optimizer",c())};window.editFavoriteNote=e=>{const o=t.favorites.find(s=>s.id===e);if(o){const s=prompt("添加备注（可选）：",o.note||"");s!==null&&(j(e,s),c())}};window.deleteFavoriteItem=e=>{confirm("确定删除这条收藏？")&&(N(e),n("✅ 已删除收藏","success"),c())};window.clearFavorites=()=>{confirm("确定清空所有收藏？此操作不可恢复！")&&(C(),c())};window.exportFavoritesJSON=()=>{const e=JSON.stringify(t.favorites,null,2),o=new Blob([e],{type:"application/json"}),s=URL.createObjectURL(o),r=document.createElement("a");r.href=s,r.download=`prompt-favorites-${new Date().toISOString().split("T")[0]}.json`,r.click(),URL.revokeObjectURL(s)};function c(){if(document.getElementById("app").innerHTML=`
    <div id="app-shell" class="relative h-screen overflow-hidden ${t.backgroundImage?"":"bg-white"}">
      ${t.backgroundImage?'<div id="app-bg-overlay" class="absolute inset-0 bg-black pointer-events-none z-0"></div>':""}
      <div class="relative z-1 flex h-screen">
        ${L()}
        ${I()}
      </div>
    </div>
  `,t.backgroundImage){const e=document.getElementById("app-shell"),o=document.getElementById("app-bg-overlay");e&&(e.style.backgroundImage=`url("${t.backgroundImage}")`,e.style.backgroundSize=t.backgroundSize,e.style.backgroundPosition="center",e.style.backgroundRepeat=t.backgroundSize==="auto"?"repeat":"no-repeat"),o&&(o.style.opacity=String(t.backgroundOverlay))}D()}c();
