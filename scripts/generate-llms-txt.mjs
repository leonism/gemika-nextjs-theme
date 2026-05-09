import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_URL = 'https://gemika.com'; // Adjust this if needed, or get from env
const CONTENT_DIR = path.join(process.cwd(), 'content');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const sections = [
  { dir: 'posts', label: 'Articles' },
  { dir: 'projects', label: 'Projects' },
  { dir: 'pages', label: 'Pages' }
];

async function generate() {
  const allContent = [];
  const llmsTxtLinks = [];

  for (const section of sections) {
    const dirPath = path.join(CONTENT_DIR, section.dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
    
    const sectionLinks = [];
    
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      const slug = file.replace(/\.mdx?$/, '');
      const relativeUrl = section.dir === 'pages' ? `/${slug}` : `/${section.dir}/${slug}`;
      const fullUrl = `${BASE_URL}${relativeUrl}`;
      const mdUrl = `${BASE_URL}${relativeUrl}/index.md`;
      
      const title = data.title || slug;
      const description = data.description || '';
      
      sectionLinks.push(`- [${title}](${mdUrl}) - ${description}`);
      
      // Store for llms-full.txt
      allContent.push(`## ${title}\n\nURL: ${fullUrl}\n\n${content}\n\n---\n`);
      
      // Generate individual index.md
      const targetDir = path.join(PUBLIC_DIR, section.dir === 'pages' ? slug : `${section.dir}/${slug}`);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      const mdContent = `---\ntitle: ${title}\ndescription: ${description}\nurl: ${fullUrl}\n---\n\n# ${title}\n\n${content}`;
      fs.writeFileSync(path.join(targetDir, 'index.md'), mdContent);
    }
    
    if (sectionLinks.length > 0) {
      llmsTxtLinks.push(`## ${section.label}\n\n${sectionLinks.join('\n')}`);
    }
  }

  // Generate llms.txt
  const llmsTxt = `# Gemika\n\n> Modern Portfolio and AI-Optimized Theme\n\nThis site provides information about Gemika, its projects, and articles.\n\n${llmsTxtLinks.join('\n\n')}\n\n## Resources\n\n- [Full Content (llms-full.txt)](${BASE_URL}/llms-full.txt)`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms.txt'), llmsTxt);

  // Generate llms-full.txt
  const llmsFullTxt = `# Gemika - Full Content\n\nThis file contains the full markdown content of all pages for AI consumption.\n\n${allContent.join('\n\n')}`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'llms-full.txt'), llmsFullTxt);

  console.log('Successfully generated llms.txt, llms-full.txt, and individual index.md files.');
}

generate().catch(err => {
  console.error('Error generating LLM files:', err);
  process.exit(1);
});
