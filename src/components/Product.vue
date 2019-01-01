<template>
    <drag :transfer-data="product" @dragstart="childDragStart">
        <div class="row product-row">
            <div class="col-3">
                <img :src="product.image_url" class="rounded-circle product-image"/>
            </div>
            <div class="col-9">
                <h4><b>{{ product.name }}</b></h4>
                <p>€{{Number(product.price / 100).toFixed(2)}} <template v-if="inStorage">- Stock: {{ product.amount }}</template></p>
            </div>
        </div>
    </drag>
</template>

<script>
    export default {
        name: "Product",
        props: {
            product: Object
        },
        data: function () {
            return {
                inStorage: false
            }
        },
        mounted: function () {
            // We need to traverse the DOM up 3 nodes, because a product is wrapped by a <Drag>, and a storage is wrapped by a <Drop>
            this.inStorage = this.$parent.$parent.$parent.name === 'storage';
            this.product.inStorage = this.inStorage;
            if (this.product.inStorage){
                this.product.sourceStorageID = this.$parent.$parent.$parent.storage.id;
            }
        },
        methods: {
            childDragStart: function (data, event) {
                event.stopPropagation();
            }
        }
    }
</script>

<style scoped>
    .product-image{
        width: 100%;
    }
    .product-row{
        margin-top: 8px;
        margin-bottom: 8px;
    }
</style>