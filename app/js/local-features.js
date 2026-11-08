/* Chinese UI and non-destructive adjustment presets. */
const UI_ZH = {
"Color":"颜色","Depth":"深度","Step 1":"第一步","Step 2":"第二步","Step 3":"第三步","Step 4":"第四步",
"Crop + Scale input image":"裁剪与缩放图片","Resolution":"分辨率","Target Resolution:":"目标颗粒尺寸：","Width:":"宽度：","Height:":"高度：",
"Enable 3D":"启用立体模式","Input Image":"输入图片","Get depth map":"获取深度图","Select":"选择","Select Depth Map Image":"选择深度图","Generate":"生成","Compute Using DNN":"自动估算深度图",
"Increase Limit":"提高上限","Increase Resolution Limit":"提高分辨率上限","Important":"提示","How does this work?":"工作原理","Citation for Model Used":"模型出处",
"Interpolate + Adjust colors":"缩放算法与颜色调整","Interpolation":"缩放算法","Browser Default":"浏览器默认","HSV":"色相 / 饱和度 / 明度",
"Hue adjustment:":"色相：","Saturation adjustment:":"饱和度：","Value adjustment:":"明度：","Reset HSV":"重置色彩","Brightness":"亮度","Brightness adjustment:":"亮度：","Reset Brightness":"重置亮度","Contrast":"对比度","Contrast adjustment:":"对比度：","Reset Contrast":"重置对比度",
"Make depth discrete":"将深度划分为层级","Level Count":"层数","Number of depth levels:":"深度层数：","Thresholds":"深度阈值","Depth threshold":"深度阈值","Troubleshooting":"调整提示",
"Align to closest pixel from available colors":"匹配可用的颗粒颜色","Average":"平均","Paintbrush":"画笔","Eraser":"橡皮擦","Dropper":"吸管",
"Available Colors":"可用颜色与数量","Required Pieces:":"所需颗粒：","Available Pieces:":"可用颗粒：","Missing Pieces:":"缺少颗粒：","Clear Available Pieces":"清空可用颗粒","Infinite Piece Counts":"不限颗粒数量","Note":"提示",
"Number Available":"可用数量","+ Add Stud":"＋添加颜色","Export Selected Studs":"导出配色与库存","Mix in Studs From Existing Set":"加入配色库存","Pixel Piece":"颗粒形状","Bricklink Pixel Piece":"颗粒类型","Available Dimensions:":"可用尺寸：",
"Quantization":"颜色量化算法","Color Distance Function":"颜色距离算法","Euclidean RGB":"RGB 欧氏距离","Quantization Algorithm":"量化策略","2 Phase":"两阶段匹配","Color Tie Resolution Strategy":"同色分配策略","Strategy: Alternating Mod":"交替分配","Blocking Factor:":"分组大小：",
"Adjust Depth Map":"调整深度图","Edit Depth":"编辑深度","Clear Overrides":"清除手动修改","Expand Picture":"放大预览","Collapse Picture":"收起预览",
"Correct for available pieces, if piece counts are limited":"按实际库存校正最终拼图","Pieces Used":"用料清单","Pieces Used in Final Image":"最终图像用料","Dimensions":"尺寸","Number Used":"用量","Pieces Missing From Step 3":"与第三步相比缺少的颗粒","Number Missing":"缺少数量",
"Export Piece List":"导出采购清单","Copy Bricklink XML to Clipboard":"复制 BrickLink 采购 XML","Frame elements are not exported":"不包含外框零件","Bricklink Upload Page":"打开 BrickLink 导入页","U.S. Pick a Brick Page":"打开 LEGO 选购页",
"Instructions":"拼搭图纸","Generate Instructions PDF":"生成拼搭图纸","Generate Color Instructions PDF":"生成彩色拼搭图纸","Generate Depth Instructions PDF":"生成深度拼搭 PDF","High quality pdf":"高质量 PDF","Longer instructions may be split into multiple files":"页数较多时会拆分为多个 PDF 文件",
"Color names are Bricklink colors":"颜色附中文名称与 色号","3D Preview":"立体预览","Tips":"使用提示","Preview effect intensity":"立体效果强度","Depth Plates":"深度垫片","Available Plates:":"可用垫片：",
"Get Started":"开始制作","Input Pieces:":"可用配色：","Input set":"选择配色","Select Input Image":"上传图片","Or":"或","See an Example":"查看示例",
"1x1 Round Tile":"1×1 圆形光面颗粒","1x1 Round Plate":"1×1 圆形凸点颗粒","1x1 Square Tile":"1×1 方形光面颗粒","1x1 Square Plate":"1×1 方形薄板","1x1 Square Brick":"1×1 方形砖","Variable Tile":"可变尺寸光面颗粒","Variable Plate":"可变尺寸薄板","Variable Brick":"可变尺寸砖",
"Max Pooling":"最大值缩放","Min Pooling":"最小值缩放","Average Pooling":"平均值缩放","Dual Min Max Pooling":"明暗自适应缩放",
"Supported image formats are dependent on your browser's compatibility":"支持的图片格式取决于浏览器。","Due to the nature of the Lego Art sets, images with transparency aren't fully supported":"建议使用不透明图片，透明区域可能影响配色。",
"Enabling 3D mode allows for designing pictures with multiple layers, where some pixels protrude further out than others":"立体模式用不同层数的垫片控制颗粒凸起的高度。","This may not be a good fit for all images, but can work quite well in many cases":"适合主体与背景有明显层次的图片。",
"Be careful when using high resolutions - this can cause performance issues on less powerful machines, especially during pdf generation and for 3D previews":"分辨率越高，用料和计算量越大，生成 PDF 与立体预览也会更慢。",
"Depth map cropping will match input image":"深度图会与输入图片使用相同裁剪区域。","If you have a depth map corresponding to your image you can select it here. If you don't, you can generate an approximation in the 'generate' section.":"可以上传对应的深度图，也可以使用自动估算。",
"This will compute an approximation of the depth map if you do not have one":"根据输入图片估算深度图。","Computing the depth map can be computationally expensive. Be prepared to wait a bit, and be careful, especially if you have a less powerful device.":"深度计算较耗资源，低性能设备可能需要较长时间。",
"This setting determines which algorithm is used to resize the image to the target resolution":"选择图片缩小到目标颗粒尺寸时使用的算法。",
"Determines how many discrete levels of depth you want the pixels of the image to have, where each level is one Lego plate deep":"每个深度层级相差一层乐高薄板的厚度。",
"Adjusts the threshold":"调整分界值","for separating the discrete depth levels":"以划分不同深度层级。","If the discretized depth map is blank, make sure you've selected or computed a depth map in step 1, and adjust the threshold":"若深度预览为空，请先在第一步上传或生成深度图，再调整阈值。","so that they are between the sections of the image you want to separate":"让分界值落在需要分开的明暗区域之间。",
"● This section specifies how many pieces of each color you have available to create the image":"● 设置每种颜色的实际库存，或选择不限数量。","● Color names are bricklink colors":"● 保留原版配色；选择“我们的可购买配色（46 色）”可按采购清单匹配。","● Step 4 of the algorithm cannot run unless you select enough pieces to fill the picture ('Missing Pieces' must be 0)":"● 有限库存模式下，缺少颗粒必须为 0 才能执行第四步。","● If you're working with an existing set, then clear the available pieces and use the mix in option to add in the pieces from your set.":"● 可以导入已有库存，或逐项调整每种颜色数量。",
"Mixed in studs are added to studs already selected":"导入数量会累加到当前库存。","Make sure the set you're mixing in studs from matches the selected pixel piece":"请确认采购的颗粒形状与所选类型一致。",
"● This setting determines which distance function is used to align pixels to their closest Lego colors":"● 选择如何计算图片颜色与颗粒颜色之间的距离。","● This determines what strategy is used for aligning pixels":"● 选择如何分配颜色及处理细节。","● Some algorithms run faster than others - be careful when running the greedy algorithms on larger images":"● 大图使用贪心算法时计算可能较慢。",
"Changing this is useful if you have a large background but not enough pieces to fill it out uniformly in step 4":"背景面积大而单色库存不足时，可调整同色分配方式。","Adding these pieces will allow the image from step 4 to match the image from step 3":"补齐这些颗粒，可使最终图像更接近第三步的效果。",
"The type of piece used depends on 'Pixel Piece' under step 3":"导出的零件类型由第三步的颗粒形状决定。","'Missing Pieces' under 'Available Colors' must be 0":"可用颜色中的缺少颗粒数量必须为 0。",
"If you can't see the 3D effect when hovering your mouse over the image, check the input from depth step 1":"若移动鼠标后没有立体效果，请检查第一步的深度图。",
"● This is a (very) rough preview of what the 3D effect might look like":"● 立体预览仅供参考。","● Hover your mouse over the image to vary the perspective":"● 在图片上移动鼠标可改变视角。","● Make sure your depth map is not blank":"● 请确认深度图不为空。","● This is unlikely to work well on less powerful devices, since this is generated dynamically":"● 实时立体预览较耗性能。","● Keep in mind that the effect varies from browser to browser, can be subtle, and may not be 100% representative of what the physical art piece would look like":"● 浏览器预览与实物效果可能有差异。",
"● This is the set of plates that may be used to generate depth instructions and piece lists":"● 选择用于生成深度图纸与清单的垫片。","● These pieces are used as padding so that the correct pixels protrude outwards":"● 垫片用于控制各区域的凸起高度。","● Note that larger plates may be difficult to attach/detach from the base":"● 大尺寸垫片可能较难拆装。",
"● Click a pixel to increase its height":"● 点击颗粒增加高度。","● Click a pixel to decrease its height":"● 点击颗粒降低高度。",
"This can also be changed or adjusted piece by piece later":"之后仍可逐项修改颜色和数量。"
};
function translateUI(root=document.body) {
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
 nodes.forEach(node=>{
  if (/^(SCRIPT|STYLE|TEXTAREA)$/.test(node.parentElement?.tagName)) return;
  const text=node.textContent.trim().replace(/\s+/g,' ');
  let zh=UI_ZH[text];
  if (!zh && text.startsWith('The depth map is computed')) zh='深度估算在浏览器内运行，使用开源模型：';
  if (zh) node.textContent=node.textContent.replace(node.textContent.trim(),zh);
 });
 root.querySelectorAll?.('[title],[placeholder]').forEach(el=>['title','placeholder'].forEach(a=>{if(UI_ZH[el.getAttribute(a)])el.setAttribute(a,UI_ZH[el.getAttribute(a)]);}));
}
Object.assign(UI_ZH, {
 "All Tile Colors":"全部光面颗粒颜色","All Stud Colors":"全部凸点颗粒颜色","All Supported Colors":"全部支持颜色","All Pick a Brick Stud Colors":"Pick a Brick 颗粒配色",
 "All Available Tile Colors":"全部光面颗粒颜色","All Available Stud Colors":"全部凸点颗粒颜色",
 "Reselect Input Image":"重新上传图片","Copy Pixels Bricklink XML to Clipboard":"复制颗粒采购 XML",
 ". The model used is":"。使用的模型是","- more specifically, the small ONNX version which can be found":"，采用小型 ONNX 版本，下载地址：","here":"这里",
 "Floyd-Steinberg Dithering":"Floyd–Steinberg 抖动","Jarvis-Judice-Ninke Dithering":"Jarvis–Judice–Ninke 抖动","Atkinson Dithering":"Atkinson 抖动","Sierra Dithering":"Sierra 抖动","Greedy Gaussian Dithering":"贪心高斯抖动",
 "None":"无","Random":"随机分配","Mod 2":"按 2 取模","Mod 3":"按 3 取模","Mod 4":"按 4 取模","Mod 5":"按 5 取模","Noisy Mod 2":"随机扰动 / 模 2","Noisy Mod 3":"随机扰动 / 模 3","Noisy Mod 4":"随机扰动 / 模 4","Noisy Mod 5":"随机扰动 / 模 5","Cascading Mod":"级联取模","Cascading Noisy Mod":"级联扰动取模","Alternating Noisy Mod":"交替扰动取模",
 "Import From File":"从文件导入库存","Custom":"自定义库存","Euclidean LAB":"LAB 欧氏距离",
 "Alternating Mod":"交替分配","Greedy":"贪心匹配","Greedy with Dithering":"贪心抖动匹配",
 "2 Phase":"两阶段匹配","Floyd Steinberg":"Floyd–Steinberg 抖动","False Floyd Steinberg":"简化 Floyd–Steinberg 抖动",
 "Jarvis Judice Ninke":"Jarvis–Judice–Ninke 抖动","Atkinson":"Atkinson 抖动","Stucki":"Stucki 抖动","Burkes":"Burkes 抖动","Sierra":"Sierra 抖动","Two Row Sierra":"双行 Sierra 抖动","Sierra Lite":"简化 Sierra 抖动",
 "It's often best to use":"建议优先使用","for the color distance function, for mathematical cleanliness":"作为颜色距离算法。",
 ": Since a variable size pixel type was selected,":"：使用可变尺寸颗粒时，","under":"位于","was enabled - be careful!":"已自动启用。",
 ": Since this is a linear error dithering algorithm,":"：使用线性误差抖动算法时，","section":"设置中。",
 ": Infinite piece counts were used, since a linear error dithering algorithm was selected in the":"：已启用不限数量，因为使用了线性误差抖动算法，位于",
 "section, or a variable piece type was selected in the":"设置中；或使用了可变尺寸颗粒，位于",
 ": Any colors painted using the paintbrush are assumed to exist when infinite piece counts are enabled":"：不限数量时，画笔颜色也视为库存充足。",
 "● Click a pixel to increase its height":"● 点击颗粒增加高度。","● Click a pixel to decrease its height":"● 点击颗粒降低高度。",
 "'Quantization'":"“颜色量化算法”","'Pixel Piece'":"“颗粒形状”","'Infinite Piece Counts'":"“不限颗粒数量”","'Available Colors'":"“可用颜色与数量”","'Euclidean RGB'":"“RGB 欧氏距离”"
});
PURCHASE_COLORS.forEach(c=>{UI_ZH[c.name]=`${c.zh} · ${c.legoId}`;});
translateUI();
let translationPending=false;
new MutationObserver(()=>{if(!translationPending){translationPending=true;requestAnimationFrame(()=>{translationPending=false;translateUI();});}}).observe(document.body,{childList:true,subtree:true,characterData:true});

