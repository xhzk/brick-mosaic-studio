// Guided workspace built around the existing image processing controls.
const studioGet = id => document.getElementById(id);
const studioSteps = studioGet("steps-row");
const studioHeader = document.querySelector(".studio-header");
const originalShell = studioHeader.parentElement;
const studioShell = document.createElement("div");
studioShell.classList.add("studio-shell");
studioHeader.before(studioShell);
studioShell.append(studioHeader);
originalShell.classList.add("studio-page-root");
originalShell.style.minHeight = "";
originalShell.style.paddingBottom = "";
originalShell.style.overflow = "";
studioGet("image-input-card").classList.add("studio-legacy-entry");

const intro = document.createElement("div");
intro.className = "studio-intro";
intro.innerHTML = '<div><h2>把一张照片拼成像素画</h2><p>选一张照片，调整画面，挑一套积木配色，最后下载拼搭图纸。第一次做可以直接使用默认设置。</p><button type="button" class="btn btn-light" id="studio-upload">选择照片</button></div><div class="studio-mosaic" aria-hidden="true"></div>';
studioShell.append(intro);
const mosaic = [
    "22223333", "22233333", "22333443", "22334443",
    "22334433", "22233311", "21111111", "11111111",
];
const mosaicColors = ["#213d32", "#6fa48c", "#a8c8a7", "#f1d891", "#ffedb5"];
for (const digit of mosaic.join("")) {
    const tile = document.createElement("span");
    tile.style.backgroundColor = mosaicColors[Number(digit)];
    intro.querySelector(".studio-mosaic").append(tile);
}
studioGet("studio-upload").onclick = () => studioGet("input-image-selector").click();

const steps = [
    ["选画面", "拖动裁剪框，保留想拼的区域。第一次可以先用默认尺寸。"],
    ["调照片", "先看缩小后的轮廓是否清楚。颜色偏暗时可以试试「暗图提亮」。"],
    ["选积木配色", "先选你打算用的颗粒颜色。想用单套积木拼搭，可选择对应套装并按库存计算。"],
    ["拿图纸", "查看最终效果和用料，下载按分区编号的 PDF 图纸。"],
];
const navigation = document.createElement("nav");
navigation.className = "studio-nav";
navigation.setAttribute("aria-label", "制作步骤");
navigation.hidden = true;
studioShell.append(navigation);
const depthPanels = {};
const colorPanels = {};
const goToStep = (step, depth = false) => {
    const tab = studioGet(`step-${step}-${depth ? "depth" : "color"}-tab`);
    if (tab && (depth || depthEnabled)) {
        if (tab.classList.contains("disabled")) {
            const whenEnabled = new MutationObserver(() => {
                if (tab.classList.contains("disabled")) return;
                whenEnabled.disconnect();
                tab.click();
            });
            whenEnabled.observe(tab, { attributes: true, attributeFilter: ["class"] });
        } else {
            tab.click();
        }
    }
    navigation.querySelector("[aria-current]")?.removeAttribute("aria-current");
    navigation.children[step - 1].setAttribute("aria-current", "step");
    studioGet(`step-${step}`).scrollIntoView({ block: "start" });
};

steps.forEach(([title, description], index) => {
    const number = index + 1;
    const stage = studioGet(`step-${number}`);
    const link = document.createElement("a");
    link.href = `#step-${number}`;
    link.innerHTML = `<small>步骤 0${number}</small>${title}`;
    link.onclick = () => {
        navigation.querySelector("[aria-current]")?.removeAttribute("aria-current");
        link.setAttribute("aria-current", "step");
    };
    if (number === 1) link.setAttribute("aria-current", "step");
    navigation.append(link);

    const heading = document.createElement("div");
    heading.className = "studio-stage-heading";
    heading.innerHTML = `<div class="studio-stage-number">步骤 0${number}</div><h2>${title}</h2><p>${description}</p>`;
    stage.firstElementChild.prepend(heading);

    stage.querySelectorAll(".tab-pane").forEach(pane => {
        const depth = pane.id.includes("-depth-");
        const previewCanvas = studioGet(number === 4 && depth
            ? "step-4-canvas-3d-upscaled"
            : `step-${number}${depth ? "-depth" : ""}-canvas-upscaled`);
        const preview = number === 1 && !depth ? previewCanvas.parentElement : previewCanvas;
        if (!preview || preview.parentElement !== pane) return;
        const visual = document.createElement("div");
        visual.className = "studio-visual";
        const controls = document.createElement("div");
        controls.className = "studio-controls";
        const oldHeading = pane.querySelector(":scope > h4");
        oldHeading?.nextElementSibling?.classList.add("studio-old-description");
        for (const node of [...pane.childNodes]) {
            (node === preview ? visual : controls).append(node);
        }
        pane.classList.add("studio-pane");
        pane.append(visual, controls);
        (depth ? depthPanels : colorPanels)[number] = controls;
    });
});

