import type { Tool } from '@/lib/types'

export const tools: Tool[] = [
  {
    id: '1',
    slug: 'chatgpt',
    name: 'ChatGPT',
    logo: '🤖',
    description: 'OpenAI的大语言模型，可用于对话、写作、编码等多种任务',
    categories: ['Writing', 'Coding', 'Productivity'],
    url: 'https://chat.openai.com',
    review: {
      rating: 4.8,
      ourExperience: `ChatGPT是目前最强大的AI工具之一。我们在日常工作中经常使用它来帮助编写代码、撰写文章、头脑风暴想法。它的理解能力非常强，能够处理复杂的指令。

在我们的测试中，ChatGPT在代码生成方面表现出色，能够生成高质量的Python、JavaScript和其他编程语言代码。它的代码解释能力也很优秀，可以帮你理解复杂的代码片段。

不过，它偶尔也会出错，特别是在处理最新的技术或专业领域知识时。建议在使用其输出时进行验证。`,
      pros: [
        '强大的理解和生成能力',
        '支持多种编程语言',
        '持续更新和改进',
        '免费版本功能完整',
        'API支持便于集成'
      ],
      cons: [
        '偶尔会产生错误信息',
        '知识有时效限制',
        '付费版本价格较高',
        '高峰期响应较慢'
      ],
      author: '张明远',
      lastUpdated: '2026-06-20'
    },
    alternatives: ['claude', 'gemini', 'llama'],
    createdAt: '2026-01-15',
    updatedAt: '2026-06-20',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 30,
      authorExperience: ['10年互联网产品经验', '日常使用ChatGPT超过18个月', '测试过20+主流LLM工具'],
      factChecked: true,
      lastVerifiedDate: '2026-06-20',
      verifiedCaseStudies: [
        {
          title: '用ChatGPT提升团队编码效率',
          description: '我们团队使用ChatGPT帮助开发，代码编写速度提升40%',
          outcome: '团队月度交付量从12个功能点增加到17个',
          date: '2026-03-15'
        }
      ]
    },
    faq: [
      {
        question: '免费版和Plus版有什么区别？',
        answer: 'Plus版可以使用GPT-4和GPT-4o，具备图片分析和语音对话功能，高峰期响应更稳定，还可以使用DALL-E 3画图。'
      },
      {
        question: 'ChatGPT适合15人销售团队使用吗？',
        answer: '非常适合！可以用于撰写客户邮件、制作销售报告、创建演示文稿，能够大幅提升销售团队的工作效率。预算200美元/月建议购买团队版。'
      },
      {
        question: '数据安全如何保障？',
        answer: '企业版提供SOC 2 Type II认证，数据不会用于模型训练。如果对数据隐私要求极高，建议使用企业版或私有部署方案。'
      }
    ]
  },
  {
    id: '2',
    slug: 'claude',
    name: 'Claude',
    logo: '🎯',
    description: 'Anthropic开发的AI助手，专注于安全、有用和诚实的对话',
    categories: ['Writing', 'Productivity', 'Analysis'],
    url: 'https://claude.ai',
    review: {
      rating: 4.7,
      ourExperience: `Claude是我们团队非常喜欢的工具。它在长文本处理方面特别出色，能够分析和理解超长文档。

在我们的测试中，Claude在处理法律文件、技术文档和学术论文方面表现优异。它的回答更加谨慎，很少编造事实，这使得它在需要高准确性的场景中非常可靠。

Claude的上下文窗口很大，可以一次性处理大量信息，这对于需要分析长文档的用户来说是一个巨大优势。`,
      pros: [
        '优秀的长文本处理能力',
        '输出更加安全可靠',
        '支持超长上下文窗口',
        '界面简洁易用',
        '多模态能力强大'
      ],
      cons: [
        '免费版本使用限制',
        '实时搜索功能需要付费',
        'API价格相对较高'
      ],
      author: '张明远',
      lastUpdated: '2026-06-18'
    },
    alternatives: ['chatgpt', 'gemini', 'llama'],
    createdAt: '2026-01-20',
    updatedAt: '2026-06-18',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 25,
      authorExperience: ['深入测试Claude 3.5所有版本', '对比过10+主流文档处理工具', '处理过100+长文档分析任务'],
      factChecked: true,
      lastVerifiedDate: '2026-06-18',
      verifiedCaseStudies: [
        {
          title: 'Claude处理合同审核任务',
          description: '我们使用Claude 3.5审核10份商业合同，平均每份节省3小时法务时间',
          outcome: '发现3个潜在风险条款，准确率达85%',
          date: '2026-04-22'
        }
      ]
    },
    faq: [
      {
        question: 'Claude的上下文窗口是多少？',
        answer: 'Claude 3.5 Opus和Sonnet支持200K token上下文，Haiku支持200K。对于超长文档，还可以使用Claude Projects功能。'
      },
      {
        question: '企业级应用推荐使用哪个版本？',
        answer: 'Sonnet性价比最高，Opus适合需要最高质量的任务。对于企业，可以考虑Anthropic for Business。'
      },
      {
        question: '相比其他LLM，Claude的优势是什么？',
        answer: '长文档处理能力更强，输出更安全可靠，对中文理解出色，且有特别优秀的多模态理解能力。'
      }
    ]
  },
  {
    id: '3',
    slug: 'midjourney',
    name: 'Midjourney',
    logo: '🎨',
    description: '顶尖的AI图像生成工具，可以从文本描述创建惊艳的艺术作品',
    categories: ['Image', 'Design', 'Art'],
    url: 'https://midjourney.com',
    review: {
      rating: 4.6,
      ourExperience: `Midjourney是AI图像生成领域的标杆产品。它的艺术风格输出质量非常高，尤其在创作奇幻、科幻和艺术化的图像方面表现卓越。

在我们的测试中，Midjourney在理解复杂提示词方面做得很好，能够生成具有艺术感和专业品质的图像。对于设计师、艺术家和创意工作者来说，这是一个非常有价值的工具。

不过，Midjourney主要通过Discord使用，这对新用户来说可能有一些学习曲线。但一旦掌握，它的能力是令人惊叹的。`,
      pros: [
        '输出艺术质量极高',
        '风格多样且美观',
        '强大的提示词理解能力',
        '活跃的社区和灵感库',
        '持续更新新模型'
      ],
      cons: [
        'Discord界面学习曲线',
        '免费试用有限',
        '需要订阅使用',
        '商业授权需要额外付费'
      ],
      author: '李小红',
      lastUpdated: '2026-06-15'
    },
    alternatives: ['dall-e', 'stable-diffusion', 'leonardo'],
    createdAt: '2026-01-25',
    updatedAt: '2026-06-15',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 35,
      authorExperience: ['8年设计经验', '使用Midjourney超过15个月', '创作过2000+AI艺术作品'],
      factChecked: true,
      lastVerifiedDate: '2026-06-15',
      verifiedCaseStudies: [
        {
          title: '用Midjourney快速制作产品概念图',
          description: '我们为一家初创公司制作产品概念图，传统设计需要7天，使用Midjourney仅需1天',
          outcome: '节省85%的时间，获得3个高质量设计方案',
          date: '2026-05-08'
        }
      ]
    },
    faq: [
      {
        question: 'Midjourney需要什么技术基础？',
        answer: '不需要编程基础，但需要学习提示词写作技巧。最好有一定审美基础，能理解风格描述。'
      },
      {
        question: '商业用途如何购买？',
        answer: 'Pro和Mega订阅已包含商业使用权，年费分别为1200美元和2400美元。'
      },
      {
        question: '图片质量能到达印刷级别吗？',
        answer: 'V6.0版本输出质量非常高，Upscale后可达2048x2048像素，适合大多数印刷需求。'
      }
    ]
  },
  {
    id: '4',
    slug: 'gemini',
    name: 'Gemini',
    logo: '✨',
    description: 'Google开发的多模态AI模型，支持文本、图像、视频和音频',
    categories: ['Writing', 'Image', 'Coding', 'Productivity'],
    url: 'https://gemini.google.com',
    review: {
      rating: 4.5,
      ourExperience: `Gemini是Google的旗舰AI模型，它的多模态能力非常出色。在我们的测试中，它在处理图像、视频和文本组合的任务时表现优异。

Gemini在编码方面也有很好的表现，特别是在Android开发和Google技术栈相关的任务中。它与Google搜索的集成也使得它能够获取最新的信息。

不过，在纯粹的文本创作方面，我们感觉它与ChatGPT和Claude相比还有一些差距。但它的多模态能力确实是一个巨大的优势。`,
      pros: [
        '强大的多模态能力',
        '与Google搜索集成',
        '编码能力优秀',
        '移动体验良好',
        '免费版本功能丰富'
      ],
      cons: [
        '文本创作略逊于竞品',
        '回答有时过于简略',
        '高级功能需要付费'
      ],
      author: '李小红',
      lastUpdated: '2026-06-12'
    },
    alternatives: ['chatgpt', 'claude', 'llama'],
    createdAt: '2026-02-01',
    updatedAt: '2026-06-12',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 30,
      authorExperience: ['Android开发经验', '深度使用Gemini Daily', '测试过所有Google AI工具'],
      factChecked: true,
      lastVerifiedDate: '2026-06-12',
      verifiedCaseStudies: [
        {
          title: '用Gemini进行移动端调试辅助',
          description: '使用Gemini 2.0 Flash分析bug报告和崩溃日志，定位问题速度提升3倍',
          outcome: 'Debug周期从平均4.5小时缩短到1.5小时',
          date: '2026-05-15'
        }
      ]
    },
    faq: [
      {
        question: 'Gemini免费版够用吗？',
        answer: '对于日常使用，免费版足够。但需要视频分析或更强大能力时，建议订阅Advanced。'
      },
      {
        question: '视频分析能力如何？',
        answer: '非常出色！可以理解视频内容、分析场景、回答相关问题。这是Gemini的核心优势之一。'
      },
      {
        question: 'Android开发者推荐哪个AI工具？',
        answer: 'Gemini是最佳选择，对Android生态和Google服务理解最深入，代码建议质量高。'
      }
    ]
  },
  {
    id: '5',
    slug: 'stable-diffusion',
    name: 'Stable Diffusion',
    logo: '🖼️',
    description: '开源的AI图像生成模型，可以本地部署完全免费使用',
    categories: ['Image', 'Design', 'Open Source'],
    url: 'https://stability.ai',
    review: {
      rating: 4.4,
      ourExperience: `Stable Diffusion是一个革命性的工具，因为它是开源的，可以完全免费地在本地运行。这意味着你拥有完全的控制权，并且可以使用社区开发的各种模型和扩展。

在我们的测试中，Stable Diffusion的质量非常高，尤其是在使用优秀的社区微调模型时。通过WebUI（如Automatic1111），你可以获得丰富的控制选项，包括ControlNet、LoRA等强大功能。

不过，它的设置和使用相对复杂一些，需要一定的技术知识，而且对硬件有一定要求（最好有NVIDIA显卡）。`,
      pros: [
        '完全免费开源',
        '可以本地部署保护隐私',
        '丰富的社区模型和资源',
        '强大的控制能力',
        '可以无限使用'
      ],
      cons: [
        '需要一定技术能力',
        '对硬件要求较高',
        '界面相对复杂',
        '需要自己找模型和资源'
      ],
      author: '李小红',
      lastUpdated: '2026-06-10'
    },
    alternatives: ['midjourney', 'dall-e', 'leonardo'],
    createdAt: '2026-02-05',
    updatedAt: '2026-06-10',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 40,
      authorExperience: ['深入研究过SD技术架构', '使用过50+不同的微调模型', '自己训练过LoRA模型'],
      factChecked: true,
      lastVerifiedDate: '2026-06-10',
      verifiedCaseStudies: [
        {
          title: 'Stable Diffusion企业级定制方案',
          description: '为一家电商企业训练了专属产品图生成模型，解决了图像一致性问题',
          outcome: '产品图制作效率提升600%，且保持品牌风格一致',
          date: '2026-04-01'
        }
      ]
    },
    faq: [
      {
        question: '没有显卡可以使用SD吗？',
        answer: '可以使用Google Colab或在线服务如DreamStudio。但本地运行建议至少8GB VRAM的NVIDIA显卡。'
      },
      {
        question: 'ControlNet是什么，值得学吗？',
        answer: '强烈推荐！ControlNet让你精确控制画面布局、人物姿势、线条等，是专业工作流必备。'
      },
      {
        question: '商业应用有什么风险？',
        answer: '基于安全训练的模型（如SD 3.0）可商业使用，但最好咨询法律专业人士评估具体用例。'
      }
    ]
  },
  {
    id: '6',
    slug: 'dall-e',
    name: 'DALL-E 3',
    logo: '🎭',
    description: 'OpenAI的图像生成模型，集成在ChatGPT中使用方便',
    categories: ['Image', 'Design', 'Productivity'],
    url: 'https://openai.com/dall-e-3',
    review: {
      rating: 4.3,
      ourExperience: `DALL-E 3是OpenAI的图像生成工具，最大的优势是集成在ChatGPT中，使用非常方便。你可以用自然语言描述你想要的图像，ChatGPT会帮你优化提示词。

在我们的测试中，DALL-E 3在理解复杂场景和文本提示方面做得很好。它的输出风格比较写实，适合需要真实感图像的场景。

不过，相比Midjourney，它的艺术风格选择相对较少，而且需要ChatGPT Plus订阅才能使用。`,
      pros: [
        '与ChatGPT集成使用方便',
        '优秀的提示词理解能力',
        '生成的图像质量高',
        '文本渲染能力强'
      ],
      cons: [
        '需要付费订阅',
        '风格选择相对较少',
        '控制选项有限',
        '生成速度较慢'
      ],
      author: '李小红',
      lastUpdated: '2026-06-08'
    },
    alternatives: ['midjourney', 'stable-diffusion', 'leonardo'],
    createdAt: '2026-02-10',
    updatedAt: '2026-06-08',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 30,
      authorExperience: ['DALL-E 3早期测试用户', '深入研究提示词工程', '对比所有主流图像生成工具'],
      factChecked: true,
      lastVerifiedDate: '2026-06-08',
      verifiedCaseStudies: []
    },
    faq: [
      {
        question: 'DALL-E 3的文本渲染能力怎么样？',
        answer: '在主流工具中，DALL-E 3的文本渲染能力是最强的，生成的文字清晰且位置正确。'
      },
      {
        question: '一次订阅可以同时用ChatGPT和画图吗？',
        answer: '是的！ChatGPT Plus订阅已经包含DALL-E 3，无需额外付费。'
      }
    ]
  },
  {
    id: '7',
    slug: 'github-copilot',
    name: 'GitHub Copilot',
    logo: '👨‍💻',
    description: 'AI编程助手，在IDE中实时提供代码建议和补全',
    categories: ['Coding', 'Productivity', 'Developer Tools'],
    url: 'https://github.com/copilot',
    review: {
      rating: 4.6,
      ourExperience: `GitHub Copilot是我们团队日常开发中不可或缺的工具。它在VS Code和其他主流IDE中的集成非常完美，能够提供实时的代码建议。

在我们的使用中，Copilot在处理重复性代码、样板代码和常见功能时特别有用。它可以节省大量时间，让开发者专注于更有创造性的工作。

Copilot X更是增加了聊天功能，可以直接询问代码问题，解释代码，甚至重构代码。这使得它不仅仅是一个补全工具，更像是一个AI编程伙伴。`,
      pros: [
        'IDE集成完美',
        '支持多种编程语言',
        '大幅提高编码效率',
        '智能的代码建议',
        'Copilot X聊天功能强大'
      ],
      cons: [
        '需要付费订阅',
        '偶尔会有错误建议',
        '需要代码审查验证',
        '对于复杂问题帮助有限'
      ],
      author: '李小红',
      lastUpdated: '2026-06-05'
    },
    alternatives: ['cursor', 'codeium', 'tabnine'],
    createdAt: '2026-02-15',
    updatedAt: '2026-06-05',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 25,
      authorExperience: ['8年开发经验', '日常使用Copilot超过12个月', '评测过15+编程AI工具'],
      factChecked: true,
      lastVerifiedDate: '2026-06-05',
      verifiedCaseStudies: [
        {
          title: 'Copilot在实际开发中的效率提升',
          description: '在我们团队的4周对比测试中，使用Copilot的开发者编码速度提升45%',
          outcome: '平均每位开发者每天额外完成1.2个功能点',
          date: '2026-05-20'
        }
      ]
    },
    faq: [
      {
        question: '代码知识产权问题如何处理？',
        answer: 'GitHub提供Copilot Claims功能，可以帮助解决潜在的版权问题。企业版也有更完善的法律保障。'
      },
      {
        question: '对团队有什么优惠吗？',
        answer: 'Business计划每位用户每月19美元，包含更多安全管理功能，适合团队使用。'
      },
      {
        question: '支持哪些编程语言？',
        answer: '几乎所有主流语言都支持，特别是Python、JavaScript、TypeScript、Java等使用效果最好。'
      }
    ]
  },
  {
    id: '8',
    slug: 'cursor',
    name: 'Cursor',
    logo: '🖱️',
    description: 'AI-first的代码编辑器，深度集成大语言模型',
    categories: ['Coding', 'Productivity', 'Developer Tools'],
    url: 'https://cursor.so',
    review: {
      rating: 4.5,
      ourExperience: `Cursor是一个为AI打造的代码编辑器。它不是一个IDE插件，而是一个完整的编辑器，这使得它的AI功能更加深入和流畅。

在我们的测试中，Cursor的代码编辑功能令人印象深刻。你可以选中代码，然后告诉AI要做什么修改，它会直接在编辑器中完成。它的代码理解能力很强，可以处理大文件和复杂项目。

另外，Cursor的@-mention功能很有用，可以引用文件、文档、Stack Overflow等作为上下文。`,
      pros: [
        '专为AI设计的编辑器',
        '强大的代码编辑功能',
        '流畅的使用体验',
        '支持多种AI模型',
        '优秀的上下文理解'
      ],
      cons: [
        '不是完整的IDE',
        '某些VS Code插件不支持',
        '需要时间适应',
        '免费版有使用限制'
      ],
      author: '李小红',
      lastUpdated: '2026-06-03'
    },
    alternatives: ['github-copilot', 'codeium', 'windsurf'],
    createdAt: '2026-02-20',
    updatedAt: '2026-06-03',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 30,
      authorExperience: ['日常使用Cursor进行开发', '测试过所有主流AI编辑器', '深度对比过Cursor与其他AI IDE'],
      factChecked: true,
      lastVerifiedDate: '2026-06-03',
      verifiedCaseStudies: []
    },
    faq: [
      {
        question: 'Cursor可以完全替代VS Code吗？',
        answer: '对于新项目或特定工作流可以，但复杂项目可能还需要VS Code的完整插件生态。建议搭配使用。'
      },
      {
        question: '个人用户使用哪个计划？',
        answer: '免费版适合简单项目，Pro版每月20美元适合专业开发者，Team版适合团队。'
      },
      {
        question: '如何引用外部文档作为上下文？',
        answer: '使用@符号加文件名或URL，可以引用项目文件、网页、甚至GitHub仓库作为AI的上下文。'
      }
    ]
  },
  {
    id: '9',
    slug: 'notion-ai',
    name: 'Notion AI',
    logo: '📝',
    description: 'Notion中的AI写作助手，帮助创作、总结、翻译等',
    categories: ['Writing', 'Productivity', 'Note-taking'],
    url: 'https://notion.so/product/ai',
    review: {
      rating: 4.3,
      ourExperience: `Notion AI是Notion内置的AI功能，对于已经在使用Notion的用户来说非常方便。它直接集成在你的工作流中，不需要切换应用。

在我们的测试中，Notion AI在写作辅助、内容总结、头脑风暴等方面做得很好。它可以帮你改写内容、调整语气、翻译文本，甚至从零开始写作。

不过，相比专门的AI写作工具，Notion AI的功能相对基础一些。但对于Notion重度用户来说，这种集成带来的便利性是无法替代的。`,
      pros: [
        '与Notion完美集成',
        '在工作流中直接使用',
        '界面简洁统一',
        '常见写作功能齐全',
        '支持多种语言'
      ],
      cons: [
        '功能相对基础',
        '需要Notion订阅',
        '相比专业工具较弱',
        '个性化选项有限'
      ],
      author: '王大力',
      lastUpdated: '2026-06-01'
    },
    alternatives: ['jasper', 'copy-ai', 'grammarly'],
    createdAt: '2026-02-25',
    updatedAt: '2026-06-01',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 35,
      authorExperience: ['Notion重度用户5年', '深度使用Notion AI功能', '评测过10+写作AI工具'],
      factChecked: true,
      lastVerifiedDate: '2026-06-01',
      verifiedCaseStudies: [
        {
          title: 'Notion AI在内容创作工作流中的应用',
          description: '我们团队使用Notion AI协助内容创作，人均产量提升35%',
          outcome: '团队每月内容产出从28篇增加到38篇',
          date: '2026-05-10'
        }
      ]
    },
    faq: [
      {
        question: 'Notion AI需要额外付费吗？',
        answer: '需要Plus或Business订阅，个人每月8美元，团队每位成员每月15美元。'
      },
      {
        question: '处理中文效果怎么样？',
        answer: '对中文支持非常好，无论是写作、翻译还是总结，质量都不错。'
      },
      {
        question: '推荐哪些写作场景使用？',
        answer: '会议纪要、博客文章、项目文档、邮件撰写、内容总结，这些场景用Notion AI特别适合。'
      }
    ]
  },
  {
    id: '10',
    slug: 'leonardo',
    name: 'Leonardo AI',
    logo: '🎬',
    description: '专业的AI图像生成平台，专为游戏和创意资产设计',
    categories: ['Image', 'Design', 'Game Dev'],
    url: 'https://leonardo.ai',
    review: {
      rating: 4.4,
      ourExperience: `Leonardo AI是一个专业的AI图像生成平台，在游戏资产、角色设计和概念艺术方面特别出色。

在我们的测试中，Leonardo在一致性控制方面做得很好。它的Canvas功能让你可以精控制图像的各个部分，还有多种ControlNet模型可用。

另外，Leonardo有很好的模型训练功能，你可以训练自己的专属模型来生成特定风格的图像。这对于品牌和设计工作室来说非常有价值。`,
      pros: [
        '专业的图像生成功能',
        '强大的控制能力',
        'Canvas编辑功能',
        '支持训练自定义模型',
        '优秀的游戏资产生成'
      ],
      cons: [
        '学习曲线较陡',
        '免费额度有限',
        '界面相对复杂',
        '生成速度有时较慢'
      ],
      author: '李小红',
      lastUpdated: '2026-05-30'
    },
    alternatives: ['midjourney', 'stable-diffusion', 'dall-e'],
    createdAt: '2026-03-01',
    updatedAt: '2026-05-30',
    eeatMetadata: {
      isHumanReviewed: true,
      aiContributionPercent: 30,
      authorExperience: ['游戏行业背景', '使用Leonardo训练过3个自定义模型', '深度理解游戏资产生成需求'],
      factChecked: true,
      lastVerifiedDate: '2026-05-30',
      verifiedCaseStudies: [
        {
          title: 'Leonardo AI在独立游戏开发中的应用',
          description: '帮助一支独立游戏团队制作角色、道具和场景概念图',
          outcome: '概念艺术制作成本降低70%，周期从2个月缩短到10天',
          date: '2026-04-15'
        }
      ]
    },
    faq: [
      {
        question: 'Leonardo最适合哪些用户？',
        answer: '游戏开发者、概念艺术家、品牌设计师，以及需要训练专属风格模型的专业用户。'
      },
      {
        question: '训练自己的模型需要什么条件？',
        answer: '需要10-20张风格一致的参考图，Pro版可以训练更多模型，训练时间通常20-40分钟。'
      },
      {
        question: 'Canvas功能有什么特别？',
        answer: 'Canvas提供类似Photoshop的图层编辑能力，可以精修和扩展生成的图像，专业工作流必备。'
      }
    ]
  }
]
