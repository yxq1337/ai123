import type { Tool } from '@/lib/types'

interface ContentSimilarity {
  tool1: string
  tool2: string
  similarityScore: number
  reason: string
}

export function checkContentDuplicates(tools: Tool[]): ContentSimilarity[] {
  const duplicates: ContentSimilarity[] = []

  for (let i = 0; i < tools.length; i++) {
    for (let j = i + 1; j < tools.length; j++) {
      const tool1 = tools[i]
      const tool2 = tools[j]

      const similarities: string[] = []
      let score = 0

      const descSimilarity = calculateStringSimilarity(tool1.description, tool2.description)
      if (descSimilarity > 0.7) {
        similarities.push('描述内容高度相似')
        score += 30
      } else if (descSimilarity > 0.5) {
        similarities.push('描述内容有一定相似')
        score += 15
      }

      const expSimilarity = calculateStringSimilarity(tool1.review.ourExperience, tool2.review.ourExperience)
      if (expSimilarity > 0.6) {
        similarities.push('使用体验内容相似')
        score += 25
      }

      const categoryOverlap = tool1.categories.filter(c => tool2.categories.includes(c)).length
      if (categoryOverlap === tool1.categories.length && categoryOverlap === tool2.categories.length) {
        similarities.push('分类完全相同')
        score += 20
      } else if (categoryOverlap > 0) {
        similarities.push(`有${categoryOverlap}个分类重叠`)
        score += 10 * categoryOverlap
      }

      const prosSimilarity = calculateListSimilarity(tool1.review.pros, tool2.review.pros)
      if (prosSimilarity > 0.5) {
        similarities.push('优点列表高度相似')
        score += 15
      }

      const consSimilarity = calculateListSimilarity(tool1.review.cons, tool2.review.cons)
      if (consSimilarity > 0.5) {
        similarities.push('缺点列表高度相似')
        score += 15
      }

      if (score >= 40) {
        duplicates.push({
          tool1: tool1.slug,
          tool2: tool2.slug,
          similarityScore: Math.min(score, 100),
          reason: similarities.join('；')
        })
      }
    }
  }

  return duplicates.sort((a, b) => b.similarityScore - a.similarityScore)
}

function calculateStringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().replace(/\s+/g, '')
  const s2 = str2.toLowerCase().replace(/\s+/g, '')

  if (s1.length === 0 || s2.length === 0) return 0
  if (s1 === s2) return 1

  const longer = s1.length > s2.length ? s1 : s2
  const shorter = s1.length > s2.length ? s2 : s1

  const editDistance = levenshteinDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length
  const n = str2.length
  const dp: number[][] = []

  for (let i = 0; i <= m; i++) {
    dp[i] = []
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j
      } else if (j === 0) {
        dp[i][j] = i
      } else if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + 1
        )
      }
    }
  }

  return dp[m][n]
}

function calculateListSimilarity(list1: string[], list2: string[]): number {
  if (list1.length === 0 || list2.length === 0) return 0

  let matches = 0
  for (const item1 of list1) {
    for (const item2 of list2) {
      if (calculateStringSimilarity(item1, item2) > 0.7) {
        matches++
        break
      }
    }
  }

  return matches / Math.max(list1.length, list2.length)
}

export function validateToolContent(tool: Tool): { valid: boolean; issues: string[] } {
  const issues: string[] = []

  if (!tool.eeatMetadata.isHumanReviewed && tool.eeatMetadata.aiContributionPercent > 50) {
    issues.push('AI生成内容占比过高且未经过人工审核')
  }

  if (tool.description.length < 50) {
    issues.push('描述内容过短，建议增加到至少50字符')
  }

  if (tool.review.ourExperience.length < 200) {
    issues.push('使用体验内容过短，建议增加详细描述')
  }

  if (tool.review.pros.length < 2) {
    issues.push('优点列表过少，建议至少2条')
  }

  if (tool.review.cons.length < 1) {
    issues.push('建议至少添加1条缺点，保持评测客观性')
  }

  if (!tool.eeatMetadata.factChecked) {
    issues.push('内容未经过事实核查')
  }

  if (tool.eeatMetadata.authorExperience.length === 0) {
    issues.push('缺少作者相关经验描述')
  }

  if (!tool.faq || tool.faq.length === 0) {
    issues.push('建议添加常见问题解答（FAQ）')
  }

  return {
    valid: issues.length === 0,
    issues
  }
}

export function getContentQualityScore(tool: Tool): number {
  let score = 100

  if (!tool.eeatMetadata.isHumanReviewed) score -= 15
  if (tool.eeatMetadata.aiContributionPercent > 50) score -= 10
  if (tool.eeatMetadata.aiContributionPercent > 70) score -= 10
  if (!tool.eeatMetadata.factChecked) score -= 15
  if (tool.eeatMetadata.authorExperience.length === 0) score -= 10
  if (tool.eeatMetadata.verifiedCaseStudies.length === 0) score -= 10
  if (tool.description.length < 50) score -= 10
  if (tool.review.ourExperience.length < 200) score -= 15
  if (tool.review.pros.length < 2) score -= 5
  if (!tool.faq || tool.faq.length === 0) score -= 10

  return Math.max(score, 0)
}
