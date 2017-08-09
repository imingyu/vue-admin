<template>
    <div :class="['page', name ? 'page-' + name:'']">
        <slot></slot>
    </div>
</template>

<style lang="scss">
.page{
    min-height: 100%;
}
</style>


<script>
export default {
    name: 'Page',
    props: ['name']
}
</script>
