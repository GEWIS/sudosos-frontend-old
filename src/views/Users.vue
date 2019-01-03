<template>
    <div class="container">
        <h1>User control panel</h1>
        <div class="row">
            <div class="col user-action" @click="$modal.show('add-user-modal')">
                + Add user
            </div>
            <div class="col user-action">
                + New borrel card
            </div>
        </div>
        <div class="row">
            <table-component :data="fetchUsers" sort-by="first_name"
                             sort-order="asc">
                <table-column show="first_name" label="First name"></table-column>
                <table-column show="last_name" label="Last name"></table-column>
                <table-column show="member_id" label="Member ID" data-type="numeric"></table-column>
                <table-column show="email" label="E-mail address"></table-column>
                <table-column show="date_of_birth" label="Date of birth">
                    <template slot-scope="row">
                        <p v-bind:class="{underage: row.underage}">{{ row.birth_date.format('MMMM Do YYYY') }}</p>
                    </template>
                </table-column>
                <table-column show="type" label="Type"></table-column>
            </table-component>
        </div>
        <modal name="add-user-modal" height="auto">
            <div class="modal-content">
                <div class="row modal-header">
                    <div class="col-11">
                        <h2>Add a user</h2>
                    </div>
                    <div class="close-icon col-1">
                        <img @click="$modal.hide('add-user-modal')" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxLjExMiAzMS4xMTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjExMiAzMS4xMTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KPHBvbHlnb24gcG9pbnRzPSIzMS4xMTIsMS40MTQgMjkuNjk4LDAgMTUuNTU2LDE0LjE0MiAxLjQxNCwwIDAsMS40MTQgMTQuMTQyLDE1LjU1NiAwLDI5LjY5OCAxLjQxNCwzMS4xMTIgMTUuNTU2LDE2Ljk3ICAgMjkuNjk4LDMxLjExMiAzMS4xMTIsMjkuNjk4IDE2Ljk3LDE1LjU1NiAiIGZpbGw9IiMwMDAwMDAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />
                    </div>
                </div>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="first_name">First name</label>
                    <input class="form-control" id="first_name" type="text" v-model="newUser.first_name">
                    <label for="last_name">Last name</label>
                    <input class="form-control" id="last_name" type="text" v-model="newUser.last_name">
                    <label for="birth_date">Birth date</label>
                    <input class="form-control" id="birth_date" type="date" v-model="newUser.birth_date"/>
                    <label for="image-url">Email</label>
                    <input class="form-control" id="image-url" type="email" v-model="newUser.email">
                    <label for="account-type">Type</label>
                    <select class="form-control" id="account-type" v-model="newUser.type">
                        <option value="external">External</option>
                        <option value="member">Member</option>
                        <option value="card">Card</option>
                        <option value="anonymous">Anonymous</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="addUser()">Add</button>
                <button type="button" class="btn btn-danger" @click="$modal.hide('add-user-modal')">Cancel</button>
            </div>
        </modal>
    </div>
</template>

<script>
    import users from '../test_users.json';
    import moment from 'moment';
    export default {
        name: "Users",
        data: function () {
            return {
                users: users,
                moment: moment,
                newUser: {
                    first_name: "",
                    last_name: "",
                    email: "",
                    birth_date: moment().format("yyyy-MM-dd"),
                    type: ""
                }
            }
        },
        methods: {
            async fetchUsers({page, filter, sort}){
                let PAGE_AMOUNT = 50;

                // Filter all users
                let filteredUsers = users.filter(function (element) {
                    let score = 0;
                    for (let property in element){
                        if(element.hasOwnProperty(property)){
                            if (element[property].toString().toLowerCase().includes(filter.toLowerCase())) {
                                score++;
                            }
                        }
                    }
                    return score > 0;
                });

                // Sort the users
                filteredUsers.sort(this.sortByProperty(sort.fieldName, sort.order));

                // Convert the date for all users and check if they are of age
                filteredUsers.map(function (user){
                    user.birth_date = moment.unix(user.date_of_birth);
                    user.underage = moment.utc().diff(user.birth_date, 'years') < 18;
                });

                return {
                    data: filteredUsers.length > PAGE_AMOUNT ? filteredUsers.slice(page * PAGE_AMOUNT, (page + 1) * PAGE_AMOUNT) : filteredUsers,
                    pagination: {
                        currentPage: page,
                        totalPages: parseInt(filteredUsers.length / PAGE_AMOUNT)
                    }
                };


            },
            addUser: function(){
                this.newUser.member_id = this.users.reduce((prev, curr) => (prev.member_id > curr.member_id) ? prev : curr).member_id + 1;
                this.users.push(this.newUser);
                this.$modal.hide("add-user-modal");
            },

            sortByProperty: function(property, direction){
                let directionCoeff = direction === "asc" ? 1 : -1;

                return function (a, b) {
                    let sortA = (a[property] === null || typeof a[property] === 'undefined') ? a[property] : a[property].toString().toLowerCase();
                    let sortB = (b[property] === null || typeof b[property] === 'undefined') ? b[property] : b[property].toString().toLowerCase();

                    if(sortA < sortB) {
                        return -1 * directionCoeff;
                    }

                    if(sortA > sortB){
                        return directionCoeff;
                    }
                    return 0;
                }
            }

        }
    }
</script>

<style scoped>
    .underage{
        color: red;
    }

    .user-action{
        border: 4px solid #1f1f1f;
        border-radius: 5px;
        margin: 16px 16px 16px 0;
        padding: 48px 16px;
        font-size: 30px;
        font-weight: 700;
    }

    .close-icon > img{
        max-width: 100%;
    }
</style>