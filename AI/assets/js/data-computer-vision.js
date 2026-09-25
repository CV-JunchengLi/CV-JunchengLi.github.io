window.HB_CURRENT = "computer-vision";
window.HANDBOOKS = window.HANDBOOKS || {};
HANDBOOKS["computer-vision"] = (()=>{
/* =========================================================
   路线数据：如需增删资源，直接修改下面的数组即可
   type 取值：视频 / 教材 / 文档 / 论文 / 工具 / 数据 / 实战
   p：1=必做  2=推荐  3=选学
   ========================================================= */
const PHASES = [
{
  num:"零", id:"p0", title:"基础回顾", weeks:"第 1–2 周 · 约 30 学时",
  goal:"假设已具备深度学习与 PyTorch 基础。本阶段<b>快速回顾卷积、图像数据处理与 OpenCV</b>，搭好视觉实验环境。",
  outcomes:["能用 PyTorch 加载并预处理图像数据集","理解卷积、池化、感受野等核心概念","本地或云端 GPU 环境可跑通视觉模型"],
  pitfalls:["环境未验证就开训：跑到一半才发现 CUDA 与 PyTorch 版本不匹配，先用 nvidia-smi 和官方矩阵核对。","忽视归一化与通道顺序：RGB/BGR、CHW/HWC、0-1/0-255 的混淆是 CV 中最常见的隐性 bug 来源。"],
  resources:[
    {t:"d2l · CNN 章节",s:"zh.d2l.ai 第 6、7 章",d:"快速回顾卷积层、池化、LeNet、AlexNet、VGG，是后续所有视觉模型的地基。",url:"https://zh.d2l.ai/chapter_convolutional-modern/index.html",type:"文档",p:1},
    {t:"CS231n · 图像分类与卷积网络笔记",s:"cs231n.github.io",d:"读「Image Classification」与「Convolutional Networks」两节，比视频更精炼，建立图像分类的完整直觉。",url:"https://cs231n.github.io/convolutional-networks/",type:"文档",p:1},
    {t:"OpenCV 官方 Python 教程",s:"docs.opencv.org",d:"掌握图像读写、色彩空间、几何变换、滤波与边缘检测，处理真实数据时天天用。",url:"https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html",type:"文档",p:1},
    {t:"PyTorch 60 分钟闪电战",s:"pytorch.org 官方教程",d:"1 小时重建 PyTorch 全貌：Tensor、Autograd、nn.Module 与训练循环。",url:"https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html",type:"文档",p:1},
    {t:"NumPy 与 Matplotlib 速查",s:"numpy.org / matplotlib.org",d:"数据处理与可视化的标配，当字典翻即可。",url:"https://numpy.org/doc/stable/user/quickstart.html",type:"工具",p:2},
    {t:"《数字图像处理》冈萨雷斯",s:"电子工业出版社",d:"想系统补传统图像处理（滤波、边缘、形态学）时选读，不要求通读。",url:"https://book.douban.com/subject/35608249/",type:"教材",p:3}
  ]
},
{
  num:"壹", id:"p1", title:"CNN 与图像分类", weeks:"第 3–7 周 · 约 70 学时",
  goal:"<b>深入理解卷积神经网络</b>，掌握图像分类的完整流程与经典架构，能在 CIFAR-10 等数据集上训练并调优。",
  outcomes:["讲清 AlexNet/VGG/GoogLeNet/ResNet 的演进逻辑","在 CIFAR-10 上训练 ResNet 达到 90%+","理解数据增广、正则化与学习率调度"],
  pitfalls:["训练集准确率高就收工：必须看验证集曲线与混淆矩阵，过拟合在分类任务中最容易被忽视。","在小数据集上从零训练大模型：应优先加载 ImageNet 预训练权重做微调，收敛更快、效果更好。"],
  resources:[
    {t:"CS231n: Deep Learning for Computer Vision",s:"Stanford · 2026 年仍在开课",d:"计算机视觉的经典课程。B 站搜「CS231n 中文字幕」看往年完整视频，至少看完前 12 讲。",url:"http://cs231n.stanford.edu/",type:"视频",p:1},
    {t:"CS231n 课程笔记与作业",s:"cs231n.github.io",d:"比视频更常翻阅的文字版；Assignment 1 必须独立完成，是最具价值的练习。",url:"https://cs231n.github.io/",type:"文档",p:1},
    {t:"必读论文：ResNet",s:"arXiv 1512.03385",d:"CNN 架构的分水岭。重点理解残差连接为什么能训练上百层，读完要能默画 bottleneck 结构。",url:"https://arxiv.org/abs/1512.03385",type:"论文",p:1},
    {t:"PyTorch 图像分类实战",s:"pytorch.org/tutorials/beginner/transfer_learning_tutorial",d:"用 PyTorch 在自定义数据集上做图像分类，体验数据加载、增广、训练、评估全流程。",url:"https://pytorch.org/tutorials/beginner/transfer_learning_tutorial.html",type:"实战",p:1},
    {t:"timm：预训练视觉模型库",s:"Hugging Face · GitHub",d:"数百个预训练 backbone 与统一 API，做迁移学习和论文复现的常用工具。",url:"https://github.com/huggingface/pytorch-image-models",type:"工具",p:1},
    {t:"VGG 等经典 CNN 论文",s:"arXiv 1409.1556",d:"理解 CNN 架构演进脉络（更深、更宽、模块化）：AlexNet 奠基、VGG 加深、GoogLeNet 模块化，配合 d2l 第 7 章阅读。",url:"https://arxiv.org/abs/1409.1556",type:"论文",p:2},
    {t:"Albumentations 数据增强库",s:"albumentations.ai",d:"比 torchvision 更强大的图像增强库，检测/分割任务也能用，工程必备。",url:"https://albumentations.ai/",type:"工具",p:2},
    {t:"Weights & Biases 实验跟踪",s:"wandb.ai",d:"记录实验曲线、超参数与消融对比，让调参有据可依。",url:"https://wandb.ai/",type:"工具",p:2}
  ]
},
{
  num:"贰", id:"p2", title:"目标检测", weeks:"第 8–13 周 · 约 90 学时",
  goal:"掌握目标检测的两大范式——<b>两阶段（Faster R-CNN）与单阶段（YOLO）</b>——并在自定义数据集上完成检测项目。",
  outcomes:["讲清锚框、RPN、NMS 的作用","在自定义数据集上训练 YOLO 并达到可用 mAP","理解两阶段与单阶段的精度/速度权衡"],
  pitfalls:["标注质量不检查就训练：先人工抽查至少 5% 的标注框，标注错误会直接成为模型的上限。","只盯 mAP@0.5：该指标对定位精度过于宽松，论文与竞赛应以 mAP@[.5:.95] 为准。"],
  resources:[
    {t:"Ultralytics YOLO 文档与代码",s:"docs.ultralytics.com",d:"检测 / 分割 / 分类一站式框架，跟着官方 Quickstart 完成第一个检测项目，是最快上手路径。",url:"https://docs.ultralytics.com/",type:"工具",p:1},
    {t:"YOLO 系列论文（YOLOv1 到 YOLOv8）",s:"arXiv",d:"了解单阶段检测的演进：从 grid 到 anchor-free、从 Darknet 到 CSPNet，选读 YOLOv1 与最新版。",url:"https://arxiv.org/abs/1506.02640",type:"论文",p:1},
    {t:"Faster R-CNN 论文",s:"arXiv 1506.01497",d:"两阶段检测的代表作，理解 RPN + RoI Pooling 的设计，是检测领域的奠基工作。",url:"https://arxiv.org/abs/1506.01497",type:"论文",p:1},
    {t:"d2l 第 13 章 · 目标检测",s:"zh.d2l.ai",d:"中文实战讲解锚框、多尺度检测与 SSD，配合论文阅读。",url:"https://zh.d2l.ai/chapter_computer-vision/anchor.html",type:"文档",p:1},
    {t:"目标检测实战：自定义数据集",s:"基于 YOLO / MMDetection",d:"自选小数据集（如口罩、交通标志、医学标志），完成数据标注→训练→评估→推理演示全流程。",url:"https://docs.ultralytics.com/modes/train/",type:"实战",p:1},
    {t:"MMDetection",s:"OpenMMLab",d:"国内最活跃的检测算法库，需要丰富 baseline 或复现论文时使用，YOLO 之外的第二选择。",url:"https://github.com/open-mmlab/mmdetection",type:"工具",p:2},
    {t:"RetinaNet（Focal Loss）论文",s:"arXiv 1708.02002",d:"单阶段检测的代表作之一，用 Focal Loss 解决类别不平衡问题，理解多尺度检测与密集预测。",url:"https://arxiv.org/abs/1708.02002",type:"论文",p:2},
    {t:"LabelImg / CVAT 标注工具",s:"GitHub",d:"给数据集画框标注，YOLO 用 LabelImg，复杂项目用 CVAT。",url:"https://github.com/HumanSignal/labelImg",type:"工具",p:2},
    {t:"COCO 数据集与评测",s:"cocodataset.org",d:"检测领域的事实基准，理解 mAP@0.5、mAP@[.5:.95] 等指标。",url:"https://cocodataset.org/",type:"数据",p:2}
  ]
},
{
  num:"叁", id:"p3", title:"语义分割", weeks:"第 14–18 周 · 约 80 学时",
  goal:"掌握像素级预测任务：<b>语义分割、实例分割、全景分割</b>。从 FCN 到 U-Net 到 Mask R-CNN，完成一个分割项目。",
  outcomes:["讲清 FCN / U-Net / DeepLab 的核心思想","在医学或自然图像数据集上训练 U-Net","理解语义分割与实例分割的区别"],
  pitfalls:["不处理类别不平衡：背景类占 95% 时准确率毫无意义，必须用 Dice/IoU 并配合加权损失。","忽视滑窗推理与边缘拼接：大图直接缩放输入会丢失细节，正确做法是滑窗加权重融合。"],
  resources:[
    {t:"U-Net（MICCAI 2015）",s:"arXiv 1505.04597 · 被引超 12 万",d:"编解码结构 + 跳跃连接，是分割领域最重要的论文，读完要能默画出结构。",url:"https://arxiv.org/abs/1505.04597",type:"论文",p:1},
    {t:"FCN 论文",s:"arXiv 1411.4038",d:"语义分割的开山之作：把分类网络的全连接层换成卷积，实现端到端像素预测。",url:"https://arxiv.org/abs/1411.4038",type:"论文",p:1},
    {t:"d2l 第 13 章 · 语义分割",s:"zh.d2l.ai",d:"中文实战：转置卷积、FCN、 Pascal VOC 分割，配合论文阅读。",url:"https://zh.d2l.ai/chapter_computer-vision/semantic-segmentation-and-dataset.html",type:"文档",p:1},
    {t:"U-Net 分割实战",s:"基于 segmentation_models_pytorch",d:"用 U-Net 在 ISBI 细胞分割或自选数据集上训练，输出 Dice/IoU 指标。",url:"https://github.com/qubvel-org/segmentation_models.pytorch",type:"实战",p:1},
    {t:"DeepLab v3+ 论文",s:"arXiv 1802.02611",d:"空洞卷积 + 多尺度上下文，是精度导向分割的代表作。",url:"https://arxiv.org/abs/1802.02611",type:"论文",p:1},
    {t:"Mask R-CNN 论文",s:"arXiv 1703.06870",d:"实例分割的经典：在 Faster R-CNN 上加 mask 分支，理解检测+分割一体化。",url:"https://arxiv.org/abs/1703.06870",type:"论文",p:2},
    {t:"segmentation_models_pytorch",s:"GitHub",d:"集成 U-Net/DeepLab/FPN 等架构与多种 backbone 的库，做分割项目首选。",url:"https://github.com/qubvel-org/segmentation_models.pytorch",type:"工具",p:2},
    {t:"Cityscapes / ADE20K 数据集",s:"cityscapes-dataset.com",d:"自动驾驶与场景解析的标准分割数据集，做课题时常用。",url:"https://www.cityscapes-dataset.com/",type:"数据",p:2},
    {t:"Lovász-Softmax 损失",s:"arXiv 1705.08790",d:"直接优化 mIoU 的可导替代损失，与 Dice Loss 同属分割任务的专用损失函数，处理类别不平衡。",url:"https://arxiv.org/abs/1705.08790",type:"论文",p:2}
  ]
},
{
  num:"肆", id:"p4", title:"视觉 Transformer 与生成模型", weeks:"第 19–24 周 · 约 90 学时",
  goal:"进入视觉前沿：<b>ViT 与 Transformer 视觉化</b>，以及<b>扩散模型与 SAM 基础模型</b>，理解「基础模型 + 提示」新范式。",
  outcomes:["讲清 ViT 的 patch embedding 与注意力机制","跑通 SAM 做零样本分割","理解扩散模型的去噪原理"],
  pitfalls:["以为 ViT 全面优于 CNN：在中小数据集上 ViT 往往不如 ResNet，其优势依赖大规模预训练。","把 SAM 的零样本效果当上限：专业领域（如医学影像）仍需适配微调，直接使用常常分割错位。","学扩散模型只看效果图：不理解加噪与去噪的数学过程，后续无法做任何改进。"],
  related:{href:"llm-agent.html#p1",label:"Transformer 原理深入见《大模型与智能体》阶段一"},
  resources:[
    {t:"ViT: An Image is Worth 16x16 Words",s:"arXiv 2010.11929",d:"Transformer 进入视觉的开山之作，理解 patch 切分与位置编码，读完与 CNN 对照。",url:"https://arxiv.org/abs/2010.11929",type:"论文",p:1},
    {t:"The Illustrated Transformer",s:"Jay Alammar · 图解经典",d:"读 ViT 前先深入理解注意力机制，半小时建立直觉。",url:"https://jalammar.github.io/illustrated-transformer/",type:"文档",p:1},
    {t:"SAM: Segment Anything",s:"arXiv 2304.02643 + github.com/facebookresearch/segment-anything",d:"分割基础模型：用点/框/mask 提示零样本分割任意物体，改变了分割任务的范式。",url:"https://arxiv.org/abs/2304.02643",type:"论文",p:1},
    {t:"SAM 实战：零样本分割",s:"基于官方代码",d:"用 SAM 在自己的图像上做点提示分割，体验基础模型的泛化能力。",url:"https://github.com/facebookresearch/segment-anything",type:"实战",p:1},
    {t:"Diffusion Models 论文与教程",s:"DDPM arXiv 2006.11239 + Lilian Weng 博客",d:"理解前向加噪与反向去噪过程，是当前生成模型的主流。",url:"https://arxiv.org/abs/2006.11239",type:"论文",p:1},
    {t:"Stable Diffusion 与 Hugging Face Diffusers",s:"huggingface.co/docs/diffusers",d:"用 Diffusers 库加载 Stable Diffusion 生成图像，理解 text-to-image 流程。",url:"https://huggingface.co/docs/diffusers",type:"实战",p:1},
    {t:"DETR: Detection Transformer",s:"arXiv 2005.12872",d:"用 Transformer 做目标检测，去掉锚框与 NMS，代表检测新范式。",url:"https://arxiv.org/abs/2005.12872",type:"论文",p:2},
    {t:"Swin Transformer",s:"arXiv 2103.14030",d:"窗口注意力让 ViT 可用于检测/分割的密集预测任务。",url:"https://arxiv.org/abs/2103.14030",type:"论文",p:2},
    {t:"DINO / MAE 自监督视觉预训练",s:"arXiv 2111.11432 / 2111.06377",d:"无监督学视觉特征的两大代表，理解对比学习与掩码自编码。",url:"https://arxiv.org/abs/2111.06377",type:"论文",p:2},
    {t:"ControlNet",s:"arXiv 2302.05543",d:"给扩散模型加条件控制（边缘、姿态、深度），是可控生成的核心工具。",url:"https://arxiv.org/abs/2302.05543",type:"论文",p:2},
    {t:"CLIP 多模态对比学习",s:"arXiv 2103.00020",d:"图文对齐的基础模型，理解视觉-语言联合预训练，是很多多模态方法的基石。",url:"https://arxiv.org/abs/2103.00020",type:"论文",p:2}
  ]
},
{
  num:"伍", id:"p5", title:"部署与研究入门", weeks:"第 25 周起 · 贯穿研究生阶段",
  goal:"让视觉模型<b>跑得快、用得起</b>，并从「使用者」成长为「研究者」：掌握推理优化、模型压缩、部署，复现论文并找课题。",
  outcomes:["用 TensorRT/ONNX 部署一个检测模型","理解量化、剪枝、知识蒸馏并完成一次对比","复现 1 篇 CV 论文并组会汇报"],
  pitfalls:["精度达标就宣布完成：部署时延迟、显存、模型体积同样是硬指标，应在训练前就确定约束。","导出 ONNX 后不校验：务必用同一输入对比 PyTorch 与 ONNX Runtime 的输出误差。","复现论文只跑通官方权重：不重新训练一遍，就无法确认自己掌握了训练细节。"],
  resources:[
    {t:"《How to Read a Paper》三遍读法",s:"S. Keshav · 经典方法论",d:"第一遍筛掉、第二遍抓内容、第三遍复现思路，读 CV 论文从这篇开始。",url:"https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf",type:"文档",p:1},
    {t:"ONNX 与 TensorRT 部署",s:"onnx.ai / developer.nvidia.com/tensorrt",d:"把 PyTorch 模型导出 ONNX 再用 TensorRT 加速，是视觉模型部署的事实标准。",url:"https://onnx.ai/",type:"工具",p:1},
    {t:"模型压缩：量化 / 剪枝 / 蒸馏",s:"torch.ao / torchvision",d:"理解 INT8 量化、结构化剪枝与知识蒸馏，降低部署成本。",url:"https://pytorch.org/docs/stable/quantization.html",type:"工具",p:1},
    {t:"Papers with Code",s:"paperswithcode.com",d:"论文 + 官方代码 + 数据集榜单三对照，判断 SOTA 与查找复现的第一入口。",url:"https://paperswithcode.com/",type:"工具",p:1},
    {t:"CVPR / ICCV / ECCV 会议论文",s:"thecvf.com",d:"计算机视觉三大顶会，每周扫标题摘要跟踪前沿，选题阶段重点关注。",url:"https://www.thecvf.com/",type:"文档",p:1},
    {t:"arXiv cs.CV 最新论文",s:"arxiv.org/list/cs.CV/recent",d:"每天/每周扫一遍预印本，保持对领域进展的敏感度。",url:"https://arxiv.org/list/cs.CV/recent",type:"文档",p:2},
    {t:"Connected Papers 文献关系图",s:"connectedpapers.com",d:"输入种子论文画出相关工作图谱，做文献综述与课题脉络梳理的高效工具。",url:"https://www.connectedpapers.com/",type:"工具",p:2},
    {t:"OpenMMLab 全家桶",s:"openmmlab.com",d:"分类/检测/分割/生成全覆盖，做论文复现与工程落地时的工具箱。",url:"https://openmmlab.com/",type:"工具",p:2},
    {t:"NCNN / MNN 移动端部署",s:"Tencent / Alibaba",d:"需要在手机端部署视觉模型时使用，与 TensorRT 对照学习。",url:"https://github.com/Tencent/ncnn",type:"工具",p:3}
  ]
}
];

const MILESTONES = [
  {t:"CIFAR-10 图像分类",when:"第 2 周",d:"用 PyTorch 实现一个简单 CNN 在 CIFAR-10 上训练，达到 80%+ 准确率，理解数据加载与训练循环。",deliver:"产出：可运行的训练脚本 + 准确率曲线"},
  {t:"ResNet 复现与调优",when:"第 6 周",d:"复现 ResNet-18 在 CIFAR-10 上达到 90%+，用表格记录学习率、增广、正则的消融对比。",deliver:"产出：实验记录表 + 训练曲线"},
  {t:"YOLO 目标检测实战",when:"第 11 周",d:"在自选小数据集（如口罩、交通标志）上完成数据标注 → 训练 → 评估 → 推理演示全流程。",deliver:"产出：检测项目 + Demo 图"},
  {t:"U-Net 语义分割",when:"第 16 周",d:"用 U-Net 在 ISBI 细胞或自选分割数据集上训练，输出 Dice/IoU 指标并可视化预测结果。",deliver:"产出：分割模型 + 预测可视化"},
  {t:"SAM 零样本分割",when:"第 21 周",d:"跑通 Segment Anything，用点/框提示在自己的图像上做零样本分割，理解基础模型的泛化能力。",deliver:"产出：SAM 推理 Demo"},
  {t:"模型部署与加速",when:"第 24 周",d:"把训练好的检测模型导出 ONNX 并用 TensorRT 加速，对比 PyTorch / ONNX / TensorRT 的推理速度。",deliver:"产出：部署脚本 + 速度对比表"},
  {t:"复现一篇 CV 论文",when:"第 27 周",d:"自选一篇 CV 论文（如 ViT、ControlNet 改进），复现核心实验，记录无法复现之处。",deliver:"产出：复现仓库 + 实验记录"},
  {t:"组会汇报与课题方向",when:"第 28 周以后",d:"精读 5 篇方向论文，做 15 分钟组会汇报，结合组内需求提出至少一个可行研究切入点。",deliver:"产出：组会 slides + 开题思路"}
];

const FAQS = [
  {q:"我没有深度学习基础，能直接学计算机视觉吗？",a:"<strong>不建议跳级。</strong>CV 建立在 CNN/Transformer 之上，需要深度学习与 PyTorch 基础。请先完成《深度学习》手册的前三个阶段，再开始本路线——地基不牢，越往上越吃力。"},
  {q:"分类、检测、分割该先学哪个？",a:"按 <strong>分类 → 检测 → 分割</strong> 顺序。分类是基础（理解 backbone 与训练），检测加定位，分割到像素级。这个顺序符合从粗到细的认知规律，也符合模型的历史演进。"},
  {q:"没有 GPU 能开始吗？",a:"完全可以。前两个阶段（分类基础）CPU 就能跑，再配合 Colab 和 Kaggle 的免费 GPU。检测/分割与 ViT 阶段（约第 10 周后）再申请实验室服务器资源。"},
  {q:"框架选 PyTorch 还是 TensorFlow？",a:"<strong>PyTorch，没有悬念。</strong>2026 年 CV 学术界与工程界（timm、MMDetection、YOLO、SAM 等）几乎全部基于 PyTorch，把有限精力投入到正确的地方。"},
  {q:"自己的数据太少，训不动模型怎么办？",a:"三条路：<strong>① 迁移学习</strong>——用 ImageNet 预训练模型微调；<strong>② 数据增强</strong>——Albumentations 做旋转、翻转、色彩抖动；<strong>③ 半监督/自监督</strong>——用 MAE、DINO 等利用无标注数据。小数据集上这三招往往比换模型更有效。"},
  {q:"怎么评估模型好坏？",a:"分类用准确率/精确率/召回率/F1；检测用 mAP@0.5、mAP@[.5:.95]；分割用 Dice/IoU/mIoU。<strong>一定要有固定测试集与基线对比</strong>，不要只看训练集效果，也不要凭几张预测图就下结论。"},
  {q:"CNN 还有必要学吗，Transformer 不是更好？",a:"<strong>必须学 CNN。</strong>CNN 是理解视觉归纳偏置（局部性、平移不变性）的钥匙，且在边缘部署、小数据集场景仍占优势。ViT 是 CNN 之上的扩展，不懂 CNN 也很难真正理解 ViT 为什么有效。"},
  {q:"怎么读 CV 论文？",a:"用「三遍读法」：第一遍 10 分钟看摘要+图+结论筛掉；第二遍 1 小时抓方法与实验；第三遍复现思路。<strong>先读经典（ResNet/YOLO/U-Net/ViT）建立版图，再追前沿</strong>。"},
  {q:"可以直接用大模型写 CV 代码吗？",a:"可以用它解释报错、讲解论文、生成样板代码，但<strong>核心算法必须独立理解并能复现</strong>。CV 中数据处理、增广、评测的细节很多，AI 生成的代码常有隐含 bug，必须亲自跑通、调试。"}
];

const STORE_KEY = "cv-roadmap-v1";
return {PHASES, MILESTONES, FAQS, STORE_KEY};
})();
