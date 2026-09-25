window.HB_CURRENT = "llm-agent";
window.HANDBOOKS = window.HANDBOOKS || {};
HANDBOOKS["llm-agent"] = (()=>{
/* =========================================================
   路线数据：如需增删资源，直接修改下面的数组即可
   type 取值：视频 / 教材 / 文档 / 论文 / 工具 / 数据 / 实战
   p：1=必做  2=推荐  3=选学
   ========================================================= */
const PHASES = [
{
  num:"零", id:"p0", title:"基础回顾", weeks:"第 1–2 周 · 约 30 学时",
  goal:"假设已具备深度学习与 PyTorch 基础。本阶段<b>快速回顾 Transformer 所需的数学与工程能力</b>，并搭好 LLM 实验环境，为后续阶段扫清障碍。",
  outcomes:["能独立复现一个最小 Transformer 前向传播","熟练使用 conda / git / vscode-remote","本地或云端 GPU 环境可跑通 PyTorch"],
  pitfalls:["环境不隔离：transformers、torch、CUDA 版本强耦合，每个项目必须独立 conda 环境。","无视显存直接加载大模型：先用「参数量 × 2 字节（FP16）」估算显存，再决定加载精度。"],
  resources:[
    {t:"d2l · 预备知识与注意力章",s:"zh.d2l.ai 第 2、11 章",d:"快速回顾张量、自动微分与注意力机制的核心概念，重点看注意力评分函数与多头注意力。",url:"https://zh.d2l.ai/chapter_attention-mechanisms/index.html",type:"文档",p:1},
    {t:"PyTorch 60 分钟闪电战",s:"pytorch.org 官方教程",d:"1 小时重建 PyTorch 全貌：Tensor、Autograd、nn.Module 与训练循环，不记得就回来查。",url:"https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",type:"文档",p:1},
    {t:"Andrej Karpathy · Let's build GPT",s:"YouTube · 1 小时精剪版",d:"从零用 PyTorch 手搓一个 nanoGPT，是理解 Transformer 训练的最佳热身，看完必自己敲一遍。",url:"https://www.youtube.com/watch?v=kCc8FmEb1nY",type:"视频",p:1},
    {t:"nanoGPT 源码",s:"karpathy/nanoGPT · GitHub",d:"最简洁的 GPT 训练代码库，配合 Karpathy 视频逐行阅读，胜过任何二手教程。",url:"https://github.com/karpathy/nanoGPT",type:"实战",p:1},
    {t:"Hugging Face Transformers 快速上手",s:"huggingface.co/docs",d:"学会用 pipeline 与 AutoModel 加载预训练模型，为后续微调打下工程基础。",url:"https://huggingface.co/docs/transformers/quicktour",type:"文档",p:2},
    {t:"《深度学习》花书 · RNN 与序列建模章",s:"Goodfellow 等",d:"想系统补序列建模理论时选读对应章节，不要求通读。",url:"https://www.deeplearningbook.org/",type:"教材",p:3}
  ]
},
{
  num:"壹", id:"p1", title:"Transformer 与预训练", weeks:"第 3–7 周 · 约 70 学时",
  goal:"<b>深入理解 Transformer</b>——大模型的核心基石。从注意力机制到位置编码，再到 GPT/BERT 的差异，建立对「预训练语言模型」的完整认知。",
  outcomes:["能默画 Transformer 编解码结构图","讲清自注意力、多头、位置编码的作用","用 nanoGPT 训练一个 Shakespeare 语言模型"],
  pitfalls:["跳过注意力的数学推导直接调库：不理解 Q、K、V 的来源，后续一切改进都无法下手。","混淆 BERT 与 GPT：掩码语言模型用于理解、自回归模型用于生成，两者训练目标与适用场景完全不同。","改序列长度不看位置编码：RoPE 外推有边界，超长上下文需要插值或专门的长文本模型。"],
  related:{href:"computer-vision.html#p4",label:"Transformer 的视觉应用（ViT）见《计算机视觉》阶段四"},
  resources:[
    {t:"Attention Is All You Need",s:"arXiv 1706.03762 · 被引超 13 万",d:"一切的起点。至少精读三遍：结构→数学→实现，读完要能不看资料写出 scaled dot-product attention。",url:"https://arxiv.org/abs/1706.03762",type:"论文",p:1},
    {t:"The Illustrated Transformer",s:"Jay Alammar · 图解经典",d:"全网最易懂的注意力机制图解，配合论文一起读，半小时建立直觉。",url:"https://jalammar.github.io/illustrated-transformer/",type:"文档",p:1},
    {t:"3Blue1Brown《注意力机制》",s:"B 站 / YouTube · 1 集",d:"用动画把 Query / Key / Value 讲得一目了然，看论文前或卡壳时刷一遍。",url:"https://www.youtube.com/watch?v=eMlx5fFNoYc",type:"视频",p:1},
    {t:"d2l · Transformer 章节",s:"zh.d2l.ai 第 10、11 章",d:"数学推导 + PyTorch 实现 + 机器翻译实战，三位一体深入理解 Transformer。",url:"https://zh.d2l.ai/chapter_transformer/index.html",type:"文档",p:1},
    {t:"nanoGPT 训练 Shakespeare",s:"karpathy/nanoGPT",d:"在 CPU 或单卡 GPU 上用莎士比亚文本训练一个字符级语言模型，理解「预训练」到底在做什么。",url:"https://github.com/karpathy/nanoGPT",type:"实战",p:1},
    {t:"BERT 论文",s:"arXiv 1810.04805",d:"理解与 GPT 相对的另一条预训练路线（掩码语言模型），对后来的指令微调有重要启发。",url:"https://arxiv.org/abs/1810.04805",type:"论文",p:2},
    {t:"《Natural Language Processing with Transformers》",s:"O'Reilly · Hugging Face 团队著",d:"系统掌握 Transformers 库的实战书，需要深入工程细节时翻阅。",url:"https://www.oreilly.com/library/view/natural-language-processing/9781098136789/",type:"教材",p:2},
    {t:"Karpathy makemore 系列",s:"YouTube / GitHub",d:"从 N-gram 到 MLP 到 Transformer 的字符级语言模型之旅，想补基础时选看。",url:"https://github.com/karpathy/makemore",type:"视频",p:3}
  ]
},
{
  num:"贰", id:"p2", title:"大语言模型训练与微调", weeks:"第 8–13 周 · 约 90 学时",
  goal:"理解 LLM 的完整生命周期：<b>预训练 → 监督微调（SFT）→ 对齐（RLHF / DPO）</b>，并用 LoRA 亲手微调一个开源小模型。",
  outcomes:["讲清 LLM 训练的三个阶段与各自目的","用 LoRA 在开源模型上完成一次 SFT","理解常见评测指标与数据集"],
  pitfalls:["小数据全参数微调：极易过拟合且有灾难性遗忘风险，优先使用 LoRA/QLoRA。","沿用预训练量级的学习率：SFT 学习率通常比预训练小一个数量级，过大会洗掉预训练能力。","指令数据不清洗：微调阶段「垃圾进垃圾出」会被放大，数据质量比数量重要得多。"],
  related:{href:"reinforcement-learning.html#p3",label:"RLHF 的算法基础（PPO）见《强化学习》阶段三"},
  resources:[
    {t:"LoRA: Low-Rank Adaptation",s:"arXiv 2106.09685",d:"参数高效微调的基石。核心思想简单但威力巨大：只训练低秩矩阵，显存需求降一个数量级。",url:"https://arxiv.org/abs/2106.09685",type:"论文",p:1},
    {t:"Hugging Face PEFT 库",s:"huggingface.co/docs/peft",d:"LoRA / QLoRA / Prefix Tuning 的官方实现，本阶段微调实战的主力工具。",url:"https://huggingface.co/docs/peft/",type:"工具",p:1},
    {t:"Hugging Face · NLP 课程",s:"huggingface.co/learn/nlp-course",d:"免费且系统：从 Tokenizer 到 Transformer 微调，配合 notebook 实操，是入门 LLM 工程的最佳主线。",url:"https://huggingface.co/learn/nlp-course",type:"文档",p:1},
    {t:"LLM 训练流程综述（预训练/SFT/RLHF）",s:"Hugging Face Blog · LLM Course 第 9 章",d:"用一张图理清预训练、SFT、奖励模型、PPO/DPO 的完整流水线与数据需求。",url:"https://huggingface.co/blog/rlhf",type:"文档",p:1},
    {t:"微调实战：QLoRA 微调 Llama",s:"timdettmers/qlora-nft · GitHub",d:"在消费级 GPU（甚至 Colab）上用 4-bit 量化微调 Llama，体验完整 SFT 流程。",url:"https://github.com/artidoro/qlora",type:"实战",p:1},
    {t:"DPO 论文",s:"arXiv 2305.18290",d:"无需奖励模型的直接偏好优化，2024 年后几乎取代 PPO 成为对齐新标配，必读。",url:"https://arxiv.org/abs/2305.18290",type:"论文",p:2},
    {t:"lm-evaluation-harness",s:"EleutherAI · GitHub",d:"LLM 评测事实标准：在 MMLU、GSM8K、HumanEval 等基准上得到可复现分数。",url:"https://github.com/EleutherAI/lm-evaluation-harness",type:"工具",p:2},
    {t:"Flash Attention 论文与库",s:"arXiv 2205.14135",d:"把注意力计算从显存瓶颈中解放出来，训练/推理提速 2-4 倍，工程必装。",url:"https://github.com/Dao-AILab/flash-attention",type:"工具",p:2},
    {t:"InstructGPT / ChatGPT 论文",s:"arXiv 2203.02155",d:"RLHF 对齐的开山之作，理解指令微调与人类偏好对齐的完整方法论。",url:"https://arxiv.org/abs/2203.02155",type:"论文",p:2},
    {t:"Megatron-LM 与 DeepSpeed",s:"NVIDIA / Microsoft",d:"大规模分布式训练框架，只有需要自训练百亿模型时才深入。",url:"https://github.com/NVIDIA/Megatron-LM",type:"工具",p:3}
  ]
},
{
  num:"叁", id:"p3", title:"Prompt 工程与 RAG", weeks:"第 14–18 周 · 约 80 学时",
  goal:"掌握让 LLM「干活」的两大武器：<b>Prompt 工程</b>让模型听懂需求，<b>RAG</b>让模型用上私有知识。完成一个可落地的知识库问答应用。",
  outcomes:["能写出结构化、可复现的 Prompt","理解 RAG 全流程：切片→嵌入→检索→生成","构建一个带引用的文档问答系统"],
  pitfalls:["RAG 效果差就换框架：九成问题出在切片策略与 Embedding 质量，与框架无关。","top-k 凭感觉设值：应建立小规模召回评测集，用命中率指标确定检索参数。","Prompt 迭代无测试集：没有固定评估集，每次修改都无法判断是改进还是退步。"],
  resources:[
    {t:"OpenAI Prompt Engineering Guide",s:"platform.openai.com/docs/guides",d:"最系统的 Prompt 工程指南：分角色、少样本、思维链、结构化输出，边看边在 Playground 试。",url:"https://platform.openai.com/docs/guides/prompt-engineering",type:"文档",p:1},
    {t:"Anthropic Prompt Engineering 指南",s:"docs.anthropic.com",d:"从另一个角度看 Prompt 设计，尤其擅长长上下文与 Claude 特定技巧，与 OpenAI 指南对照学习。",url:"https://docs.anthropic.com/claude/docs/introduction-to-prompt-design",type:"文档",p:1},
    {t:"LangChain 官方教程",s:"python.langchain.com",d:"LLM 应用开发的事实标准框架，从 Chains 到 LCEL 走一遍官方教程。",url:"https://python.langchain.com/docs/get_started/introduction",type:"文档",p:1},
    {t:"LlamaIndex 官方教程",s:"docs.llamaindex.ai",d:"专为 RAG 设计的框架，数据连接器、索引、查询引擎一应俱全，与 LangChain 二选一主线即可。",url:"https://docs.llamaindex.ai/",type:"文档",p:1},
    {t:"RAG 实战：构建本地知识库",s:"LangChain/LlamaIndex Tutorials",d:"拿自己的论文或课程 PDF，完成「上传 → 提问 → 返回带出处答案」的完整 RAG 应用。",url:"https://python.langchain.com/docs/use_cases/question_answering/",type:"实战",p:1},
    {t:"RAG 综述论文",s:"arXiv 2312.10997 或 2005.11401",d:"系统理解检索增强生成的动机、架构与评测，做 RAG 研究时的起点。",url:"https://arxiv.org/abs/2005.11401",type:"论文",p:2},
    {t:"向量数据库：FAISS / Chroma / Milvus",s:"facebookresearch/faiss",d:"RAG 的检索核心：FAISS 适合本地原型，Chroma/Milvus 适合生产，先跑通 FAISS 即可。",url:"https://github.com/facebookresearch/faiss",type:"工具",p:2},
    {t:"Embedding 模型选型",s:"MTEB 榜单 · mteb-leaderboard",d:"了解 sentence-transformers、bge、text-embedding-3 等主流嵌入模型与评测基准。",url:"https://huggingface.co/spaces/mteb/leaderboard",type:"工具",p:2},
    {t:"DSPy 框架",s:"stanfordnlp/dspy",d:"用声明式方式编程 LLM 应用，自动优化 Prompt，适合做研究而非纯应用。",url:"https://github.com/stanfordnlp/dspy",type:"工具",p:3}
  ]
},
{
  num:"肆", id:"p4", title:"智能体 Agent", weeks:"第 19–24 周 · 约 90 学时",
  goal:"从「问答」走向「行动」：让 LLM 能<b>规划、调用工具、自我反思、多智能体协作</b>。完成一个能自主完成复杂任务的 Agent 系统。",
  outcomes:["讲清 ReAct 思考-行动循环","实现一个能调用外部工具（搜索/代码）的 Agent","理解多智能体协作与任务分解"],
  pitfalls:["一上来就堆多智能体：先把单 Agent 加工具调用的链路跑稳，多智能体的调试复杂度是指数级上升。","不限制工具调用次数与超时：Agent 陷入死循环会持续消耗 API 额度。","把演示效果当可靠性：必须用 SWE-bench、GAIA 等基准量化成功率，个案成功不代表能力。"],
  resources:[
    {t:"ReAct: Synergizing Reasoning and Acting",s:"arXiv 2210.03629",d:"Agent 范式的奠基论文：「思考 → 行动 → 观察」循环，几乎所有现代 Agent 都建立在它之上。",url:"https://arxiv.org/abs/2210.03629",type:"论文",p:1},
    {t:"OpenAI Function Calling 文档",s:"platform.openai.com/docs/guides",d:"LLM 调用外部工具的标准协议，学会定义 schema、解析工具调用、把结果喂回模型。",url:"https://platform.openai.com/docs/guides/function-calling",type:"文档",p:1},
    {t:"LangGraph 官方教程",s:"langchain-ai.github.io/langgraph",d:"基于状态机的 Agent 编排框架，比 LangChain Chains 更适合构建有记忆、有循环的复杂 Agent。",url:"https://langchain-ai.github.io/langgraph/",type:"文档",p:1},
    {t:"AutoGen 框架",s:"microsoft/autogen · GitHub",d:"微软多智能体对话框架，最适合快速搭建「助手 + 工具调用者 + 审查者」等多角色协作系统。",url:"https://github.com/microsoft/autogen",type:"工具",p:1},
    {t:"Toolformer 论文",s:"arXiv 2302.04761",d:"让模型自己学会决定何时调用什么工具，是 Function Calling 之外的另一条思路。",url:"https://arxiv.org/abs/2302.04761",type:"论文",p:1},
    {t:"Agent 实战：自主数据分析",s:"基于 LangGraph/AutoGen",d:"用一个能调用 Python 解释器、搜索、读文件的 Agent，让它自主完成一份数据清洗 + 可视化任务。",url:"https://langchain-ai.github.io/langgraph/tutorials/",type:"实战",p:1},
    {t:"Reflexion 论文",s:"arXiv 2303.11366",d:"让 Agent 通过自我反思与经验记忆提升表现，是 Agent 自我改进方向的代表作。",url:"https://arxiv.org/abs/2303.11366",type:"论文",p:2},
    {t:"CrewAI 框架",s:"crewai.com",d:"角色驱动的多智能体框架，定义「研究员/作家/审稿人」等角色让它们协作，上手极快。",url:"https://www.crewai.com/",type:"工具",p:2},
    {t:"Voyager（Minecraft 终身学习 Agent）",s:"voyager.minedojo.org",d:"看一个真实的开放式 Agent 如何用技能库 + 迭代提示持续学习，启发研究方向。",url:"https://voyager.minedojo.org/",type:"论文",p:2},
    {t:"Agent 评测基准：SWE-bench / WebArena",s:"princeton-nlp/SWE-bench",d:"Agent 的真实任务评测标准：SWE-bench 考修 Bug、WebArena 考网页操作，做 Agent 研究必看。",url:"https://www.swebench.com/",type:"工具",p:2},
    {t:"Generative Agents（小镇论文）",s:"arXiv 2304.03442",d:"25 个 LLM 智能体在虚拟小镇生活，展示记忆、规划与社交涌现，有趣且有启发。",url:"https://arxiv.org/abs/2304.03442",type:"论文",p:2},
    {t:"Semantic Kernel",s:"microsoft/semantic-kernel",d:"微软企业级 Agent 编排框架，生产环境部署时可考虑。注意：Semantic Kernel 已并入 Microsoft Agent Framework（microsoft/agent-framework），新项目优先使用后者。",url:"https://github.com/microsoft/semantic-kernel",type:"工具",p:3}
  ]
},
{
  num:"伍", id:"p5", title:"推理部署与研究入门", weeks:"第 25 周起 · 贯穿研究生阶段",
  goal:"让模型<b>跑得快、用得起</b>，并从「使用者」成长为「研究者」：掌握推理优化、量化、部署，复现一篇论文并找到课题切入点。",
  outcomes:["用 vLLM 部署一个开源 LLM 服务","理解主流量化方法并完成一次量化对比","复现 1 篇 LLM/Agent 论文并组会汇报"],
  pitfalls:["只看单请求延迟：vLLM 的核心价值在连续批处理下的吞吐量，评测必须带并发。","量化后不评估精度：4-bit 量化在数学推理等任务上掉点明显，上线前必须跑评测集。","追新框架代替读论文：框架封装会掩盖机制，论文原文才是第一手信息。"],
  resources:[
    {t:"vLLM 官方文档",s:"docs.vllm.ai",d:"高吞吐量 LLM 推理引擎，PagedAttention 是核心创新，部署开源模型的首选。",url:"https://docs.vllm.ai/",type:"工具",p:1},
    {t:"模型量化：GPTQ / AWQ / INT8",s:"auto-gptq · llm-awq",d:"把 16-bit 模型压到 4-bit，几乎无损地降低显存。理解权重量化与 KV 缓存量化的差异。注意：AutoGPTQ 已停止维护，新项目建议改用 GPTQModel（ModelCloud/GPTQModel）。",url:"https://github.com/AutoGPTQ/AutoGPTQ",type:"工具",p:1},
    {t:"SGLang 推理框架",s:"sgl-project/sglang",d:"新一代推理引擎，对 Agent 场景的多轮函数调用特别优化，与 vLLM 对照学习。",url:"https://github.com/sgl-project/sglang",type:"工具",p:1},
    {t:"《How to Read a Paper》三遍读法",s:"S. Keshav · 经典方法论",d:"第一遍筛掉、第二遍抓内容、第三遍复现思路，读 LLM 论文从这篇开始。",url:"https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf",type:"文档",p:1},
    {t:"Papers with Code",s:"paperswithcode.com",d:"论文 + 官方代码 + 榜单三对照，判断 SOTA 与查找复现的第一入口。",url:"https://paperswithcode.com/",type:"工具",p:1},
    {t:"推理加速：Lookahead Decoding 与投机解码",s:"LMSYS 博客",d:"理解 KV 缓存、连续批处理、投机解码等推理加速技术，做部署优化时的基础。",url:"https://lmsys.org/blog/2023-11-21-lookahead-decoding/",type:"文档",p:2},
    {t:"TensorRT-LLM",s:"NVIDIA · GitHub",d:"NVIDIA 官方推理加速库，生产环境极致性能时使用，门槛较高。",url:"https://github.com/NVIDIA/TensorRT-LLM",type:"工具",p:2},
    {t:"LLM 安全与对齐研究",s:"Alignment Handbook",d:"了解越狱、数据投毒、价值对齐等安全问题，是 LLM 研究的重要子方向。",url:"https://github.com/huggingface/alignment-handbook",type:"工具",p:2},
    {t:"arXiv cs.CL / cs.AI 最新论文",s:"arxiv.org/list/cs.CL/recent",d:"每周抽 30 分钟扫标题摘要，跟踪 Agent、RAG、长上下文等前沿进展。",url:"https://arxiv.org/list/cs.CL/recent",type:"文档",p:2},
    {t:"OpenCompass 评测平台",s:"open-compass/opencompass",d:"国内最活跃的大模型评测平台，覆盖中英文各类基准，做模型对比时使用。",url:"https://github.com/open-compass/OpenCompass",type:"工具",p:3}
  ]
}
];

const MILESTONES = [
  {t:"训练 nanoGPT",when:"第 2 周",d:"跟着 Karpathy 视频，用莎士比亚文本从零训练一个字符级语言模型，能生成像样的句子。",deliver:"产出：可运行的训练脚本 + 生成样本"},
  {t:"手写 Transformer",when:"第 6 周",d:"不依赖 Hugging Face，用 PyTorch 实现一个最小 Transformer（多头注意力 + 前馈 + 残差），并在机器翻译小任务上跑通。",deliver:"产出：完整可运行的 Transformer 代码"},
  {t:"LoRA 微调开源模型",when:"第 11 周",d:"用 QLoRA 在 Llama-2-7B 或类似开源模型上做一次领域 SFT（如指令跟随或摘要），对比微调前后效果。",deliver:"产出：微调代码 + 评测对比报告"},
  {t:"构建 RAG 知识库",when:"第 16 周",d:"用 LangChain/LlamaIndex 搭一个面向自己论文/课程 PDF 的问答系统，答案必须带原文出处。",deliver:"产出：带检索溯源的 RAG 应用"},
  {t:"可调用工具的 Agent",when:"第 21 周",d:"实现一个能调用搜索、代码执行、文件读取等工具的 Agent，自主完成一个数据分析任务并给出结论。",deliver:"产出：Agent 系统 + 任务演示视频"},
  {t:"vLLM 部署与量化",when:"第 24 周",d:"用 vLLM 部署一个开源 LLM 为 API 服务，并对比 FP16 / GPTQ 4-bit 的吞吐、显存与质量差异。",deliver:"产出：部署脚本 + 性能对比表"},
  {t:"复现一篇 LLM 论文",when:"第 27 周",d:"自选一篇 LLM/Agent 论文（如 DPO、ReAct 改进），复现核心实验结果，记录无法复现之处与原因。",deliver:"产出：复现仓库 + 实验记录"},
  {t:"组会汇报与课题方向",when:"第 28 周以后",d:"精读 5 篇方向论文，做 15 分钟组会汇报，结合组内需求提出至少一个可行的研究切入点。",deliver:"产出：组会 slides + 开题思路"}
];

const FAQS = [
  {q:"我没有深度学习基础，能直接学大模型吗？",a:"<strong>不建议跳级。</strong>大模型建立在 Transformer 之上，而 Transformer 需要深度学习基础。请先完成《深度学习》手册的前三个阶段，再开始本路线——地基不牢，越往上越吃力。"},
  {q:"需要多大显存才能跑 LLM 实验？",a:"入门阶段 8–16GB 消费级显卡配合 4-bit 量化（QLoRA）即可微调 7B 模型；预训练和全参微调需要 A100/H100。<strong>没有本地显卡时用 Colab、Kaggle 或实验室服务器</strong>，vLLM 部署阶段再申请大显存。"},
  {q:"微调一定比 Prompt Engineering 好吗？",a:"不一定。<strong>80% 的场景用精心设计的 Prompt + RAG 就够了</strong>，只有需要领域风格、专有格式或大幅改变行为时才微调。先把 Prompt 和 RAG 用透，再考虑微调。"},
  {q:"Agent 框架这么多（LangChain/AutoGen/CrewAI…），该学哪个？",a:"先选 <strong>LangGraph</strong> 作为主线（最灵活、研究友好），理解状态机 + 工具调用的本质后，AutoGen/CrewAI 只是 API 不同。框架迭代很快，核心是「规划—行动—观察」循环，不是具体某个库。"},
  {q:"大模型领域更新太快，怎么追？",a:"<strong>不要追热点，打地基。</strong>Transformer、SFT、RLHF/DPO、RAG、ReAct 这些核心概念 3 年内不会变。每周固定 30 分钟扫 arXiv cs.CL 标题，跟 1–2 个高质量技术博客（如 Lilian Weng、LMSYS）即可。"},
  {q:"闭源 API（GPT/Claude）和开源模型该怎么选？",a:"<strong>做应用用闭源 API，做研究用开源模型。</strong>闭源 API 省去部署、效果上限高；开源模型可复现、可微调、可部署，是科研的必需品。两者都要熟悉。"},
  {q:"RAG 效果不好怎么办？",a:"按顺序排查：① 切片策略（大小与重叠）② Embedding 模型质量 ③ 检索 top-k 与重排序 ④ 生成时的 Prompt。<strong>90% 的 RAG 问题出在前两步</strong>，不要急着换框架。"},
  {q:"怎么评估我的 LLM 应用好不好？",a:"不要只靠主观感觉。建立一个<strong>固定的测试集</strong>（几十个真实问题 + 标准答案），用准确率/相关性/引用正确率等指标量化评估，每次改动都跑一遍。研究层面用 MMLU、GSM8K 等公开基准。"},
  {q:"可以直接用大模型写论文代码吗？",a:"可以用它解释论文、生成样板代码、调试报错，但<strong>核心算法必须独立理解并能复现</strong>。科研中「跑得通」和「理解原理」是两回事，后者才是做出创新的基础。"}
];

const STORE_KEY = "llm-roadmap-v1";
return {PHASES, MILESTONES, FAQS, STORE_KEY};
})();
