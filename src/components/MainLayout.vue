<template>
    <div class="main-layout">

        <div class="left-container">
            <div class="header-placeholder"></div>
            <LeftMenu></LeftMenu>
        </div>
        <div class="right-container">
            <ComHeader></ComHeader>
            <div class="page-container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '../assets/style/mixin.scss';
.main-layout {
    .header-placeholder{
        height: $ht-header;
        position: relative;
    }
    .left-container {
        width: $wd-left-menu;
        background: $clr-bg-left-menu;
        position: fixed;
        top:0;
        left: 0;
        bottom: 0;
        z-index: 1;
        overflow: auto;
    }
    .right-container {
        margin-left: $wd-left-menu;
    }
    .page-container{
        padding: 15px;
    }
}
</style>

<script>
import ComHeader from './Header';
import LeftMenu from './LeftMenu';
export default {
    name: 'MainLayout',
    components: {
        ComHeader,
        LeftMenu
    }
}
</script>
