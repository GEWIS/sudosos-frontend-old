<template>
    <div>
        <h1>Storages overview</h1>
        <div class="row">
            <div class="col products-row">
                <div class="row">
                    <div class="col">
                        <h2>Products</h2>
                    </div>
                    <div class="col">
                        <h3 class="add-product-button" @click="$modal.show('add-product-modal')"> + Add product</h3>
                    </div>
                </div>
                <product v-for="product in products" :product="product" :key="product.id"></product>
            </div>
            <div class="col products-row">
                <h2>Storages</h2>
                <storage v-for="storage in storages" :storage="storage" :key="storage.id"></storage>
            </div>
            <div class="col products-row">
                <h2>Points of sale</h2>
                <point-of-sale v-for="pointOfSale in pointsOfSale" :point-of-sale="pointOfSale" :key="pointOfSale.id"></point-of-sale>
            </div>
        </div>
        <modal name="transfer-modal" height="auto">
            <div class="modal-content">
                <div class="row modal-header">
                    <div class="col-11">
                        <h2>Transfer amount</h2>
                    </div>
                    <div class="close-icon col-1">
                        <img @click="$modal.hide('transfer-modal')" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjExMiAzMS4xMTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjExMiAzMS4xMTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPHBvbHlnb24gcG9pbnRzPSIzMS4xMTIsMS40MTQgMjkuNjk4LDAgMTUuNTU2LDE0LjE0MiAxLjQxNCwwIDAsMS40MTQgMTQuMTQyLDE1LjU1NiAwLDI5LjY5OCAxLjQxNCwzMS4xMTIgMTUuNTU2LDE2Ljk3ICAgMjkuNjk4LDMxLjExMiAzMS4xMTIsMjkuNjk4IDE2Ljk3LDE1LjU1NiAiIGZpbGw9IiMwMDAwMDAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="transfer-amount">Transfer</label>
                        <input class="form-control" id="transfer-amount" type="number" v-model="transferAmount">
                    </div>
                    <div class="row">
                        <div class="col">
                            <button class="btn btn-primary" @click="transferAmount += 1">
                                +1
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn btn-primary" @click="transferAmount += 6">
                                +6
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn btn-primary" @click="transferAmount += 10">
                                +10
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn btn-primary" @click="transferAmount += 24">
                                +24
                            </button>
                        </div>
                        <div class="col">
                            <button class="btn btn-danger" @click="transferAmount = 0">
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="transferItems()">Transfer</button>
                    <button type="button" class="btn btn-danger" @click="$modal.hide('transfer-modal')">Cancel</button>
                </div>
            </div>
        </modal>
        <modal name="add-product-modal" height="auto">
            <div class="modal-content">
                <div class="row modal-header">
                    <div class="col-11">
                        <h2>Add a product</h2>
                    </div>
                    <div class="close-icon col-1">
                        <img @click="$modal.hide('add-product-modal')" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjExMiAzMS4xMTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjExMiAzMS4xMTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPHBvbHlnb24gcG9pbnRzPSIzMS4xMTIsMS40MTQgMjkuNjk4LDAgMTUuNTU2LDE0LjE0MiAxLjQxNCwwIDAsMS40MTQgMTQuMTQyLDE1LjU1NiAwLDI5LjY5OCAxLjQxNCwzMS4xMTIgMTUuNTU2LDE2Ljk3ICAgMjkuNjk4LDMxLjExMiAzMS4xMTIsMjkuNjk4IDE2Ljk3LDE1LjU1NiAiIGZpbGw9IiMwMDAwMDAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                    </div>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input class="form-control" id="name" type="text" v-model="newProduct.name">
                        <label for="price">Price</label>
                        <input class="form-control" id="price" type="number" step="0.01" min="0" v-model="newProduct.price">
                        <label for="image-url">Image</label>
                        <input class="form-control" id="image-url" type="text" v-model="newProduct.image_url">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="addProduct()">Add</button>
                    <button type="button" class="btn btn-danger" @click="$modal.hide('add-product-modal')">Cancel</button>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>

    import Product from "../components/Product";
    import Storage from "../components/Storage";
    import PointOfSale from "../components/PointOfSale";
    export default {
        name: "Storages",
        components: {PointOfSale, Storage, Product},
        data: function () {
            return {
                transferAmount: 0,
                currentStorage: {},
                currentProduct: {},
                newProduct: {
                    name: "",
                    price: 0,
                    image_url: ""
                },
                products: [
                    {
                        id: 1,
                        name: "Grolsch vaasje",
                        price: 70,
                        image_url: "https://shop.grolsch.nl/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/s/psn_g_gpp_25cl_craft_262121_5.jpg"
                    },
                    {
                        id: 2,
                        name: "Fles wijn",
                        price: 500,
                        image_url: "https://www.wijnthuisbestellen.nl/wp-content/uploads/15-Frankrijk-Fles-wijn-zonder-etiket.jpg"
                    }
                ],
                storages: [
                    {
                        id: 1,
                        name: "BAC borrelvoorraad",
                        products: []
                    },
                    {
                        id: 2,
                        name: "BAC bierkoelkast",
                        products: []
                    }
                ],
                pointsOfSale: [
                    {
                        id: 1,
                        name: "SudoSOS-scherm",
                        storages: []
                    }
                ]
            }
        },
        methods: {
            transferItems: function () {
                // Add the item to the storage if it isn't in there yet.
                let alreadyInStorage = this.currentStorage.products.some(p => p.id === this.currentProduct.id)
                if (!alreadyInStorage) {
                    this.currentStorage.products.push(JSON.parse(JSON.stringify(this.currentProduct)));
                }
                // Increase the amount there is in this storage
                this.currentStorage.products.forEach(p => {
                    if(p.id === this.currentProduct.id){
                        if (alreadyInStorage) {
                            p.amount += Number(this.transferAmount);
                        } else {
                            p.amount = Number(this.transferAmount);
                        }
                    }
                });

                // Decrease from the other storage
                if (this.currentProduct.inStorage){
                    let sourceStorage = this.storages.filter( s => (s.id === this.currentProduct.sourceStorageID))[0];
                    sourceStorage.products.forEach(p => {
                        if(p.id === this.currentProduct.id){
                            p.amount -= Number(this.transferAmount);
                        }
                    });
                }
                // Close the modal
                this.$modal.hide("transfer-modal");
            },
            addProduct: function () {
                // Create a copy
                let newproduct = JSON.parse(JSON.stringify(this.newProduct));

                this.products.push(newproduct);
                this.$modal.hide("add-product-modal");
            }
        }
    }
</script>

<style scoped>
    .products-row{
        background-color: #f3f3f3;
        margin-right: 16px;
        margin-left: 16px;
        min-height: 100%;
    }

    .close-icon > img{
        max-width: 100%;
    }

    .add-product-button{

    }
    .col > button{
        width: 100%;
    }

</style>