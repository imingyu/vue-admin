<template>
    <router-view>
    </router-view>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

html {
    position: relative;
}

html,
body {
    height: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
}
body{
    font: 12px/1 '微软雅黑';
    color: #000;
}
h1,h2,h3,h4,h5,h6{
    margin-top:0;
}
a{
    text-decoration: none;
}
.page{
    min-height: 100%;
    height: 100%;
}
.btn-block{
    width: 100%;
    display: block;
}
</style>


<script>
export default {
    name: 'app'
}
</script>
