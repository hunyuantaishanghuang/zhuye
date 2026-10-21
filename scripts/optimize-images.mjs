#!/usr/bin/env node
/**
 * 图片优化脚本
 * 将 PNG/JPG 图片转换为 WebP 格式以减小文件大小
 */

import { promises as fs } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..', 'public', 'img');

// 需要处理的图片目录
const dirsToProcess = [
  '',
];

async function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    // 使用 cwebp 转换
    execSync(`cwebp -q ${quality} "${inputPath}" -o "${outputPath}"`, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`转换失败: ${inputPath}`, error.message);
    return false;
  }
}

async function processImages() {
  console.log('📸 开始优化图片...\n');

  for (const dir of dirsToProcess) {
    const fullDir = join(rootDir, dir);
    try {
      const files = await fs.readdir(fullDir);
      
      for (const file of files) {
        if (/\.(png|jpg|jpeg)$/i.test(file)) {
          const inputPath = join(fullDir, file);
          const outputPath = join(fullDir, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
          
          // 检查文件大小
          const inputStats = await fs.stat(inputPath);
          const inputSize = (inputStats.size / 1024).toFixed(2);
          
          if (inputStats.size > 100 * 1024) { // 只处理大于 100KB 的图片
            console.log(`🖼️  处理: ${file} (${inputSize} KB)`);
            
            const success = await convertToWebP(inputPath, outputPath);
            if (success) {
              const outputStats = await fs.stat(outputPath);
              const outputSize = (outputStats.size / 1024).toFixed(2);
              const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
              console.log(`   ✅ 压缩完成: ${outputSize} KB (节省 ${savings}%)\n`);
            }
          }
        }
      }
    } catch (error) {
      console.error(`处理目录失败: ${fullDir}`, error);
    }
  }
  
  console.log('🎉 图片优化完成!');
}

processImages();
