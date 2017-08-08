<template>
    <div class="main-layout">
        <ComHeader></ComHeader>
        <div class="layout-body">
            <router-view></router-view>
        </div>
        <ComFooter></ComFooter>
    </div>
</template>


<script>
import ComHeader from './Header';
import ComFooter from './Footer';
export default {
    name: 'MainLayout',
    components: {
        ComHeader,
        ComFooter
    }
}
</script>