function studioAction(container, label, callback) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "btn btn-primary btn-sm";
    button.textContent = label;
    button.addEventListener("click", callback);
    container.append(button);
    return button;
}

function studioActionRow(container) {
    const row = document.createElement("div");
    row.className = "studio-action";
    container.prepend(row);
    return row;
}

studioAction(studioActionRow(colorPanels[1]), "继续调照片", () => goToStep(2));
studioAction(studioActionRow(colorPanels[2]), "继续选积木配色", () => goToStep(3));
studioAction(studioActionRow(colorPanels[3]), "查看用料和图纸", () => goToStep(4));
const step3 = studioGet("step-3");
const clearPaintButton = studioGet("clear-overrides-button");
const undoButton = studioAction(clearPaintButton.parentElement, "撤销上一笔", undoPaintStroke);
clearPaintButton.before(undoButton);
undoButton.classList.remove("btn-primary");
undoButton.classList.add("studio-icon-button", "paintbrush-controls-button");
undoButton.setAttribute("aria-label", "撤销上一笔");
undoButton.title = "撤销上一笔";
undoButton.innerHTML = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5 4 10l5 5M4 10h11a5 5 0 0 1 0 10h-3"/></svg>';
document.addEventListener("studio-paint-history", event => { undoButton.disabled = !event.detail; });
document.addEventListener("studio-interaction-ready", syncPaintUndo);
syncPaintUndo();

const fullscreenButtons = [studioGet("toggle-expansion-button"), studioGet("toggle-depth-expansion-button")];
const exitLargeEditor = studioAction(step3.querySelector(".studio-stage-heading"), "退出全屏编辑", () => setLargeEditor(false));
exitLargeEditor.classList.add("studio-exit-editor");
function setLargeEditor(open) {
    step3.classList.toggle("studio-large-editor", open);
    document.body.classList.toggle("studio-editor-open", open);
    exitLargeEditor.hidden = !open;
    for (const button of fullscreenButtons) {
        button.setAttribute("aria-pressed", String(open));
        button.setAttribute("aria-label", open ? "退出全屏编辑" : "全屏编辑");
        button.title = open ? "退出全屏编辑（Esc）" : "全屏编辑";
        button.removeAttribute("data-original-title");
    }
    fullscreenButtons[1].textContent = open ? "退出全屏编辑" : "全屏编辑";
    studioGet("expand-picture-svg").hidden = open;
    studioGet("collapse-picture-svg").hidden = !open;
    if (open) step3.scrollTop = 0;
}
for (const button of fullscreenButtons) {
    button.addEventListener("click", () => setLargeEditor(!step3.classList.contains("studio-large-editor")));
}
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && step3.classList.contains("studio-large-editor")) setLargeEditor(false);
});
setLargeEditor(false);
const quickDownload = studioAction(studioActionRow(colorPanels[4]), "生成彩色拼搭图纸", () => {
    const source = studioGet("download-instructions-button");
    if (!source.hidden && !source.disabled) source.click();
});
const downloadSource = studioGet("download-instructions-button");
const syncDownload = () => { quickDownload.disabled = downloadSource.disabled || downloadSource.hidden; };
new MutationObserver(syncDownload).observe(downloadSource, { attributes: true, attributeFilter: ["hidden", "disabled"] });
syncDownload();

