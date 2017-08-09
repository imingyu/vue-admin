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
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    min-height: 100%;
}

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}
body{
    font: 12px/1 '微软雅黑';
    color: #000;
    height: 100%;
    overflow: visible;
}
h1,h2,h3,h4,h5,h6{
    margin-top:0;
}
a{
    text-decoration: none;
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