const presetPanel=document.createElement('section');
presetPanel.className='card card-body mb-2';
presetPanel.innerHTML=`<b>一键调色</b><small class="text-muted mb-2">预设会替换当前色彩参数；应用后仍可用下方滑块微调。</small><select class="form-control form-control-sm" id="color-preset"><option value="original">原图 / 重置全部</option><option value="portrait">自然人像</option><option value="bright">暗图提亮</option><option value="soft">柔和肤色</option><option value="vivid">鲜艳插画</option><option value="detail">增强层次</option><option value="mono">黑白明暗</option></select><button class="btn btn-primary btn-sm mt-2" id="apply-color-preset">应用预设</button><small id="preset-feedback" class="mt-2" role="status"></small>`;
document.getElementById('step-2-accordion').before(presetPanel);
const COLOR_PRESETS={original:[0,0,0,0,0],portrait:[0,-8,4,5,10],bright:[0,0,8,22,8],soft:[0,-15,3,8,-10],vivid:[0,25,0,0,20],detail:[0,3,0,2,32],mono:[0,-100,0,0,18]};
document.getElementById('apply-color-preset').onclick=()=>{
 const select=document.getElementById('color-preset');
 ['hue','saturation','value','brightness','contrast'].forEach((name,i)=>{
  const val=COLOR_PRESETS[select.value][i];document.getElementById(name+'-slider').value=val;
  document.getElementById(name+'-text').textContent=val+(i===0?'°':i<3?'%':'');
 });
 document.getElementById('preset-feedback').textContent='已应用：'+select.selectedOptions[0].textContent;
 if(typeof inputImageCropper!=='undefined' && inputImageCropper)runStep2();
};