const hints = {
    "interpolation-algorithm": {
        default: "浏览器默认缩放，适合初次尝试。",
        avgPooling: "取区域平均色，过渡更平滑，细线可能变淡。",
        maxPooling: "分别取 RGB 通道最大值，容易突出亮部。",
        minPooling: "分别取 RGB 通道最小值，容易突出暗部。",
        dualMinMaxPooling: "每个通道选择更靠近区域平均值的极端值，强化局部明暗。",
    },
    "distance-function": {
        ciede2000: "默认选项，按人眼感知比较颜色。适合大多数照片。",
        euclideanRGB: "直接比较 RGB 通道差异，适合传统误差扩散。",
        euclideanLAB: "比较 Lab 空间中的距离，兼顾明暗和色彩变化。",
        cie94: "按明度、彩度和色相加权比较颜色。",
        din99o: "在 DIN99o 色彩空间比较距离，换一种感知色差的权重。",
    },
    "quantization-algorithm": {
        twoPhase: "逐格找最相近的颜色，再按实际库存调整。适合套内改搭和清晰色块。",
        greedy: "按优先级逐格分配最接近的颜色，可用于有限库存。",
        greedyWithDithering: "把颜色误差扩散给邻格，改善过渡，也可按有限库存匹配。",
        floydSteinberg: "用邻格颜色混合表现渐变。会自动使用不限数量。",
        jarvisJudiceNinkeDithering: "把误差扩散到更宽的邻域。会自动使用不限数量。",
        atkinsonDithering: "只扩散部分误差，过渡更有颗粒感。会自动使用不限数量。",
        sierraDithering: "跨多行扩散误差，适合尝试平滑渐变。会自动使用不限数量。",
    },
    "color-ties-resolution": Object.fromEntries(TIEBREAK_TECHNIQUES.map(({ value }) => [
        value,
        value === "none" ? "同等色差时，保留原本的排序。"
            : value === "random" ? "同等色差时，随机分散替换位置。"
            : "同等色差时，按格子位置分散替换色。选项不同，形成的分布纹理也不同。",
    ])),
};

Object.entries(hints).forEach(([group, descriptions]) => {
    const trigger = studioGet(`${group}-button`);
    const menu = studioGet(`${group}-options`);
    const explanation = document.createElement("p");
    explanation.className = "studio-help";
    explanation.setAttribute("role", "status");
    trigger.parentElement.after(explanation);
    const explain = value => {
        explanation.textContent = descriptions[value] || "";
        trigger.title = explanation.textContent;
    };
    explain(group === "color-ties-resolution" ? selectedTiebreakTechnique : Object.keys(descriptions)[0]);
    for (const option of menu.querySelectorAll(".dropdown-item")) {
        option.title = descriptions[option.value] || "";
        option.tabIndex = 0;
        option.addEventListener("click", () => explain(option.value));
        option.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                option.click();
                $(trigger).dropdown("hide");
                trigger.focus();
            }
        });
    }
});

const palettePanel = document.createElement("section");
palettePanel.className = "studio-panel";
palettePanel.innerHTML = '<h6>配色与套装</h6>';
const paletteButton = studioGet("select-starting-custom-stud-map-button");
const palettePicker = document.createElement("div");
palettePicker.className = "studio-palette-picker";
palettePicker.append(paletteButton, studioGet("select-starting-custom-stud-map-options"));
palettePanel.append(palettePicker);
palettePanel.append(studioGet("input-stud-map-description"));
const availableColors = document.createElement("details");
availableColors.innerHTML = '<summary class="mt-3"></summary><div class="studio-palette-swatches"></div>';
palettePanel.append(availableColors);
colorPanels[3].insertBefore(palettePanel, studioGet("step-3-accordion"));

for (const option of studioGet("select-starting-custom-stud-map-options").querySelectorAll(".dropdown-item")) {
    const palette = STUD_MAPS[option.value];
    if (!palette) continue;
    const description = document.createElement("template");
    description.innerHTML = palette.descriptionHTML || "";
    option.title = description.content.textContent;
}

const usedColorPanel = document.createElement("details");
usedColorPanel.className = "studio-panel";
usedColorPanel.innerHTML = '<summary>最终效果用色</summary><p class="studio-help">这里显示最终图案实际用到的颜色和颗粒数量。</p><h6></h6><div class="studio-palette-swatches"></div>';
palettePanel.after(usedColorPanel);
let finalUsedColors = {};

