import fs from 'node:fs'
import path from 'node:path'
import { gzipSync, brotliCompressSync } from 'node:zlib'

const BUILD_DIR = path.join(process.cwd(), '.next')
const STATIC_DIR = path.join(BUILD_DIR, 'static')

function compressFile(filePath: string): void {
  const fileContent = fs.readFileSync(filePath)
  
  // Gzip
  const gzipped = gzipSync(fileContent)
  fs.writeFileSync(`${filePath}.gz`, gzipped)
  
  // Brotli
  const brotlied = brotliCompressSync(fileContent)
  fs.writeFileSync(`${filePath}.br`, brotlied)
}

function walkDir(dir: string, callback: (filePath: string) => void): void {
  if (!fs.existsSync(dir)) return
  fs.readdirSync(dir).forEach((f) => {
    const dirPath = path.join(dir, f)
    const isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath)
  })
}

console.log('Starting asset compression...')

if (fs.existsSync(STATIC_DIR)) {
  walkDir(STATIC_DIR, (filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.css') || filePath.endsWith('.html')) {
      compressFile(filePath)
    }
  })
  console.log('Successfully compressed assets (Gzip & Brotli).')
} else {
  console.warn('.next/static directory not found. Run "next build" first.')
}
