// 'vscode'模块包含了VS Code extensibility API
// 按下述方式导入这个模块
import { window, commands, ExtensionContext, workspace, ViewColumn } from 'vscode';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { handleTerminal } from './terminal';


function getWebviewContent(): string {
	return readFileSync(resolve(__dirname, '../html/index.html'),{
		encoding:'utf8', flag:'r'
	});
}


// 一旦你的插件激活，vscode会立刻调用下述方法
export function activate(context: ExtensionContext) {

    // 下面的代码只会在你的插件激活时执行一次
	const _workspace = (workspace.workspaceFolders && workspace.workspaceFolders[0].uri.fsPath) || '';
	let getUserInput: string = "";

	console.log('Skyeye is Ready! workspace is: ', _workspace);

	context.subscriptions.push(
		commands.registerCommand('skyeye.webAnalysis', () => {
		  // 创建和显示webview
		  const panel = window.createWebviewPanel(
			'WebAnalysis',
			'Web Analysis',
			ViewColumn.One,
			{
				// 在webview中启用脚本
				enableScripts: true
			}
		  );
	
		  // 设置HTML内容
		  panel.webview.html = getWebviewContent();
		})
	);

    // context.subscriptions.push(commands.registerCommand('skyeye.webAnalysis', async () => {
	// 	const quickPick = window.createQuickPick();	
	// 	// 获取用户输入
	// 	quickPick.onDidChangeValue((v) => getUserInput = v);
	// 	quickPick.placeholder = "请输入页面URL";
	// 	// 展示
	// 	quickPick.show();
	// 	// 用户确认
	// 	quickPick.onDidAccept(() => {
	// 		handleTerminal(getUserInput, _workspace);
	// 		getUserInput = "";
	// 		quickPick.dispose();
	// 	});
	// }));


	context.subscriptions.push(commands.registerCommand('skyeye.nodeHeap', async () => {
		// const quickPick = window.createQuickPick();	
		// // 获取用户输入
		// quickPick.onDidChangeValue((v) => getUserInput = v);
		// quickPick.placeholder = "请输入页面URL";
		// // 展示
		// quickPick.show();
		// // 用户确认
		// quickPick.onDidAccept(() => {
		// 	handleTerminal(getUserInput, _workspace);
		// 	getUserInput = "";
		// 	quickPick.dispose();
		// });
	}));

}