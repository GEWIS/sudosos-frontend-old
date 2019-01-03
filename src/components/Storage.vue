<template>
    <drag :transfer-data="storage" @dragstart="childDragStart" class="products-container">
        <drop @drop="productDropped" drop-effect="copy">
            <h3>{{ storage.name }}</h3>
            <div >
                <div v-show="storage.products.length < 1">
                    Place products here
                </div>
                <product v-for="product in storage.products" :product="product" :key="product.id"></product>
            </div>
        </drop>
    </drag>
</template>

<script>
    import Product from "./Product";
    export default {
        name: "Storage",
        components: {Product},
        props: {
            storage: Object
        },
        data: function() {
            return {
                name: "storage"
            }
        },
        methods: {
            productDropped: function (transferData) {
                this.$parent.$modal.show('transfer-modal');
                this.$parent.currentStorage = this.storage;
                this.$parent.currentProduct = transferData;
            },
            childDragStart: function (data, event) {
                event.stopPropagation();
            }
        }
    }
</script>

<style scoped>
    .products-container{
        background-color: #d3d3d3;
        min-height: 100px;
        text-align: center;
        margin-bottom: 8px;
        padding: 8px;
    }
</style>