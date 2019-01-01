<template>
    <drop @drop="storageDropped" drop-effect="copy">
        <h3>{{ pointOfSale.name }}</h3>
        <div class="storages-container">
            <div v-show="pointOfSale.storages.length < 1">
                Place storages here
            </div>
            <storage v-for="storage in pointOfSale.storages" :storage="storage" :key="storage.id"></storage>
        </div>
    </drop>
</template>

<script>
    import Storage from "./Storage";
    export default {
        name: "PointOfSale",
        components: {Storage},
        props: {
            pointOfSale: Object
        },
        methods: {
            storageDropped: function (transferData) {
                this.pointOfSale.storages.push(transferData);
            }
        }
    }
</script>

<style scoped>
    .storages-container{
        background-color: #f3f3f3;
        min-height: 100px;
        margin-bottom: 8px;
        padding: 8px;
    }

</style>