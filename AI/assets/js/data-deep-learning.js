window.HB_CURRENT = "deep-learning";
window.HANDBOOKS = window.HANDBOOKS || {};
HANDBOOKS["deep-learning"] = (()=>{
/* =========================================================
   路线数据：如需增删资源，直接修改下面的数组即可
   type 取值：视频 / 教材 / 文档 / 论文 / 工具 / 数据 / 实战
   p：1=必做  2=推荐  3=选学
   ========================================================= */
const PHASES = [
{
  num:"零", id:"p0", title:"筑基准备", weeks:"第 1–3 周 · 约 40 学时",
  goal:"把「武器」和「内功」备好：能写 Python、会用终端、用直观方式建立线代 / 微积分直觉。<b>不追求数学推导，追求不害怕。</b>环境安装见下方「环境配置」，不占学习时间。",
  outcomes:["能读写 Python 脚本、函数与常用数据结构","终端常用命令不再发怵","看完两个 3Blue1Brown 系列"],
  pitfalls:["视频刷完不等于学会：每学完一节，合上资料独立把代码敲一遍，跑通才算数。","不要在环境配置上反复折腾：conda 与 PyTorch 装好即用，追求完美配置是最常见的拖延形式。","数学不必先系统重学一遍：带着编程中遇到的具体问题回看线代与概率，效率远高于从头啃教材。"],
  resources:[
    {t:"MIT《计算机科学工具课》（中译）",s:"Missing Semester · 前 4 讲即可",d:"Shell、环境、Git 等「学校不教但天天用」的技能，只看前 4 讲，半小时就能上手一条命令。",url:"https://missing-semester-cn.github.io/",type:"文档",p:1},
    {t:"3Blue1Brown《线性代数的本质》",s:"B 站官方中文字幕 · 15 集",d:"用动画建立向量、矩阵、特征值的几何直觉，一天刷完，比啃课本有效十倍。",url:"https://search.bilibili.com/all?keyword=%E7%BA%BF%E6%80%A7%E4%BB%A3%E6%95%B0%E7%9A%84%E6%9C%AC%E8%B4%A8",type:"视频",p:1},
    {t:"3Blue1Brown《微积分的本质》",s:"B 站官方中文字幕 · 12 集",d:"重点看导数、链式法则与梯度——这是反向传播的全部数学直觉来源。",url:"https://search.bilibili.com/all?keyword=%E5%BE%AE%E7%A7%AF%E5%88%86%E7%9A%84%E6%9C%AC%E8%B4%A8",type:"视频",p:1},
    {t:"廖雪峰 Python 教程",s:"liaoxuefeng.com",d:"中文、例子多、节奏快，通读 Python 基础部分并完成课后练习即可，不必追求全记住。",url:"https://liaoxuefeng.com/books/python/introduction/index.html",type:"文档",p:1},
    {t:"Miniconda + VS Code",s:"环境与编辑器",d:"具体安装步骤见本页「环境配置」一节，装好 Python / Jupyter / Remote-SSH 插件即可。",url:"https://code.visualstudio.com/",type:"工具",p:2},
    {t:"Python 官方中文教程",s:"docs.python.org",d:"最权威的免费读物，廖雪峰教程不习惯时换这一本，速读第 1–9 章。",url:"https://docs.python.org/zh-cn/3/tutorial/",type:"文档",p:2},
    {t:"《Python 编程：从入门到实践》（第3版）",s:"Eric Matthes · 人民邮电出版社",d:"喜欢看书系统学的同学可选，前半本学语法，后半本三个项目选做一个。",url:"https://ehmatthes.github.io/pcc_3e/",type:"教材",p:2},
    {t:"d2l 第 2 章 · 预备知识",s:"《动手学深度学习》",d:"深度学习真正用到的线代 / 微积分 / 概率知识，第二阶段遇到时按需查阅。",url:"https://zh.d2l.ai/chapter_preliminaries/index.html",type:"文档",p:2},
    {t:"MIT 18.06 线性代数",s:"Gilbert Strang · OCW",d:"只有想系统补线性代数时才看，不必逐集追。",url:"https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/",type:"视频",p:3}
  ]
},
{
  num:"壹", id:"p1", title:"机器学习基础", weeks:"第 4–8 周 · 约 65 学时",
  goal:"建立机器学习的核心词汇与思维方式：<b>数据、模型、损失函数、过拟合、验证集、梯度下降</b>。完成人生第一个端到端 ML 流程。",
  outcomes:["讲清监督学习完整流程","Kaggle 提交一次比赛结果","理解偏差/方差与正则化"],
  pitfalls:["跳过 NumPy 直接上框架：张量维度广播不熟，后面每一步都会卡壳。","以为调一行 sklearn 的 fit 就算懂机器学习：梯度下降与逻辑回归务必各手写一遍，不调库。"],
  resources:[
    {t:"吴恩达 Machine Learning Specialization",s:"DeepLearning.AI · Coursera（中文字幕）",d:"零基础唯一主线课：3 门课，直觉讲得极好。可免费旁听，不必购买证书。",url:"https://www.coursera.org/specializations/machine-learning-introduction",type:"视频",p:1},
    {t:"Kaggle Learn 微课",s:"kaggle.com/learn",d:"Pandas、Intro to ML 交互式微课，免费、即时反馈，配合主线课碎片时间刷。",url:"https://www.kaggle.com/learn",type:"实战",p:1},
    {t:"Kaggle Titanic 入门赛",s:"kaggle.com",d:"第一个端到端项目：清洗数据 → 建模 → 提交结果，一次就够，重在走完全流程。",url:"https://www.kaggle.com/competitions/titanic",type:"实战",p:1},
    {t:"《Hands-On Machine Learning》第3版",s:"Aurélien Géron · O'Reilly",d:"最受欢迎的实战书，精读第 1–5、9 章建立工程手感；第 10 章以后进入 PyTorch。",url:"https://github.com/ageron/handson-ml3",type:"教材",p:1},
    {t:"李宏毅《机器学习 2021》",s:"台湾大学 · B 站完整版",d:"吴恩达听完不过瘾时的最佳补充，中文讲解更细、案例更多，可只挑不懂的章节看。",url:"https://search.bilibili.com/all?keyword=%E6%9D%8E%E5%AE%8F%E6%AF%85%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A02021",type:"视频",p:2},
    {t:"周志华《机器学习》（西瓜书）",s:"清华大学出版社",d:"中文 ML 经典，当工具书配合课程选读，不建议零基础从头硬啃。",url:"https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/MLbook2016.htm",type:"教材",p:2},
    {t:"南瓜书：西瓜书公式逐式推导",s:"Datawhale 开源",d:"对西瓜书重难点公式的详细推导，卡公式时就翻它。",url:"https://datawhalechina.github.io/pumpkin-book/",type:"文档",p:2},
    {t:"李航《统计学习方法（第2版）》",s:"清华大学出版社",d:"想深入传统 ML 算法推导时选读，入门阶段可不看。",url:"https://book.douban.com/subject/34912931/",type:"教材",p:3}
  ]
},
{
  num:"贰", id:"p2", title:"深度学习核心", weeks:"第 9–15 周 · 约 90 学时",
  goal:"深入理解深度学习的基本机制：前向 / 反向传播、卷积神经网络；<b>熟练运用 PyTorch</b>。",
  outcomes:["从零实现 softmax 回归与 MLP","理解反向传播与自动微分","CIFAR-10 上训练并调优 ResNet"],
  pitfalls:["把过拟合误判为模型不行：训练集 99%、验证集 60% 是典型的过拟合信号，应先加正则、数据增广与早停，而不是换更大的模型。","不理解反向传播就堆层数：梯度消失时完全无法定位问题，务必亲手推一遍链式法则。"],
  resources:[
    {t:"《动手学深度学习》（PyTorch 版）",s:"李沐等 · zh.d2l.ai",d:"本阶段唯一主线：数学 + 代码 + 视频。精读第 2–7、10 章（预备知识、MLP、CNN、注意力），务必边看边敲。",url:"https://zh.d2l.ai/",type:"文档",p:1},
    {t:"d2l 配套精讲视频",s:"跟李沐学 AI · B 站",d:"与教材逐章对应的视频课。顺序：先读章节 → 看视频 → 合上资料自己复现。",url:"https://search.bilibili.com/all?keyword=%E5%8A%A8%E6%89%8B%E5%AD%A6%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%20%E6%9D%8E%E6%B2%90",type:"视频",p:1},
    {t:"PyTorch 60 分钟闪电战",s:"pytorch.org 官方教程",d:"1 小时建立框架全貌：Tensor、Autograd、nn.Module 与训练循环。",url:"https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",type:"文档",p:1},
    {t:"d2l · 实战 Kaggle 房价预测",s:"zh.d2l.ai 第 4.10 节",d:"用神经网络完整走一遍竞赛流程，提交结果并记录哪些调参真正有效。",url:"https://zh.d2l.ai/chapter_multilayer-perceptrons/kaggle-house-price.html",type:"实战",p:1},
    {t:"d2l · GPU 计算与使用",s:"zh.d2l.ai 第 5.6 节",d:"有显卡时阅读：确认 torch.cuda.is_available() 为 True，学会把数据与模型放到 GPU。",url:"https://zh.d2l.ai/chapter_deep-learning-computation/use-gpu.html",type:"文档",p:2},
    {t:"PyTorch 官方 Tutorials",s:"pytorch.org/tutorials",d:"长期参考手册，学数据加载、保存模型、迁移学习等具体功能时查阅。",url:"https://pytorch.org/tutorials/",type:"文档",p:2},
    {t:"吴恩达 Deep Learning Specialization",s:"DeepLearning.AI · Coursera",d:"概念补充，时间紧张可跳过——d2l 已覆盖所需内容。",url:"https://www.coursera.org/specializations/deep-learning",type:"视频",p:3},
    {t:"《深度学习》花书",s:"Goodfellow 等 · 免费 PDF",d:"理论工具书，需要查概念时读对应章节，不通读。",url:"https://www.deeplearningbook.org/",type:"教材",p:3}
  ]
},
{
  num:"叁", id:"p3", title:"计算机视觉", weeks:"第 16–20 周 · 约 70 学时",
  goal:"掌握视觉三大任务——<b>分类、检测、分割</b>——与最重要的两类架构（CNN / Transformer），形成「读论文 → 跑代码 → 改模型」的闭环。",
  outcomes:["完成 CS231n Assignment 1","跑通 YOLO 在自定义数据上的训练","精读 ResNet 等 3 篇核心论文"],
  pitfalls:["一上来就用全量数据训练大分辨率模型：应先在小子集上跑通数据加载、训练、评估全流程，再放大规模。","忽视归一化与数据增广：模型学到的往往是采集设备的偏差而非有效特征。"],
  related:{href:"computer-vision.html",label:"视觉全栈深入见《计算机视觉》手册"},
  resources:[
    {t:"CS231n: Deep Learning for Computer Vision",s:"Stanford · 2026 年仍在开课",d:"计算机视觉方向的经典课程。B 站搜「CS231n 中文字幕」看往年完整视频，至少看完前 12 讲。",url:"http://cs231n.stanford.edu/",type:"视频",p:1},
    {t:"CS231n 课程笔记与作业",s:"cs231n.github.io",d:"比视频更常翻阅的文字版；Assignment 1 必须独立完成，这是最具价值的练习。",url:"https://cs231n.github.io/",type:"文档",p:1},
    {t:"The Illustrated Transformer",s:"Jay Alammar · 图解经典",d:"全网最易懂的注意力机制图解，读 ViT 与理解现代架构前的最佳铺垫，半小时读完。",url:"https://jalammar.github.io/illustrated-transformer/",type:"文档",p:1},
    {t:"必读论文：ResNet",s:"arXiv 1512.03385",d:"CNN 架构演进只精读这一篇即可（AlexNet/VGG 配合 d2l 第 7 章了解），重点理解残差连接。",url:"https://arxiv.org/abs/1512.03385",type:"论文",p:1},
    {t:"Ultralytics YOLO 文档与代码",s:"docs.ultralytics.com",d:"检测 / 分割 / 分类一站式框架，跟着官方 Quickstart 完成第一个属于自己的检测项目。",url:"https://docs.ultralytics.com/",type:"工具",p:1},
    {t:"ViT 视觉 Transformer",s:"arXiv 2010.11929",d:"Transformer 进入视觉的开山之作，读完图解材料后再看原文，作为 ResNet 的对照。",url:"https://arxiv.org/abs/2010.11929",type:"论文",p:2},
    {t:"d2l 第 13 章 · 计算机视觉",s:"zh.d2l.ai",d:"图像增广、迁移微调、目标检测、语义分割的中文实战，与论文对照学习。",url:"https://zh.d2l.ai/chapter_computer-vision/index.html",type:"文档",p:2},
    {t:"Faster R-CNN 与 FCN",s:"检测/分割经典两篇",d:"理解锚框、RPN 与全卷积分割思想，医学影像里的检测分割都是它们的延伸。",url:"https://arxiv.org/abs/1506.01497",type:"论文",p:2},
    {t:"timm：预训练视觉模型库",s:"Hugging Face · GitHub",d:"数百个预训练 backbone 与统一 API，做迁移学习和论文复现时的常用工具。",url:"https://github.com/huggingface/pytorch-image-models",type:"工具",p:2},
    {t:"Google Colab 免费 GPU",s:"colab.research.google.com",d:"没有服务器时跑作业与实验的首选，注意及时下载模型与数据。",url:"https://colab.research.google.com/",type:"工具",p:2},
    {t:"OpenMMLab（MMDetection / MMSeg）",s:"国内最活跃的 CV 算法库",d:"需要丰富检测/分割 baseline 时再用，入门阶段 YOLO 足够。",url:"https://github.com/open-mmlab",type:"工具",p:3}
  ]
},
{
  num:"肆", id:"p4", title:"医学影像智能（专业方向）", weeks:"第 21–27 周 · 约 90 学时",
  goal:"进入医学影像领域：理解 CT/MRI 数据形态与临床约束，掌握 NIfTI 与 3D 处理，<b>用 MONAI 完成完整的 3D 分割流水线</b>。",
  outcomes:["讲清 CT/MRI 区别与 DICOM/NIfTI 格式","跑通 MONAI Spleen 3D 分割教程","用 nnU-Net 在 MSD 任务上得到 baseline"],
  pitfalls:["用处理 PNG 的思路处理 DICOM/NIfTI：窗宽窗位、体素间距、方位信息丢失会直接毁掉模型输入。","随机按切片划分数据集：同一病人的影像同时进入训练集与测试集，造成数据泄漏、指标虚高——必须按病人级划分。","只看 Dice 分数：分割边界是否符合解剖结构、假阳性是否落在危险区域，必须结合可视化检查。"],
  resources:[
    {t:"U-Net（MICCAI 2015）",s:"arXiv 1505.04597 · 被引超 12 万",d:"医学图像分割的基石，本阶段第一篇、也是最该精读的论文，读完要能默画出编解码结构。",url:"https://arxiv.org/abs/1505.04597",type:"论文",p:1},
    {t:"MONAI 官网与 Get Started",s:"monai.io · NVIDIA / KCL / NIH 共建",d:"基于 PyTorch 的医学影像 AI 框架，本阶段主战场，先读 Get Started 与核心概念。",url:"https://monai.io/",type:"工具",p:1},
    {t:"MONAI 官方 Tutorials",s:"GitHub · Project-MONAI/tutorials",d:"按顺序跑通 2D 分类、3D 分割（Spleen）两个 notebook，是最好的教材，胜过任何二手课。",url:"https://github.com/Project-MONAI/tutorials",type:"实战",p:1},
    {t:"3D Slicer",s:"slicer.org · 免费开源",d:"每天都用得到的医学影像查看与标注平台，学会打开 NIfTI、调窗宽窗位、勾画标签。",url:"https://www.slicer.org/",type:"工具",p:1},
    {t:"Medical Segmentation Decathlon（MSD）",s:"medicaldecathlon.com",d:"10 个公开 3D 分割任务（脾、脑、心、肝、前列腺……），练手与论文 benchmark 的标配。",url:"http://medicaldecathlon.com/",type:"数据",p:1},
    {t:"nnU-Net",s:"MIC-DKFZ · GitHub + Nature Methods",d:"「医学分割界的自动 baseline」。拿到新数据集先跑它再谈改进——这是全领域共识。",url:"https://github.com/MIC-DKFZ/nnUNet",type:"工具",p:1},
    {t:"SimpleITK Notebooks",s:"Insight Software Consortium",d:"医学图像 I/O、重采样、配准的经典 notebook，处理真实数据遇到问题时选读对应章节。",url:"https://insightsoftwareconsortium.github.io/SimpleITK-Notebooks/",type:"实战",p:2},
    {t:"综述：Deep Learning in Medical Image Analysis",s:"Litjens et al. · 2017",d:"被引上万的领域地图：1 小时快速了解任务分类与方法谱系，建立全局观。",url:"https://arxiv.org/abs/1702.05747",type:"论文",p:2},
    {t:"MONAI 官方文档",s:"docs.monai.io",d:"transforms / metrics / losses 的权威说明，写代码时随查随用。",url:"https://docs.monai.io/",type:"文档",p:2},
    {t:"MedSAM：医学版分割基础模型",s:"bowang-lab/MedSAM · 2023",d:"SAM 在医学影像上的适配，代表「基础模型 + 提示」新范式，做课题时重点关注。",url:"https://github.com/bowang-lab/MedSAM",type:"论文",p:2},
    {t:"V-Net 与 Dice Loss",s:"arXiv 1606.04797",d:"3D 卷积网络代表作，与 U-Net 对照阅读，理解 3D 与 2D 的差异。",url:"https://arxiv.org/abs/1606.04797",type:"论文",p:2},
    {t:"TorchIO：3D 影像增强库",s:"torchio.readthedocs.io",d:"专为 3D 影像设计的数据增强与采样，需要自己写 pipeline 时使用。",url:"https://torchio.readthedocs.io/",type:"工具",p:2},
    {t:"TCIA / BraTS / ISIC 数据集导航",s:"癌症影像库 · 脑肿瘤赛 · 皮肤病灶",d:"找课题数据的第一站：TCIA 综合影像库、BraTS 脑肿瘤年度赛、ISIC 皮肤镜。",url:"https://www.cancerimagingarchive.net/",type:"数据",p:2},
    {t:"Grand Challenge 平台",s:"grand-challenge.org",d:"医学影像竞赛聚合平台，历年赛题就是最好的选题风向标。",url:"https://grand-challenge.org/",type:"数据",p:2},
    {t:"AI for Medicine 专项课程",s:"DeepLearning.AI · Coursera",d:"想快速建立医学 AI 领域常识时可选，三门课速览即可。",url:"https://www.coursera.org/specializations/ai-for-medicine",type:"视频",p:2},
    {t:"MICCAI 学会与年会",s:"miccai.org",d:"医学影像 AI 顶级会议，关注接收论文、Workshop 与暑期学校，选题阶段常逛。",url:"https://www.miccai.org/",type:"文档",p:2},
    {t:"UNETR / SwinUNETR",s:"arXiv 2103.10504",d:"Transformer 进入 3D 分割的代表作，课题需要时再读。",url:"https://arxiv.org/abs/2103.10504",type:"论文",p:3}
  ]
},
{
  num:"伍", id:"p5", title:"科研入门（持续进行）", weeks:"第 28 周起 · 贯穿研究生阶段",
  goal:"从「学生」切换为「研究者」：<b>会读论文、会复现、会管理实验、会讲会写</b>，并在过程中找到自己的课题切入点。",
  outcomes:["每周精读 1 篇论文并写笔记","GitHub 建立可复现实验仓库","复现 1 篇方向论文并完成组会汇报"],
  pitfalls:["一篇论文卡住一周不放：用三遍读法快速筛选，读不懂的先跳过，多数论文只需粗读。","实验不做记录：超参、随机种子、数据版本两周后必忘，从第一天就用表格或 W&B 记录。"],
  resources:[
    {t:"《How to Read a Paper》三遍读法",s:"S. Keshav · 经典方法论",d:"第一遍 10 分钟筛掉、第二遍 1 小时抓内容、第三遍复现思路。读论文从这篇开始。",url:"https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf",type:"文档",p:1},
    {t:"跟李沐学 AI · 论文精读系列",s:"B 站",d:"看资深研究员如何逐段拆解论文（含 ResNet、Transformer 等经典），跟读 10 篇胜过闷头读 50 篇。",url:"https://search.bilibili.com/all?keyword=%E8%B7%9F%E6%9D%8E%E6%B2%90%E5%AD%A6AI%20%E8%AE%BA%E6%96%87%E7%B2%BE%E8%AF%BB",type:"视频",p:1},
    {t:"Papers with Code",s:"paperswithcode.com",d:"论文 + 官方代码 + 数据集榜单三对照，判断论文价值与查找 SOTA 的第一入口。",url:"https://paperswithcode.com/",type:"工具",p:1},
    {t:"Pro Git（中文第二版）",s:"git-scm.com 免费电子书",d:"读完前 3 章即可起步；实验代码必须从第一天起进 Git，这是科研基本功。",url:"https://git-scm.com/book/zh/v2",type:"文档",p:1},
    {t:"Zotero 文献管理",s:"zotero.org",d:"免费开源，配合浏览器插件一键收藏论文，从第一篇论文起就规范管理。",url:"https://www.zotero.org/",type:"工具",p:1},
    {t:"Connected Papers",s:"connectedpapers.com",d:"输入种子论文画出相关工作关系图谱，做文献综述、梳理课题脉络的高效工具。",url:"https://www.connectedpapers.com/",type:"工具",p:2},
    {t:"吴恩达：如何读论文与做研究",s:"B 站搬运（中文字幕）",d:"「每周精读两篇」「批量粗读 50 篇建立版图」等可直接执行的建议。",url:"https://search.bilibili.com/all?keyword=%E5%90%B4%E6%81%A9%E8%BE%BE%20%E5%A6%82%E4%BD%95%E8%AF%BB%E8%AE%BA%E6%96%87",type:"视频",p:2},
    {t:"GitHub Skills 交互课程",s:"github.com/skills/introduction-to-github",d:"在真实练习仓库中学会分支、提交、Pull Request 与合并。",url:"https://github.com/skills/introduction-to-github",type:"实战",p:2},
    {t:"Weights & Biases（实验跟踪）",s:"wandb.ai",d:"实验曲线、超参数、代码版本一站式托管；离线时可用 TensorBoard 替代。",url:"https://wandb.ai/",type:"工具",p:2},
    {t:"arXiv cs.CV 最新论文",s:"arxiv.org/list/cs.CV/recent",d:"每周抽 30 分钟扫标题摘要保持语感；医学相关另关注 MICCAI 开放获取。",url:"https://arxiv.org/list/cs.CV/recent",type:"文档",p:2},
    {t:"Overleaf 在线 LaTeX",s:"overleaf.com",d:"论文排版与组会幻灯片模板，组内协作写稿的事实标准。",url:"https://www.overleaf.com/",type:"工具",p:2},
    {t:"鸟哥的 Linux 私房菜",s:"linux.vbird.org",d:"使用实验室 GPU 服务器前的系统补课，当字典翻即可。",url:"http://linux.vbird.org/linux_basic/",type:"文档",p:3},
    {t:"Hugging Face Learn 免费课程",s:"huggingface.co/learn",d:"想系统接触预训练模型与微调实践时的优质免费课程。",url:"https://huggingface.co/learn",type:"文档",p:3}
  ]
}
];

const MILESTONES = [
  {t:"Python 小工具",when:"第 2 周",d:"写一个脚本批量整理实验文件（重命名、分类），并用 matplotlib 完成一次数据可视化。",deliver:"产出：一个 GitHub 私有仓库"},
  {t:"第一场 Kaggle 比赛",when:"第 6 周",d:"独立完成 Titanic：清洗数据 → 建模 → 提交结果，写一页方法总结：用了什么特征、哪些尝试有效。",deliver:"产出：竞赛 Notebook + 一页总结"},
  {t:"从零搭出神经网络",when:"第 10 周",d:"不依赖高级框架 API，亲手实现 softmax 回归与 MLP，数值梯度与解析梯度对齐。",deliver:"产出：d2l 配套作业代码"},
  {t:"CIFAR-10 图像分类",when:"第 13 周",d:"用 PyTorch 复现 ResNet，达到 90%+ 准确率；用表格记录学习率、增广、正则的消融对比。",deliver:"产出：实验记录表 + 训练曲线"},
  {t:"目标检测实战",when:"第 19 周",d:"用 YOLO 在自选小数据集（如口罩检测、医学标志检测）上完成数据标注、训练、评估与推理演示。",deliver:"产出：可运行的检测项目 + Demo 图"},
  {t:"MONAI 3D 分割",when:"第 23 周",d:"独立跑通 MONAI Spleen 3D 分割教程，输出 Dice 指标，并能逐行讲清每条 transform 的作用。",deliver:"产出：带注释的复现 Notebook"},
  {t:"nnU-Net Baseline",when:"第 26 周",d:"在 MSD 任选任务上跑通 nnU-Net，理解其自动配置流程；整理成规范实验仓库（README、种子固定、环境文件、日志）。",deliver:"产出：可复现实验仓库"},
  {t:"首次论文复现与组会汇报",when:"第 28 周以后",d:"精读 U-Net 等 5 篇医学影像论文，复现其中 1 篇的核心结果，做 15 分钟组会报告并提出至少一个可行改进点。",deliver:"产出：复现报告 + 组会 slides"}
];

const FAQS = [
  {q:"数学不好，是不是要先把高数线代重学一遍？",a:"<strong>不需要。</strong>先用 3Blue1Brown 两个系列建立直觉，d2l 预备知识章覆盖了深度学习真正用到的数学。遇到反向传播、概率推导卡住时，再回到具体知识点补——带着问题学数学，效率最高。"},
  {q:"看视频都懂，一写代码就懵，怎么办？",a:"这是典型的「看懂幻觉」。对策：<strong>暂停视频自己先写，再对答案</strong>；每章作业独立完成；每学一个算法就在空白 notebook 里默写一遍最小实现。能写出来才算学会。"},
  {q:"主线课该选吴恩达还是李宏毅？",a:"机器学习阶段二选一：吴恩达课程短、英文中字、框架现代；李宏毅讲解更细、中文、案例丰富。<strong>深度学习阶段不用选——d2l（李沐）是唯一主线</strong>，其他都是补充。"},
  {q:"没有 GPU / 实验室服务器还没到位，能开始吗？",a:"完全可以。前 15 周的内容 CPU 就能跑，再配合 Colab 和 Kaggle 的免费 GPU 额度。真正需要服务器 GPU 的是 MONAI 3D 分割阶段（第 21 周以后），那时再申请资源不迟。"},
  {q:"要不要先学一遍传统数字图像处理或医学影像物理？",a:"不必系统学。了解像素 / 灰度 / 滤波等基础概念即可，窗宽窗位、重采样、配准等专业知识在 MONAI 与 SimpleITK 实战中按需学习，<strong>结合具体 CT/MRI 数据理解得最快</strong>。"},
  {q:"框架选 PyTorch 还是 TensorFlow？",a:"<strong>PyTorch，没有悬念。</strong>2026 年学术界与医学影像生态（MONAI、nnU-Net、几乎所有开源代码）都以 PyTorch 为主，把有限精力投入到正确的地方。"},
  {q:"什么时候可以进课题组开始做具体课题？",a:"建议完成阶段三（约第 20 周）后进入课题，<strong>边做边学阶段四五</strong>。不要等「完全准备好」——那一天永远不会来；带着真实课题中的问题读论文、学方法，成长会显著提速。"},
  {q:"论文读不懂、代码复现不了，很受挫怎么办？",a:"用「三遍读法」筛选，读不懂的先放下，一篇论文卡超过一周就换。复现时：<strong>先跑通官方代码 → 再逐行理解 → 最后才自己改写</strong>；主动和师兄师姐对齐数据与环境，大多数坑别人都踩过。"},
  {q:"AI 编程助手（如大模型）可以用来写作业吗？",a:"可以用它解释报错、讲解概念、生成样板代码，但<strong>核心逻辑必须独立理解并默写一遍</strong>。入门阶段若依赖 AI 代为思考，基础不牢在科研阶段会付出更大代价。"}
];

const STORE_KEY = "medimg-roadmap-v1";
return {PHASES, MILESTONES, FAQS, STORE_KEY};
})();
