        document.addEventListener('DOMContentLoaded', function() {
            // 基础数据
            const tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
            const dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
            const liujingMap = {
                "子": "少阴", "午": "少阴",
                "丑": "太阴", "未": "太阴",
                "寅": "少阳", "申": "少阳",
                "卯": "阳明", "酉": "阳明",
                "辰": "太阳", "戌": "太阳",
                "巳": "厥阴", "亥": "厥阴"
            };
            
            // 汗瘥法数据
            const table1 = {
                "甲己": ["丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁"],
                "乙庚": ["戊", "己", "庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己"],
                "丙辛": ["庚", "辛", "壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛"],
                "丁壬": ["壬", "癸", "甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"],
                "戊癸": ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸", "甲", "乙"]
            };
            
            // 列顺序
            const table1Columns = ["寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥", "子", "丑"];
            
            // 五运
            const table3 = {
                "甲己": "土",
                "乙庚": "金",
                "丙辛": "水",
                "丁壬": "木",
                "戊癸": "火"
            };
            
            // 汗瘥法口诀映射
            const hancuoRules = {
                "金金": { days: ["丁", "辛"], sentence: "金见丁辛火乙丁" },
                "火火": { days: ["乙", "丁"], sentence: "金见丁辛火乙丁" },
                "木木": { days: ["丙", "己"], sentence: "丙己木水乙己并" },
                "水水": { days: ["乙", "己"], sentence: "丙己木水乙己并" },
                "土土": { days: ["戊", "壬"], sentence: "戊壬土水火丙己" },
                "水火": { days: ["丙", "己"], sentence: "戊壬土水火丙己" },
                "水木": { days: ["甲", "丁"], sentence: "水木元来号甲丁" },
                "土水": { days: ["甲", "己"], sentence: "土水甲己从来道" },
                "金土": { days: ["丁", "壬"], sentence: "金土丁壬汗似蒸" },
                "木土": { days: ["丙", "辛"], sentence: "木土丙辛之日瘥" },
                "火金": { days: ["乙", "己"], sentence: "火金乙己汗如倾" },
                "金水": { days: ["甲", "戊"], sentence: "金水甲戊相交汗" },
                "木火": { days: ["乙", "戊"], sentence: "木火乙戊不瘥争" },
                "土火": { days: ["乙", "庚"], sentence: "土火乙庚疾大减" },
                "金木": { days: ["丙", "庚"], sentence: "金木安康在丙庚" },
                "火水": { days: ["丙", "己"], sentence: "戊壬土水火丙己" },
                "木水": { days: ["甲", "丁"], sentence: "水木元来号甲丁" },
                "水土": { days: ["甲", "己"], sentence: "土水甲己从来道" },
                "土金": { days: ["丁", "壬"], sentence: "金土丁壬汗似蒸" },
                "土木": { days: ["丙", "辛"], sentence: "木土丙辛之日瘥" },
                "金火": { days: ["乙", "己"], sentence: "火金乙己汗如倾" },
                "水金": { days: ["甲", "戊"], sentence: "金水甲戊相交汗" },
                "火木": { days: ["乙", "戊"], sentence: "木火乙戊不瘥争" },
                "火土": { days: ["乙", "庚"], sentence: "土火乙庚疾大减" },
                "木金": { days: ["丙", "庚"], sentence: "金木安康在丙庚" }
            };
            
            // 病证五行映射
            const diseaseWuxing = {
                "厥阴": "木",
                "少阴": "火",
                "少阳": "火",
                "太阴": "土",
                "阳明": "金",
                "太阳": "水"
            };
            
            // 棺墓法地支五行
            const table2 = {
                "子": "水",
                "丑": "土",
                "寅": "木",
                "卯": "土",
                "辰": "水",
                "巳": "木",
                "午": "火",
                "未": "金",
                "申": "火",
                "酉": "金",
                "戌": "火",
                "亥": "火"
            };
            
            // 棺墓法五运旺支
            const table4 = {
                "木": "卯",
                "火": "午",
                "金": "酉",
                "水": "子",
                "土": "子"
            };
            
            // 棺墓歌诀
            const guanmuRules = {
                "木土": "木土棺临墓上危",
                "土金": "尸临墓下土金归",
                "木木": "二木棺中无气止",
                "金水": "金水尸中有命随",
                "火水": "火水气前逢命吉",
                "金火": "金火尸中有气微",
                "木火": "木火棺中生有气",
                "木金": "尸临棺下木金危.尸临棺下救应迟",
                "水火": "水火命前逢气可",
                "土木": "土木逢之不可推",
                "土水": "墓临棺上多应死",
                "金土": "金土尸来临墓上，病人危困不须疑",
                "金木": "尸向棺头金木立，患家犹是好求医。"
            };
            
            // 主病行流法相关数据
            // 十干所主脏腑
            const organsMap = {
                "甲": "胆",
                "乙": "肝",
                "丙": "小肠",
                "丁": "心",
                "戊": "胃",
                "己": "脾",
                "庚": "大肠",
                "辛": "肺",
                "壬": "膀胱、三焦",
                "癸": "肾、心包络"
            };
            
            // 主病证候歌
            const zhubingSongs = {
                "甲": "甲木在寅足少阳，胆家经络不寻常；耳聋口苦咽干燥，寒热往来疡病当。",
                "乙": "厥阴乙木足肝间，筋急唇青四体瘫；舌卷耳聋囊或缩，不逢识者少安痊。",
                "丙": "丙火戌中手太阳，受病原来属小肠；小便不通如尿血，日间热作夜清凉。",
                "丁": "丁手少阴心火炎，时生惊躁主风缠；不然势热多烦躁，自汗依稀即谵语。",
                "戊": "戊土卯位足阳明，经络原知属胃经；身热目疼难得卧，鼻中干燥自呻吟。",
                "己": "己土太阴足络干，脾经腹满或咽干；手足自温时腹痛，利而不渴脏器寒。",
                "庚": "庚金酉上太阳经，经手阳明气上行；下利肠鸣常隐痛，不然喘咳夜无眠。",
                "辛": "肺局未上属乎辛，经络原来手太阴；咳嗽生痰气多喘，肠鸣鼻塞湿家寻。",
                "壬": "壬水辰宫足太阳，细寻经络出膀胱；恶寒发热浑身疼，项强头疼汗主张。",
                "癸": "癸临肾水足少阴，不渴宜温谓脉沉；口燥咽干须急下，膀胱合病死相侵。"
            };
            
            // 行流证候歌
            const xingliuSongs = {
                "木": "胆主惊兮肝主风，四肢筋缓肾蒙瞳；不然筋惕生痃癖，怒气冲胸胁肋中。",
                "火": "小肠淋沥舌生疮，心主惊烦渴热狂；外实内虚宜发汗，外虚内实下之良。",
                "土": "胃生呕吐食难停，口臭脾家热不停；拘急四肢行步涩，更兼肿满渴无津。",
                "金": "大肠泄利燥咽咙，肺主皮毛咳嗽攻；气喘能兼大便秘，鼻中多水唾稠浓。",
                "水": "膀胱得病太阳遣，恶热憎寒汗主先；腰痛头疼兼疝厥，泄精虚冷肾家缘。"
            };
            
            // 五虎遁口诀
            const wuhuDun = {
                "甲己": "丙",
                "乙庚": "戊",
                "丙辛": "庚",
                "丁壬": "壬",
                "戊癸": "甲"
            };
            
            // 天干五行属性
            const ganWuxing = {
                "甲": "木", "乙": "木",
                "丙": "火", "丁": "火",
                "戊": "土", "己": "土",
                "庚": "金", "辛": "金",
                "壬": "水", "癸": "水"
            };
            
            // 五行相生关系
            const wuxingSheng = {
                "木": "火",
                "火": "土",
                "土": "金",
                "金": "水",
                "水": "木"
            };
            
            // 五行相克关系
            const wuxingKe = {
                "木": "土",
                "土": "水",
                "水": "火",
                "火": "金",
                "金": "木"
            };
            
            // 五邪类型描述
            const xieqiTypes = {
                "虚邪": "母能令子虚，病邪从生我（母）的方面传来",
                "实邪": "病邪从我生（子）的方面传来",
                "贼邪": "病邪从克我的方面传来",
                "微邪": "病邪从我克的方面传来",
                "正邪": "本脏受到同一属性的病邪侵犯而致病"
            };
            
            // 获取DOM元素
            const yearGanSelect = document.getElementById('year-gan');
            const yearZhiSelect = document.getElementById('year-zhi');
            const dayGanSelect = document.getElementById('day-gan');
            const dayZhiSelect = document.getElementById('day-zhi');
            const genderSelect = document.getElementById('gender');
            
            // 设置默认值
            yearGanSelect.value = "甲";
            yearZhiSelect.value = "子";
            dayGanSelect.value = "甲";
            dayZhiSelect.value = "子";
            updateCurrentValues();
            
            // 事件监听
            yearGanSelect.addEventListener('change', updateCurrentValues);
            yearZhiSelect.addEventListener('change', updateCurrentValues);
            dayGanSelect.addEventListener('change', updateCurrentValues);
            dayZhiSelect.addEventListener('change', updateCurrentValues);
            genderSelect.addEventListener('change', updateCurrentValues);
            document.getElementById('calculate-btn').addEventListener('click', calculateQianfa);
            
            // 初始计算
            calculateQianfa();
            
            function updateCurrentValues() {
                const yearGan = yearGanSelect.value;
                const yearZhi = yearZhiSelect.value;
                const dayGan = dayGanSelect.value;
                const dayZhi = dayZhiSelect.value;
                const gender = genderSelect.value === 'male' ? '男' : '女';
                
                document.getElementById('current-year').textContent = yearGan + yearZhi;
                document.getElementById('current-day').textContent = dayGan + dayZhi;
                document.getElementById('current-gender').textContent = gender;
            }
            
            function calculateQianfa() {
                const yearGan = yearGanSelect.value;
                const yearZhi = yearZhiSelect.value;
                const dayGan = dayGanSelect.value;
                const dayZhi = dayZhiSelect.value;
                const gender = genderSelect.value;
                
                // 1. 确定三司
                const siTian = dayZhi;
                const siDi = getSiDi(siTian);
                const siRen = getSiRen(siDi);
                
                // 更新显示
                document.getElementById('si-tian').textContent = siTian;
                document.getElementById('si-di').textContent = siDi;
                document.getElementById('si-ren').textContent = siRen;
                document.getElementById('start-ganzhi').textContent = yearGan + yearZhi;
                
                // 2. 生成天盘干支
                generateDoublePan(siRen, yearGan, yearZhi);
                
                // 3. 推演病证
                let currentGan = yearGan;
                let currentZhi = yearZhi;
                
                // 计算从司人宫到司天宫的步数
                const siRenIdx = dizhi.indexOf(siRen);
                const siTianIdx = dizhi.indexOf(siTian);
                let steps = (siTianIdx - siRenIdx + 12) % 12;
                if (steps === 0) steps = 12;
                
                // 顺行至司天宫
                for (let i = 0; i < steps; i++) {
                    // 天干前进
                    const ganIdx = (tiangan.indexOf(currentGan) + 1) % 10;
                    // 地支前进
                    const zhiIdx = (dizhi.indexOf(currentZhi) + 1) % 12;
                    currentGan = tiangan[ganIdx];
                    currentZhi = dizhi[zhiIdx];
                }
                
                // 最终地支为病证
                const disease = liujingMap[currentZhi] || "未知";
                document.getElementById('disease-result').textContent = disease + "经";
                
                // 4. 推演药号
                let currentGanForYao = yearGan;
                for (let i = 0; i < steps; i++) {
                    const ganIdx = (tiangan.indexOf(currentGanForYao) + 1) % 10;
                    currentGanForYao = tiangan[ganIdx];
                }
                document.getElementById('yaohao').textContent = currentGanForYao;
                
                // 5. 计算汗瘥法结果
                calculateHancuo(dayGan, currentZhi, disease);
                
                // 6. 计算棺墓法结果
                calculateGuanmu(yearGan, yearZhi, dayGan, dayZhi, disease);
                
                // 7. 计算主病行流法结果
                calculateZhuBing(yearGan, yearZhi, dayGan, dayZhi, gender);
            }
            
            // 获取司地：司天顺时针数3位
            function getSiDi(siTian) {
                const idx = dizhi.indexOf(siTian);
                return dizhi[(idx + 3) % 12];
            }
            
            // 获取司人：司地退一（阴支）或进一（阳支）
            function getSiRen(siDi) {
                const idx = dizhi.indexOf(siDi);
                return (idx % 2 === 0) ? dizhi[(idx + 1) % 12] : dizhi[(idx + 11) % 12];
            }
            
            // 生成天盘干支
            function generateDoublePan(siRen, nianmingGan, nianmingZhi) {
                // 地盘布局
                const dipanLayout = [
                    "巳", "午", "未", "申",
                    "辰", null, null, "酉",
                    "卯", null, null, "戌",
                    "寅", "丑", "子", "亥"
                ];
                
                // 顺时针位置顺序
                const positions = [0, 1, 2, 3, 7, 11, 15, 14, 13, 12, 8, 4];
                
                // 找到司人宫在positions中的位置
                let siRenIndex = -1;
                for (let i = 0; i < positions.length; i++) {
                    if (dipanLayout[positions[i]] === siRen) {
                        siRenIndex = i;
                        break;
                    }
                }
                
                // 初始化天盘数组
                const tianpan1 = Array(16).fill(""); // 天盘地支
                const tianpan2 = Array(16).fill(""); // 天盘天干
                const usedGan = {};
                const circleSymbol = "〇";
                
                // 获取年命地支的起始索引
                let zhiIndex = dizhi.indexOf(nianmingZhi);
                
                // 获取年命天干的起始索引
                let ganIndex = tiangan.indexOf(nianmingGan);
                
                // 从司人宫开始按顺时针方向填充
                for (let i = 0; i < positions.length; i++) {
                    const posIndex = (siRenIndex + i) % positions.length;
                    const cellIndex = positions[posIndex];
                    
                    // 填充天盘地支
                    tianpan1[cellIndex] = dizhi[zhiIndex % dizhi.length];
                    zhiIndex++;
                    
                    // 填充天盘天干
                    const currentGan = tiangan[ganIndex % tiangan.length];
                    
                    // 检查天干是否已使用过
                    if (usedGan[currentGan]) {
                        tianpan2[cellIndex] = circleSymbol;
                    } else {
                        tianpan2[cellIndex] = currentGan;
                        usedGan[currentGan] = true;
                    }
                    
                    ganIndex++;
                }
                
                // 更新天盘干支显示
                for (let i = 0; i < 16; i++) {
                    const tianpan1El = document.getElementById('tian1-' + i);
                    const tianpan2El = document.getElementById('tian2-' + i);
                    const dipanEl = document.querySelector(`#pos${i} .dipan`);
                    
                    if (tianpan1El) {
                        tianpan1El.textContent = tianpan1[i] || "";
                    }
                    
                    if (tianpan2El) {
                        tianpan2El.textContent = tianpan2[i] || "";
                        
                        // 添加圆圈符号的特殊样式
                        if (tianpan2[i] === circleSymbol) {
                            tianpan2El.classList.add('circle');
                        } else {
                            tianpan2El.classList.remove('circle');
                        }
                    }
                    
                    if (dipanEl) {
                        dipanEl.textContent = dipanLayout[i] || "";
                    }
                }
            }
            
            // 汗瘥法计算
            function calculateHancuo(dayGan, diseaseZhi, diseaseName) {
                // 更新显示
                document.getElementById('hancuo-day-gan').textContent = dayGan;
                document.getElementById('hancuo-disease-zhi').textContent = diseaseZhi;
                document.getElementById('hancuo-disease').textContent = diseaseName;
                
                // 1. 查表一：确定汗瘥天干
                // 确定表一的行键（根据日干）
                let table1Row = "";
                if (["甲", "己"].includes(dayGan)) table1Row = "甲己";
                else if (["乙", "庚"].includes(dayGan)) table1Row = "乙庚";
                else if (["丙", "辛"].includes(dayGan)) table1Row = "丙辛";
                else if (["丁", "壬"].includes(dayGan)) table1Row = "丁壬";
                else if (["戊", "癸"].includes(dayGan)) table1Row = "戊癸";
                
                // 确定表一的列索引（根据地支在表一列顺序中的位置）
                const colIndex = table1Columns.indexOf(diseaseZhi);
                if (colIndex === -1) {
                    console.error("无效的地支:", diseaseZhi);
                    return;
                }
                
                const table1Result = table1[table1Row][colIndex];
                
                // 更新显示
                document.getElementById('table1-result').textContent = table1Result;
                
                // 2. 查表三：确定五运属性
                let table3Row = "";
                if (["甲", "己"].includes(table1Result)) table3Row = "甲己";
                else if (["乙", "庚"].includes(table1Result)) table3Row = "乙庚";
                else if (["丙", "辛"].includes(table1Result)) table3Row = "丙辛";
                else if (["丁", "壬"].includes(table1Result)) table3Row = "丁壬";
                else if (["戊", "癸"].includes(table1Result)) table3Row = "戊癸";
                
                const wuyunResult = table3[table3Row];
                
                // 更新显示
                document.getElementById('wuyun-result').textContent = wuyunResult;
                document.getElementById('hancuo-gan').textContent = table1Result;
                document.getElementById('wuyun-desc').textContent = wuyunResult + "运";
                document.getElementById('hancuo-wuyun').textContent = wuyunResult;
                
                // 3. 根据病证和五运确定汗瘥日
                // 提取病证名称
                const diseaseKey = diseaseName.replace("经", "");
                const diseaseWuxingValue = diseaseWuxing[diseaseKey] || "未知";
                
                // 构建规则键
                const ruleKey = diseaseWuxingValue + wuyunResult;
                
                // 获取汗瘥日
                let hancuoRule = hancuoRules[ruleKey];
                
                // 默认处理
                if (!hancuoRule) {
                    hancuoRule = { days: [], sentence: "无汗瘥" };
                }
                
                // 更新显示
                const hancuoDaysEl = document.getElementById('hancuo-days');
                hancuoDaysEl.innerHTML = '';
                hancuoRule.days.forEach(day => {
                    const dayEl = document.createElement('div');
                    dayEl.className = 'hancuo-day';
                    dayEl.textContent = day + '日';
                    hancuoDaysEl.appendChild(dayEl);
                });
                
                document.getElementById('hancuo-sentence').textContent = 
                    `${hancuoRule.sentence} ，${hancuoRule.days.join('或')}日解`;
            }
            
            // 棺墓法计算
            function calculateGuanmu(yearGan, yearZhi, dayGan, dayZhi, disease) {
                const stepsEl = document.getElementById('guanmu-steps');
                
                // 步骤1: 根据得病日干确定五运
                let wuyunKey = '';
                if (["甲", "己"].includes(dayGan)) wuyunKey = "甲己";
                else if (["乙", "庚"].includes(dayGan)) wuyunKey = "乙庚";
                else if (["丙", "辛"].includes(dayGan)) wuyunKey = "丙辛";
                else if (["丁", "壬"].includes(dayGan)) wuyunKey = "丁壬";
                else if (["戊", "癸"].includes(dayGan)) wuyunKey = "戊癸";
                
                const wuyun = table3[wuyunKey];
                
                // 步骤2: 根据五运确定旺支
                const wangZhi = table4[wuyun];
                
                // 步骤3: 计算旺支到年命地支的步数
                const wangZhiIdx = dizhi.indexOf(wangZhi);
                const yearZhiIdx = dizhi.indexOf(yearZhi);
                let steps = (yearZhiIdx - wangZhiIdx + 12) % 12;
                if (steps === 0) steps = 12;
                
                // 步骤4: 从得病日干支顺推步数
                let currentGan = dayGan;
                let currentZhi = dayZhi;
                let ganIndex = tiangan.indexOf(dayGan);
                let zhiIndex = dizhi.indexOf(dayZhi);
                
                for (let i = 0; i < steps; i++) {
                    ganIndex = (ganIndex + 1) % 10;
                    zhiIndex = (zhiIndex + 1) % 12;
                    currentGan = tiangan[ganIndex];
                    currentZhi = dizhi[zhiIndex];
                }
                
                // 步骤5: 解析新干支
                let newWuyunKey = '';
                if (["甲", "己"].includes(currentGan)) newWuyunKey = "甲己";
                else if (["乙", "庚"].includes(currentGan)) newWuyunKey = "乙庚";
                else if (["丙", "辛"].includes(currentGan)) newWuyunKey = "丙辛";
                else if (["丁", "壬"].includes(currentGan)) newWuyunKey = "丁壬";
                else if (["戊", "癸"].includes(currentGan)) newWuyunKey = "戊癸";
                
                const newWuyun = table3[newWuyunKey];
                const zhiWuxing = table2[currentZhi] || "未知";
                
                // 步骤6: 确定棺墓歌诀
                const ruleKey = newWuyun + zhiWuxing;
                const verse = guanmuRules[ruleKey] || "未知";
                const interpretation = "具体解释需结合临床实际分析";
                
                // 生成HTML步骤字符串
                stepsEl.innerHTML = `
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">根据得病日干 <strong>${dayGan}</strong> 查表三，确定五运为 <strong>${wuyun}</strong></div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">根据五运 <strong>${wuyun}</strong> 查表四，确定旺支为 <strong>${wangZhi}</strong></div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">从旺支 <strong>${wangZhi}</strong> 顺数到年命地支 <strong>${yearZhi}</strong>，共 <strong>${steps}</strong> 步</div>
                    </div>
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-content">从得病日干支 <strong>${dayGan}${dayZhi}</strong> 顺推 <strong>${steps}</strong> 步，得到新干支 <strong>${currentGan}${currentZhi}</strong></div>
                    </div>
                    <div class="step">
                        <div class="step-number">5</div>
                        <div class="step-content">解析新干支：天干 <strong>${currentGan}</strong> 为 <strong>${newWuyun}</strong> 运，地支 <strong>${currentZhi}</strong> 属 <strong>${zhiWuxing}</strong></div>
                    </div>
                    <div class="step">
                        <div class="step-number">6</div>
                        <div class="step-content">组合 <strong>${newWuyun}${zhiWuxing}</strong> 对应棺墓歌诀：<strong>${verse}</strong></div>
                    </div>
                `;
                
                document.getElementById('guanmu-verse').textContent = verse;
                document.getElementById('guanmu-interpretation').textContent = interpretation;
            }
            
            // 主病行流法计算
            function calculateZhuBing(yearGan, yearZhi, dayGan, dayZhi, gender) {
                // 获取五虎遁寅上所得天干
                let wuhuKey = "";
                if (["甲", "己"].includes(dayGan)) wuhuKey = "甲己";
                else if (["乙", "庚"].includes(dayGan)) wuhuKey = "乙庚";
                else if (["丙", "辛"].includes(dayGan)) wuhuKey = "丙辛";
                else if (["丁", "壬"].includes(dayGan)) wuhuKey = "丁壬";
                else if (["戊", "癸"].includes(dayGan)) wuhuKey = "戊癸";
                
                const yinGan = wuhuDun[wuhuKey];
                
                // 判断日干阴阳
                const isYangDay = ["甲", "丙", "戊", "庚", "壬"].includes(dayGan);
                
                // 判断年命天干阴阳
                const isYangNian = ["甲", "丙", "戊", "庚", "壬"].includes(yearGan);
                
                // 判断患者类型
                const isYangMaleYinFemale = (gender === "male" && isYangNian) || (gender === "female" && !isYangNian);
                
                // 计算主病
                let zhubingGan = "";
                let startPos = "";
                let direction = "";
                
                if (isYangMaleYinFemale) {
                    if (isYangDay) {
                        // 阳男阴女，阳日发病：加在寅上顺数
                        startPos = "寅";
                        direction = "顺";
                        zhubingGan = calculateGan(yinGan, "寅", yearZhi, "顺");
                    } else {
                        // 阳男阴女，阴日发病：加在丑上逆数
                        startPos = "丑";
                        direction = "逆";
                        zhubingGan = calculateGan(yinGan, "丑", yearZhi, "逆");
                    }
                } else {
                    if (isYangDay) {
                        // 阴男阳女，阳日发病：加在寅上逆数
                        startPos = "寅";
                        direction = "逆";
                        zhubingGan = calculateGan(yinGan, "寅", yearZhi, "逆");
                    } else {
                        // 阴男阳女，阴日发病：加在丑上顺数
                        startPos = "丑";
                        direction = "顺";
                        zhubingGan = calculateGan(yinGan, "丑", yearZhi, "顺");
                    }
                }
                
                // 计算行流
                let xingliuGan = "";
                let xingliuStartPos = "";
                let xingliuDirection = "顺";
                
                // 判断得病日支类型
                const siMeng = ["寅", "申", "巳", "亥"];
                const siJi = ["辰", "戌", "丑", "未"];
                const siZhong = ["子", "午", "卯", "酉"];
                
                if (siMeng.includes(dayZhi) || siJi.includes(dayZhi)) {
                    // 四孟或四季日：加在辰上顺数
                    xingliuStartPos = "辰";
                    xingliuGan = calculateGan(yinGan, "辰", yearZhi, "顺");
                } else if (siZhong.includes(dayZhi)) {
                    // 四仲日：加在巳上顺数
                    xingliuStartPos = "巳";
                    xingliuGan = calculateGan(yinGan, "巳", yearZhi, "顺");
                }
                
                // 更新主病行流结果显示
                document.getElementById('zhubing-result').textContent = zhubingGan;
                document.getElementById('xingliu-result').textContent = xingliuGan;
                
                document.getElementById('zhubing-organs').textContent = organsMap[zhubingGan] || "未知";
                document.getElementById('xingliu-organs').textContent = organsMap[xingliuGan] || "未知";
                
                document.getElementById('zhubing-song').textContent = zhubingSongs[zhubingGan] || "无相关证候歌";
                document.getElementById('xingliu-song').textContent = xingliuSongs[ganWuxing[xingliuGan]] || "无相关证候歌";
                
                // 生成步骤HTML
                const stepsHTML = `
                    <div class="step">
                        <div class="step-number">1</div>
                        <div class="step-content">根据得病日干 <strong>${dayGan}</strong>，使用五虎遁口诀确定寅上所得天干为 <strong>${yinGan}</strong></div>
                    </div>
                    <div class="step">
                        <div class="step-number">2</div>
                        <div class="step-content">患者为 <strong>${gender === "male" ? "男" : "女"}</strong>，年命天干 <strong>${yearGan}</strong> 为 <strong>${isYangNian ? "阳" : "阴"}</strong></div>
                    </div>
                    <div class="step">
                        <div class="step-number">3</div>
                        <div class="step-content">得病日为 <strong>${isYangDay ? "阳日" : "阴日"}</strong>，起始位置为 <strong>${startPos}</strong>，方向为 <strong>${direction}</strong></div>
                    </div>
                    <div class="step">
                        <div class="step-number">4</div>
                        <div class="step-content">计算主病：从 <strong>${startPos}</strong> ${direction}数至年命地支 <strong>${yearZhi}</strong>，得主病天干 <strong>${zhubingGan}</strong></div>
                    </div>
                    <div class="step">
                        <div class="step-number">5</div>
                        <div class="step-content">得病日支为 <strong>${dayZhi}</strong>，属于 <strong>${siMeng.includes(dayZhi) ? "四孟" : siJi.includes(dayZhi) ? "四季" : "四仲"}</strong>，起始位置为 <strong>${xingliuStartPos}</strong></div>
                    </div>
                    <div class="step">
                        <div class="step-number">6</div>
                        <div class="step-content">计算行流：从 <strong>${xingliuStartPos}</strong> 顺数至年命地支 <strong>${yearZhi}</strong>，得行流天干 <strong>${xingliuGan}</strong></div>
                    </div>
                `;
                document.getElementById('zhubing-steps').innerHTML = stepsHTML;
                
                // 五邪判断
                const zhubingWuxing = ganWuxing[zhubingGan];
                const xingliuWuxing = ganWuxing[xingliuGan];
                
                let xieqi = "";
                let xieqiDesc = "";
                
                if (zhubingWuxing === xingliuWuxing) {
                    xieqi = "正邪";
                } else if (wuxingSheng[xingliuWuxing] === zhubingWuxing) {
                    xieqi = "虚邪";
                } else if (wuxingSheng[zhubingWuxing] === xingliuWuxing) {
                    xieqi = "实邪";
                } else if (wuxingKe[xingliuWuxing] === zhubingWuxing) {
                    xieqi = "贼邪";
                } else if (wuxingKe[zhubingWuxing] === xingliuWuxing) {
                    xieqi = "微邪";
                } else {
                    xieqi = "未知";
                }
                
                xieqiDesc = xieqiTypes[xieqi] || "错误";
                
                // 更新五邪判断显示
                document.getElementById('xieqi-content').innerHTML = `
                    <strong style="font-size: 2em; font-weight: bold;">${xieqi}</strong>
                `;
            }
            
            // 计算天干函数
            function calculateGan(startGan, startZhi, targetZhi, direction) {
                const tiangan = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
                const dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
                
                let ganIndex = tiangan.indexOf(startGan);
                let zhiIndex = dizhi.indexOf(startZhi);
                const targetIndex = dizhi.indexOf(targetZhi);
                
                // 计算步数
                let steps = 0;
                if (direction === "顺") {
                    steps = (targetIndex - zhiIndex + 12) % 12;
                } else {
                    steps = (zhiIndex - targetIndex + 12) % 12;
                }
                
                // 根据方向调整天干
                if (direction === "顺") {
                    ganIndex = (ganIndex + steps) % 10;
                } else {
                    ganIndex = (ganIndex - steps + 10) % 10;
                }
                
                return tiangan[ganIndex];
            }
        });