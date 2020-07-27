module.exports = {
    title:"蛮大人",
    description:'小前端',
    base: '/vuepress/',// 设置站点根路径
    themeConfig: {
        //导航栏配置
        nav: [
          { text: '首页', link: '/' },
          { text: 'jvascript', link: '/jsBasic/' },
          { text: 'html+css', link: '/htmlcss/' },
          { text: 'Vue', link: '/vue/' },
          { text: 'React', link: '/react/' },
          { text: 'node', link: '/node/' },
          { text: '前端设计模式', link: '/design/' },
          { text: '数据结构与算法', link: '/structrue/' },
          { text: 'webpack', link: '/tool/' },
          { text: '网络', link: '/net/' },
          { text: '面试问题', link: '/interview/'},
          { text: '服务器', link: '/server/'},
          { text: '其他', link: '/other/'},
        ],
         //侧边栏配置
         sidebar: {
            
            '/jsBasic/': [
              '',   
              'jsBasic',  
              'jsTheory',  
              'promise',
              'es6'  
            ],
            '/interview/': [
              '',   
              'debounce',  
              
            ],
            '/htmlcss/': [
              '',   
              'bfc',
               'flex'  
              
            ],
            '/vue/': [
              '',
              'lifeCycle',   
              'vueTheory',
              'vueRouter', 
              'vuex', 
              'vueSSR', 
              
            ],
            '/react/': [
              ''
            ],
            '/net/': [
              '',
              'tcp',   
              'http',
              'https', 
              'cross-domain', 
              
            ],
            '/structrue/': [
              '',
              'tree',   
              'hashtable',   
              'tu',
              'complex', 
              'order', 
              'arithmetic', 
              
            ],
          }
      },
     

}