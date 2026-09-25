window.HB_CURRENT = "reinforcement-learning";
window.HANDBOOKS = window.HANDBOOKS || {};
HANDBOOKS["reinforcement-learning"] = (()=>{
/* =========================================================
   路线数据：如需增删资源，直接修改下面的数组即可
   type 取值：视频 / 教材 / 文档 / 论文 / 工具 / 数据 / 实战
   p：1=必做  2=推荐  3=选学
   ========================================================= */
const PHASES = [
{
  num:"零", id:"p0", title:"基础回顾", weeks:"第 1–2 周 · 约 30 学时",
  goal:"假设已具备深度学习与 PyTorch 基础。本阶段<b>快速回顾概率论、期望与随机过程</b>，并熟悉 Gymnasium 环境接口，为 RL 实验做准备。",
  outcomes:["理解期望、条件概率、马尔可夫过程","能用 Gymnasium 加载并交互一个环境","本地或云端环境可跑通 PyTorch + Gym"],
  pitfalls:["概率期望不熟就硬推 Bellman 方程：先补期望、条件概率与马尔可夫性，否则公式全部悬空。","轻视 Gymnasium 接口语义：terminated 与 truncated 的区别、reset 的返回值结构，必须读官方文档确认。"],
  resources:[
    {t:"概率论与随机过程复习",s:"3Blue1Brown 概率系列 / 教材",d:"重点回顾期望、方差、条件概率、马尔可夫链——RL 的数学语言就是概率与期望。",url:"https://search.bilibili.com/all?keyword=3Blue1Brown%20%E6%A6%82%E7%8E%87",type:"视频",p:1},
    {t:"PyTorch 60 分钟闪电战",s:"pytorch.org 官方教程",d:"1 小时重建 PyTorch 全貌：Tensor、Autograd、nn.Module 与训练循环。",url:"https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",type:"文档",p:1},
    {t:"Gymnasium 官方文档",s:"gymnasium.farama.org",d:"OpenAI Gym 的继任者，RL 环境的事实标准接口。学会 reset/step/render 与环境包装。",url:"https://gymnasium.farama.org/",type:"文档",p:1},
    {t:"Gymnasium 入门教程",s:"gymnasium.farama.org/tutorials",d:"跑通 CartPole 等经典环境，理解 observation、action、reward、done 的含义。",url:"https://gymnasium.farama.org/tutorials/gymnasium_basics/environment_creation/",type:"实战",p:1},
    {t:"NumPy 与 Matplotlib 速查",s:"numpy.org / matplotlib.org",d:"数据处理与可视化的标配，当字典翻即可。",url:"https://numpy.org/doc/stable/user/quickstart.html",type:"工具",p:2},
    {t:"贝叶斯思维入门",s:"3Blue1Brown 贝叶斯系列",d:"想深入理解不确定性推理时选看，对 RL 中的探索与置信度有帮助。",url:"https://search.bilibili.com/all?keyword=3Blue1Brown%20%E8%B4%9D%E5%8F%B6%E6%96%AF",type:"视频",p:3}
  ]
},
{
  num:"壹", id:"p1", title:"强化学习基础", weeks:"第 3–7 周 · 约 70 学时",
  goal:"建立 RL 的核心框架：<b>智能体—环境交互、MDP、Bellman 方程、值函数与策略</b>。理解「通过试错学习最大化累积奖励」的本质。",
  outcomes:["讲清 MDP 五元组与 Bellman 方程","实现动态规划策略迭代与价值迭代","理解多臂老虎机的探索-利用权衡"],
  pitfalls:["混淆同策略与异策略：SARSA 是同策略、Q-learning 是异策略，混用会导致收敛行为完全不同。","折扣因子随手设 0.99：γ 决定回报视野，短视任务设大 γ 会让值函数难以收敛。","只看回报曲线：曲线上升不代表策略合理，应实际渲染智能体行为观察。"],
  resources:[
    {t:"Sutton & Barto《强化学习》第 2 版",s:"Richard Sutton · 免费在线",d:"RL 领域的经典教材。精读第 1–4 章（多臂老虎机、MDP、动态规划），其余章节按需查阅。",url:"http://incompleteideas.net/book/the-book-2nd.html",type:"教材",p:1},
    {t:"David Silver 强化学习课程",s:"DeepMind / UCL · B 站中字",d:"Sutton 的学生讲的经典课，10 讲把 RL 理论讲透，配合教材效果最佳。",url:"https://search.bilibili.com/all?keyword=David%20Silver%20%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0",type:"视频",p:1},
    {t:"多臂老虎机（Sutton 书第 2 章）",s:"incompleteideas.net",d:"理解 ε-greedy、UCB、Thompson Sampling 等探索策略，是理解探索-利用的最简模型。",url:"http://incompleteideas.net/book/RLbook2020.pdf",type:"文档",p:1},
    {t:"MDP 与 Bellman 方程",s:"Sutton 书第 3 章",d:"RL 的数学基石：状态、动作、转移、奖励、折扣因子，以及 V(s) 与 Q(s,a) 的 Bellman 方程。",url:"http://incompleteideas.net/book/RLbook2020.pdf",type:"文档",p:1},
    {t:"动态规划：策略迭代与价值迭代",s:"Sutton 书第 4 章 + 实现",d:"在已知模型的 GridWorld 上实现策略评估、策略改进、价值迭代，亲手跑一遍最直观。",url:"https://github.com/ShangtongZhang/reinforcement-learning-an-introduction",type:"实战",p:1},
    {t:"Lilian Weng 博客 · RL 综述",s:"lilianweng.github.io",d:"高质量中文友好的 RL 综述，配合教材阅读。",url:"https://lilianweng.github.io/posts/2018-02-19-rl-overview/",type:"文档",p:2},
    {t:"李宏毅《深度强化学习》",s:"台湾大学 · B 站",d:"中文讲解更细、案例更多，David Silver 课听不懂的地方换这里试试。",url:"https://search.bilibili.com/all?keyword=%E6%9D%8E%E5%AE%8F%E6%AF%85%20%E5%BC%BA%E5%8C%96%E5%AD%A6%E4%B9%A0",type:"视频",p:2}
  ]
},
{
  num:"贰", id:"p2", title:"值函数方法与 DQN", weeks:"第 8–13 周 · 约 90 学时",
  goal:"从表格法走向深度 RL：<b>Q-learning、SARSA、DQN</b>，理解用神经网络近似值函数的关键技巧（经验回放、目标网络）。",
  outcomes:["讲清 Q-learning 与 SARSA 的差异","实现 DQN 在 Atari 或 CartPole 上训练","理解经验回放与目标网络为什么重要"],
  pitfalls:["为「简化」去掉经验回放或目标网络：两者是 DQN 稳定性的支柱，去掉任何一个都会发散。","单次实验就下结论：深度 RL 方差极大，至少 3–5 个随机种子取均值并报告波动范围。","探索率衰减过快：ε 过早降到下限会导致智能体困在次优策略。"],
  resources:[
    {t:"Q-learning 与 SARSA",s:"Sutton 书第 6 章",d:"时序差分学习的核心：Q-learning（off-policy）与 SARSA（on-policy），理解两者的收敛行为差异。",url:"http://incompleteideas.net/book/RLbook2020.pdf",type:"文档",p:1},
    {t:"DQN 论文（Nature 2015）",s:"arXiv 1312.5602 / Nature",d:"深度 RL 的里程碑。核心是经验回放 + 目标网络，让神经网络在 RL 中稳定训练的起点。",url:"https://arxiv.org/abs/1312.5602",type:"论文",p:1},
    {t:"DQN 实战：CartPole / Atari",s:"基于 PyTorch 或 cleanrl",d:"用 DQN 解决 CartPole（简单）或 Atari Pong（进阶），理解 epsilon 衰减与目标网络更新。",url:"https://github.com/vwxyzjn/cleanrl",type:"实战",p:1},
    {t:"Double DQN / Dueling DQN",s:"arXiv 1509.06461 / 1511.06581",d:"DQN 的两个重要改进：解耦 Q 值估计、分离状态价值与优势函数，实现简单且效果显著。",url:"https://arxiv.org/abs/1509.06461",type:"论文",p:1},
    {t:"cleanrl 参考实现",s:"vwxyzjn/cleanrl",d:"单文件、可读性极强的 RL 算法实现库，DQN 到 PPO 都有，是最好的学习参考。",url:"https://github.com/vwxyzjn/cleanrl",type:"工具",p:1},
    {t:"PER：优先级经验回放",s:"arXiv 1511.05952",d:"在经验回放基础上按 TD 误差优先级采样，显著提升样本效率，是 DQN 类算法的标配改进。",url:"https://arxiv.org/abs/1511.05952",type:"论文",p:2},
    {t:"Rainbow DQN",s:"arXiv 1710.02298",d:"DQN 六大改进的集成，理解各种技巧如何组合。",url:"https://arxiv.org/abs/1710.02298",type:"论文",p:2},
    {t:"Stable-Baselines3",s:"stable-baselines3.readthedocs.io",d:"RL 算法的高质量实现库，快速验证 baseline 时使用，但入门阶段建议先自己实现。",url:"https://stable-baselines3.readthedocs.io/",type:"工具",p:2}
  ]
},
{
  num:"叁", id:"p3", title:"策略梯度方法", weeks:"第 14–18 周 · 约 80 学时",
  goal:"从值函数转向直接优化策略：<b>REINFORCE、Actor-Critic、A2C、PPO</b>。PPO 是当前最常用的 RL 算法，必须深入掌握。",
  outcomes:["讲清策略梯度定理与优势函数","实现 REINFORCE 与 Actor-Critic","用 PPO 在连续控制任务上训练"],
  pitfalls:["REINFORCE 不加基线就断言算法无效：高方差是原始形式固有的缺陷，不是实现错误。","照搬 PPO 超参不理解含义：裁剪系数 0.2、GAE 的 λ=0.95 都有明确动机，改任务时必须重新审视。","把回报上涨当作策略变好：警惕智能体钻奖励函数的空子（reward hacking）。"],
  related:{href:"llm-agent.html#p2",label:"PPO 在大模型对齐（RLHF）中的应用见《大模型与智能体》阶段二"},
  resources:[
    {t:"策略梯度定理（Sutton 书第 13 章）",s:"incompleteideas.net",d:"直接对策略参数求梯度的理论基础，理解 REINFORCE 与 baseline 的作用。",url:"http://incompleteideas.net/book/RLbook2020.pdf",type:"文档",p:1},
    {t:"REINFORCE 与 Actor-Critic 实现",s:"基于 PyTorch",d:"在 CartPole 上实现 REINFORCE，再加入 Critic 构成 Actor-Critic，理解方差降低。",url:"https://github.com/vwxyzjn/cleanrl",type:"实战",p:1},
    {t:"PPO 论文",s:"arXiv 1707.06347",d:"当前最流行的 RL 算法。核心是裁剪目标函数，限制策略更新幅度，简单且稳定。",url:"https://arxiv.org/abs/1707.06347",type:"论文",p:1},
    {t:"PPO 实战：MuJoCo / LunarLander",s:"基于 cleanrl 或 sb3",d:"用 PPO 训练连续控制任务（如 LunarLanderContinuous、Hopper），观察学习曲线。",url:"https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/ppo_continuous_action.py",type:"实战",p:1},
    {t:"优势函数 GAE",s:"arXiv 1506.02438",d:"广义优势估计，平衡偏差与方差，是 PPO/A2C 的标准组件。",url:"https://arxiv.org/abs/1506.02438",type:"论文",p:1},
    {t:"A3C 论文",s:"arXiv 1602.01783",d:"异步优势 Actor-Critic，理解多线程并行采样与梯度累积。",url:"https://arxiv.org/abs/1602.01783",type:"论文",p:2},
    {t:"TRPO 论文",s:"arXiv 1502.05477",d:"PPO 的前身，用信赖域约束策略更新，理解 PPO 裁剪动机的源头。",url:"https://arxiv.org/abs/1502.05477",type:"论文",p:2},
    {t:"Entropy Regularization",s:"各类技术博客",d:"在策略损失中加入熵项鼓励探索，几乎所有 PG 算法都用。",url:"https://arxiv.org/abs/1706.03877",type:"论文",p:2}
  ]
},
{
  num:"肆", id:"p4", title:"现代深度强化学习", weeks:"第 19–24 周 · 约 90 学时",
  goal:"掌握连续控制与现代 RL 的核心算法：<b>DDPG、TD3、SAC</b>，以及离线 RL、探索与分布式 RL 等前沿方向。",
  outcomes:["讲清 DDPG/TD3/SAC 的差异","用 SAC 在 MuJoCo 任务上达到高性能","理解离线 RL 的分布偏移问题"],
  pitfalls:["SAC 温度系数失效不排查：自动调温依赖目标熵设置，目标熵错了整个训练会崩。","连续控制不裁剪动作范围：超出物理限制的动作会让仿真环境数值爆炸。","把在线算法直接套用到离线数据：忽视分布偏移是离线 RL 最常见的失败原因。"],
  resources:[
    {t:"DDPG 论文",s:"arXiv 1509.02971",d:"将 DQN 扩展到连续动作空间：确定性策略 + 软目标更新，是连续控制的基石。",url:"https://arxiv.org/abs/1509.02971",type:"论文",p:1},
    {t:"SAC 论文",s:"arXiv 1801.01290 / 1812.05905",d:"软 Actor-Critic：最大熵 RL 的代表，样本效率高、稳定，是当前连续控制的首选算法之一。",url:"https://arxiv.org/abs/1812.05905",type:"论文",p:1},
    {t:"SAC 实战：MuJoCo 连续控制",s:"基于 cleanrl 或 sb3",d:"用 SAC 训练 HalfCheetah、Hopper 等 MuJoCo 任务，对比与 PPO 的样本效率差异。",url:"https://github.com/vwxyzjn/cleanrl/blob/master/cleanrl/sac_continuous_action.py",type:"实战",p:1},
    {t:"TD3 论文",s:"arXiv 1802.09477",d:"DDPG 的改进：双 Q 网络、延迟策略更新、目标策略平滑，解决 Q 值过估计。",url:"https://arxiv.org/abs/1802.09477",type:"论文",p:1},
    {t:"离线 RL 综述与 CQL",s:"arXiv 2005.01643 等",d:"从固定数据集中学习策略而不与环境交互，理解分布偏移与保守 Q 学习。",url:"https://arxiv.org/abs/2005.01643",type:"论文",p:1},
    {t:"MuJoCo 物理仿真环境",s:"mujoco.org / Gymnasium",d:"连续控制的标准基准，理解观测、动作、奖励的设计。",url:"https://mujoco.org/",type:"工具",p:1},
    {t:"探索方法：NoisyNet / RND / ICM",s:"arXiv 1810.12894 等",d:"稀疏奖励下的探索方法，理解内在奖励与好奇心驱动（RND 为代表）。",url:"https://arxiv.org/abs/1810.12894",type:"论文",p:2},
    {t:"分布式 RL（C51 / QR-DQN）",s:"arXiv 1707.06887",d:"学习价值分布而非期望，理解随机性对策略的影响。",url:"https://arxiv.org/abs/1707.06887",type:"论文",p:2},
    {t:"D4RL：离线 RL 基准数据集",s:"arXiv 2004.07219",d:"离线强化学习的标准评测基准，涵盖 MuJoCo、AntMaze 等任务，做离线 RL 研究的必用数据集。",url:"https://arxiv.org/abs/2004.07219",type:"数据",p:2},
    {t:"PettingZoo 多智能体环境",s:"pettingzoo.farama.org",d:"Gymnasium 的多智能体版本，进入多智能体 RL 时使用。",url:"https://pettingzoo.farama.org/",type:"工具",p:2},
    {t:"DreamerV3 世界模型",s:"arXiv 2301.04104",d:"学习环境模型并用 imagination 规划，代表基于模型的 RL 前沿。",url:"https://arxiv.org/abs/2301.04104",type:"论文",p:2}
  ]
},
{
  num:"伍", id:"p5", title:"应用与研究入门", weeks:"第 25 周起 · 贯穿研究生阶段",
  goal:"把 RL 用到真实问题：<b>多智能体、RLHF、机器人、游戏 AI</b>，并从「使用者」成长为「研究者」，复现论文并找课题。",
  outcomes:["讲清 RLHF 中奖励模型与 PPO 的角色","在一个多智能体环境中训练协作/对抗策略","复现 1 篇 RL 论文并组会汇报"],
  pitfalls:["奖励塑形堆砌稠密项：每加一项都要问「这是否允许智能体不完成任务也拿分」。","Sim-to-Real 不做域随机化：仿真参数与现实必然有差距，直接在实体上部署几乎必败。","多智能体训练中假设对手静止：其他智能体同时在学习，平稳性假设不再成立，需用对手建模或种群训练。"],
  resources:[
    {t:"RLHF: InstructGPT 论文",s:"arXiv 2203.02155",d:"把 RL 用到对齐大模型：奖励模型 + PPO 微调，是当前 LLM 对齐的核心范式，也是 RL 最热门的应用。",url:"https://arxiv.org/abs/2203.02155",type:"论文",p:1},
    {t:"多智能体强化学习基础",s:"arXiv 2111.00583 综述",d:"理解协作/对抗/混合博弈中的策略学习，以及中心化训练分布式执行（CTDE）范式。",url:"https://arxiv.org/abs/2111.00583",type:"论文",p:1},
    {t:"多智能体实战：MPE / SMAC",s:"基于 PettingZoo / pymarl",d:"在 MPE（简单协作）或 SMAC（星际争霸）上训练多智能体策略，观察协作涌现。",url:"https://pettingzoo.farama.org/environments/mpe/",type:"实战",p:1},
    {t:"AlphaGo / AlphaZero 论文",s:"Nature 2016 / 2017",d:"RL + 蒙特卡洛树搜索的巅峰，理解自博弈与价值网络如何结合。",url:"https://arxiv.org/abs/1712.01815",type:"论文",p:1},
    {t:"Papers with Code",s:"paperswithcode.com",d:"论文 + 官方代码 + 榜单三对照，判断 SOTA 与查找复现的第一入口。",url:"https://paperswithcode.com/",type:"工具",p:1},
    {t:"RLHF 实践：TRL 库",s:"huggingface.co/docs/trl",d:"Hugging Face 的 RLHF 工具链，包含奖励模型训练与 PPO 微调。",url:"https://huggingface.co/docs/trl/",type:"工具",p:2},
    {t:"机器人 RL 综述",s:"arXiv 2203.04939",d:"Sim-to-Real、模仿学习、安全 RL 等机器人方向的核心问题。",url:"https://arxiv.org/abs/2203.04939",type:"论文",p:2},
    {t:"arXiv cs.LG / cs.AI 最新论文",s:"arxiv.org/list/cs.LG/recent",d:"每周扫标题摘要，跟踪 RLHF、多智能体、离线 RL 等前沿。",url:"https://arxiv.org/list/cs.LG/recent",type:"文档",p:2},
    {t:"安全强化学习",s:"arXiv 综述",d:"在安全约束下做决策，是 RL 落地真实场景的关键问题。",url:"https://arxiv.org/abs/2205.10330",type:"论文",p:2},
    {t:"NeurIPS / ICML 会议论文",s:"neurips.cc",d:"RL 领域的顶级会议，关注 Oral/Spotlight 论文找研究方向。",url:"https://neurips.cc/",type:"文档",p:2}
  ]
}
];

const MILESTONES = [
  {t:"Gymnasium 环境交互",when:"第 2 周",d:"用 Gymnasium 加载 CartPole，实现随机策略交互，理解 observation/action/reward/done 接口并可视化。",deliver:"产出：环境交互脚本 + 随机策略视频"},
  {t:"动态规划价值迭代",when:"第 6 周",d:"在已知模型的 GridWorld 上实现策略迭代与价值迭代，对比两者收敛速度。",deliver:"产出：DP 算法代码 + 收敛曲线"},
  {t:"DQN 解决 CartPole",when:"第 11 周",d:"实现 DQN（含经验回放与目标网络）在 CartPole 上达到 500 步满奖励，理解 epsilon 衰减。",deliver:"产出：DQN 训练脚本 + 奖励曲线"},
  {t:"PPO 连续控制",when:"第 16 周",d:"用 PPO 在 LunarLanderContinuous 或 Hopper 上训练，对比随机策略的奖励提升。",deliver:"产出：PPO 训练代码 + 学习曲线"},
  {t:"SAC 在 MuJoCo 上训练",when:"第 21 周",d:"用 SAC 训练 HalfCheetah/Ant，达到接近论文的性能，对比与 PPO 的样本效率。",deliver:"产出：SAC 实验记录 + 性能对比表"},
  {t:"多智能体协作",when:"第 24 周",d:"在 PettingZoo MPE 环境中训练多个智能体协作完成任务（如合作导航），观察协作涌现。",deliver:"产出：多智能体训练代码 + 演示视频"},
  {t:"复现一篇 RL 论文",when:"第 27 周",d:"自选一篇 RL 论文（如 TD3、CQL、改进 PPO），复现核心实验，记录无法复现之处。",deliver:"产出：复现仓库 + 实验记录"},
  {t:"组会汇报与课题方向",when:"第 28 周以后",d:"精读 5 篇方向论文，做 15 分钟组会汇报，结合组内需求提出至少一个可行研究切入点。",deliver:"产出：组会 slides + 开题思路"}
];

const FAQS = [
  {q:"我没有深度学习基础，能直接学强化学习吗？",a:"<strong>不建议跳级。</strong>深度 RL 建立在神经网络与梯度下降之上。请先完成《深度学习》手册的前三个阶段，再开始本路线——地基不牢，越往上越吃力。表格法 RL 可以只懂概率就开始，但深度 RL 必须会 PyTorch。"},
  {q:"RL 对数学要求高吗？",a:"比 CV/NLP 略高，核心是<strong>概率论与期望</strong>。MDP、Bellman 方程、策略梯度都建立在期望之上。但不需要先把数学学完再动手——带着问题补，边推公式边写代码，理解得最快。"},
  {q:"RL 训练又慢又不稳定，正常吗？",a:"<strong>非常正常。</strong>RL 是出了名的难调：同一种子跑两次结果可能差很多。对策：① 固定随机种子并多次实验取均值；② 用 W&B 记录超参数；③ 先在简单环境（CartPole）调通再上复杂任务；④ 参考 cleanrl/sb3 的默认超参。"},
  {q:"on-policy 和 off-policy 该怎么选？",a:"<strong>off-policy（DQN/SAC）样本效率高</strong>，适合环境交互昂贵的场景；<strong>on-policy（PPO/A2C）更稳定</strong>，适合环境交互便宜的仿真。工程上 PPO 最常用（稳定），研究上 SAC 样本效率高。两者都要懂。"},
  {q:"RL 环境该选哪个入门？",a:"按难度递进：<strong>CartPole → LunarLander → MuJoCo（Hopper/HalfCheetah）</strong>。离散动作先用 DQN，连续动作再上 PPO/SAC。Atari 适合进阶但训练慢，多智能体用 PettingZoo。"},
  {q:"奖励设计（Reward Shaping）有什么技巧？",a:"奖励是 RL 的灵魂。原则：<strong>① 稀疏奖励优先</strong>（只给最终目标，让智能体自己探索）；② 必要时加稠密引导奖励但要小心「奖励黑客」；③ 做归一化避免尺度问题；④ 课程学习：从简单任务逐步过渡到难任务。"},
  {q:"PPO 为什么这么流行？",a:"PPO 在<strong>稳定性与样本效率之间取得了最佳平衡</strong>：比 TRPO 简单、比 Vanilla PG 稳定、比 SAC 易实现。裁剪目标函数限制了策略更新幅度，几乎不会崩。现在大模型 RLHF 也采用 PPO，是必须深入掌握的算法。"},
  {q:"RL 和 LLM/Agent 是什么关系？",a:"RL 是 Agent 的核心学习范式之一。<strong>LLM 对齐用 RLHF（奖励模型 + PPO）</strong>，智能体决策也常用 RL。学完本手册再去看《大模型与智能体》，会对 RLHF 有更深理解。"},
  {q:"可以直接用 sb3/cleanrl 不自己实现吗？",a:"入门阶段<strong>必须独立实现一遍</strong> DQN/PPO，否则永远不懂超参为什么这么设。熟练后做研究再用 sb3/cleanrl 省时间，但要能读懂并修改它们的源码。"}
];

const STORE_KEY = "rl-roadmap-v1";
return {PHASES, MILESTONES, FAQS, STORE_KEY};
})();
