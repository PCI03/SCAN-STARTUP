// Real retained workers and full binary indices, deterministic descriptor/geometry fixtures.
const fs=require('fs'),path=require('path'),vm=require('vm'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const worker=id=>{const match=html.match(new RegExp('<script id="'+id+'"[^>]*>([\\s\\S]*?)</script>'));const context={module:{exports:{}},console};vm.createContext(context);vm.runInContext(match[1],context);return context.module.exports};
const visual=worker('pci-visual-worker');
for(const stem of ['visual-index','visual-index-ja','anniversary-index']){const m=JSON.parse(fs.readFileSync(path.join(root,'data',stem+'.json'))),bytes=new Uint8Array(fs.readFileSync(path.join(root,'data',stem+'.bin')));assert.equal(bytes.length,m.count*864);const i=Math.floor(m.count*.6);const hits=visual.searchIndex(bytes,[bytes.slice(i*864,(i+1)*864)],36);assert(hits.some(h=>h.i===i&&h.score>.999));console.log('PASS full index descriptor self retrieval',stem,m.count)}
const detector=worker('pci-worker-source');
const width=560,height=700,pixels=new Uint8ClampedArray(width*height*4);for(let y=0;y<height;y++)for(let x=0;x<width;x++){const k=(y*width+x)*4,inside=x>=120&&x<=435&&y>=110&&y<=550;const v=inside?210:25;pixels[k]=v;pixels[k+1]=v;pixels[k+2]=v;pixels[k+3]=255}
const r=detector.detect(pixels,width,height);assert(r.found);assert(r.corners.length===4);console.log('PASS synthetic rectangle detection');
