<template>
    <div class="converter-valute">
        <select name="currencyFrom" v-model="currencyFromCode" class="converter-valute__select">
          <option>RUB</option>
          <option  v-for="item of valute" :key="item.ID">{{ item.CharCode }}</option>
        </select>
        <input type="number" v-model="currencyFrom" class="converter-valute__input" :disabled="disabled" min="0"
        > 
    </div>
</template>


<script>

export default {
    name: "converterItem",
    props: {
        valute: {
            required: true,
            type: Object,
            default: {}
        },
        code: {
            required: true,
            type: String,
            default: "RUB"
        },
        count: {
            required: true,
            type: Number,
            default: 0
        },
        disabled: {
            type: Boolean,
            default: false 
        }
    },
    computed: {
        currencyFromCode: {
            get() {
                return this.code
            },
            set(value) {
                this.$emit('update:code', value)
            }
        },
        currencyFrom: {
            get() {
                return this.count
            },
            set(value) {
                this.$emit('update:count', value)
            }
        }
    }
}

</script>