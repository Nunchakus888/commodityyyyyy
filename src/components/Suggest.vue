<template>
    <div>
        <label>详细地址</label>
        <input type="text" id="suggestId" v-model="address.street" @input="emitStreet"/>
        <div id="searchResultPanel"></div>
    </div>
</template>

<script>
    export default {
        name: 'owo-suggest',
        props: ['street', 'city'],
        data() {
            return {
                address: {
                    street: this.street
                },
                autoComplete: null
            };
        },
        watch: {
            city() {
                this.autoComplete.setCity(this.city || '310000');
            }
        },
        mounted() {
            AMap.plugin(['AMap.Autocomplete'], () => {
                const autoOptions = {
                    input: 'suggestId' //使用联想输入的input的id
                };

                this.autoComplete = new AMap.Autocomplete(autoOptions);

                AMap.event.addListener(this.autoComplete, 'select', (e) => {
                    const POI = e.poi || {};
                    const street = POI.district + POI.address;

                    this.address.longitude = POI.location.lng;
                    this.address.latitude = POI.location.lat;
                    this.address.street = street;
                    this.address.poi = POI.name;

                    this.$emit('select', this.address);
                });
            });
        },
        methods: {
            emitStreet() {
                this.$emit('input', this.address.street);
            }
        }
    };
</script>

<style>
    #searchResultPanel {
        max-height: 400px;
        overflow-y: scroll;
        border: 1px solid #c0c0c0;
        height: auto;
        display: none;
    }

</style>