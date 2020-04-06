module.exports = {
    title:"蛮大人",
    description:'小前端',
    
    themeConfig: {
        //导航栏配置
        nav: [
          { text: '首页', link: '/' },
          { text: 'js基础', link: '/jsBasic/' },
          { text: 'html+css', link: '/htmlcss/' },
          { text: 'Vue', link: '/vue/' },
          { text: 'React', link: '/react/' },
          { text: 'node', link: '/node/' },
          { text: '工具', link: '/tool/' },
          { text: '网络', link: '/net/' },
          { text: '面试问题', link: '/interview/'},
          { text: '服务器', link: '/server/'},
          { text: '其他', link: '/other/'},
        ],
         //侧边栏配置
         sidebar: {
            '/jsBasic/': [
              '',     /* /foo/ */
              'one',  /* /foo/one.html */
              'two'   /* /foo/two.html */
            ]
          }
      },
     

}