const depthPresets=document.createElement('div');depthPresets.className='mb-2';
depthPresets.innerHTML=`<label for="depth-preset">阈值预设</label><select id="depth-preset" class="form-control form-control-sm"><option value="uniform">均匀分层</option><option value="quantile">按图像自动分层</option><option value="subject">突出近景主体</option><option value="background">增加背景层次</option></select><button id="apply-depth-preset" class="btn btn-primary btn-sm mt-2">应用阈值</button><small class="d-block mt-2" id="depth-feedback" role="status">先上传或生成深度图；预设只改变分界值，不改变层数。</small>`;
document.getElementById('depth-threshold-sliders-containers').before(depthPresets);
document.querySelectorAll('.threshold-plural-s').forEach(el=>el.textContent='');
document.getElementById('depth-threshold-sliders-containers').addEventListener('input',()=>{
 const inputs=[...document.getElementById('depth-threshold-sliders-containers').children];
 inputs.forEach((input,i)=>input.title=`第 ${i+1} 个分界值：${input.value}`);
 document.getElementById('depth-feedback').textContent='当前分界值：'+inputs.map(input=>input.value).join(' / ');
});
document.getElementById('apply-depth-preset').onclick=()=>{
 const inputs=[...document.getElementById('depth-threshold-sliders-containers').children];
 const mode=document.getElementById('depth-preset').value;
 let histogram=null,total=0;
 if(mode==='quantile'){
  const ctx=inputDepthCanvas.getContext('2d');const pixels=ctx.getImageData(0,0,inputDepthCanvas.width,inputDepthCanvas.height).data;
  histogram=new Array(256).fill(0);
  for(let i=0;i<pixels.length;i+=4)if(pixels[i+3]){histogram[pixels[i]]++;total++;}
  if(!total||histogram.filter(n=>n>0).length<2){document.getElementById('depth-feedback').textContent='请先上传或生成有明暗变化的深度图。';return;}
 }
 inputs.forEach((input,i)=>{
  const fraction=(i+1)/(inputs.length+1);let value=Math.round(255*Math.pow(fraction,mode==='subject'?0.65:mode==='background'?1.5:1));
  if(histogram){let sum=0;value=255;for(let j=0;j<256;j++){sum+=histogram[j];if(sum>=total*fraction){value=j;break;}}}
  input.value=value;
 });
 document.getElementById('depth-feedback').textContent='当前分界值：'+inputs.map(i=>i.value).join(' / ');
 if(typeof inputImageCropper!=='undefined'&&inputImageCropper)runStep1();
};
const info=document.createElement('details');info.className='card card-body my-2';
info.innerHTML='<summary>可购买配色 · 46 色</summary><small>采购范围以你提供的清单为准。色号与 BrickLink 编号不同，XML 仍使用 BrickLink 编号。金属与珠光色的屏幕预览仅为近似色。</small><div id="purchase-swatches" class="mt-2"></div>';
document.getElementById('image-input-card').append(info);
PURCHASE_COLORS.forEach(color=>{const item=document.createElement('span');item.style='display:inline-flex;align-items:center;margin:4px 12px 4px 0;font-size:12px';const swatch=document.createElement('span');swatch.style=`display:inline-block;width:18px;height:18px;border:1px solid #aaa;margin-right:4px;background:${color.hex}`;item.append(swatch,document.createTextNode(`${color.zh} ${color.legoId}`));item.title=`色号 ${color.legoId} ${color.legoName} / BrickLink ${color.id} ${color.name}`;document.getElementById('purchase-swatches').append(item);});
