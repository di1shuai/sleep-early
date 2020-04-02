const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',  
    port: 8080
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'));
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        "appId": "com.di1shuai.sleep",
        "productName":"早点睡",//项目名，也是生成的安装文件名，即aDemo.exe
        "copyright":"Copyright © 2020 di1shuai",//版权信息
        "directories":{
            "output":"./dist_electron"//输出文件路径
        },
        'nsis': {
          'installerIcon': 'public/LOGO_256.ico',
          'installerHeader': 'public/LOGO_512.png',
          'installerHeaderIcon': 'public/LOGO_256.ico',
          'oneClick': false,
          'allowToChangeInstallationDirectory': true,
          'runAfterFinish': false
        },
        "win":{//win相关配置
            "icon":"./public/LOGO_256.ico",//图标，当前图标在根目录下，注意这里有两个坑
            "target": [
                {
                    "target": "nsis",//利用nsis制作安装程序
                    "arch": [
                        "x64" //64位
                    ]
                }
            ]
        },
        "mac":{
            "icon": "./public/LOGO_256.icns",
            "category": "public.app-category.lifestyle",
            "target": "dmg"
        }
        // ,
        // 'dmg': {
        //   'title': '早点睡',
        //   'icon': 'public/LOGO_256.icns',
        //   'contents': [
        //     {
        //       'x': 110,
        //       'y': 150
        //     },
        //     {
        //       'x': 240,
        //       'y': 150,
        //       'type': 'link',
        //       'path': '/Applications'
        //     }
        //   ],
        //   'window': {
        //     'x': 400,
        //     'y': 400
        //   }
        // }
      }
    }
  }
};