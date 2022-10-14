// 'vscode'模块包含了VS Code extensibility API
// 按下述方式导入这个模块
import { window, commands, ExtensionContext, workspace } from 'vscode';
import { handleTerminal } from './terminal';


// 一旦你的插件激活，vscode会立刻调用下述方法
export function activate(context: ExtensionContext) {

    // 下面的代码只会在你的插件激活时执行一次
	const _workspace = (workspace.workspaceFolders && workspace.workspaceFolders[0].uri.fsPath) || '';
	let getUserInput: string = "";

	console.log('Skyeye is Ready! workspace is: ', _workspace);

    context.subscriptions.push(commands.registerCommand('skyeye.quickInput', async () => {
		const quickPick = window.createQuickPick();	
		// 获取用户输入
		quickPick.onDidChangeValue((v) => getUserInput = v);
		quickPick.placeholder = "请输入待检测的页面URL";
		// 展示
		quickPick.show();
		// 用户确认
		quickPick.onDidAccept(() => {
			handleTerminal(getUserInput, _workspace);
			getUserInput = "";
			quickPick.dispose();
		});
	}));

}