function renderColorCards(panel, colors, title, counts) {
    const container = panel.querySelector(".studio-palette-swatches");
    container.previousElementSibling.textContent = `${title}（${colors.length} 色）`;
    container.replaceChildren();
    for (const hex of colors) {
        const name = HEX_TO_COLOR_NAME[hex] || hex.toUpperCase();
        const count = counts ? ` · ${counts[hex]} 颗` : "";
        const chip = document.createElement("span");
        chip.className = "studio-color-chip";
        chip.title = `${name}${count} · ${hex.toUpperCase()}`;
        chip.tabIndex = 0;
        const sample = document.createElement("span");
        sample.className = "studio-swatch";
        sample.style.backgroundColor = hex;
        chip.append(sample, document.createTextNode(name + count));
        container.append(chip);
    }
}

const updateAvailableColors = () => renderColorCards(
    availableColors, [...new Set(selectedSortedStuds)], "全部候选色"
);
const updateUsedColors = () => renderColorCards(
    usedColorPanel, Object.keys(finalUsedColors), "实际用色", finalUsedColors
);
usedColorPanel.addEventListener("toggle", () => { if (usedColorPanel.open) updateUsedColors(); });
new MutationObserver(updateAvailableColors).observe(customStudTableBody, { childList: true, subtree: true });
updateAvailableColors();

const effectPanel = document.createElement("div");
effectPanel.className = "studio-panel";
effectPanel.innerHTML = '<h6>画面效果</h6><div class="studio-action studio-choice-grid"></div><p class="studio-help" role="status"></p>';
palettePanel.after(effectPanel);
const effectStatus = effectPanel.lastElementChild;
const effects = [
    ["清晰色块", "twoPhase", "边缘干净，适合文字、图标和套内改搭。"],
    ["柔和渐变", "greedyWithDithering", "用邻近色混合表现阴影和渐变，支持按库存计算。"],
    ["颗粒质感", "atkinsonDithering", "让画面呈现较明显的颗粒感，会启用不限数量。"],
];
function showEffect() {
    const selected = effects.find(([, key]) => key === quantizationAlgorithm);
    effectStatus.textContent = selected ? selected[2] : "正在使用高级设置中的自定义算法。";
    for (const button of effectPanel.querySelectorAll("button")) {
        button.setAttribute("aria-pressed", String(button.dataset.algorithm === quantizationAlgorithm));
    }
}
for (const [name, key, description] of effects) {
    const button = studioAction(effectPanel.querySelector(".studio-action"), name, () => {
        [...studioGet("quantization-algorithm-options").children].find(option => option.value === key)?.click();
    });
    button.dataset.algorithm = key;
    button.title = description;
}
studioGet("quantization-algorithm-options").addEventListener("click", showEffect);
document.querySelector('#step-3-4-heading button').textContent = "高级设置 · 颜色算法";
showEffect();

const depthGuide = document.createElement("details");
depthGuide.className = "studio-panel";
depthGuide.innerHTML = '<summary>想让主体凸起来？试试立体像素画</summary><p class="studio-help">立体图在彩色颗粒下加垫片。先从照片生成深度图，再决定分成几层，最后预览并下载垫片图纸。</p><div class="studio-action"></div>';
colorPanels[1].append(depthGuide);
studioAction(depthGuide.querySelector(".studio-action"), "打开立体制作", () => {
    if (!depthEnabled) studioGet("enable-depth-button").click();
    goToStep(1, true);
});
const depthStatus = document.createElement("p");
depthStatus.className = "studio-help";
depthStatus.setAttribute("role", "status");
const depthRow = studioActionRow(depthPanels[1]);
depthRow.before(depthStatus);
depthRow.after(studioGet("web-worker-loading-message"));
const generate = studioAction(depthRow, "自动生成深度图", () => {
    setDepthState("loading");
    studioGet("generate-depth-image").click();
});
studioAction(depthRow, "上传已有深度图", () => studioGet("input-depth-image-selector-hidden").click());
const nextDepth = studioAction(depthRow, "继续设置层数", () => {
    goToStep(2, true);
    $("#step-2-depth-1-collapse").collapse("show");
});
let depthState = "idle";
function setDepthState(state) {
    depthState = state;
    depthStatus.textContent = {
        idle: "立体 1 / 3 · 生成深度图。较亮的区域会垫得更高。",
        loading: "正在估算深度，请等进度提示完成。",
        ready: "深度图已就绪，可以继续设置层数。",
        error: "深度图生成失败。可以重试，或上传一张与照片对应的灰度深度图。",
    }[state];
    generate.disabled = state === "loading";
    nextDepth.disabled = state !== "ready";
}
setDepthState("idle");
document.addEventListener("studio-depth-state", event => setDepthState(event.detail));
document.addEventListener("studio-interaction-ready", () => setDepthState(depthState));
const depthLayerRow = studioActionRow(depthPanels[2]);
depthLayerRow.before(Object.assign(document.createElement("p"), {
    className: "studio-help",
    textContent: "立体 2 / 3 · 先试 3 层，再在「深度阈值」中用自动分层或拖动分界值。需要局部修整时，可以到第三步编辑深度。",
}));
studioAction(depthLayerRow, "预览立体效果", () => {
    goToStep(4, true);
    $("#step-4-depth-1-collapse").collapse("show");
});
const depthExportRow = studioActionRow(depthPanels[4]);
depthExportRow.before(Object.assign(document.createElement("p"), {
    className: "studio-help",
    textContent: "立体 3 / 3 · 在预览上移动鼠标查看起伏。垫片图纸负责高度，彩色图纸负责最上层的颜色。",
}));
studioAction(depthExportRow, "打开垫片图纸设置", () => {
    $("#step-4-depth-2-collapse").collapse("show");
});
studioAction(depthExportRow, "返回彩色图纸", () => goToStep(4));

