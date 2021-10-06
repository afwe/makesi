<template>
  <div class="breadcrumb">
      <el-breadcrumb class="app-breadcrumb" separator=">">
        <transition-group>
          <el-breadcrumb-item  v-for="item in levelList" :key="item.path">
            <a  @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
  </div>
</template>

<script>

export default{
    data(){
        return {
            levelList:null
        }
    },
    created() {
       this.getBreadList()
    },
    watch:{
        $route(){
            this.getBreadList()
        }
    },
   methods:{
      getBreadList(){
        let matched=this.$route.matched//$route.matched 将会是一个包含从上到下的所有对象 (副本)。
        const first=matched[0]
        if(first && first.name !=='home'){//$route.name当前路由名称；$route.redirectedFrom重定向来源的路由的名字
          matched=[{ path: '/main', meta: { title: '首页' }}].concat(matched)
        }
        this.levelList=matched
      },
      handleLink(item) {
        const { redirect, path } = item
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(path)
      },
      pathCompile(path) {
        const { params } = this.$route
        var toPath = pathToRegexp.compile(path)//url 的正则表达式,快速填充 url 字符串的参数值。
        return toPath(params)
      },
      
   },
}
</script>
<style scoped>
.breadcrumb{
  height: 28px;
  width: 875px;
  
}
</style>