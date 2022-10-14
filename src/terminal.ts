import { window, ProgressLocation } from 'vscode';
import { spawnSync, exec } from 'child_process';
import { writeFile } from 'fs';
import { resolve } from 'path';


const fileTemplate = (path: string) => (
`
    // initial page load's url
    function url() {
        return "${path}";
    }
    
    // action where you suspect the memory leak might be happening
    async function action(page) {
        // await page.click('[id="video-title-link"]');
    }
    
    // how to go back to the state before action
    async function back(page) {
        // await page.click('[id="logo-icon"]');
    }
    
    module.exports = { action, back, url };
`);


// 校验Terminal是否重复被创建
const checkTerminalisInView: () => boolean = () => {
    return window.activeTerminal?.name === 'check-memlab';
};

export const handleTerminal = async (userInput: string, _workspace: string) => {
    if (!userInput) {
        window.showInformationMessage('❌ 请输入正确页面URL!');
        return;
    };

    const check = spawnSync('memlab version', {
        shell: true,
        encoding: 'utf8',
    });
    
    let procData = check.stdout.toString();
    
    // todo: 需要确认windows兼容性
    if (!procData) {  
        window.withProgress({
            location: ProgressLocation.Window,
            cancellable: false,
            title: 'Skyeye 依赖安装中...'
        }, async (progress) => {
            progress.report({ increment: 0 });
            window.showInformationMessage('✅ 依赖安装中，请耐心等待!');
            await new Promise(function (resolve) {
                exec('npm install -g memlab', (error, stdout, stderr) => {
                    if (error) {
                        window.showInformationMessage('❌ 依赖安装异常, 请联系开发者 @maqun1');
                        resolve(false);
                        return;
                    }
                    if (stderr) {
                        window.showInformationMessage('❌ 请确保当前 Node 环境后尝试!');
                        resolve(false);
                        return; 
                    }
                    window.showInformationMessage('✅ 依赖安装成功!');
                    resolve(true);
                });
            });

            progress.report({ increment: 100 });
        });
    }
    const file = resolve(_workspace, '.skyeye.test.js');
    
    await new Promise((resolve) => {
        writeFile(file, fileTemplate(userInput), function (err) { 
            if (err) {
                console.log(err);
                window.showInformationMessage('❌ 配置文件创建异常, 请联系开发者 @maqun1');
                throw err;
            } 
            console.log('File is created successfully.'); 
            resolve(true);
        });
    });

    if (checkTerminalisInView()) {
        window.activeTerminal?.show();
        window.activeTerminal?.sendText(`memlab run --scenario ${file}`);
    } else {
        // 唤起 Terminal
        const term = window.createTerminal('check-memlab');
        term.show();
        term.sendText(`memlab run --scenario ${file}`);
    }
};