// Keep the original controls and accordion IDs while giving every stage the same hierarchy.
function groupSettings(node, title, collapsible = false) {
    const group = document.createElement(collapsible ? "details" : "section");
    group.className = "studio-panel studio-settings";
    const heading = document.createElement(collapsible ? "summary" : "h6");
    heading.textContent = title;
    group.append(heading);
    node.before(group);
    group.append(node);
    return group;
}

groupSettings(studioGet("step-1-accordion"), "尺寸与照片");
studioGet("step-1-1-collapse").classList.add("show");
const resolutionToggle = studioGet("step-1-1-heading").querySelector("button");
resolutionToggle.classList.remove("collapsed");
resolutionToggle.setAttribute("aria-expanded", "true");
const colorPresetPanel = studioGet("color-preset").parentElement;
colorPresetPanel.className = "studio-panel studio-settings studio-color-preset";
const presetHeading = document.createElement("h6");
presetHeading.textContent = "调色预设";
const presetHeader = document.createElement("div");
presetHeader.className = "studio-preset-header";
presetHeader.append(presetHeading);
colorPresetPanel.firstElementChild.replaceWith(presetHeader);
const colorPresetSelect = studioGet("color-preset");
const colorPresetApply = studioGet("apply-color-preset");
const colorPresetChoices = document.createElement("div");
colorPresetChoices.className = "studio-choice-grid";
colorPresetChoices.setAttribute("role", "group");
colorPresetChoices.setAttribute("aria-label", "调色预设");
colorPresetSelect.before(colorPresetChoices);
colorPresetSelect.hidden = true;
colorPresetApply.hidden = true;
const resetColorButton = studioAction(presetHeader, "重置调色", () => {
    colorPresetSelect.value = "original";
    colorPresetApply.click();
    for (const button of colorPresetChoices.children) button.setAttribute("aria-pressed", "false");
    studioGet("preset-feedback").textContent = "";
});
resetColorButton.classList.remove("btn-primary");
resetColorButton.classList.add("btn-outline-secondary", "studio-reset-color");
for (const option of colorPresetSelect.options) {
    if (option.value === "original") continue;
    const choice = studioAction(colorPresetChoices, option.textContent, () => {
        colorPresetSelect.value = option.value;
        colorPresetApply.click();
        for (const button of colorPresetChoices.children) {
            button.setAttribute("aria-pressed", String(button === choice));
        }
    });
    choice.setAttribute("aria-pressed", String(option.selected));
}
groupSettings(studioGet("step-2-accordion"), "手动微调", true);
groupSettings(studioGet("step-3-accordion"), "进阶设置", true);
groupSettings(studioGet("step-4-accordion"), "用料与采购", true);
const pdfPanel = document.createElement("section");
pdfPanel.className = "studio-panel studio-settings studio-pdf-panel";
pdfPanel.innerHTML = '<h6>拼搭图纸</h6>';
colorPanels[4].prepend(pdfPanel);
pdfPanel.append(studioGet("high-quality-instructions-check").closest("label"), quickDownload, studioGet("pdf-progress-container"));
studioGet("step-4-3-heading").closest(".accordion-card").hidden = true;

