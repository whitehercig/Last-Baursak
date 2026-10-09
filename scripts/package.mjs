import fs from 'node:fs';import path from 'node:path';import {execFileSync} from 'node:child_process';
const root=path.resolve('.');const target=path.resolve('../last-baursak-source.zip');
execFileSync('python3',['-c',`import os,zipfile,sys\nroot,target=sys.argv[1:3]\nignored={'node_modules','dist','.git','.server-data','test-results'}\nwith zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as z:\n for folder,dirs,files in os.walk(root):\n  dirs[:]=[d for d in dirs if d not in ignored]\n  for f in files:\n   if f.startswith('.env') and f!='.env.example': continue\n   p=os.path.join(folder,f)\n   z.write(p,os.path.join('last-baursak',os.path.relpath(p,root)))\n`,root,target]);
console.log(`Source archive: ${target}`);
