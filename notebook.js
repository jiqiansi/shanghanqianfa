(function() {
  // 创建浮动按钮
  const floatingBtn = document.createElement('div');
  floatingBtn.id = 'qf-float-btn';
  floatingBtn.classList.add('qf-float-btn');
  floatingBtn.innerHTML = `<i class="fas fa-book"></i>`;
  
  // 创建案例存储空间（localStorage）
  const storageKey = 'qianfa-history';
  
  // 获取当前页面上的年命干支和得病干支
  function getCurrentInputs() {
    return {
      yearGan: document.getElementById('year-gan').value,
      yearZhi: document.getElementById('year-zhi').value,
      dayGan: document.getElementById('day-gan').value,
      dayZhi: document.getElementById('day-zhi').value
    };
  }
  
  // 创建主菜单面板
  const mainMenu = document.createElement('div');
  mainMenu.id = 'qf-main-menu';
  mainMenu.classList.add('qf-popup', 'qf-hide');
  
  mainMenu.innerHTML = `
    <div class="qf-menu-header">
      <h3>案例管理</h3>
    </div>
    <div class="qf-menu-options">
      <div class="qf-option" id="qf-save-case">
        <i class="fas fa-save"></i>
        <span>保存当前案例</span>
      </div>
      <div class="qf-option" id="qf-history">
        <i class="fas fa-history"></i>
        <span>历史记录</span>
      </div>
    </div>
  `;
  
  // 创建保存案例表单
  const saveForm = document.createElement('div');
  saveForm.id = 'qf-save-form';
  saveForm.classList.add('qf-popup', 'qf-form', 'qf-hide');
  
  saveForm.innerHTML = `
    <div class="qf-form-header">
      <h3>保存案例</h3>
      <i class="fas fa-times qf-close-btn"></i>
    </div>
    <div class="qf-form-body">
      <div class="qf-input-group">
        <label>年命干支</label>
        <input type="text" id="qf-year-input" class="qf-readonly" readonly>
      </div>
      <div class="qf-input-group">
        <label>得病干支</label>
        <input type="text" id="qf-day-input" class="qf-readonly" readonly>
      </div>
      <div class="qf-input-group">
        <label>案例标题</label>
        <input type="text" id="qf-title-input" placeholder="输入案例标题...">
      </div>
      <div class="qf-input-group">
        <label>备注说明</label>
        <textarea id="qf-notes-input" placeholder="输入案例备注..."></textarea>
      </div>
      <button id="qf-submit-save" class="qf-btn">保存案例</button>
    </div>
  `;
  
  // 创建历史记录面板
  const historyPanel = document.createElement('div');
  historyPanel.id = 'qf-history-panel';
  historyPanel.classList.add('qf-popup', 'qf-form', 'qf-hide');
  
  historyPanel.innerHTML = `
    <div class="qf-form-header">
      <h3>历史记录</h3>
      <i class="fas fa-times qf-close-btn"></i>
    </div>
    <div class="qf-form-tools">
      <button id="qf-import" class="qf-tool-btn"><i class="fas fa-file-import"></i> 导入</button>
      <button id="qf-export" class="qf-tool-btn"><i class="fas fa-copy"></i> 复制</button>
      <button id="qf-clear" class="qf-tool-btn"><i class="fas fa-trash-alt"></i> 清空</button>
    </div>
    <div class="qf-history-container">
      <div id="qf-history-list" class="qf-history-list">
        <!-- 历史记录将通过JS动态生成 -->
      </div>
    </div>
  `;
  
  // 创建导入面板
  const importPanel = document.createElement('div');
  importPanel.id = 'qf-import-panel';
  importPanel.classList.add('qf-popup', 'qf-form', 'qf-hide');
  
  importPanel.innerHTML = `
    <div class="qf-form-header">
      <h3>导入案例</h3>
      <i class="fas fa-times qf-close-btn"></i>
    </div>
    <div class="qf-form-body">
      <div class="qf-input-group">
        <label>粘贴JSON数据</label>
        <textarea id="qf-import-data" placeholder="请在此粘贴案例数据..."></textarea>
      </div>
      <div class="qf-form-actions">
        <button id="qf-cancel-import" class="qf-btn qf-btn-secondary">取消</button>
        <button id="qf-submit-import" class="qf-btn">导入数据</button>
      </div>
    </div>
  `;
  
  // 创建弹窗遮盖层
  const overlay = document.createElement('div');
  overlay.id = 'qf-overlay';
  overlay.classList.add('qf-overlay', 'qf-hide');
  
  // 添加到页面
  document.body.appendChild(floatingBtn);
  document.body.appendChild(mainMenu);
  document.body.appendChild(saveForm);
  document.body.appendChild(historyPanel);
  document.body.appendChild(importPanel);
  document.body.appendChild(overlay);
  
  // 为元素添加样式
  const style = document.createElement('style');
  style.textContent = `
    .qf-float-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      background: #2c6e49;
      border-radius: 50%;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      z-index: 1000;
    }
    
    .qf-float-btn:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
    }
    
    .qf-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 400px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 1001;
    }
    
    .qf-form {
      max-height: 80vh;
      overflow-y: auto;
      padding: 20px;
    }
    
    .qf-hide {
      display: none;
    }
    
    .qf-menu-header {
      padding: 15px 20px;
      border-bottom: 1px solid #eee;
    }
    
    .qf-menu-header h3 {
      margin: 0;
      color: #2c6e49;
      font-weight: 600;
    }
    
    .qf-menu-options {
      padding: 10px 0;
    }
    
    .qf-option {
      padding: 15px 20px;
      display: flex;
      align-items: center;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.2s;
      color: #333;
    }
    
    .qf-option:hover {
      background: #f0f7f3;
    }
    
    .qf-option i {
      margin-right: 12px;
      width: 24px;
      color: #4daa7d;
    }
    
    .qf-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
    
    .qf-form-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
      margin-bottom: 15px;
    }
    
    .qf-form-header h3 {
      margin: 0;
      color: #2c6e49;
    }
    
    .qf-close-btn {
      cursor: pointer;
      font-size: 18px;
      color: #888;
      transition: all 0.2s;
    }
    
    .qf-close-btn:hover {
      color: #e74c3c;
    }
    
    .qf-input-group {
      margin-bottom: 15px;
    }
    
    .qf-input-group label {
      display: block;
      margin-bottom: 6px;
      color: #4a7a60;
      font-weight: 500;
    }
    
    .qf-input-group input, .qf-input-group textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
    }
    
    .qf-input-group textarea {
      height: 100px;
    }
    
    .qf-readonly {
      background: #f8fcf9;
      color: #666;
    }
    
    .qf-btn {
      width: 100%;
      padding: 14px;
      background: linear-gradient(to right, #2c6e49, #4daa7d);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .qf-btn:hover {
      opacity: 0.9;
    }
    
    .qf-btn-secondary {
      background: linear-gradient(to right, #7a9c8a, #9ab8a9);
    }
    
    .qf-tool-btn {
      padding: 8px 15px;
      background: #eaf4ef;
      border: 1px solid #d4e8d9;
      border-radius: 6px;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      margin: 0 5px 10px 0;
      color: #2c6e49;
    }
    
    .qf-tool-btn i {
      margin-right: 5px;
    }
    
    .qf-history-list {
      max-height: 50vh;
      overflow-y: auto;
      padding-right: 5px;
    }
    
    .qf-history-item {
      padding: 15px;
      margin-bottom: 10px;
      border-radius: 8px;
      border: 1px solid #d4e8d9;
      position: relative;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .qf-history-item:hover {
      background: #f8fcf9;
      border-color: #4daa7d;
    }
    
    .qf-history-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    
    .qf-history-title {
      font-weight: 600;
      color: #2c6e49;
    }
    
    .qf-history-time {
      font-size: 12px;
      color: #999;
    }
    
    .qf-history-content {
      margin-bottom: 10px;
    }
    
    .qf-history-item strong {
      color: #4a7a60;
      margin-right: 5px;
    }
    
    .qf-history-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    
    .qf-action-btn {
      padding: 4px 8px;
      font-size: 12px;
      background: #f0f7f3;
      border: 1px solid #cde4d7;
      border-radius: 4px;
      cursor: pointer;
      color: #2c6e49;
    }
    
    .qf-history-actions .qf-delete {
      color: #e74c3c;
      border-color: #f5b7b1;
      background: #fdedec;
    }
    
    .qf-form-tools {
      margin-bottom: 15px;
    }
    
    .qf-form-actions {
      display: flex;
      gap: 10px;
      margin-top: 15px;
    }
    
    .qf-form-actions .qf-btn {
      flex: 1;
    }
    
    .qf-toast {
      position: fixed;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(44, 110, 73, 0.9);
      color: white;
      padding: 12px 25px;
      border-radius: 50px;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 2000;
      opacity: 0;
      transition: opacity 0.3s;
    }
    
    .qf-toast.show {
      opacity: 1;
    }
    
    /* 响应式调整 */
    @media (max-width: 480px) {
      .qf-popup {
        width: 95%;
      }
      
      .qf-history-header {
        flex-direction: column;
      }
      
      .qf-history-time {
        margin-top: 5px;
      }
    }
  `;
  
  document.head.appendChild(style);
  
  // 事件监听
  floatingBtn.addEventListener('click', function() {
    mainMenu.classList.toggle('qf-hide');
    overlay.classList.remove('qf-hide');
  });
  
  overlay.addEventListener('click', function() {
    mainMenu.classList.add('qf-hide');
    saveForm.classList.add('qf-hide');
    historyPanel.classList.add('qf-hide');
    importPanel.classList.add('qf-hide');
    overlay.classList.add('qf-hide');
  });
  
  // 主菜单选项点击
  document.getElementById('qf-save-case').addEventListener('click', function() {
    const inputs = getCurrentInputs();
    document.getElementById('qf-year-input').value = inputs.yearGan + inputs.yearZhi;
    document.getElementById('qf-day-input').value = inputs.dayGan + inputs.dayZhi;
    
    mainMenu.classList.add('qf-hide');
    saveForm.classList.remove('qf-hide');
  });
  
  document.getElementById('qf-history').addEventListener('click', function() {
    mainMenu.classList.add('qf-hide');
    historyPanel.classList.remove('qf-hide');
    renderHistoryList();
  });
  
  // 关闭按钮事件
  const closeButtons = document.querySelectorAll('.qf-close-btn');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const panel = this.closest('.qf-popup');
      panel.classList.add('qf-hide');
      overlay.classList.add('qf-hide');
    });
  });
  
  // 保存案例表单提交
  document.getElementById('qf-submit-save').addEventListener('click', function() {
    const inputs = getCurrentInputs();
    const title = document.getElementById('qf-title-input').value || '未命名案例';
    const notes = document.getElementById('qf-notes-input').value || '';
    
    const caseData = {
      id: Date.now(),
      yearGan: inputs.yearGan,
      yearZhi: inputs.yearZhi,
      dayGan: inputs.dayGan,
      dayZhi: inputs.dayZhi,
      title: title,
      notes: notes,
      date: new Date().toLocaleString()
    };
    
    // 保存到本地存储
    saveCaseToLocal(caseData);
    
    // 显示成功提示
    showToast('案例保存成功！');
    
    // 重置表单
    document.getElementById('qf-title-input').value = '';
    document.getElementById('qf-notes-input').value = '';
    
    // 关闭表单
    saveForm.classList.add('qf-hide');
    overlay.classList.add('qf-hide');
  });
  
  // 历史记录操作按钮
  document.getElementById('qf-export').addEventListener('click', function() {
    const history = getHistory();
    if (history.length === 0) {
      showToast('没有可导出的历史记录');
      return;
    }
    
    const dataStr = JSON.stringify(history, null, 2);
    
    // 创建临时textarea元素进行复制
    const textarea = document.createElement('textarea');
    textarea.value = dataStr;
    textarea.style.position = 'fixed';
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.opacity = 0;
    document.body.appendChild(textarea);
    
    try {
      textarea.select();
      const successful = document.execCommand('copy');
      
      if (successful) {
        showToast('案例数据已复制到剪贴板！');
      } else {
        throw new Error('复制失败');
      }
    } catch (err) {
      console.error('复制失败:', err);
      
      // 备用复制方法：显示数据让用户手动复制
      const copyText = prompt('复制失败，请手动复制以下数据：', dataStr);
      if (copyText) {
        textarea.value = copyText;
        textarea.select();
        document.execCommand('copy');
        showToast('数据已复制！');
      }
    } finally {
      document.body.removeChild(textarea);
    }
  });
  
  document.getElementById('qf-import').addEventListener('click', function() {
    historyPanel.classList.add('qf-hide');
    importPanel.classList.remove('qf-hide');
    document.getElementById('qf-import-data').value = '';
  });
  
  document.getElementById('qf-clear').addEventListener('click', function() {
    if (confirm('确定要清空所有历史记录吗？此操作不可恢复。')) {
      localStorage.removeItem(storageKey);
      renderHistoryList();
      showToast('历史记录已清空');
    }
  });
  
  // 导入面板按钮
  document.getElementById('qf-cancel-import').addEventListener('click', function() {
    importPanel.classList.add('qf-hide');
    historyPanel.classList.remove('qf-hide');
  });
  
  document.getElementById('qf-submit-import').addEventListener('click', function() {
    const importData = document.getElementById('qf-import-data').value;
    if (!importData.trim()) {
      showToast('请输入要导入的数据');
      return;
    }
    
    try {
      const data = JSON.parse(importData);
      importHistory(data);
      importPanel.classList.add('qf-hide');
      historyPanel.classList.remove('qf-hide');
      renderHistoryList();
    } catch (error) {
      showToast('导入失败：数据格式错误');
      console.error(error);
    }
  });
  
  // 保存案例到localStorage
  function saveCaseToLocal(caseData) {
    const history = getHistory();
    history.push(caseData);
    localStorage.setItem(storageKey, JSON.stringify(history));
  }
  
  // 从localStorage获取历史记录
  function getHistory() {
    const historyJSON = localStorage.getItem(storageKey);
    return historyJSON ? JSON.parse(historyJSON) : [];
  }
  
  // 渲染历史记录列表
  function renderHistoryList() {
    const historyList = document.getElementById('qf-history-list');
    historyList.innerHTML = '';
    
    const history = getHistory();
    
    if (history.length === 0) {
      historyList.innerHTML = `<div class="qf-history-empty">没有找到历史记录</div>`;
      return;
    }
    
    history.forEach(caseData => {
      const item = document.createElement('div');
      item.className = 'qf-history-item';
      item.dataset.id = caseData.id;
      item.innerHTML = `
        <div class="qf-history-header">
          <div class="qf-history-title">${caseData.title}</div>
          <div class="qf-history-time">${caseData.date}</div>
        </div>
        <div class="qf-history-content">
          <div><strong>年命：</strong>${caseData.yearGan}${caseData.yearZhi}</div>
          <div><strong>得病：</strong>${caseData.dayGan}${caseData.dayZhi}</div>
          <div><strong>备注：</strong>${caseData.notes || '无'}</div>
        </div>
        <div class="qf-history-actions">
          <button class="qf-action-btn qf-edit-btn" data-id="${caseData.id}">编辑</button>
          <button class="qf-action-btn qf-copy-btn" data-id="${caseData.id}">复制</button>
          <button class="qf-action-btn qf-delete" data-id="${caseData.id}">删除</button>
        </div>
      `;
      
      // 点击案例项加载数据
      item.addEventListener('click', function(e) {
        if (!e.target.classList.contains('qf-action-btn')) {
          applyCase(caseData.id);
        }
      });
      
      historyList.appendChild(item);
    });
    
    // 为操作按钮添加事件
    document.querySelectorAll('.qf-edit-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        editCase(this.dataset.id);
      });
    });
    
    document.querySelectorAll('.qf-copy-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        copyCase(this.dataset.id);
      });
    });
    
    document.querySelectorAll('.qf-delete').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        deleteCase(this.dataset.id);
      });
    });
  }
  
  // 应用案例
  function applyCase(id) {
    const history = getHistory();
    const caseData = history.find(c => c.id == id);
    
    if (caseData) {
      // 设置页面输入框值
      document.getElementById('year-gan').value = caseData.yearGan;
      document.getElementById('year-zhi').value = caseData.yearZhi;
      document.getElementById('day-gan').value = caseData.dayGan;
      document.getElementById('day-zhi').value = caseData.dayZhi;
      
      // 更新当前值显示
      document.getElementById('current-year').textContent = caseData.yearGan + caseData.yearZhi;
      document.getElementById('current-day').textContent = caseData.dayGan + caseData.dayZhi;
      
      // 重新计算
      if (document.getElementById('calculate-btn')) {
        document.getElementById('calculate-btn').click();
      }
      
      // 关闭历史记录面板
      historyPanel.classList.add('qf-hide');
      overlay.classList.add('qf-hide');
      
      showToast(`已应用案例：${caseData.title}`);
    }
  }
  
  // 编辑案例
  function editCase(id) {
    const history = getHistory();
    const caseData = history.find(c => c.id == id);
    
    if (caseData) {
      // 在保存表单中显示数据
      document.getElementById('qf-year-input').value = caseData.yearGan + caseData.yearZhi;
      document.getElementById('qf-day-input').value = caseData.dayGan + caseData.dayZhi;
      document.getElementById('qf-title-input').value = caseData.title;
      document.getElementById('qf-notes-input').value = caseData.notes;
      
      // 创建自定义保存按钮
      const submitBtn = document.getElementById('qf-submit-save');
      submitBtn.textContent = '更新案例';
      
      // 存储当前编辑的ID
      submitBtn.dataset.editingId = id;
      
      // 打开保存表单
      saveForm.classList.remove('qf-hide');
      historyPanel.classList.add('qf-hide');
      
      // 移除原有事件并添加更新事件
      const originalClickHandler = submitBtn.onclick;
      submitBtn.onclick = function() {
        caseData.yearGan = document.getElementById('year-gan').value;
        caseData.yearZhi = document.getElementById('year-zhi').value;
        caseData.dayGan = document.getElementById('day-gan').value;
        caseData.dayZhi = document.getElementById('day-zhi').value;
        caseData.title = document.getElementById('qf-title-input').value;
        caseData.notes = document.getElementById('qf-notes-input').value;
        
        // 保存更新
        localStorage.setItem(storageKey, JSON.stringify(history));
        showToast('案例已更新');
        
        // 恢复原始按钮
        submitBtn.textContent = '保存案例';
        submitBtn.onclick = originalClickHandler;
        delete submitBtn.dataset.editingId;
        
        // 关闭表单
        saveForm.classList.add('qf-hide');
        overlay.classList.add('qf-hide');
        
        // 刷新历史记录
        renderHistoryList();
      };
    }
  }
  
  // 复制案例
  function copyCase(id) {
    const history = getHistory();
    const caseData = history.find(c => c.id == id);
    
    if (caseData) {
      const newCase = {...caseData};
      newCase.id = Date.now();
      newCase.date = new Date().toLocaleString();
      newCase.title = `${caseData.title} (副本)`;
      
      saveCaseToLocal(newCase);
      renderHistoryList();
      
      // 添加复制成功的视觉反馈
      const btn = document.querySelector(`.qf-copy-btn[data-id="${id}"]`);
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> 已复制';
      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    }
  }
  
  // 删除案例
  function deleteCase(id) {
    if (confirm('确定要删除这个案例吗？此操作不可恢复。')) {
      const history = getHistory();
      const newHistory = history.filter(c => c.id != id);
      localStorage.setItem(storageKey, JSON.stringify(newHistory));
      renderHistoryList();
      showToast('案例已删除');
    }
  }
  
  // 导入历史记录
  function importHistory(data) {
    if (!Array.isArray(data)) {
      showToast('导入失败：数据格式无效');
      return;
    }
    
    if (data.length === 0) {
      showToast('导入文件中没有有效数据');
      return;
    }
    
    const history = getHistory();
    const existingIds = new Set(history.map(c => c.id));
    
    // 过滤已存在的ID和新无效数据
    const newCases = data.filter(c => {
      return c && 
             typeof c === 'object' &&
             c.yearGan && c.yearZhi &&
             c.dayGan && c.dayZhi &&
             !existingIds.has(c.id);
    });
    
    if (newCases.length === 0) {
      showToast('没有发现新案例可以导入');
      return;
    }
    
    // 合并数据
    const mergedHistory = [...history, ...newCases];
    localStorage.setItem(storageKey, JSON.stringify(mergedHistory));
    renderHistoryList();
    showToast(`成功导入 ${newCases.length} 个案例`);
  }
  
  // 显示通知
  function showToast(message) {
    let toast = document.getElementById('qf-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'qf-toast';
      toast.className = 'qf-toast';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
  
  // 添加FontAwesome支持（如果页面上不存在）
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const faLink = document.createElement('link');
    faLink.rel = 'stylesheet';
    faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(faLink);
  }
})();