for (const [step, title] of [[1, "深度图选项"], [2, "层数与深度阈值"], [3, "手动修整深度"], [4, "立体预览与图纸"]]) {
    groupSettings(studioGet(`step-${step}-depth-accordion`), title, step === 1);
}

const brushToolbar = studioGet("paintbrush-controls").parentElement;
const brushPanel = groupSettings(brushToolbar, "手动修图");
const colorError = studioGet("step-3-quantization-error").parentElement;
brushToolbar.before(colorError);
palettePanel.before(brushPanel);

for (const panel of [...Object.values(colorPanels), ...Object.values(depthPanels)]) {
    panel.classList.add("studio-settings-stack");
}
for (const panel of Object.values(colorPanels)) {
    const actions = panel.querySelector(":scope > .studio-action");
    if (actions) {
        actions.classList.add("studio-stage-actions");
        panel.append(actions);
    }
}

const workspace = document.createElement("div");
workspace.className = "studio-workspace";
studioSteps.before(workspace);
const livePreview = document.createElement("details");
livePreview.className = "studio-live";
livePreview.open = true;
livePreview.innerHTML = '<summary>最终效果 · 实时预览</summary><canvas aria-label="最终拼搭效果"></canvas><small role="status"></small>';
workspace.append(studioSteps, livePreview);
const previewCanvas = livePreview.querySelector("canvas");
const previewStatus = livePreview.querySelector("small");
const previewLoading = document.createElement("span");
previewLoading.className = "studio-preview-loading";
previewLoading.textContent = "正在更新…";
previewLoading.setAttribute("role", "status");
livePreview.querySelector("summary").append(previewLoading);
const processingProgress = studioGet("universal-loading-progress");
const syncPreviewLoading = () => {
    const busy = !studioSteps.hidden && !processingProgress.hidden;
    previewLoading.hidden = !busy;
    previewCanvas.setAttribute("aria-busy", String(busy));
};
new MutationObserver(syncPreviewLoading).observe(processingProgress, {
    attributes: true, attributeFilter: ["hidden"],
});
const previewError = document.createElement("small");
const finalError = studioGet("step-4-quantization-error").parentElement;
previewError.title = finalError.getAttribute("data-original-title") || finalError.title;
for (const indicator of [colorError, finalError, previewError]) {
    indicator.classList.add("studio-error-indicator");
    indicator.tabIndex = 0;
    $(indicator).tooltip("dispose");
    indicator.setAttribute("data-toggle", "tooltip");
    indicator.setAttribute("data-container", "body");
    indicator.setAttribute("data-boundary", "viewport");
    indicator.setAttribute("data-placement", "bottom");
    $(indicator).tooltip();
}
previewCanvas.after(previewError);
document.addEventListener("studio-final-render", () => {
    previewError.textContent = "平均 ε: " + studioGet("step-4-quantization-error").textContent;
    finalUsedColors = getUsedPixelsStudMap(getPixelArrayFromCanvas(bricklinkCacheCanvas));
    updateAvailableColors();
    if (usedColorPanel.open) updateUsedColors();
    const ratio = Math.min(1, 420 / Math.max(step4CanvasUpscaled.width, step4CanvasUpscaled.height));
    previewCanvas.width = Math.max(1, Math.round(step4CanvasUpscaled.width * ratio));
    previewCanvas.height = Math.max(1, Math.round(step4CanvasUpscaled.height * ratio));
    previewCanvas.getContext("2d").drawImage(step4CanvasUpscaled, 0, 0, previewCanvas.width, previewCanvas.height);
    previewStatus.textContent = "";
});
document.addEventListener("studio-final-unavailable", () => {
    previewStatus.textContent = "库存不足，当前显示上一次可拼搭的效果。";
});
const syncStudio = () => {
    intro.hidden = !studioSteps.hidden;
    navigation.hidden = studioSteps.hidden;
    workspace.hidden = studioSteps.hidden;
    document.body.classList.toggle("studio-editing", !studioSteps.hidden);
    syncPreviewLoading();
};
new MutationObserver(syncStudio).observe(studioSteps, { attributes: true, attributeFilter: ["hidden"] });
syncStudio();
